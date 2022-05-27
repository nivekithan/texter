import type { ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { getUserId } from "~/server/session.server";
import { userLikedTweet, userUnLikedTweet } from "~/server/supabase.server";
import { AppUrl } from "~/utils/url";
import { invariant } from "~/utils/utils";

export const action: ActionFunction = async ({ request, params }) => {
  const loggedInUserId = await getUserId(request);

  if (loggedInUserId === null) {
    if (loggedInUserId === null) {
      const requestUrl = new URL(request.url);

      const searchParams = new URLSearchParams();

      // Set redirectTo param so that once the user logged in we can
      // redirect to the page they were on
      searchParams.set("redirectTo", requestUrl.pathname);

      const finalUrl = `${AppUrl.join}?${searchParams}`;
      return redirect(finalUrl);
    }
  }

  const tweetId = await params.tweetId;

  invariant(tweetId, "Expected the dynamic route to be $tweetId");

  const formData = await request.formData();
  const actionType = formData.get("actionType");

  if (actionType === "like") {
    const result = await userLikedTweet({ userId: loggedInUserId, tweetId });

    if (result === null) {
      return json({ error: "Error adding like" });
    }

    return null;
  } else if (actionType === "unlike") {
    const result = await userUnLikedTweet({ tweetId, userId: loggedInUserId });

    if (result === null) {
      return json({ error: "Error in removing the like" });
    }
    return null;
  } else {
    return json({ error: "Unknown action type" });
  }
};
