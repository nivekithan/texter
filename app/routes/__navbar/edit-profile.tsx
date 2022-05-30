import type {
  ActionFunction,
  LoaderFunction,
  UploadHandler,
} from "@remix-run/node";
import { redirect, unstable_parseMultipartFormData } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { TexterInput } from "~/components/texterInput";
import {
  getUserId,
  getUserSession,
  sessionStorage,
} from "~/server/session.server";
import { BsCamera } from "react-icons/bs";
import React, { useRef } from "react";
import type { DbUser } from "~/server/supabase.server";
import {
  supabase,
  uploadBackgroundPicture,
  uploadProfilePicture,
} from "~/server/supabase.server";
import { getUserOfUserId } from "~/server/supabase.server";
import { AppUrl } from "~/utils/url";
import path from "path";

type LoaderData =
  | {
      type: "error";
      error: "User not found";
    }
  | {
      type: "success";
      profilePictureUrl: string;
      backgroundPictureUrl: string;
      bio: string;
      userName: string;
    };

export const loader: LoaderFunction = async ({ request }) => {
  const loggedInUserId = (await getUserId(request))!;

  const loggedInUser = await getUserOfUserId<
    Pick<
      DbUser,
      "background_picture_url" | "bio" | "profile_picture_url" | "user_name"
    >
  >(
    loggedInUserId,
    "bio, background_picture_url, profile_picture_url, user_name"
  );

  if (loggedInUser === null) {
    return json<LoaderData>({ error: "User not found", type: "error" });
  }

  return json<LoaderData>({
    type: "success",
    backgroundPictureUrl: loggedInUser.background_picture_url ?? "",
    profilePictureUrl: loggedInUser.profile_picture_url ?? "",
    bio: loggedInUser.bio ?? "",
    userName: loggedInUser.user_name,
  });
};

type ActionData = {
  backgroundPictureError?: string;
  profilePictureError?: string;
  bioError?: string;
  nameError?: string;
};

export const action: ActionFunction = async ({ request }) => {
  const userId = (await getUserId(request))!;

  const user = await getUserOfUserId<Pick<DbUser, "user_name">>(
    userId,
    "user_name"
  );

  if (user === null) {
    const userSession = await getUserSession(request);

    return redirect(`${AppUrl.home}${AppUrl.join}`, {
      headers: {
        "Set-Cookie": await sessionStorage.destroySession(userSession),
      },
    });
  }

  const customUploadHandler: UploadHandler = async ({
    encoding,
    filename,
    mimetype,
    name,
    stream,
  }) => {
    const isUploadingProfilePicture = name === "profilePicture";
    const isUploadingBackgroundPicture = name == "backgroundPicture";

    if (!isUploadingBackgroundPicture && !isUploadingProfilePicture) {
      return undefined;
    }

    if (filename === "") {
      return undefined;
    }
    const extName = path.parse(filename).ext;

    const publicUrl = isUploadingProfilePicture
      ? await uploadProfilePicture({
          userId,
          extension: extName,
          file: stream,
          contentType: mimetype,
        })
      : await uploadBackgroundPicture({
          extension: extName,
          file: stream,
          userId,
          contentType: mimetype,
        });

    if (publicUrl === null) {
      throw json<ActionData>({
        [isUploadingBackgroundPicture
          ? "backgroundPictureError"
          : "profilePictureError"]: "Error uploading file",
      });
    }
  };

  const formData = await unstable_parseMultipartFormData(
    request,
    customUploadHandler
  );

  const updatedUserName = formData.get("username");
  const updatedBio = formData.get("bio");

  if (typeof updatedUserName !== "string" || !updatedUserName) {
    return json<ActionData>({ nameError: "Enter valid username" });
  }

  if (typeof updatedBio !== "string") {
    return json<ActionData>({ nameError: "Enter valid bio" });
  }

  const updateRes = await supabase
    .from<DbUser>("users")
    .update({ user_name: updatedUserName, bio: updatedBio })
    .eq("user_id", userId);

  if (updateRes.error) {
    return json<ActionData>({
      nameError: "Enter another username, this one is already taken",
    });
  }

  return redirect(AppUrl.home);
};

const createdUrls: {
  profilePicture: string | null;
  backgroundPicture: string | null;
} = {
  profilePicture: null,
  backgroundPicture: null,
};

