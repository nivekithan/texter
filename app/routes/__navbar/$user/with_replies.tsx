import type { LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getUserId } from "~/server/session.server";
import type { DbTweets, DbUser } from "~/server/supabase.server";
import {
  getBookmarkCount,
  getLikeCount,
  hasUserBookmarkedTweet,
  hasUserLikedTweet,
} from "~/server/supabase.server";
import { getTweetUserName } from "~/server/supabase.server";
import { getAllTweetsFromUser } from "~/server/supabase.server";
import { getUserOfUserName } from "~/server/supabase.server";
import { AppUrl } from "~/utils/url";
import { Tweet } from "~/components/tweet";
import { invariant } from "~/utils/utils";

type LoaderData =
  | {
      type: "success";
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
    }
  | { type: "error"; error: "User not found" | "Tweets not found" };

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

  invariant(userName, "Expected the dynamic route $user");

  const user = await getUserOfUserName<DbUser>(userName, "*");

  if (user === null) {
    return json<LoaderData>({ error: "User not found", type: "error" });
  }

  const { user_id: userId } = user;

  const allTweetsSelectQuery =
    "tweet_id, message, replied_to, replies, users!fk_user_id(profile_picture_url)";
  type AllTweetQueryResult = {
    tweet_id: string;
    message: string;
    replied_to: string | null;
    replies: string[];
    users: {
      profile_picture_url: string | null;
    };
  };
  const allTweets = await getAllTweetsFromUser<AllTweetQueryResult>({
    userId,
    selectQuery: allTweetsSelectQuery,
  });
  if (allTweets === null) {
    return json<LoaderData>({ error: "Tweets not found", type: "error" });
  }

  const tweetsWithRepliesCount = await Promise.all(
    allTweets.map(async (reply) => {
      const repliedTo = reply.replied_to
        ? await getTweetUserName(reply.replied_to)
        : null;

      const likesCount = (await getLikeCount({ tweetId: reply.tweet_id })) ?? 0;
      const likeActive =
        (await hasUserLikedTweet({
          userId: loggedInUserId,
          tweetId: reply.tweet_id,
        })) ?? false;

      const bookmarkCount =
        (await getBookmarkCount({ tweetId: reply.tweet_id })) ?? 0;
      const bookmarkActive =
        (await hasUserBookmarkedTweet({
          userId: loggedInUserId,
          tweetId: reply.tweet_id,
        })) ?? false;

      return {
        userName,
        tweetId: reply.tweet_id,
        message: reply.message,
        repliesCount: reply.replies.length,
        repliedTo: repliedTo ?? undefined,
        likesCount: likesCount,
        likeActive: likeActive,
        bookmarkCount,
        bookmarkActive,
        profilePictureUrl: reply.users.profile_picture_url ?? "",
      };
    })
  );

  return json<LoaderData>({ type: "success", tweets: tweetsWithRepliesCount });
};

export default function TweetsFromUser() {
  const loaderData = useLoaderData<LoaderData>();

  if (loaderData.type === "error") return <div>{loaderData.error}</div>;

  return (
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
