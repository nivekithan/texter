
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
    ('Another tweet from user', (SELECT id FROM user_user_id))
