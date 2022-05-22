
INSERT INTO users (user_name, password_hash) 
VALUES
    ('demo', '$2a$10$x.KihysnxHvKds0SYXNkkuLLQKDaqaBsXYFM0UjosTUX.AQehnzOG'), -- password is demo
    ('user', '$2a$10$Zh/enl8qQ8wTfdrHGQfYbuavfxUG5EW97f7i2wvre.qGuGkRDvvhu'); -- password is user




WITH demo_user_id as (
    SELECT
        user_id AS id
    FROM
        users
    WHERE 
        user_name = 'demo'
),

 user_user_id as (
    SELECT
        user_id AS id
    FROM
        users
    WHERE 
        user_name = 'user'
)



INSERT INTO tweets(message, user_id)
VALUES 
    ('first tweet 🥳', (SELECT id FROM demo_user_id)),
    ('second tweet 🥳', (SELECT id FROM demo_user_id)),
    ('tweet from user', (SELECT id FROM user_user_id)),
    ('Another tweet from user', (SELECT id FROM user_user_id));



WITH demo_user_id as (
    SELECT
        user_id AS id
    FROM
        users
    WHERE 
        user_name = 'demo'
),

 user_user_id as (
    SELECT
        user_id AS id
    FROM
        users
    WHERE 
        user_name = 'user'
),

first_tweet as (
    SELECT 
        tweet_id as id
    FROM    
        tweets 
    WHERE   
        message = 'first tweet 🥳'
),

second_tweet as (
    SELECT 
        tweet_id as id
    FROM    
        tweets 
    WHERE   
        message = 'second tweet 🥳'
)

INSERT INTO tweets(message, user_id, replied_to)
VALUES  
    ('Reply to first tweet', (SELECT id FROM user_user_id), (SELECT id FROM first_tweet)),
    ('Replying to second tweet by myself', (SELECT id FROM demo_user_id), (SELECT id FROM second_tweet));


WITH first_reply as (
    SELECT
        tweet_id as id
    FROM
        tweets
    WHERE
        message = 'Reply to first tweet'
),

second_reply as (
    SELECT
        tweet_id as id
    FROM
        tweets
    WHERE
        message = 'Replying to second tweet by myself'
),

first_tweet as (
    SELECT 
        tweet_id as id
    FROM    
        tweets 
    WHERE   
        message = 'first tweet 🥳'
)



UPDATE tweets
SET replies = replies || (SELECT id FROM first_reply) || (SELECT id FROM second_reply)
WHERE 
    tweet_id = (SELECT id FROM first_tweet);