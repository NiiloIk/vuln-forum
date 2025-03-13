-- Create DB and tables

CREATE DATABASE `forumdb`;

USE `forumdb`;

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `day_created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `username` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
);

CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
);

CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `post_id` int NOT NULL,
  `user_id` int NOT NULL,
  `comment` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `post_id` (`post_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
);

-- Create Database users posts and comments
INSERT INTO users (role, email, password, username) 
	VALUES ('user', 'email@gmail.com', 'securepassword', 'Niilo');
INSERT INTO users (role, email, password, username) 
	VALUES ('user', 'josh@gmail.com', 'password', 'Josh');
INSERT INTO users (role, email, password, username) 
	VALUES ('admin', 'sponge@gmail.com', 'sponge', 'Bob');

INSERT INTO posts (user_id, title, content)
	VALUES(1, "Welcome to Fragile Forum", "I've created this new website for you to enjoy and explore. Message me about possible improvements.");
INSERT INTO posts (user_id, title, content)
	VALUES(2, "OWASP top 10 web application security risks", "I think that the creator of this website should check out the OWASP top 10 list.");
INSERT INTO posts (user_id, title, content)
	VALUES(3, "Bob", "My name is Bob.");

INSERT INTO comments (post_id, user_id, comment)
 VALUES (1, 2, "Nice website!");
INSERT INTO comments (post_id, user_id, comment)
 VALUES (1, 3, "Bob!");
INSERT INTO comments (post_id, user_id, comment)
 VALUES (2, 1, "I will be checking that out. Thanks.");