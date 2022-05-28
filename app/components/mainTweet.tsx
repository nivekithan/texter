import { Form, Link, useTransition } from "@remix-run/react";
import { blob } from "node:stream/consumers";
import React, { useRef } from "react";
import { useEffect } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BsBookmarkPlus } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { AppUrl } from "~/utils/url";
import { FormButton } from "./formButton";
import { TexterTextArea } from "./texterTextArea";

export type MainTweetProps = {
  userName: string;
  message: string;
  replied_to: string | null;
  repliesCount: number;
  likesCount: number;
  errorMessage?: string;
  likeActive: boolean;
  tweetId: string;
  bookmarkCount: number;
  bookmarkActive: boolean;
};

export const MainTweet = ({
  message,
  replied_to,
  repliesCount,
  userName,
  likesCount,
  errorMessage,
  likeActive,
  tweetId,
  bookmarkActive,
  bookmarkCount,
}: MainTweetProps) => {
  const transition = useTransition();

  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const isSubmitting = transition.state === "submitting";

  const userUrl = `${AppUrl.home}${userName}`;
  const tweetUrl = `${AppUrl.home}${userName}/tweets/${tweetId}`;

  const onReplyClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (textAreaRef.current) {
      textAreaRef.current.scrollIntoView({ behavior: "smooth" });
      textAreaRef.current.focus();
    }
  };

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current?.reset();
    }
  }, [isSubmitting]);

  return (
    <div>
      <div className="p-4">
        <div className="border-b border-gray-600 pb-8 flex flex-col gap-y-4">
          <div className="flex gap-x-2 items-center">
            <Link to={userUrl}>
              <div className="w-[50px] h-[50px] rounded-full bg-texter-blue">
                {/* Profile Picture */}
              </div>
            </Link>
            <div className="flex flex-col gap-y-1">
              <Link to={userUrl} className="text hover:underline">
                {userName}
              </Link>
              {replied_to ? (
                <MainTweetReplyingTo repliedTo={replied_to} />
              ) : null}
            </div>
          </div>
          <p className="whitespace-pre-line text-xl">{message}</p>
        </div>
        <div className="flex gap-x-4 p-4 border-gray-600 border-b ">
          <MainTweetInfo value={repliesCount} name="Replies" />
          <MainTweetInfo value={likesCount} name="Likes" />
          <MainTweetInfo value={bookmarkCount} name="Bookmark" />
        </div>
        <div className="border-b border-gray-600 py-2">
          <MainTweetOptions
            onReplyClick={onReplyClick}
            likeActive={likeActive}
            tweetUrl={tweetUrl}
            bookmarkActive={bookmarkActive}
          />
        </div>
      </div>
      <Form method="post" className="border-b border-gray-600" ref={formRef}>
        <TweetYourReply
          ref={textAreaRef}
          errorMessage={errorMessage}
          userUrl={userUrl}
        />
      </Form>
    </div>
  );
};

type MainTweetReplyingToProps = {
  repliedTo: string;
};

const MainTweetReplyingTo = ({ repliedTo }: MainTweetReplyingToProps) => {
  const repliedToUserUrl = `${AppUrl.home}${repliedTo}`;

  return (
    <span className="text-sm text-texter-gray">
      Replying to{" "}
      <Link
        to={repliedToUserUrl}
        className="text-texter-blue hover:underline"
      >{`@${repliedTo}`}</Link>
    </span>
  );
};

type MainTweetInfoProps = {
  name: string;
  value: number;
};

const MainTweetInfo = ({ name, value }: MainTweetInfoProps) => {
  return (
    <span className="hover:underline">
      <span className="font-bold">{value} </span>
      <span className="text-gray-500">{name}</span>
    </span>
  );
};

type MainTweetOptionsProps = {
  onReplyClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  likeActive: boolean;
  tweetUrl: string;
  bookmarkActive: boolean;
};

const MainTweetOptions = ({
  onReplyClick,
  likeActive,
  tweetUrl,
  bookmarkActive,
}: MainTweetOptionsProps) => {
  const likeUrl = `${tweetUrl}/like`;
  const bookmarkUrl = `${tweetUrl}/bookmark`;

  return (
    <ul className="flex justify-around">
      <li>
        <button
          className="group p-3 rounded-full hover:bg-comment-blue hover:bg-opacity-20"
          onClick={onReplyClick}
          type="button"
        >
          <FaRegComment
            size="20px"
            className="fill-gray-500 group-hover:fill-comment-blue"
          />
        </button>
      </li>
      <li>
        <FormButton
          action={likeUrl}
          method="post"
          navigate={false}
          name="actionType"
          value={likeActive ? "unlike" : "like"}
          className="group p-3 rounded-full hover:bg-like-red hover:bg-opacity-20"
        >
          <AiOutlineHeart
            size="20px"
            className={`group-hover:fill-like-red ${
              likeActive ? "fill-like-red" : "fill-gray-500"
            }`}
          />
        </FormButton>
      </li>
      <li>
        <FormButton
          action={bookmarkUrl}
          method="post"
          navigate={false}
          name="actionType"
          value={bookmarkActive ? "removeBookmark" : "bookmark"}
          className="group p-3 rounded-full hover:bg-like-red hover:bg-opacity-20"
        >
          <BsBookmarkPlus
            size="20px"
            className={`group-hover:fill-like-red ${
              bookmarkActive ? "fill-like-red" : "fill-gray-500"
            }`}
          />
        </FormButton>
      </li>
    </ul>
  );
};

type TweetYourReplyProps = {
  errorMessage?: string;
  userUrl: string;
};

const TweetYourReply = React.forwardRef<
  HTMLTextAreaElement,
  TweetYourReplyProps
>(({ errorMessage, userUrl }, ref) => {
  return (
    <div className="flex flex-col gap-y-2">
      <TexterTextArea
        name="reply"
        placeholder="Tweet your reply"
        ref={ref}
        errorMessage={errorMessage}
        label="Your Reply"
        userUrl={userUrl}
      />
      <div className="flex justify-end p-4">
        <button
          type="submit"
          className="bg-texter-blue px-4 py-2 rounded-full"
          name="actionType"
          value="tweetReply"
        >
          Tweet
        </button>
      </div>
    </div>
  );
});

TweetYourReply.displayName = "TweetYourReply";
