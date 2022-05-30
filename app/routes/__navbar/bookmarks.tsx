import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Tweet } from "~/components/tweet";
import { getUserId } from "~/server/session.server";
import type { DbUser } from "~/server/supabase.server";
import { getUserOfUserId } from "~/server/supabase.server";
import {
  getBookmarkCount,
  getLikeCount,
  getTweetsUserHasBookmarked,
  getTweetUserName,
  hasUserBookmarkedTweet,
  hasUserLikedTweet,
} from "~/server/supabase.server";

type LoaderTweets = {
  message: string;
  repliesCount: number;
  tweetId: string;
  userName: string;
  repliedTo?: string;
  likesCount: number;
  likeActive: boolean;
  bookmarkActive: boolean;
  bookmarkCount: number;
  profilePictureUrl: string;
};

type LoaderData =
  | {
      type: "error";
      error: "Tweets not found";
    }
  | {
      type: "success";
      tweets: LoaderTweets[];
    };

export const loader: LoaderFunction = async ({ request, params }) => {
  const loggedInUserId = (await getUserId(request))!;

  const user = await getUserOfUserId<Pick<DbUser, "user_id">>(
    loggedInUserId,
    "user_id"
  );

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
        profile_picture_url: string | null;
      };
      replies: string[]; // UUID[]
    };
  };

  const allLikedTweets = await getTweetsUserHasBookmarked<SelectReturns>({
    userId: user_id,
    selectQuery: `tweets!fk_tweet_id (
              tweet_id,
              message,
              replied_to,
              users!fk_user_id (
                  user_name,
                  profile_picture_url
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
      const bookmarkCount = await getBookmarkCount({
        tweetId: tweets.tweet_id,
      });
      const bookmarkActive = await hasUserBookmarkedTweet({
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
        bookmarkActive: bookmarkActive ?? false,
        bookmarkCount: bookmarkCount ?? 0,
        profilePictureUrl: tweets.users.profile_picture_url ?? "",
      };
    })
  );

  return json<LoaderData>({ type: "success", tweets: convertToCorrectFormat });
};

export default function () {
  const loaderData = useLoaderData<LoaderData>();

  if (loaderData.type === "error") return <div>{loaderData.error}</div>;

  return (
    <div className="max-w-[600px] border-r border-gray-600 min-h-screen">
      <div className="sticky top-0 p-4 bg-black font-bold text-xl shadow bg-opacity-80">
        Bookmarks
      </div>
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
            bookmarkActive,
            bookmarkCount,
            profilePictureUrl,
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
  );
}
