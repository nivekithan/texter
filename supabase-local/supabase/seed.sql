
INSERT INTO users (user_name, password_hash) 
VALUES
    ('demo', '$2a$10$x.KihysnxHvKds0SYXNkkuLLQKDaqaBsXYFM0UjosTUX.AQehnzOG'); -- password is demo




WITH demo_user_id as (
    SELECT
        user_id AS id
    FROM
        users
    WHERE 
        user_name = 'demo'
)


INSERT INTO tweets(message, user_id)
VALUES 
    ('first tweet 🥳', (SELECT id FROM demo_user_id)),
    ('second tweet 🥳', (SELECT id FROM demo_user_id))