export default function () {
  const loaderData = useLoaderData<LoaderData>();

  const backgroundPictureInputRef = useRef<HTMLInputElement | null>(null);
  const profilePictureInputRef = useRef<HTMLInputElement | null>(null);

  const profilePictureRenderRef = useRef<HTMLDivElement | null>(null);
  const backgroundPictureRenderRef = useRef<HTMLDivElement | null>(null);

  if (loaderData.type === "error") return <div>{loaderData.error}</div>;

  const onChangeBackgroundPicture = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    backgroundPictureInputRef.current?.click();
  };

  const onChangeProfilePicture = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    profilePictureInputRef.current?.click();
  };

  const onBackgroundPictureInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (file === undefined || !backgroundPictureRenderRef.current) return;

    const newUrl = URL.createObjectURL(file);

    backgroundPictureRenderRef.current.style.backgroundImage = `url(${newUrl})`;

    if (createdUrls.backgroundPicture !== null) {
      URL.revokeObjectURL(createdUrls.backgroundPicture);
    }

    createdUrls.backgroundPicture = newUrl;
  };

  const onProfilePictureInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (file === undefined || !profilePictureRenderRef.current) return;

    const newUrl = URL.createObjectURL(file);

    profilePictureRenderRef.current.style.backgroundImage = `url(${newUrl})`;

    if (createdUrls.profilePicture !== null) {
      URL.revokeObjectURL(createdUrls.profilePicture);
    }

    createdUrls.profilePicture = newUrl;
  };

  return (
    <Form
      method="post"
      className="max-w-[600px] border-r border-gray-600 min-h-screen"
      encType="multipart/form-data"
    >
      <div className="sticky top-0 p-4 bg-black font-bold text-xl shadow bg-opacity-80">
        Edit Profile
      </div>
      <input
        type="file"
        name="backgroundPicture"
        hidden
        ref={backgroundPictureInputRef}
        accept="image/*"
        onChange={onBackgroundPictureInputChange}
      />
      <input
        type="file"
        name="profilePicture"
        hidden
        ref={profilePictureInputRef}
        accept="image/*"
        onChange={onProfilePictureInputChange}
      />
      <div
        className="h-[200px] bg-texter-gray-dark bg-no-repeat bg-cover"
        ref={backgroundPictureRenderRef}
        style={{ backgroundImage: `url(${loaderData.backgroundPictureUrl})` }}
      >
        <div className="h-full bg-black bg-opacity-40 w-full grid place-items-center">
          <button
            className="p-2 rounded-full hover:bg-white hover:bg-opacity-10"
            type="button"
            onClick={onChangeBackgroundPicture}
          >
            <BsCamera size="30px" />
          </button>
        </div>
      </div>
      <div>
        {/* Profile picture */}
        <div
          className="w-[150px] h-[150px] bg-texter-blue rounded-full -mt-[75px] ml-4 border-4 border-black bg-no-repeat bg-cover"
          ref={profilePictureRenderRef}
          style={{ backgroundImage: `url(${loaderData.profilePictureUrl})` }}
        >
          <div className="bg-black bg-opacity-40 grid place-items-center h-full rounded-full">
            <button
              className="p-2 rounded-full hover:bg-white hover:bg-opacity-10"
              type="button"
              onClick={onChangeProfilePicture}
            >
              <BsCamera size="30px" />
            </button>
          </div>
        </div>
      </div>
      <div className="mx-3 my-8">
        <div className="max-w-[350px] flex flex-col gap-y-3">
          <TexterInput
            label="Username"
            name="username"
            placeholder="username"
            type="text"
            autoFocus
            defaultValue={loaderData.userName}
          />
          <label className="flex flex-col gap-y-6">
            <span className="text-xl font-bold">Bio</span>
            <textarea
              className="bg-inherit w-full py-4 focus:outline-none mb-2 border border-gray-700 focus:border-texter-blue px-2 rounded"
              placeholder="About yourselves"
              defaultValue={loaderData.bio}
              name="bio"
            />
          </label>
          <button
            type="submit"
            className="bg-texter-blue px-4 py-3 rounded-full max-w-[100px] hover:bg-texter-blue-dark"
          >
            Save
          </button>
        </div>
      </div>
    </Form>
  );
}
