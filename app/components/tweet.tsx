import { Link } from "@remix-run/react";
import { AppUrl } from "~/utils/url";
import { FaRegComment } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { FormButton } from "./formButton";

export type TweetProps = {
  userName: string;
  message: string;
  tweetId: string;
  repliedTo?: string;
  relpiesCount: number;
  likesCount: number;
  likeActive: boolean;
};

export const Tweet = ({
  userName,
  message,
  tweetId,
  repliedTo,
  likesCount,
  relpiesCount,
  likeActive,
}: TweetProps) => {
  const userUrl = `${AppUrl.home}${userName}`;
  const tweetUrl = `${AppUrl.home}${userName}/tweets/${tweetId}`;

  return (
    <div className="flex p-3 gap-x-2">
      <Link to={userUrl}>
        <div className="w-[50px] h-[50px] rounded-full bg-texter-blue">
          {/* Profile Picture */}
        </div>
      </Link>

      <div className="flex flex-col gap-y-3">
        <div className="flex gap-x-4">
          <div className="flex flex-col">
            <Link to={userUrl} className="font-bold hover:underline">
              {userName}
            </Link>
            {repliedTo ? <TweetReplyingTo repliedTo={repliedTo} /> : null}
          </div>
        </div>
        <Link to={tweetUrl}>
          <p className="whitespace-pre-line text-sm">{message}</p>
        </Link>
        <TweetOptions
          likesCount={likesCount}
          repliesCount={relpiesCount}
          likeActive={likeActive}
          tweetUrl={tweetUrl}
        />
      </div>
    </div>
  );
};

const TweetReplyingTo = ({ repliedTo }: { repliedTo: string }) => {
  const repliedToUserUrl = `${AppUrl.home}${repliedTo}`;

  return (
    <span className="text-xs text-texter-gray">
      Replying to{" "}
      <Link
        to={repliedToUserUrl}
        className="text-texter-blue hover:underline"
      >{`@${repliedTo}`}</Link>
    </span>
  );
};

type TweetOptionsProps = {
  repliesCount: number;
  likesCount: number;
  tweetUrl: string;
  likeActive: boolean;
};

const TweetOptions = ({
  repliesCount,
  likesCount,
  tweetUrl,
  likeActive,
}: TweetOptionsProps) => {
  const likeUrl = `${tweetUrl}/like`;

  return (
    <ol className="flex gap-x-8 -ml-2">
      <li className=" flex items-center gap-x-4 group">
        {/* Reply */}
        <Link to={tweetUrl}>
          <div className="group-hover:bg-comment-blue group-hover:bg-opacity-20 p-2 rounded-full">
            <FaRegComment
              size="15px"
              className="group-hover:fill-comment-blue fill-gray-400"
            />
          </div>
        </Link>
        <span className="text-xs group-hover:text-comment-blue text-gray-400 min-w-[4px]">
          {repliesCount || null}
        </span>
      </li>
      <li className=" flex items-center gap-x-4 group">
        {/* Like */}
        <FormButton
          action={likeUrl}
          navigate={false}
          method="post"
          name="actionType"
          value={likeActive ? "unlike" : "like"}
          className="group-hover:bg-like-red group-hover:bg-opacity-20 p-2 rounded-full"
        >
          <AiOutlineHeart
            size="15px"
            className={`group-hover:fill-like-red ${
              likeActive ? "fill-like-red" : "fill-gray-400"
            }`}
          />
        </FormButton>
        <span
          className={`text-xs group-hover:text-like-red ${
            likeActive ? "text-like-red" : "text-gray-400"
          }`}
        >
          {likesCount || null}
        </span>
      </li>
    </ol>
  );
};
