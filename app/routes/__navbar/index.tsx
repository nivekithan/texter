import { json, redirect } from "@remix-run/node";
import type {
  LoaderFunction,
  ActionFunction,
} from "@remix-run/node";
import {
  getUserId,
} from "~/server/session.server";
import { AppUrl } from "~/utils/url";
import { getTweetUserName } from "~/server/supabase.server";
import { getLatestTweets } from "~/server/supabase.server";
import { insertTweetFromUser } from "~/server/supabase.server";
import { useActionData, useLoaderData } from "@remix-run/react";
import { SendTweet } from "~/components/sendTweet";
import { Tweet } from "~/components/tweet";

type LoaderData = {
  tweets: {
    userName: string;
    message: string;
    tweetId: string;
    repliedTo?: string;
    repliesCount: number;
  }[];
};

export const loader: LoaderFunction = async ({ request }) => {
  
  const latest10Tweets = await getLatestTweets<{
    message: string;
    tweet_id: string;
    users: { user_name: string };
    replied_to: string | null;
    replies: string[];
  }>({
    count: 10,
    selectQuery: `message, tweet_id, users!fk_user_id (user_name), replied_to, replies`,
  });
  if (latest10Tweets === null) {
    // Something is wrong with getting data from database
    return json<LoaderData>({ tweets: [] });
  }

  const latestTweetsWithRepliedTo = await Promise.all(
    latest10Tweets.map(
      async ({ message, tweet_id, users, replied_to, replies }) => {
        return {
          message,
          tweetId: tweet_id,
          userName: users.user_name,
          repliedTo:
            replied_to === null
              ? undefined
              : (await getTweetUserName(replied_to)) ?? undefined,
          repliesCount: replies.length,
        };
      }
    )
  );

  return json<LoaderData>({
    tweets: latestTweetsWithRepliedTo,
  });
};

type ActionData = {
  error: string;
};

export const action: ActionFunction = async ({ request }) => {
  const loggedInUserId = await getUserId(request);

  if (loggedInUserId === null) {
    const requestUrl = new URL(request.url);

    const searchParams = new URLSearchParams();

    // Set redirectTo param so that once the user logged in we can
    // redirect to the page they were on
    searchParams.set("redirectTo", requestUrl.pathname);

    const finalUrl = `${AppUrl.join}?${searchParams}`;
    return redirect(finalUrl);
  }

  const formData = await request.formData();

  const actionType = formData.get("actionType");

  if (typeof actionType !== "string") {
    return json<ActionData>({ error: "Invalid action type" });
  }

  if (actionType === "tweet") {
    const message = formData.get("message");

    if (!message || typeof message !== "string")
      return json<ActionData>({ error: "Enter a valid message" });

    const insertTweetQuery = await insertTweetFromUser({
      userId: loggedInUserId,
      message: message,
    });

    if (insertTweetQuery === null)
      return json<ActionData>({ error: "Invalid action type" });

    return null;
  }
};

export default function () {
  const { tweets } = useLoaderData<LoaderData>();
  const actionData = useActionData<ActionData>();
  return (
    <>
      <div className="sticky top-0 p-4 bg-black font-bold text-xl shadow bg-opacity-80">
        Home
      </div>

      <div className="max-w-[600px] border-r border-gray-600 min-h-screen">
        <div className="border-b border-gray-600">
          <SendTweet error={actionData?.error} />
        </div>
        <ol>
          {tweets.map(
            ({ message, tweetId, userName, repliedTo, repliesCount }, i) => {
              return (
                <li key={tweetId} className="border-b border-gray-600">
                  <Tweet
                    message={message}
                    tweetId={tweetId}
                    userName={userName}
                    repliedTo={repliedTo}
                    relpiesCount={repliesCount}
                    likesCount={0}
                  />
                </li>
              );
            }
          )}
        </ol>
      </div>
    </>
  );
}
