CREATE TABLE Positions(
  id serial PRIMARY KEY,
  name varchar(100) NOT NULL,
  description text
);

CREATE TABLE Employees(
  id serial PRIMARY KEY,
  fullName varchar(100) NOT NULL,
  birthday date,
  isMale boolean,
  hiredate date NOT NULL DEFAULT now(),
  email varchar(255) UNIQUE,
  salary money CHECK(salary > money(0)),
  id_position integer REFERENCES Positions(id) ON DELETE SET NULL ON UPDATE CASCADE
);

INSERT INTO Positions (name) VALUES
('designer'), ('programmer'), ('manager'), ('marketologist'), ('director'), ('bookkeper');

INSERT INTO Employees (fullname, salary, id_position) VALUES
('Ryan Gosling', 1000, (SELECT id from Positions WHERE name = 'programmer')), 
('John Harris', 700, (SELECT id from Positions WHERE name = 'manager')), 
('Olivia Jones', 1500, (SELECT id from Positions WHERE name = 'director'));

SELECT E.fullname, E.salary, (SELECT name FROM Positions WHERE Positions.id = E.id_position)
FROM Employees AS E;

CREATE TABLE Users(
  id serial PRIMARY KEY,
  login varchar(64) NOT NULL,
  passwordHash text NOT NULL
);

CREATE TABLE Posts(
  id serial PRIMARY KEY,
  author integer REFERENCES Users(id) ON DELETE SET NULL ON UPDATE CASCADE,
  head varchar(128) NOT NULL,
  body text
);

CREATE TABLE PostsLikes(
  id_user integer REFERENCES Users(id) ON DELETE SET NULL ON UPDATE CASCADE,
  id_post integer REFERENCES Posts(id) ON DELETE SET NULL ON UPDATE CASCADE
);

INSERT INTO Users(login, passwordHash) VALUES
('william', 'qwerty'), ('john', 'qwerty'), ('david', 'qwerty'),
('olivia', 'qwerty'), ('alex', 'qwerty'), ('megan', 'qwerty');

INSERT INTO Posts(author, head) VALUES
((SELECT id FROM Users WHERE login = 'john'), 'header1'),
((SELECT id FROM Users WHERE login = 'megan'), 'header2'),
((SELECT id FROM Users WHERE login = 'david'), 'header3'),
((SELECT id FROM Users WHERE login = 'alex'), 'header4'),
((SELECT id FROM Users WHERE login = 'olivia'), 'header5'),
((SELECT id FROM Users WHERE login = 'william'), 'header6');

INSERT INTO PostsLikes VALUES
(2, 4), (1, 6), (3, 5), (6, 2), (5, 1), (4, 4), (5, 3), (2, 3), (1, 3), (3, 2), (3, 6);

INSERT INTO PostsLikes VALUES
(6, 3), (4, 3);

SELECT * FROM PostsLikes;

DROP TABLE Users, Posts, PostsLikes;
SELECT * From Users;

SELECT Posts.*, (SELECT count(*) FROM PostsLikes Where PostsLikes.id_post = Posts.id) as countLikes
FROM Posts
ORDER BY countLikes DESC, Posts.id;

SELECT Posts.*, count(PostsLikes.id_post) as countLikes
FROM Posts
INNER JOIN PostsLikes ON Posts.id = PostsLikes.id_post
GROUP BY Posts.id, Posts.head, Posts.body
HAVING count(PostsLikes.id_post) >= 5
ORDER BY countLikes DESC, Posts.id;

CREATE TABLE Users1(
  id serial PRIMARY KEY,
  login varchar(64) NOT NULL,
  passwordHash text NOT NULL,
  fullName varchar(128),
  email varchar(128) UNIQUE 
);

CREATE TABLE Employees1(
  id serial PRIMARY KEY,
  fullName varchar(128) NOT NULL,
  email varchar(128) UNIQUE
);

INSERT INTO Users1(login, passwordHash, fullName, email) VALUES
('wil1', 'qwerty', 'william smith', 'william smith@gmail.com'), 
('jo1', 'qwerty', 'john harris', NULL), 
('dvd1', 'qwerty', 'david brown', 'davidbrown@gmail.com'),
('oliva', 'qwerty', 'olivia miller', NULL), 
('sanya', 'qwerty', 'alex morgan', 'alexmorgan@gmail.com');

INSERT INTO Employees1(fullName, email) VALUES
('william smith', 'william smith@gmail.com'), 
('john harris', NULL), 
('david brown', 'davidbrown@gmail.com'),
('olivia miller', NULL), 
('alex morgan', 'alexmorgan@gmail.com'),
('test', 'test@mail.com');

SELECT fullName, email FROM Users1
UNION
SELECT fullName, email FROM Employees1;

SELECT fullName, email FROM Employees1
EXCEPT
SELECT fullName, email FROM Users1;