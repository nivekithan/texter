import type { LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { NavBar } from "~/components/navBar";
import { getUserId, getUserSession } from "~/server/session.server";
import type { DbUser } from "~/server/supabase.server";
import { getUserOfUserId } from "~/server/supabase.server";
import { AppUrl } from "~/utils/url";

type LoaderData = {
  userName: string;
};

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);

  if (userId === null) {
    return redirect(AppUrl.join);
  }

  const user = await getUserOfUserId<Pick<DbUser, "user_name">>(
    userId,
    "user_name"
  );

  if (user === null) {
    // There is no user with given userId, therefore logout out the user

    const userSession = await getUserSession(request);

    return redirect(AppUrl.join, {
      headers: {
        "Set-Cookie": await sessionStorage.destroySession(userSession),
      },
    });
  }

  return json<LoaderData>({ userName: user.user_name });
};

export default function Index() {
  const { userName } = useLoaderData<LoaderData>();

  return (
    <div className="min-h-screen flex">
      <div className="min-h-screen ml-auto mt-3 w-[280px] pr-6 border-r border-gray-600">
        <div className="sticky top-4">
          <NavBar userName={userName} />
        </div>
      </div>
      <div className="mr-auto w-[800px]">
        <Outlet />
      </div>
    </div>
  );
}
