import type {
  ActionFunction,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, useActionData, useLocation } from "@remix-run/react";
import { compare, hash } from "bcryptjs";
import React, { useState } from "react";
import {
  getUserId,
  getUserSession,
  sessionStorage,
} from "~/server/session.server";
import type { DbUser } from "~/server/supabase.server";
import { insertUserWithPassword } from "~/server/supabase.server";
import { getUserOfUserName } from "~/server/supabase.server";
import { AppUrl } from "~/utils/url";
import { GrTwitter } from "react-icons/gr";
import { AiOutlineClose } from "react-icons/ai";
import twitterLoginPic from "~/images/twitter-login.png";
import { TexterInput } from "~/components/texterInput";
import { FormButton } from "~/components/formButton";
import { nanoid } from "nanoid";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);
  const url = new URL(request.url);
  const search = url.searchParams;
  const redirectUrl = search.get("redirectTo") ?? AppUrl.home;

  if (userId !== null) {
    return redirect(redirectUrl);
  }

  return null;
};

type ActionData = {
  userNameError: string | null;
  passwordError: string | null;
} | null;

/**
 * Validates the username is not empty and of type string
 *
 * @param userName - username field from the formdata
 * @returns If there is error in username returns the error message, otherwise null
 */
const validateUserName = (userName: FormDataEntryValue | null) => {
  if (userName && typeof userName === "string") {
    return null;
  }

  return "Username is required";
};
/**
 * Validates the password is not empty and of type string
 *
 * @param password - password field from the formdata
 * @returns If there is error in password returns the error message, otherwise null
 */
const validatePassword = (password: FormDataEntryValue | null) => {
  if (password && typeof password === "string") {
    return null;
  }

  return "Password is required";
};

/**
 * Verifies the given information with database and return the userId of verified user

 *
 * @param userName - username field from the formdata
 * @param password  - password field from the formdata
 * @returns if the verification passes it returns `{type : "success", userId : string}` where userId is the 
 * `user_id` of the verified user, otherwise it returns `{type : "error", actionData : ActionData}` where
 * `actionData` is populated with error message
 */
const verifyUserPassword = async (
  userName: string,
  password: string
): Promise<
  | { type: "success"; userId: string }
  | { type: "error"; actionData: ActionData }
> => {
  const user = await getUserOfUserName<DbUser>(
    userName,
    "user_id, user_name, password_hash"
  );

  if (user === null) {
    return {
      type: "error",
      actionData: {
        userNameError: "Username and password does not match",
        passwordError: "Username and password does not match",
      },
    };
  }

  const isCorrectPassword = await compare(password, user.password_hash);

  if (!isCorrectPassword) {
    return {
      type: "error",
      actionData: {
        userNameError: "Username and password does not match",
        passwordError: "Username and password does not match",
      },
    };
  }

  return { type: "success", userId: user.user_id };
};

/**
 * Creates a new user with the given username and password, password is hashed through bcrypt
 *
 *
 * @param userName - username field from the formdata
 * @param password - password field from the formdata
 * @returns if the action is successfull return `{type : "success", userId : <user_id> }` where userId is the
 * `userId` of newly created user, otherwise it returns `{type : "error", actionData : ActionData }` where `actionData` is
 * populated with error message
 */
const createUserWithUserNameAndPassword = async (
  userName: string,
  password: string
): Promise<
  | { type: "success"; userId: string }
  | { type: "error"; actionData: ActionData }
> => {
  const passwordHash = await hash(password, 10);
  const userId = await insertUserWithPassword({ userName, passwordHash });

  if (userId === null) {
    return {
      type: "error",
      actionData: {
        userNameError: "Username is not valid",
        passwordError: null,
      },
    };
  }

  return { type: "success", userId };
};

export const action: ActionFunction = async ({ request }) => {
  const formdata = await request.formData();
  const userSession = await getUserSession(request);

  const actionType = formdata.get("actionType"); // can be "login" | "signUp" | "guest"

  if (typeof actionType !== "string")
    return json<ActionData>({
      userNameError: "Action type is required",
      passwordError: "Action type is required",
    });

  if (actionType === "guest") {
    // Used for accessing the site without username and password

    for (let i = 0; i < 3; i++) {
      const guestUsername = `user${nanoid(6)}`; // guest user will be `user<6 digit random number>`;
      const guestPassword = nanoid(); // randomly generated password so that onces the user logsout, user cannot login to same id

      const actionResult = await createUserWithUserNameAndPassword(
        guestUsername,
        guestPassword
      );

      if (actionResult.type === "error") {
        // We may have generated a duplicate  guestUserName,so we will try again
        continue;
      }

      userSession.set("userId", actionResult.userId);
      break;
    }
  } else {
    const formUserName = formdata.get("username");
    const formPassword = formdata.get("password");
    const userNameError = validateUserName(formUserName);
    const passwordError = validatePassword(formPassword);

    if (typeof userNameError === "string" || typeof passwordError === "string")
      return json<ActionData>({ userNameError, passwordError });

    const userName = formUserName as string;
    const password = formPassword as string;

    const actionResult = await (actionType === "login"
      ? verifyUserPassword(userName, password)
      : createUserWithUserNameAndPassword(userName, password));

    if (actionResult.type === "error") {
      return json<ActionData>(actionResult.actionData);
    }

    userSession.set("userId", actionResult.userId);
  }

  // Get redirectTo query from the url, if not empty redirect to that page
  // or else redirectTo home page
  const requestSearchParams = new URL(request.url).searchParams;
  const redirectTo = requestSearchParams.get("redirectTo") ?? AppUrl.home;

  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(userSession),
    },
  });
};

