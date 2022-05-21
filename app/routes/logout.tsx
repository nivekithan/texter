import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { getUserSession, sessionStorage } from "~/server/session.server";
import { AppUrl } from "~/utils/url";

export const action: ActionFunction = async ({ request }) => {
  const userSession = await getUserSession(request);

  return redirect(AppUrl.home, {
    headers: { "Set-Cookie": await sessionStorage.destroySession(userSession) },
  });
};
