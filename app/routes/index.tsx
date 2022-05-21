import { redirect } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { getUserId } from "~/server/session.server";
import { AppUrl } from "~/utils/url";
import { FormButton } from "~/components/formButton";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);

  if (userId === null) {
    return redirect(AppUrl.login);
  }

  return null;
};

export default function Index() {
  return (
    <div className="inline-flex flex-col gap-y-10">
      Hello there
      <FormButton
        action={AppUrl.logout}
        method="post"
        className="bg-blue-500 px-4 py-2 text-white rounded flex-none"
        type="submit"
      >
        Logout
      </FormButton>
    </div>
  );
}
