import type { PostgrestResponse } from "@supabase/supabase-js";
import { createClient } from "@supabase/supabase-js";
import type { Readable } from "stream";
import { getEnvVar } from "~/utils/utils";

export const supabase = createClient(
  process.env.NODE_ENV === "production"
    ? getEnvVar("SUPABASE_PROD_API_URL")
    : getEnvVar("SUPABASE_LOCAL_API_URL"),
  process.env.NODE_ENV === "production"
    ? getEnvVar("SUPABASE_PROD_SERVICE_KEY")
    : getEnvVar("SUPABASE_LOCAL_SERVICE_KEY")
);

// export const supabase = createClient(
//   getEnvVar("SUPABASE_PROD_API_URL"),
//   getEnvVar("SUPABASE_PROD_SERVICE_KEY")
// );

/**
 * Represents `users` table in the database
 *
 */
export type DbUser = {
  user_id: string;
  user_name: string;
  password_hash: string;
  bio: string | null;
  profile_picture_url: string | null;
  background_picture_url: string | null;
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
 * Represents `user_liked_tweet` table in the tablebase
 */

export type DbUserLikedTweet = {
  user_id: string;
  tweet_id: string;
  created_at: string;
};

/**
 * Represents `user_bookmarked_tweet` table in the database
 */

export type DbUserBookmarkedTweet = {
  user_id: string;
  tweet_id: string;
  created_at: string;
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
  includeReplies?: boolean;
};

/**
 *
 * Get all tweet from a user in descending order of `created_at`
 *
 * @param userId - `user_id` of the user
 * @param selectQuery - Optional select query to be used, default is `"*"`
 * @param includeReplies - Optional boolean to include replies from the user, default is `true`
 * @returns if there is tweet with the given `user_id` and `tweet_id`, returns the
 * `tweet object` based on `selectQuery`, else returns `null`
 */
export const getAllTweetsFromUser = async <T>({
  selectQuery = "*",
  userId,
  includeReplies = true,
}: GetALlTweetsFromUserArgs) => {
  let tweetQuery = supabase
    .from<DbTweets>("tweets")
    .select(selectQuery)
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (!includeReplies) {
    tweetQuery = tweetQuery.is("replied_to", null);
  }

  const tweetResult = await tweetQuery;

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

export type GetLatestTweetsArgs = {
  count: number;
  selectQuery: string;
};

/**
 * Returns the latest tweets from the database
 *
 *
 * @param count - count of tweets to be returned
 * @param selectQuery - Select query to be used while sending request
 * @returns `Tweet[]` based on query if the opeartion is successfull, else returns null
 */
export const getLatestTweets = async <T>({
  count,
  selectQuery,
}: GetLatestTweetsArgs) => {
  const query = await supabase
    .from<DbTweets>("tweets")
    .select(selectQuery)
    .order("created_at", { ascending: false })
    .limit(count);

  if (query.error || query.data.length === 0) {
    // There is some error with the select query
    return null;
  }

  return query.data as unknown as T[];
};

export type InsertUserWithPasswordArgs = {
  userName: string;
  passwordHash: string;
};

/**
 * Inserts the user with the given username and passwordHash to the db
 *
 * @param passwordHash - `password_hash` of the user
 * @param userName - user_name of the user
 * @return if the user is inserted, returns the `user_id`, else returns `null`
 */

export const insertUserWithPassword = async ({
  passwordHash,
  userName,
}: InsertUserWithPasswordArgs) => {
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

/**
 *
 * Inserts the `tweet` not a reply to any other tweet in the db
 *
 * @param userId - UserId of the user who made the tweet
 * @param message - message of the tweet
 * @returns if the tweet is inserted, returns the tweet object, else returns `null`
 */

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

type InsertTweetReplyFromUserArgs = {
  userId: string;
  message: string;
  repliedTo: string;
};

/**
 * Inserts a reply from the user to the tweet
 *
 *
 * @param message - Reply message
 * @param repliedTo - TweetId of the tweet to which the reply is to be made
 * @param userId - UserId of the user who made the reply
 * @returns if the tweet is inserted, returns `undefined`, else returns `null`
 */
export const insertTweetReplyFromUser = async ({
  message,
  repliedTo,
  userId,
}: InsertTweetReplyFromUserArgs) => {
  const addTweet = await supabase.from<DbTweets>("tweets").insert({
    user_id: userId,
    replied_to: repliedTo,
    message: message,
  });

  if (addTweet.error || addTweet.data.length === 0) {
    // There is some error while adding tweet
    return null;
  }

  const tweet = addTweet.data[0]; // We have added only on tweet

  const addTweetToRepliesList = await supabase.rpc<void>("append_to_replies", {
    add_replies_to: repliedTo,
    replied_tweet_id: tweet.tweet_id,
  });

  if (addTweetToRepliesList.error) {
    // There is some error while adding tweet to replies list
    return null;
  }
};

type UserLikedTweetArgs = {
  userId: string;
  tweetId: string;
};

/**
 *
 * Adds to the db that the user with the `userId` has liked the
 * tweet with the `tweetId`
 *
 * @param userId - `user_id` of the user who have liked the tweet
 * @param tweetId - `tweet_id` of the tweet which got liked
 * @returns if the operation is successfull returns `DbUserLikedTweet` object else returns
 * `null`
 */
export const userLikedTweet = async ({
  userId,
  tweetId,
}: UserLikedTweetArgs) => {
  const query = await supabase
    .from<DbUserLikedTweet>("user_liked_tweet")
    .insert({ user_id: userId, tweet_id: tweetId });

  if (query.error || query.data.length === 0) {
    // There is some error while adding tweet
    return null;
  }

  const like = query.data[0]; // Only one like is added

  return like;
};

/**
 *
 * Removes the like user has given to the tweet
 *
 * @param userId - `user_id` of the user who have unLiked the tweet
 * @param tweetId - `tweet_id` of the tweet which got unLiked
 * @returns if the operation is successfull returns `DbUserLikedTweet` object else returns
 * `null`
 */
export const userUnLikedTweet = async ({
  userId,
  tweetId,
}: UserLikedTweetArgs) => {
  const query = await supabase
    .from<DbUserLikedTweet>("user_liked_tweet")
    .delete()
    .eq("user_id", userId)
    .eq("tweet_id", tweetId);

  if (query.error || query.data.length === 0) {
    // There is some error while adding tweet
    return null;
  }

  const like = query.data[0]; // Only one like is added

  return like;
};

export type GetLikeCountArgs = {
  tweetId: string;
};

/**
 *
 * Gets the like count of the tweet with the `tweetId`
 *
 * @param tweetId - `tweet_id` of the tweet for which like count is to be returned
 * @returns if the operation is successfull return the count or else returns null
 */

export const getLikeCount = async ({ tweetId }: GetLikeCountArgs) => {
  const query = await supabase
    .from<DbUserLikedTweet>("user_liked_tweet")
    .select("created_at", { count: "exact" })
    .eq("tweet_id", tweetId);

  if (query.error) {
    // Something went wrong with the request
    return null;
  }

  return query.count ?? 0;
};

export type HasUserLikedTweetArgs = {
  userId: string;
  tweetId: string;
};

/**
 * Finds out whether a user has liked a tweet or not
 *
 * @param userId - `user_id` of the user
 * @param tweetId - `tweet_id` of the user
 * @return if the operation is successfull return boolean noting whether user has
 * liked that tweet or not else returns null
 *
 */

export const hasUserLikedTweet = async ({
  tweetId,
  userId,
}: HasUserLikedTweetArgs) => {
  const query = await supabase
    .from<DbUserLikedTweet>("user_liked_tweet")
    .select("created_at")
    .eq("tweet_id", tweetId)
    .eq("user_id", userId);

  if (query.error) {
    // Something went wrong with the request
    return null;
  }

  // If the user have liked the tweet, then the length would have been
  // 1 but if the user have not liked the tweet, then the length would be
  // 0
  return query.data.length === 1;
};

export type GetTweetsUserHasLikedArgs = {
  userId: string;
  selectQuery: string;
};

/**
 * Gets all the tweet the user has liked
 *
 * @param userId - `user_id` of the user
 * @param selectQuery - select query to be used while sending request
 * @returns
 */

export const getTweetsUserHasLiked = async <T>({
  userId,
  selectQuery,
}: GetTweetsUserHasLikedArgs) => {
  const query = await supabase
    .from<DbUserLikedTweet>("user_liked_tweet")
    .select(selectQuery)
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (query.error) {
    // Something is wrong with the query
    return null;
  }

  return query.data as unknown as T[];
};

export type UserBookmarkedTweetArgs = {
  userId: string;
  tweetId: string;
};

/**
 *
 * Adds to the db that the user with the `userId` has bookmarked the
 * tweet with the `tweetId`
 *
 * @param userId - `user_id` of the user who have bookmarked the tweet
 * @param tweetId - `tweet_id` of the tweet which got bookmarked
 * @returns if the operation is successfull returns `DbUserBookmarkedTweet` object else returns
 * `null`
 */
export const userBookmarkedTweet = async ({
  userId,
  tweetId,
}: UserBookmarkedTweetArgs) => {
  const query = await supabase
    .from<DbUserBookmarkedTweet>("user_bookmarked_tweet")
    .insert({ user_id: userId, tweet_id: tweetId });

  if (query.error || query.data.length === 0) {
    // There is some error while setting the bookmark
    return null;
  }

  const bookmark = query.data[0]; // Only one bookmark is added

  return bookmark;
};

/**
 *
 * Removes the bookarmark user has set to the tweet
 *
 * @param userId - `user_id` of the user who have removing the bookmark
 * @param tweetId - `tweet_id` of the tweet
 * @returns if the operation is successfull returns `DbUserBookmarkedTweet` object else returns
 * `null`
 */
export const userRemovedBookmarkedTweet = async ({
  userId,
  tweetId,
}: UserBookmarkedTweetArgs) => {
  const query = await supabase
    .from<DbUserBookmarkedTweet>("user_bookmarked_tweet")
    .delete()
    .eq("user_id", userId)
    .eq("tweet_id", tweetId);

  if (query.error || query.data.length === 0) {
    // There is some error while removing the bookmark
    return null;
  }

  const bookmark = query.data[0]; // Only one bookmarking removed

  return bookmark;
};

export type GetBookmarkCountArgs = {
  tweetId: string;
};

/**
 *
 * Gets the bookmark count of the tweet with the `tweetId`
 *
 * @param tweetId - `tweet_id` of the tweet for which like count is to be returned
 * @returns if the operation is successfull return the count or else returns null
 */

export const getBookmarkCount = async ({ tweetId }: GetLikeCountArgs) => {
  const query = await supabase
    .from<DbUserBookmarkedTweet>("user_bookmarked_tweet")
    .select("created_at", { count: "exact" })
    .eq("tweet_id", tweetId);

  if (query.error) {
    // Something went wrong with the request
    return null;
  }

  return query.count ?? 0;
};

export type HasUserBookmarkedTweetArgs = {
  userId: string;
  tweetId: string;
};

/**
 * Finds out whether a user has liked a tweet or not
 *
 * @param userId - `user_id` of the user
 * @param tweetId - `tweet_id` of the user
 * @return if the operation is successfull return boolean noting whether user has
 * bookmarked that tweet or not else returns null
 *
 */

export const hasUserBookmarkedTweet = async ({
  tweetId,
  userId,
}: HasUserBookmarkedTweetArgs) => {
  const query = await supabase
    .from<DbUserBookmarkedTweet>("user_bookmarked_tweet")
    .select("created_at")
    .eq("tweet_id", tweetId)
    .eq("user_id", userId);

  if (query.error) {
    // Something went wrong with the request
    return null;
  }

  // If the user have bookmarked the tweet, then the length would have been
  // 1 but if the user have not bookmarked the tweet, then the length would be
  // 0
  return query.data.length === 1;
};

export type GetTweetsUserHasBookmarkedArgs = {
  userId: string;
  selectQuery: string;
};

/**
 * Gets all the tweet the user has bookmarked
 *
 * @param userId - `user_id` of the user
 * @param selectQuery - select query to be used while sending request
 * @returns
 */

export const getTweetsUserHasBookmarked = async <T>({
  userId,
  selectQuery,
}: GetTweetsUserHasLikedArgs) => {
  const query = await supabase
    .from<DbUserLikedTweet>("user_bookmarked_tweet")
    .select(selectQuery)
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (query.error) {
    // Something is wrong with the query
    return null;
  }

  return query.data as unknown as T[];
};

export type UploadProfilePictureArgs = {
  userId: string;
  file: Readable;
  extension: string;
  contentType: string;
};

export const uploadProfilePicture = async ({
  userId,
  extension,
  file,
  contentType,
}: UploadProfilePictureArgs) => {
  const path = `${userId}/profile_picture${extension}`;

  const uploadRes = await supabase.storage
    .from("pictures")
    .upload(path, file, { contentType });

  if (uploadRes.error) {
    // Try to update  it
    const updateRes = await supabase.storage
      .from("pictures")
      .update(path, file, { contentType });

    if (updateRes.error) {
      return null;
    }
  }

  const publicUrlRes = await supabase.storage
    .from("pictures")
    .getPublicUrl(path);

  const publicUrl = publicUrlRes.publicURL;

  if (publicUrl === null) {
    return null;
  }

  const updateUser = await supabase
    .from<DbUser>("users")
    .update({ profile_picture_url: publicUrl })
    .eq("user_id", userId);

  if (updateUser.error || updateUser.data.length === 0) {
    return null;
  }

  return publicUrl;
};

export const uploadBackgroundPicture = async ({
  userId,
  extension,
  file,
  contentType,
}: UploadProfilePictureArgs) => {
  const path = `${userId}/background_picture${extension}`;

  const uploadRes = await supabase.storage
    .from("pictures")
    .upload(path, file, { contentType });

  if (uploadRes.error) {
    // Try to update  it
    const updateRes = await supabase.storage
      .from("pictures")
      .update(path, file, { contentType });

    if (updateRes === null) {
      return null;
    }
  }

  const publicUrlRes = await supabase.storage
    .from("pictures")
    .getPublicUrl(path);

  const publicUrl = publicUrlRes.publicURL;

  if (publicUrl === null) {
    return null;
  }

  const updateUser = await supabase
    .from<DbUser>("users")
    .update({ background_picture_url: publicUrl })
    .eq("user_id", userId);

  if (updateUser.error || updateUser.data.length === 0) {
    return null;
  }

  return publicUrl;
};
