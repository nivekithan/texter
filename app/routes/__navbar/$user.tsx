import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useLocation } from "@remix-run/react";
import { getUserId } from "~/server/session.server";
import type { DbUser } from "~/server/supabase.server";
import { getUserOfUserName } from "~/server/supabase.server";
import { AppUrl } from "~/utils/url";
import { invariant } from "~/utils/utils";

type LoaderData =
  | {
      type: "success";
      userName: string;
    }
  | { type: "error"; error: "User not found" };

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

  invariant(userName, "Expected the route name to be $user");

  const user = await getUserOfUserName<Pick<DbUser, "user_name" | "user_id">>(
    userName,
    "user_name, user_id"
  );

  if (user === null) {
    return json<LoaderData>({ error: "User not found", type: "error" });
  }

  return json<LoaderData>({
    userName: userName,
    type: "success",
  });
};

export default function UserPage() {
  const loaderData = useLoaderData<LoaderData>();
  const pathNames = useLocation().pathname.split("/");

  if (loaderData.type === "error") {
    return <div>{loaderData.error}</div>;
  }

  const { userName } = loaderData;

  const isTweetActive = pathNames[pathNames.length - 1] === userName;
  const isTweetAndRepliesActive =
    pathNames[pathNames.length - 1] === "with_replies";
  const isLikesActive = pathNames[pathNames.length - 1] === "likes";

  const userTweetsUrl = `${AppUrl.home}${userName}`;
  const userTweetsWithRepliesUrl = `${AppUrl.home}${userName}/with_replies`;
  const userLikesTweetsUrl = `${AppUrl.home}${userName}/likes`;

  return (
    <div className="max-w-[600px] border-r border-gray-600 min-h-screen">
      <div className="sticky top-0 p-4 bg-black font-bold text-xl shadow bg-opacity-80">
        {userName}
      </div>
      <div className="flex flex-col gap-y-8">
        <UserPicture />
        <div className="ml-4">
          <AboutUser userName={userName} />
        </div>
        <ul className="flex items-center border-b border-gray-600 text-texter-gray">
          <li className="flex-1">
            <TweetOptions
              name="Tweets"
              to={userTweetsUrl}
              active={isTweetActive}
            />
          </li>
          <li className="flex-1">
            <TweetOptions
              name="Tweets and replies"
              to={userTweetsWithRepliesUrl}
              active={isTweetAndRepliesActive}
            />
          </li>
          <li className="flex-1">
            <TweetOptions
              name="Likes"
              to={userLikesTweetsUrl}
              active={isLikesActive}
            />
          </li>
        </ul>
        <Outlet />
      </div>
    </div>
  );
}
type AboutUserProps = {
  userName: string;
};

const AboutUser = ({ userName }: AboutUserProps) => {
  return <h1 className="font-bold text-xl">{userName}</h1>;
};

const UserPicture = () => {
  return (
    <div>
      <div className="h-[200px] bg-texter-gray-dark">
        {/* Background picture */}
      </div>
      <div>
        {/* Profile picture */}
        <div className="w-[150px] h-[150px] bg-texter-blue rounded-full -mt-[75px] ml-4"></div>
      </div>
    </div>
  );
};

type TweetOptionsProps = {
  name: string;
  to: string;
  active: boolean;
};

const TweetOptions = ({ name, to, active }: TweetOptionsProps) => {
  return (
    <Link
      to={to}
      className={`w-full grid place-items-center hover:bg-gray-900 py-3 ${
        active ? "text-white" : ""
      }`}
    >
      {name}
    </Link>
  );
};
