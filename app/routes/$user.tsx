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
      userName: string;
      tweets: Pick<DbTweets, "message" | "tweet_id">[];
    }
  | { type: "error"; error: "User not found" | "Error in loading tweets" };

export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await getUserId(request);

  if (userId === null) {
    const requestUrl = new URL(request.url);

    const searchParams = new URLSearchParams();

    // Set redirectTo param so that once the user logged in we can
    // redirect to the page they were on
    searchParams.set("redirectTo", requestUrl.pathname);

    const finalUrl = `${AppUrl.login}?${searchParams}`;
    return redirect(finalUrl);
  }

  const userName = params.user;

  invariant(userName, "Expected the route name to be $user");

  // Get the user with the username
  const userResult = await supabase
    .from<DbUser>("users")
    .select("user_name, user_id")
    .eq("user_name", userName);

  if (userResult.error || userResult.data.length === 0) {
    // There is no user with the given username

    return json<LoaderData>({ error: "User not found", type: "error" });
  }

  const user = userResult.data[0]; // There should only be one user with the given username
  const { user_id } = user;

  // Get the tweets associated with the user
  const tweetResult = await supabase
    .from<DbTweets>("tweets")
    .select("message, tweet_id")
    .eq("user_id", user_id)
    .order("created_at", { ascending: false })
    .limit(10);

  if (tweetResult.error) {
    // There was an error in loading the tweets
    return json<LoaderData>({
      error: "Error in loading tweets",
      type: "error",
    });
  }

  const { data } = tweetResult;

  return json<LoaderData>({
    userName: userName,
    tweets: data,
    type: "success",
  });
};

export default function UserPage() {
  const loaderData = useLoaderData<LoaderData>();

  if (loaderData.type === "error") {
    return <div>{loaderData.error}</div>;
  }

  return (
    <ol>
      {loaderData.tweets.map(({ message, tweet_id }) => {
        return <li key={tweet_id}>{message}</li>;
      })}
    </ol>
  );
}
