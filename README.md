# Texter - A minimal twitter clone

I created this project to improve my skills on both frontend and backend. 

Project was created using 
- For static types and better DX I am using [Typescript](https://www.typescriptlang.org/)
- Full stack react framework [remix](https://remix.run/) 
- For database I am using postgresql from [supabase](https://supabase.com/) 
- For styling I am using [tailwindcss](https://tailwindcss.com/)
- Deployed to [vercel](https://vercel.com)


## Auth

we authenticate users with `username` and `password` and persist them in `session storage` using `cookies`. 
I have not used any third party libary for this but instead everything is written by myself.

For hashing password I have used `bcrypt-js` and I have only stored hashed password in database.

## Database

There are four tables in the database

- users
- tweets
- user_liked_tweet
- user_bookmarked_tweet

### users table

The model for table is 

| user_id | password_hash | user_name | background_picture_url | profile_picture_url | bio  |  
|---------|---------------|-----------|------------------------|---------------------|------|
| uuid    | text          | text      | text                   | text                | text |


Migration for this table is, you can find every migration in the folder `supabase-local/supabase/migrations`

```sql
  CREATE TABLE IF NOT EXISTS public.users
(
    user_id uuid NOT NULL DEFAULT uuid_generate_v4(),
    user_name text COLLATE pg_catalog."default" NOT NULL,
    password_hash text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (user_id)
)

ALTER TABLE IF EXISTS public.users
    ADD CONSTRAINT unique_user_name UNIQUE (user_name);

ALTER TABLE IF EXISTS public.users
    ADD COLUMN background_picture_url text COLLATE pg_catalog."default";

ALTER TABLE IF EXISTS public.users
    ADD COLUMN bio text COLLATE pg_catalog."default" NOT NULL DEFAULT ''::text;

ALTER TABLE IF EXISTS public.users
    ADD COLUMN profile_picture_url text COLLATE pg_catalog."default";
  
```


### Tweets table

The model for tweets table is

| user_id | message | created_at  | replied_to  | replies | tweet_id |
|---------|---------|-------------|-------------|---------|----------|
| uuid    | text    | timestamptz | uuid or null | uuid[]  | uuid    |


migration for this table is 

```sql
CREATE TABLE IF NOT EXISTS public.tweets
(
    tweet_id uuid NOT NULL DEFAULT uuid_generate_v4(),
    message text COLLATE pg_catalog."default" NOT NULL,
    user_id uuid NOT NULL,
    CONSTRAINT tweets_pkey PRIMARY KEY (tweet_id),
    CONSTRAINT fk_user_id FOREIGN KEY (user_id)
        REFERENCES public.users (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

    
ALTER TABLE IF EXISTS public.tweets
    ADD COLUMN created_at timestamp with time zone NOT NULL DEFAULT now();

ALTER TABLE IF EXISTS public.tweets
    ADD COLUMN replied_to uuid;

ALTER TABLE IF EXISTS public.tweets
    ADD COLUMN replies uuid[] NOT NULL DEFAULT ARRAY[]::uuid[];

ALTER TABLE IF EXISTS public.tweets
    ADD CONSTRAINT fk_replied_to FOREIGN KEY (replied_to)
    REFERENCES public.tweets (tweet_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE;

CREATE OR REPLACE FUNCTION public.append_to_replies(
	add_replies_to uuid,
	replied_tweet_id uuid)
    RETURNS void
    LANGUAGE 'sql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
    update tweets
    set replies = replies || replied_tweet_id
    where tweets.tweet_id = add_replies_to
  
$BODY$;
```

### user_liked_tweet table

There is a `many-to-many` relationship between `user` and `likes`, this tables represents that relationship

The model for this table is

| user_id | tweet_id | created_at  |
|---------|----------|-------------|
| uuid    | uuid     | timestamptz |

Migration for this table is

```sql
CREATE TABLE IF NOT EXISTS public.user_liked_tweet
(
    user_id uuid NOT NULL,
    tweet_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT user_liked_tweet_pkey PRIMARY KEY (user_id, tweet_id),
    CONSTRAINT fk_tweet_id FOREIGN KEY (tweet_id)
        REFERENCES public.tweets (tweet_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT fk_user_id FOREIGN KEY (user_id)
        REFERENCES public.users (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)
```


### user_bookmarked_tweet table

There is a `many-to-many` relationship between `user` and `bookmarks`, this tables represents that relationship

The model for this table is

| user_id | tweet_id | created_at  |
|---------|----------|-------------|
| uuid    | uuid     | timestamptz |

Migration for this table is

```sql
CREATE TABLE IF NOT EXISTS public.user_bookmarked_tweet
(
    user_id uuid NOT NULL,
    tweet_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT user_bookmarked_tweet_pkey PRIMARY KEY (user_id, tweet_id),
    CONSTRAINT fk_tweet_id FOREIGN KEY (tweet_id)
        REFERENCES public.tweets (tweet_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT fk_user_id FOREIGN KEY (user_id)
        REFERENCES public.users (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

```

