import { Link } from "@remix-run/react";
import React, { useRef } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { AppUrl } from "~/utils/url";
import { TexterTextArea } from "./texterTextArea";

export type MainTweetProps = {
  userName: string;
  message: string;
  replied_to: string | null;
  repliesCount: number;
  likesCount: number;
  errorMessage?: string;
};

export const MainTweet = ({
  message,
  replied_to,
  repliesCount,
  userName,
  likesCount,
  errorMessage,
}: MainTweetProps) => {
  const userUrl = `${AppUrl.home}${userName}`;
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const onReplyClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (textAreaRef.current) {
      textAreaRef.current.scrollIntoView({ behavior: "smooth" });
      textAreaRef.current.focus();
    }
  };

  return (
    <div>
      <div className="p-4">
        <div className="border-b border-gray-600 pb-8 flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-1">
            <Link to={userUrl} className="text hover:underline">
              {userName}
            </Link>
            {replied_to ? <MainTweetReplyingTo repliedTo={replied_to} /> : null}
          </div>
          <p className="whitespace-pre-line text-xl">{message}</p>
        </div>
        <div className="flex gap-x-4 p-4 border-gray-600 border-b ">
          <MainTweetInfo value={repliesCount} name="Replies" />
          <MainTweetInfo value={likesCount} name="Likes" />
        </div>
        <div className="border-b border-gray-600 py-2">
          <MainTweetOptions onReplyClick={onReplyClick} />
        </div>
      </div>
      <div className="border-b border-gray-600 ">
        <TweetYourReply ref={textAreaRef} errorMessage={errorMessage} />
      </div>
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
};

const MainTweetOptions = ({ onReplyClick }: MainTweetOptionsProps) => {
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
        <button className="group p-3 rounded-full hover:bg-like-red hover:bg-opacity-20">
          <AiOutlineHeart
            size="20px"
            className="fill-gray-500 group-hover:fill-like-red"
          />
        </button>
      </li>
      <li>
        <button className="group p-3 rounded-full hover:bg-like-red hover:bg-opacity-20">
          <AiOutlineHeart
            size="20px"
            className="fill-gray-500 group-hover:fill-like-red"
          />
        </button>
      </li>
    </ul>
  );
};

type TweetYourReplyProps = {
  errorMessage?: string;
};

const TweetYourReply = React.forwardRef<
  HTMLTextAreaElement,
  TweetYourReplyProps
>(({ errorMessage }, ref) => {
  return (
    <div className="flex flex-col gap-y-2">
      <TexterTextArea
        name="reply"
        placeholder="Tweet your reply"
        ref={ref}
        errorMessage={errorMessage}
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