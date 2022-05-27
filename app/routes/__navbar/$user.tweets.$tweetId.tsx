import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import {
  Form,
  useActionData,
  useLoaderData,
  useTransition,
} from "@remix-run/react";
import { useEffect, useRef } from "react";
import { MainTweet } from "~/components/mainTweet";
import { Tweet } from "~/components/tweet";
import { getUserId } from "~/server/session.server";
import type { DbTweets, DbUser } from "~/server/supabase.server";
import { getLikeCount, hasUserLikedTweet } from "~/server/supabase.server";
import { insertTweetReplyFromUser } from "~/server/supabase.server";
import { getTweetUserName } from "~/server/supabase.server";
import { getTweet } from "~/server/supabase.server";
import { getOneTweetFromUser } from "~/server/supabase.server";
import { getUserOfUserName } from "~/server/supabase.server";
import { AppUrl } from "~/utils/url";
import { invariant } from "~/utils/utils";

type LoaderTweet = {
  userName: string; // Username of the user who posted the tweet
  tweet_id: string;
  message: string;
  replied_to: string | null; // Username of the replied_to user
  replies: TweetReply[];
  likesCount: number;
  likeActive: boolean;
};

type TweetReply =
  | {
      type: "success";
      tweet: {
        tweet_id: string;
        message: string;
        replied_to: string | null;
        replyCount: number;
        userName: string;
        likesCount: number;
        likeActive: boolean;
      };
    }
  | { type: "error"; error: "User not found" | "Tweet not found" };

type LoaderData =
  | {
      type: "success";
      tweet: LoaderTweet;
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
        Pick<DbTweets, "message" | "tweet_id" | "replied_to" | "replies">
      >({
        tweetId: replyTweetId,
        selectQuery: "message, tweet_id, replied_to, replies",
      });

      return replyTweet;
    })
  );

  const tweetWithUserName = {
    ...tweet,
    userName: userName,
    likesCount: (await getLikeCount({ tweetId: tweet.tweet_id })) ?? 0,
    likeActive:
      (await hasUserLikedTweet({ tweetId: tweetId, userId: loggedInUserId })) ??
      false,
  };

  const replies: TweetReply[] = await Promise.all(
    repliesResult.map(async (repliesResult): Promise<TweetReply> => {
      if (repliesResult === null) {
        return { type: "error", error: "Tweet not found" };
      }

      const tweetUserName = await getTweetUserName(repliesResult.tweet_id);
      const likesCount =
        (await getLikeCount({
          tweetId: repliesResult.tweet_id,
        })) ?? 0;

      const likeActive =
        (await hasUserLikedTweet({
          tweetId: repliesResult.tweet_id,
          userId: loggedInUserId,
        })) ?? false;

      if (tweetUserName === null) {
        return { type: "error", error: "User not found" };
      }

      return {
        type: "success",
        tweet: {
          message: repliesResult.message,
          tweet_id: repliesResult.tweet_id,
          userName: tweetUserName,
          // Since we are finding the replies for the tweet from the user, we can set userName
          // to that userName without needing to fetch it from db
          replied_to: userName,
          replyCount: repliesResult.replies.length,
          likesCount: likesCount,
          likeActive: likeActive,
        },
      };
    })
  );

  return json<LoaderData>({
    type: "success",
    tweet: { ...tweetWithUserName, replies: replies },
  });
};

type ActionData = {
  errorMessage?: string;
};

export const action: ActionFunction = async ({ request, params }) => {
  const formdata = await request.formData();
  const userId = await getUserId(request);

  if (userId === null) {
    // User is not loggedIn

    return redirect(AppUrl.join);
  }

  const actionType = formdata.get("actionType");

  if (actionType === "tweetReply") {
    const replyMessage = formdata.get("reply");

    if (!replyMessage || typeof replyMessage !== "string") {
      return json<ActionData>({ errorMessage: "Please enter valid reply" });
    }

    const tweetId = params.tweetId;
    const userName = params.user;

    invariant(tweetId, "Expected to have dynamic route named $tweetId");
    invariant(userName, "Expected to have dynamic route named $user");

    const result = await insertTweetReplyFromUser({
      message: replyMessage,
      repliedTo: tweetId,
      userId: userId,
    });

    if (result === null) {
      // Something is wrong when adding it to db
      return json<ActionData>({
        errorMessage: "Error adding reply, try again later",
      });
    }
  }

  return null;
};

export default function TweetPage() {
  const loaderData = useLoaderData<LoaderData>();
  const actionData = useActionData<ActionData>();
  const transition = useTransition();
  const formRef = useRef<HTMLFormElement | null>(null);

  const isReplying =
    transition.state === "submitting" &&
    transition.submission.formData.get("actionType") === "tweetReply";

  useEffect(() => {
    if (!isReplying) {
      formRef.current?.reset();
    }
  }, [isReplying]);

  if (loaderData.type === "error") return <p>{loaderData.error}</p>;

  const {
    tweet: {
      message,
      replied_to,
      replies,
      userName,
      likesCount,
      likeActive,
      tweet_id,
    },
  } = loaderData;
  return (
    <div className="max-w-[600px] border-r border-r-gray-600 min-h-screen">
      <div className="sticky top-0 p-4 bg-black font-bold text-xl shadow bg-opacity-80">
        Thread
      </div>
      <div>
        <MainTweet
          message={message}
          replied_to={replied_to}
          repliesCount={replies.length}
          userName={userName}
          errorMessage={actionData?.errorMessage}
          likesCount={likesCount}
          likeActive={likeActive}
          tweetId={tweet_id}
        />
        {replies.map((reply) => {
          if (reply.type === "error") return <div>{reply.error}</div>;

          const {
            message,
            replied_to,
            replyCount,
            tweet_id,
            userName,
            likeActive,
            likesCount,
          } = reply.tweet;

          return (
            <div key={tweet_id} className="border-b border-gray-600">
              <Tweet
                likesCount={likesCount}
                likeActive={likeActive}
                message={message}
                relpiesCount={replyCount}
                tweetId={tweet_id}
                repliedTo={replied_to ?? undefined}
                userName={userName}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
