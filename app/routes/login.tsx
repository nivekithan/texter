import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import {
  Form,
  useActionData,
  useLocation,
  useTransition,
} from "@remix-run/react";
import { compare } from "bcryptjs";
import { useEffect, useRef } from "react";
import {
  getUserId,
  getUserSession,
  sessionStorage,
} from "~/server/session.server";
import type { DbUser} from "~/server/supabase.server";
import { getUserOfUserName } from "~/server/supabase.server";
import { AppUrl } from "~/utils/url";

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
  formError: string | null;
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

export const action: ActionFunction = async ({ request }) => {
  const formdata = await request.formData();
  const formUserName = formdata.get("username");
  const formPassword = formdata.get("password");

  const userNameError = validateUserName(formUserName);
  const passwordError = validatePassword(formPassword);

  if (typeof userNameError === "string" || typeof passwordError === "string")
    return json<ActionData>({ userNameError, passwordError, formError: null });

  const userName = formUserName as string;
  const password = formPassword as string;

  const user = await getUserOfUserName<DbUser>(
    userName,
    "user_id, user_name, password_hash"
  );

  if (user === null) {
    return json<ActionData>({
      userNameError: "Username and password does not match",
      passwordError: null,
      formError: null,
    });
  }

  const isCorrectPassword = await compare(password, user.password_hash);

  if (!isCorrectPassword) {
    return json<ActionData>({
      formError: "Given username and password does not match",
      passwordError: null,
      userNameError: null,
    });
  }

  const userSession = await getUserSession(request);

  userSession.set("userId", user.user_id);

  // Get redirectTo query from the url, if not empty redirect to that page
  // or else redirectTo home page
  const requestSearchParams = new URL(request.url).searchParams;
  const redirectTo = requestSearchParams.get("redirectTo") ?? AppUrl.home;

  return redirect(redirectTo, {
    headers: { "Set-Cookie": await sessionStorage.commitSession(userSession) },
  });
};

export const meta: MetaFunction = () => {
  return { title: "Login to texter" };
};

export default function LoginPage() {
  const location = useLocation();
  const actionData = useActionData<ActionData>();
  const transition = useTransition();

  const formref = useRef<HTMLFormElement | null>(null);
  const userNameRef = useRef<HTMLInputElement | null>(null);

  const isChecking = transition.state === "submitting";

  useEffect(() => {
    if (!isChecking) {
      formref.current?.reset();
      userNameRef?.current?.focus();
    }
  }, [isChecking]);

  return (
    <Form
      method="post"
      className="flex flex-col gap-y-5 my-6 mx-[10%]"
      action={`${location.pathname}${location.search}`}
      ref={formref}
    >
      <div className="flex flex-col gap-y-2">
        <div className="flex gap-x-2">
          <label htmlFor="username">Username :</label>
          <input
            type="text"
            name="username"
            className="border-2 border-gray-700 rounded-md "
            ref={userNameRef}
          />
        </div>
        {actionData?.userNameError ? <p>{actionData.userNameError}</p> : null}
      </div>
      <div>
        <div className="flex gap-x-2">
          <label htmlFor="password">Password :</label>
          <input
            type="password"
            name="password"
            className="border-2 border-gray-700 rounded-md"
          />
        </div>
        {actionData?.passwordError ? <p>{actionData.passwordError}</p> : null}
      </div>
      <div>
        {actionData?.formError ? <p>{actionData.formError}</p> : null}
        <button
          type="submit"
          className="bg-blue-500 px-4 py-2 text-white rounded"
        >
          Login
        </button>
      </div>
    </Form>
  );
}
