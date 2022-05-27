import { hash } from "bcryptjs";
import {
  getLikeCount,
  insertTweetFromUser,
  insertTweetReplyFromUser,
  insertUserWithPassword,
  userLikedTweet,
} from "~/server/supabase.server";

const sleep = async (ms: number) => {
  await new Promise((r) => setTimeout(r, ms));
};

(async () => {
  const demoUserPassword = await hash("demo", 10);
  const userUserPassword = await hash("user", 10);

  const demoUserId = (await insertUserWithPassword({
    userName: "demo",
    passwordHash: demoUserPassword,
  }))!;

  await sleep(100);

  const userUserId = (await insertUserWithPassword({
    userName: "user",
    passwordHash: userUserPassword,
  }))!;

  await sleep(100);

  const firstTweet = (await insertTweetFromUser({
    userId: demoUserId,
    message: "First Tweet 👍👍👍",
  }))!;

  await sleep(100);

  const secondTweet = (await insertTweetFromUser({
    userId: demoUserId,
    message: "second tweet",
  }))!;

  await sleep(100);

  await insertTweetReplyFromUser({
    userId: userUserId,
    repliedTo: firstTweet.tweet_id,
    message: "An reply to first tweet",
  });

  await sleep(100);

  await insertTweetReplyFromUser({
    userId: demoUserId,
    repliedTo: secondTweet.tweet_id,
    message: "Message to second tweet by myself",
  });

  await sleep(100);

  const thirdTweet = (await insertTweetFromUser({
    userId: userUserId,
    message: "My name is user and I like icecream",
  }))!;

  const fourthTweet = (await insertTweetFromUser({
    userId: userUserId,
    message: "Especially I like chocolate ice cream",
  }))!;

  await userLikedTweet({ userId: userUserId, tweetId: thirdTweet.tweet_id });

  await sleep(100);

  await userLikedTweet({ userId: demoUserId, tweetId: fourthTweet.tweet_id });

  await sleep(100);

  await userLikedTweet({ userId: userUserId, tweetId: fourthTweet.tweet_id });
})();
