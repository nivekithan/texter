import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getUserId } from "~/server/session.server";
import type { DbTweets, DbUser } from "~/server/supabase.server";
import { getTweetUserName } from "~/server/supabase.server";
import { getTweet } from "~/server/supabase.server";
import { getOneTweetFromUser } from "~/server/supabase.server";
import { getUserOfUserName } from "~/server/supabase.server";
import { AppUrl } from "~/utils/url";
import { invariant } from "~/utils/utils";

type Tweet = {
  tweet_id: string;
  message: string;
  replied_to: string | null;
  replies: TweetReply[];
};

type TweetReply =
  | {
      type: "success";
      tweet: {
        tweet_id: string;
        message: string;
        replied_to: string | null;
        replies: null;
      };
    }
  | { type: "error"; error: "User not found" | "Tweet not found" };

type LoaderData =
  | {
      type: "success";
      tweet: Tweet;
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

    const finalUrl = `${AppUrl.join}?${searchParams}`;
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

  if (tweet.replied_to !== null) {
    // As of now tweet.replied_to is in uuid, we have to convert it to
    // userName
    const userNameRes = await getTweetUserName(tweet.replied_to);

    invariant(userNameRes, "Expected replied_to user_id to be valid");

    // Set found userName in tweet.replied_to field
    tweet.replied_to = userNameRes;
  }

  const repliesResult = await Promise.all(
    tweet.replies.map((replyTweetId) => {
      const replyTweet = getTweet<
        Pick<DbTweets, "message" | "tweet_id" | "replied_to">
      >({
        tweetId: replyTweetId,
        selectQuery: "message, tweet_id, replied_to",
      });

      return replyTweet;
    })
  );

  const replies: TweetReply[] = repliesResult.map(
    (repliesResult): TweetReply => {
      if (repliesResult === null) {
        return { type: "error", error: "Tweet not found" };
      }

      return {
        type: "success",
        tweet: {
          message: repliesResult.message,
          tweet_id: repliesResult.tweet_id,
          // Since we are finding the replies for the tweet from the user, we can set userName
          // to that userName without needing to fetch it from db
          replied_to: userName,
          replies: null,
        },
      };
    }
  );

  return json<LoaderData>({
    type: "success",
    tweet: { ...tweet, replies: replies },
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
      {loaderData.tweet.replies.map((reply) => {
        if (reply.type === "error") {
          return <p>{reply.error}</p>;
        }

        return (
          <ol key={reply.tweet.tweet_id}>
            <li>Message : {reply.tweet.message}</li>
            <li>Replied To: {reply.tweet.replied_to}</li>
          </ol>
        );
      })}
    </ol>
  );
}
