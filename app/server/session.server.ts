import { createCookieSessionStorage } from "@remix-run/node";
import { getEnvVar } from "~/utils/utils";

/**
 * Creates a session storage which can be used to store data in
 * the session including userId
 *
 * @see {@link https://remix.run/docs/en/v1/api/remix#createsessionstorage  Session Storage docs}
 */

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "texter_session",
    secure: process.env.NODE_ENV === "production",
    secrets: [getEnvVar("SESSION_SECRET")],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});

/**
 * Gets the session object from the request
 *
 *
 * @param request - The request object
 * @returns the session object associated with the request
 */
export const getUserSession = async (request: Request) => {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );

  return session;
};

/**
 * Gets the userId from the user session if available
 *
 *
 * @param request - The request object
 * @returns If there is userId in the session, return the userId, otherwise return null
 */
export const getUserId = async (request: Request) => {
  const session = await getUserSession(request);

  const userId = session.get("userId");

  if (!userId || typeof userId !== "string") {
    return null;
  }

  return userId;
};
