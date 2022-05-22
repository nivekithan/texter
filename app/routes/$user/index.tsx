import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getUserId } from "~/server/session.server";
import type { DbTweets, DbUser } from "~/server/supabase.server";
import { getAllTweetsFromUser } from "~/server/supabase.server";
import { getUserOfUserName } from "~/server/supabase.server";
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

  invariant(userName, "Expected the route name to be $user");

  const user = await getUserOfUserName<Pick<DbUser, "user_name" | "user_id">>(
    userName,
    "user_name, user_id"
  );

  if (user === null) {
    return json<LoaderData>({ error: "User not found", type: "error" });
  }

  const { user_id: userId } = user;

  const tweets = await getAllTweetsFromUser<
    Pick<DbTweets, "message" | "tweet_id">
  >({
    userId: userId,
    selectQuery: "message, tweet_id",
  });

  if (tweets === null) {
    return json<LoaderData>({
      error: "Error in loading tweets",
      type: "error",
    });
  }

  return json<LoaderData>({
    userName: userName,
    tweets: tweets,
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
        return (
          <li key={tweet_id}>
            <Link to={`./tweets/${tweet_id}`}>{message}</Link>
          </li>
        );
      })}
    </ol>
  );
}