export const meta: MetaFunction = () => {
  return { title: "Login to texter" };
};

export const links: LinksFunction = () => {
  return [{ href: twitterLoginPic, rel: "reload", as: "image" }];
};

type CurrentPage = "WELCOME" | "LOGIN" | "SIGN UP";

export default function JoinPage() {
  const [currentPage, setCurrentPage] = useState<CurrentPage>("WELCOME");

  return (
    <div className="h-full flex flex-row-reverse flex-wrap">
      <RenderJoinPage
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <div
        className="min-h-screen bg-texter-blue flex-1 grid place-items-center"
        style={{ backgroundImage: `url(${twitterLoginPic})` }}
      >
        <GrTwitter color="white" size="360px" />
      </div>
    </div>
  );
}

type RenderTwitterPageProps = {
  currentPage: CurrentPage;
  setCurrentPage: React.Dispatch<React.SetStateAction<CurrentPage>>;
};

export const RenderJoinPage = ({
  currentPage,
  setCurrentPage,
}: RenderTwitterPageProps) => {
  if (currentPage === "WELCOME")
    return <JoinWelcome setCurrentPage={setCurrentPage} />;

  if (currentPage === "LOGIN")
    return <JoinTexter setCurrentPage={setCurrentPage} actionType="login" />;

  if (currentPage === "SIGN UP")
    return <JoinTexter setCurrentPage={setCurrentPage} actionType="signUp" />;

  return null;
};

type JoinWelcomeProps = {
  setCurrentPage: React.Dispatch<React.SetStateAction<CurrentPage>>;
};

const JoinWelcome = ({ setCurrentPage }: JoinWelcomeProps) => {
  const location = useLocation();

  const onSignIn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCurrentPage("LOGIN");
  };

  const onCreateYourAccount = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCurrentPage("SIGN UP");
  };

  return (
    <div className="min-h-screen flex-1 min-w-[50vw] grid place-items-center md:block">
      <div className="h-full py-[36px] px-[36px]">
        <GrTwitter color="white" size="50px" className="mb-4" />
        <div className="flex flex-col gap-y-10">
          <h1 className="font-bold md:text-7xl text-5xl leading-tight my-10">
            Happening now
          </h1>
          <div className="mb-10">
            <p className="font-bold text-2xl md:text-4xl pb-6">
              Join Texter today
            </p>
            <div className="inline-flex flex-col gap-y-4">
              <button
                type="button"
                className="border-2 border-texter-blue bg-texter-blue rounded-full hover:bg-texter-blue-dark"
                onClick={onCreateYourAccount}
              >
                <div className="md:min-w-[300px] min-h-[40px] inline-grid place-items-center">
                  Create your account
                </div>
              </button>
              <FormButton
                method="post"
                action={`${location.pathname}${location.search}`}
                type="submit"
                name="actionType"
                value="guest"
                className="rounded-full border border-gray-300  text-texter-blue hover:border-texter-blue"
              >
                <span className="min-w-[300px] min-h-[40px] inline-grid place-items-center">
                  Log in with a guest account
                </span>
              </FormButton>
            </div>
          </div>
          <div>
            <p className="text-base font-bold pb-6">Already have an account?</p>
            <button className="rounded-full border border-gray-300  text-texter-blue hover:border-texter-blue">
              <span
                className="min-w-[300px] min-h-[40px] inline-grid place-items-center"
                onClick={onSignIn}
              >
                Log in
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export type JoinTexterProps = {
  setCurrentPage: React.Dispatch<React.SetStateAction<CurrentPage>>;
  actionType: "login" | "signUp";
};

const JoinTexter = ({ setCurrentPage, actionType }: JoinTexterProps) => {
  const location = useLocation();
  const actionData = useActionData<ActionData>();

  const isLogin = actionType === "login";

  const onCloseClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCurrentPage("WELCOME");
  };

  return (
    <div className="min-h-screen flex-1 min-w-[50vw]">
      <div className="h-full p-[36px]">
        <div className="flex items-center mb-16 gap-x-3 ">
          <button
            type="button"
            className="rounded-full hover:bg-gray-900 p-2"
            onClick={onCloseClick}
          >
            <AiOutlineClose size="24px" className="fill-gray-400" />
          </button>
          <span className="font-bold text-2xl">
            {isLogin ? "Login to texter" : "Create your account"}
          </span>
        </div>
        <Form
          className="max-w-[480px]"
          method="post"
          action={`${location.pathname}${location.search}`}
        >
          <div className="mb-6">
            <TexterInput
              name="username"
              type="text"
              label="Username"
              placeholder="Name"
              autoFocus
              error={typeof actionData?.userNameError === "string"}
              errorMessage={actionData?.userNameError ?? undefined}
            />
          </div>
          <div className="mb-8">
            <TexterInput
              name="password"
              type="password"
              label="Password"
              placeholder="password"
              error={typeof actionData?.passwordError === "string"}
              errorMessage={actionData?.passwordError ?? undefined}
            />
          </div>
          <button
            className="rounded-full bg-texter-blue w-full px-4 py-3 hover:bg-texter-blue-dark"
            type="submit"
            name="actionType"
            value={actionType}
          >
            Login
          </button>
        </Form>
      </div>
    </div>
  );
};
