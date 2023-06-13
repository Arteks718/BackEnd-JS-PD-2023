CREATE TABLE Users(
  id serial PRIMARY KEY,
  login varchar(100) NOT NULL CHECK(length(login) > 0)
);

CREATE TABLE Posts(
  id serial PRIMARY KEY,
  idUser integer REFERENCES Users(id) ON DELETE SET NULL ON UPDATE CASCADE,
  title varchar(128) NOT NULL,
  body text
);

CREATE TABLE MarkPosts(
  idUser integer REFERENCES Users(id) ON DELETE SET NULL ON UPDATE CASCADE,
  idPost integer REFERENCES Posts(id) ON DELETE SET NULL ON UPDATE CASCADE
);

INSERT INTO Users(login) VALUES
('test1'), ('test2'), ('test3'), ('test4'), ('test5'), ('test6'), ('test7'), ('test8');

INSERT INTO Posts (idUser, title) VALUES
(1, 'post title 1'), (2, 'post title 2'), (4, 'post title 4'), (7, 'post title 7'), (6, 'post title 6'), 
(3, 'post title 3'), (5, 'post title 5'), (3, 'post title 3'), (5, 'post title 5'), (2, 'post title 2'),
(8, 'post title 8'), (8, 'post title 8'), (3, 'post title 3'), (8, 'post title 8'), (8, 'post title 8');

INSERT INTO MarkPosts (idUser, idPost) VALUES
(1, 6), (4, 10), (5, 11), (3, 9), (3, 5), (7, 6), (2, 14),
(3, 11), (2, 4), (3, 3), (6, 10), (6, 11), (8, 12), (7, 15),
(8, 13), (4, 5), (4, 7), (2, 12);

--1
SELECT Users.login, Posts.title, Posts.body
FROM Posts
INNER JOIN Users ON Users.id = Posts.idUser
WHERE Posts.id = 6
ORDER BY Posts.id;

--2
SELECT Posts.title, COUNT(MarkPosts.idUser)
FROM MarkPosts
INNER JOIN Posts ON MarkPosts.idPost = Posts.id
GROUP BY Posts.title;

--3 *
SELECT MarkPosts.idPost, Posts.title, COUNT(MarkPosts.idUser)
FROM MarkPosts
INNER JOIN Posts ON MarkPosts.idPost = Posts.id
GROUP BY Posts.title, MarkPosts.idPost;

--4
SELECT Posts.title, Posts.body, COUNT(MarkPosts.idUser) as likes
FROM Posts
INNER JOIN MarkPosts ON MarkPosts.idPost = Posts.id
GROUP BY Posts.title, Posts.body
ORDER BY likes;

SELECT title, body, 
(SELECT COUNT(MarkPosts.idUser) as likes 
FROM MarkPosts WHERE Posts.id = MarkPosts.idPost) AS likes
FROM Posts
ORDER BY likes

--5
SELECT Posts.title, COUNT(MarkPosts.idUser)
FROM MarkPosts
INNER JOIN Posts ON MarkPosts.idPost = Posts.id
GROUP BY Posts.title
HAVING COUNT(MarkPosts.idUser) > 2;

--6
SELECT Users.login, count(MP.idPost)
FROM MarkPosts AS MP
INNER JOIN Users ON Users.id = MP.idUser
GROUP BY Users.login;

--7
SELECT Users.login, count(MP.idPost)
FROM MarkPosts AS MP
INNER JOIN Users ON Users.id = MP.idUser
GROUP BY Users.login
HAVING Users.login = 'test3';

--8

SELECT Posts.title, COUNT(MarkPosts.idUser)
FROM MarkPosts
INNER JOIN Posts ON MarkPosts.idPost = Posts.id
GROUP BY Posts.title
ORDER BY COUNT(MarkPosts.idUser) DESC
LIMIT 1;