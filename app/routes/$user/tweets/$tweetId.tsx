import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getUserId } from "~/server/session.server";
import type { DbTweets, DbUser } from "~/server/supabase.server";
import { getOneTweetFromUser } from "~/server/supabase.server";
import { getUserOfUserName } from "~/server/supabase.server";
import { AppUrl } from "~/utils/url";
import { invariant } from "~/utils/utils";

type LoaderData =
  | {
      type: "success";
      tweet: {
        tweet_id: string;
        message: string;
        replied_to: string | null;
        replies: string[];
      };
    }
  | {
      type: "error";
      error: "User not found" | "Tweet not found";
    };

export const loader: LoaderFunction = async ({ request, params }) => {
  const loggedInUserId = await getUserId(request);

  if (loggedInUserId === null) {
    const requestUrl = new URL(request.url);

    const searchParams = new URLSearchParams();

    // Set redirectTo param so that once the user logged in we can
    // redirect to the page they were on
    searchParams.set("redirectTo", requestUrl.pathname);

    const finalUrl = `${AppUrl.login}?${searchParams}`;
    return redirect(finalUrl);
  }

  const userName = params.user;
  const tweetId = params.tweetId;

  invariant(userName, "Expected to have dynamic route named $user");
  invariant(tweetId, "Expected to have dynamic route named $tweetId");

  const user = await getUserOfUserName<Pick<DbUser, "user_name" | "user_id">>(
    userName,
    "user_name, user_id"
  );

  if (user === null) {
    return json<LoaderData>({ error: "User not found", type: "error" });
  }

  const { user_id: userId } = user;

  const tweet = await getOneTweetFromUser<
    Pick<DbTweets, "message" | "tweet_id" | "replied_to" | "replies">
  >({
    userId: userId,
    tweetId,
    selectQuery: "message, tweet_id, replied_to, replies",
  });

  if (tweet === null) {
    return json<LoaderData>({ error: "Tweet not found", type: "error" });
  }

  return json<LoaderData>({
    type: "success",
    tweet,
  });
};

export default function TweetPage() {
  const loaderData = useLoaderData<LoaderData>();

  if (loaderData.type === "error") return <p>{loaderData.error}</p>;

  return (
    <ol>
      <li>Message : {loaderData.tweet.message}</li>
      <li>Replied To: {loaderData.tweet.replied_to}</li>
      <h3>Replies</h3>
      {loaderData.tweet.replies.map((reply) => (
        <li key={reply}>{reply}</li>
      ))}
    </ol>
  );
}
