import type { LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getUserId } from "~/server/session.server";
import type { DbTweets, DbUser } from "~/server/supabase.server";
import { hasUserLikedTweet } from "~/server/supabase.server";
import { getLikeCount } from "~/server/supabase.server";
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

  const allTweetsSelectQuery = "tweet_id, message, replied_to, replies";
  const allTweets = await getAllTweetsFromUser<
    Pick<DbTweets, "message" | "replied_to" | "replies" | "tweet_id">
  >({
    userId,
    selectQuery: allTweetsSelectQuery,
    includeReplies: false, // Do not include replies
  });

  if (allTweets === null) {
    return json<LoaderData>({ error: "Tweets not found", type: "error" });
  }

  const tweetsWithRepliesCount = await Promise.all(
    allTweets.map(async (reply) => {
      return {
        userName,
        tweetId: reply.tweet_id,
        message: reply.message,
        repliesCount: reply.replies.length,
        replied_to: undefined,
        likesCount: (await getLikeCount({ tweetId: reply.tweet_id })) ?? 0,
        likeActive:
          (await hasUserLikedTweet({
            userId: loggedInUserId,
            tweetId: reply.tweet_id,
          })) ?? false,
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
  );
}
