import type { PostgrestResponse } from "@supabase/supabase-js";
import { createClient } from "@supabase/supabase-js";
import { getEnvVar } from "~/utils/utils";

export const supabase = createClient(
  getEnvVar("SUPABSE_LOCAL_API_URL"),
  getEnvVar("SUPABASE_LOCAL_SERVICE_KEY")
);

/**
 * Represents `users` table in the database
 *
 */
export type DbUser = {
  user_id: string;
  user_name: string;
  password_hash: string;
};

/**
 * Represents `tweets` table in the database
 */

export type DbTweets = {
  tweet_id: string;
  message: string;
  user_id: string;
  created_at: string;
  replied_to: string | null;
  replies: string[];
};

/**
 * Each tweet is belongs to a user, through this function
 * you can get userName of the user who send that tweet
 *
 * @param tweetId - `tweet_id` of the tweet
 * @returns if there is a user who sent that tweet then it returns the `user_name` of that user or else
 * it returns `null`
 */
export const getTweetUserName = async (tweetId: string) => {
  const tweetResult = (await supabase
    .from<DbTweets>("tweets")
    .select(
      `users!fk_user_id (
      user_name
    )`
    )
    .eq("tweet_id", tweetId)) as PostgrestResponse<{
    users: { user_name: string };
  }>;

  if (tweetResult.error || tweetResult.data.length === 0) {
    // There is no user who sent that tweet
    // This is possible when the tweet_id is not valid
    return null;
  }

  const user = tweetResult.data[0].users; // There can be only one user who sent that tweet

  return user.user_name;
};

/**
 *
 * Get user with the given username
 *
 * @param userName - `user_name` of the user
 * @param selectQuery - Optional select query to be used, default is `"*"`
 * @returns if there is user with the given `user_name`, returns the user object based on selectQuery, else returns `null`
 */
export const getUserOfUserName = async <T>(
  userName: string,
  selectQuery: string = "*"
) => {
  const query = await supabase
    .from<DbUser>("users")
    .select(selectQuery)
    .eq("user_name", userName);

  if (query.error || query.data.length === 0) {
    // There is no user with this userName
    return null;
  }

  const user = query.data[0]; // There can be only one user for a username

  return user as unknown as T;
};

/**
 *
 * Get user with the given user_id
 *
 * @param userId - `userId` of the user
 * @param selectQuery - Optional select query to be used, default is `"*"`
 * @returns if there is user with the given `user_id`, returns the user object based on selectQuery, else returns `null`
 */
export const getUserOfUserId = async <T>(userId: string, selectQuery = "*") => {
  const query = await supabase
    .from<DbUser>("users")
    .select(selectQuery)
    .eq("user_id", userId);

  if (query.error || query.data.length === 0) {
    // There is no user with this userName
    return null;
  }

  const user = query.data[0]; // There can be only one user for a username

  return user as unknown as T;
};

export type GetOneTweetFromUserArgs = {
  userId: string;
  tweetId: string;
  selectQuery: string;
};
/**
 *
 * Get one tweet from a user
 *
 * @param userId - `user_id` of the user
 * @param tweetId - `tweet_id` of the tweet
 * @param selectQuery - Optional select query to be used, default is `"*"`
 * @returns if there is tweet with the given `user_id` and `tweet_id`, returns the
 * `tweet object` based on `selectQuery`, else returns `null`
 */
export const getOneTweetFromUser = async <T>({
  selectQuery = "*",
  tweetId,
  userId,
}: GetOneTweetFromUserArgs) => {
  const tweetResult = await supabase
    .from<DbTweets>("tweets")
    .select(selectQuery)
    .eq("user_id", userId)
    .eq("tweet_id", tweetId);

  if (tweetResult.error || tweetResult.data.length === 0) {
    // There is no tweet with specified user_id and tweet_id
    return null;
  }

  const tweet = tweetResult.data[0]; // There should be only on tweet with specified tweet id

  return tweet as unknown as T;
};

export type GetALlTweetsFromUserArgs = {
  userId: string;
  selectQuery: string;
};

/**
 *
 * Get all tweet from a user in descending order of `created_at`
 *
 * @param userId - `user_id` of the user
 * @param selectQuery - Optional select query to be used, default is `"*"`
 * @returns if there is tweet with the given `user_id` and `tweet_id`, returns the
 * `tweet object` based on `selectQuery`, else returns `null`
 */
export const getAllTweetsFromUser = async <T>({
  selectQuery = "*",
  userId,
}: GetALlTweetsFromUserArgs) => {
  const tweetResult = await supabase
    .from<DbTweets>("tweets")
    .select(selectQuery)
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (tweetResult.error) {
    // There is some error in getting tweetst
    return null;
  }

  return tweetResult.data as unknown as T[];
};

export type GetTweetArgs = {
  selectQuery: string;
  tweetId: string;
};

/**
 *
 * Get tweet with  tweet_id
 *
 * @param tweetId - `tweet_id` of the tweet
 * @param selectQuery - Optional select query to be used, default is `"*"`
 * @returns if there is tweet with the given `user_id` and `tweet_id`, returns the
 * `tweet object` based on `selectQuery`, else returns `null`
 */
export const getTweet = async <T>({
  selectQuery = "*",
  tweetId,
}: GetTweetArgs) => {
  const tweetResult = await supabase
    .from<DbTweets>("tweets")
    .select(selectQuery)
    .eq("tweet_id", tweetId);

  if (tweetResult.error || tweetResult.data.length === 0) {
    // There is no tweet with specified tweet_id
    return null;
  }

  const tweet = tweetResult.data[0]; // There should be only on tweet with specified tweet id

  return tweet as unknown as T;
};

export type InsertUserArgs = {
  userName: string;
  passwordHash: string;
};

export const insertUserWithPassword = async ({
  passwordHash,
  userName,
}: InsertUserArgs) => {
  const insertResult = await supabase
    .from<DbUser>("users")
    .insert({ user_name: userName, password_hash: passwordHash });

  if (insertResult.error || insertResult.data.length === 0) {
    // There is already a user with the given userName
    return null;
  }

  const user = insertResult.data[0]; // We have added only one user
  return user.user_id;
};

export type InsertTweetFromUserArgs = {
  userId: string;
  message: string;
};

export const insertTweetFromUser = async ({
  userId,
  message,
}: InsertTweetFromUserArgs) => {
  const query = await supabase
    .from<DbTweets>("tweets")
    .insert({ user_id: userId, message: message });

  if (query.error || query.data.length === 0) {
    // Some error happened while adding tweet
    // maybe there is no user with that user_id
    return null;
  }

  const tweet = query.data[0]; // We have added only on tweet

  return tweet;
};
