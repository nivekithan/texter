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
};
