-- fetch each individual table.
SELECT * FROM users;
SELECT * FROM posts;
SELECT * FROM comments;

-- Create a new users
INSERT INTO users (role, email, password, username) 
	VALUES ('user', 'sponge@gmail.com', 'sponge', 'Bob'); -- role either users or admin

-- Create a new posts
INSERT INTO posts (user_id, title, content)
	VALUES(3, "Bob", "My name is Bob.");

-- Create a new comment for a post
INSERT INTO comments (post_id, user_id, comments)
 VALUES (2, 1, "I will be checking that out. Thanks.");

-- Fetch posts with the users names attached.
SELECT posts.id, username, title, content, created_at, modified_at FROM users
	INNER JOIN posts ON users.id = posts.user_id
    ORDER BY created_at;

-- Fetch posts with their comments attached
use forumdb;

SELECT u.username AS post_creator, p.title, p.content, p.created_at AS post_created_at, p.modified_at AS post_modified_at, 
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'comment_id', c.id,
            'commenter', u2.username,
            'comment', c.comment,
            'comment_created_at', c.created_at
        )
    ) AS comments FROM posts as p
    INNER JOIN users AS u ON p.user_id = u.id
    LEFT JOIN comments AS c ON p.id = c.post_id
    LEFT JOIN users AS u2 ON c.user_id = u2.id
    WHERE p.id = 1
    ORDER BY c.created_at;

-- delete a user
DELETE FROM users WHERE id=1;

-- delete a post
DELETE FROM posts WHERE id=1;

-- delete a comment
DELETE FROM comments WHERE id=1;

-- update a post
UPDATE posts 
	SET title = "title", content = "content"
    WHERE id=1;