import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Tweet } from "~/components/tweet";
import { getUserId } from "~/server/session.server";
import type {
  DbUser} from "~/server/supabase.server";
import {
  getLikeCount,
  getTweetsUserHasLiked,
  getTweetUserName,
  getUserOfUserName,
  hasUserLikedTweet,
} from "~/server/supabase.server";
import { invariant } from "~/utils/utils";

type LoaderTweets = {
  userName: string;
  message: string;
  tweetId: string;
  repliedTo?: string;
  repliesCount: number;
  likesCount: number;
  likeActive: boolean;
};

type LoaderData =
  | {
      type: "success";
      tweets: LoaderTweets[];
    }
  | { type: "error"; error: "User not found" | "Tweets not found" };

export const loader: LoaderFunction = async ({ request, params }) => {
  const loggedInUserId = (await getUserId(request))!;

  const userName = params.user;

  invariant(userName, "Expected route to have a dynamic route $user");

  const user = await getUserOfUserName<Pick<DbUser, "user_id">>(userName);

  if (user === null) {
    return json<LoaderData>({ type: "error", error: "Tweets not found" });
  }

  const { user_id } = user;

  type SelectReturns = {
    tweets: {
      tweet_id: string; // UUID
      message: string;
      replied_to: string | null; // UUID
      users: {
        user_name: string;
      };
      replies: string[]; // UUID[]
    };
  };

  const allLikedTweets = await getTweetsUserHasLiked<SelectReturns>({
    userId: user_id,
    selectQuery: `tweets!fk_tweet_id (
        tweet_id,
        message,
        replied_to,
        users!fk_user_id (
            user_name
        ),
        replies
    )`,
  });

  if (allLikedTweets === null) {
    return json<LoaderData>({ type: "error", error: "Tweets not found" });
  }

  const convertToCorrectFormat: LoaderTweets[] = await Promise.all(
    allLikedTweets.map(async ({ tweets }): Promise<LoaderTweets> => {
      const likesCount = await getLikeCount({ tweetId: tweets.tweet_id });
      const likeActive = await hasUserLikedTweet({
        userId: loggedInUserId,
        tweetId: tweets.tweet_id,
      });

      return {
        message: tweets.message,
        tweetId: tweets.tweet_id,
        userName: tweets.users.user_name,
        repliesCount: tweets.replies.length,
        repliedTo:
          tweets.replied_to === null
            ? undefined
            : (await getTweetUserName(tweets.replied_to)) ?? undefined,
        likeActive: likeActive ?? false,
        likesCount: likesCount ?? 0,
      };
    })
  );

  return json<LoaderData>({ type: "success", tweets: convertToCorrectFormat });

  //   const allLikedTweets = await getTweetsUserHasLiked({selectQuery : "", userId })
};

export default function () {
  const loaderData = useLoaderData<LoaderData>();

  if (loaderData.type === "error") return <div>{loaderData.error}</div>;

  return (
    <div>
      <div>
        <ol>
          {loaderData.tweets.map(
            ({
              message,
              repliesCount,
              tweetId,
              userName,
              repliedTo,
              likesCount,
              likeActive,
            }) => {
              return (
                <li key={tweetId} className="border-b border-gray-600">
                  <Tweet
                    likesCount={likesCount}
                    message={message}
                    relpiesCount={repliesCount}
                    userName={userName}
                    tweetId={tweetId}
                    repliedTo={repliedTo}
                    likeActive={likeActive}
                  />
                </li>
              );
            }
          )}
        </ol>
      </div>
    </div>
  );
}
