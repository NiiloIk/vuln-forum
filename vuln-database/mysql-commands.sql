-- fetch each individual table.
SELECT * FROM users;
SELECT * FROM posts;
SELECT * FROM comments;

-- Create a new users
INSERT INTO users (role, email, password, usersname) 
	VALUES ('user', 'sponge@gmail.com', 'sponge', 'Bob'); -- role either users or admin

-- Create a new posts
INSERT INTO posts (users_id, title, content)
	VALUES(3, "Bob", "My name is Bob.");

-- Create a new comment for a post
INSERT INTO comments (post_id, users_id, comments)
 VALUES (2, 1, "I will be checking that out. Thanks.");

-- Fetch posts with the users names attached.
SELECT posts.id, usersname, title, content, created_at, modified_at FROM users
	INNER JOIN posts ON users.id = posts.users_id
    ORDER BY created_at;

-- Fetch posts with their comments attached
SELECT u.usersname AS post_creator, p.title, p.content, p.created_at AS post_created_at, p.modified_at AS post_modified_at, u2.usersname AS commenter, c.comments, c.id AS comment_id, c.created_at AS comment_created_at FROM posts as p
    INNER JOIN users AS u ON p.users_id = u.id
    LEFT JOIN comments AS c ON p.id = c.post_id
    LEFT JOIN users AS u2 ON c.users_id = u2.id
    WHERE p.id = 1
    ORDER BY comment_created_at;

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