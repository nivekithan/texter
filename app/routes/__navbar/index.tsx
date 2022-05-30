import { json, redirect } from "@remix-run/node";
import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import {
  getUserId,
  getUserSession,
  sessionStorage,
} from "~/server/session.server";
import { AppUrl } from "~/utils/url";
import type { DbUser } from "~/server/supabase.server";
import {
  getBookmarkCount,
  hasUserBookmarkedTweet,
} from "~/server/supabase.server";
import { getLikeCount, hasUserLikedTweet } from "~/server/supabase.server";
import { getTweetUserName, getUserOfUserId } from "~/server/supabase.server";
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
    likesCount: number;
    likeActive: boolean;
    bookmarkCount: number;
    bookmarkActive: boolean;
    profilePictureUrl: string;
  }[];
  loggedInUserName: string;
  loggedInProfilePictureUrl: string;
};

export const loader: LoaderFunction = async ({ request }) => {
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

  const loggedInUser = await getUserOfUserId<
    Pick<DbUser, "user_name" | "profile_picture_url">
  >(loggedInUserId, "user_name, profile_picture_url");

  if (loggedInUser === null) {
    // There is no user with that name

    const userSession = await getUserSession(request);

    const requestUrl = new URL(request.url);

    const searchParams = new URLSearchParams();

    // Set redirectTo param so that once the user logged in we can
    // redirect to the page they were on
    searchParams.set("redirectTo", requestUrl.pathname);

    const finalUrl = `${AppUrl.join}?${searchParams}`;
    return redirect(finalUrl, {
      headers: {
        "Set-Cookie": await sessionStorage.destroySession(userSession),
      },
    });
  }

  const { user_name: loggedInUserName } = loggedInUser;

  const latest10Tweets = await getLatestTweets<{
    message: string;
    tweet_id: string;
    users: { user_name: string; profile_picture_url: string | null };
    replied_to: string | null;
    replies: string[];
  }>({
    count: 10,
    selectQuery: `message, tweet_id, users!fk_user_id (user_name, profile_picture_url), replied_to, replies`,
  });
  if (latest10Tweets === null) {
    // Something is wrong with getting data from database
    return json<LoaderData>({
      tweets: [],
      loggedInUserName,
      loggedInProfilePictureUrl: loggedInUser.profile_picture_url ?? "",
    });
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
          likesCount: (await getLikeCount({ tweetId: tweet_id })) ?? 0,
          likeActive:
            (await hasUserLikedTweet({
              userId: loggedInUserId,
              tweetId: tweet_id,
            })) ?? false,
          bookmarkCount: (await getBookmarkCount({ tweetId: tweet_id })) ?? 0,
          bookmarkActive:
            (await hasUserBookmarkedTweet({
              userId: loggedInUserId,
              tweetId: tweet_id,
            })) ?? false,
          profilePictureUrl: users.profile_picture_url ?? "",
        };
      }
    )
  );

  return json<LoaderData>({
    tweets: latestTweetsWithRepliedTo,
    loggedInUserName,
    loggedInProfilePictureUrl: loggedInUser.profile_picture_url ?? "",
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
  const { tweets, loggedInUserName, loggedInProfilePictureUrl } =
    useLoaderData<LoaderData>();
  const userUrl = `${AppUrl.home}${loggedInUserName}`;
  const actionData = useActionData<ActionData>();
  return (
    <>
      <div className="sticky top-0 p-4 bg-black font-bold text-xl shadow bg-opacity-80">
        Home
      </div>

      <div className="max-w-[600px] border-r border-gray-600 min-h-screen">
        <div className="border-b border-gray-600">
          <SendTweet
            error={actionData?.error}
            userUrl={userUrl}
            profilePictureUrl={loggedInProfilePictureUrl}
          />
        </div>
        <ol>
          {tweets.map(
            (
              {
                message,
                tweetId,
                userName,
                repliedTo,
                repliesCount,
                likesCount,
                likeActive,
                bookmarkActive,
                bookmarkCount,
                profilePictureUrl,
              },
              i
            ) => {
              return (
                <li key={tweetId} className="border-b border-gray-600">
                  <Tweet
                    message={message}
                    tweetId={tweetId}
                    userName={userName}
                    repliedTo={repliedTo}
                    relpiesCount={repliesCount}
                    likesCount={likesCount}
                    likeActive={likeActive}
                    bookmarkActive={bookmarkActive}
                    bookmarkCount={bookmarkCount}
                    profilePictureUrl={profilePictureUrl}
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
