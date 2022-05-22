import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getUserId } from "~/server/session.server";
import type { DbTweets, DbUser } from "~/server/supabase.server";
import { supabase } from "~/server/supabase.server";
import { AppUrl } from "~/utils/url";
import { invariant } from "~/utils/utils";

type LoaderData =
  | {
      type: "success";
      tweet: Pick<DbTweets, "message" | "tweet_id">;
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

  const userResult = await supabase
    .from<DbUser>("users")
    .select("user_name, user_id")
    .eq("user_name", userName);

  if (userResult.error || userResult.data.length === 0) {
    // There is no user with that username

    return json<LoaderData>({ error: "User not found", type: "error" });
  }

  const user = userResult.data[0]; // There should only be one user with the given username
  const { user_id: userId } = user;

  const tweetResult = await supabase
    .from<DbTweets>("tweets")
    .select("message, tweet_id")
    .eq("user_id", userId)
    .eq("tweet_id", tweetId);

  if (tweetResult.error || tweetResult.data.length === 0) {
    // There is no tweet with that tweetId

    return json<LoaderData>({ error: "Tweet not found", type: "error" });
  }

  const tweet = tweetResult.data[0]; // There should only be one tweet with that given id

  return json<LoaderData>({ type: "success", tweet: tweet });
};

export default function TweetPage() {
  const loaderData = useLoaderData<LoaderData>();

  if (loaderData.type === "error") return <p>{loaderData.error}</p>;

  return <p>{loaderData.tweet.message}</p>;
}
