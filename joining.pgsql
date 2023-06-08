CREATE TABLE Users(
  id serial PRIMARY KEY,
  login  varchar(64) UNIQUE NOT NULL,
  passwordHash text NOT NULL
);

CREATE TABLE Tasks(
  id serial PRIMARY KEY,
  name varchar(100) NOT NULL,
  date date DEFAULT now(),
  idUser integer REFERENCES Users(id) ON DELETE SET NULL ON UPDATE CASCADE
);

INSERT INTO Users(login, passwordHash) VALUES
('chris', 'test1'), ('john', 'test2'), ('robert', 'test3'), ('genry', 'test4');

INSERT INTO Tasks (name, idUser) VALUES
('task1', 1), ('task2', 3), ('task3', 4), ('task4', 4), ('task5', 2);

-- неявное соединение таблиц 
SELECT T.name, T.date, U.login
FROM Users AS U, Tasks AS T
WHERE U.id = T.id;

-- внутренние соединение JOIN, INNER JOIN

SELECT Tasks.name, Tasks.date, Users.login
FROM Users INNER JOIN Tasks ON Users.id = Tasks.id;

/*
SELECT Users.login, Roles.name, Tasks.name. Tasks.date,
FROM Users
INNER JOIN Tasks ON Users.id = Tasks.idUser
INNER JOIN Roles ON Users.id = Roles.id
*/

-- внешнее соедениние OUTER JOIN

INSERT INTO Users(login, passwordHash) VALUES
('vasya', 'qwerty');

INSERT INTO Tasks (name, idUser) VALUES
('task6', null), ('task7', null);

SELECT Tasks.name, Tasks.date, Users.login
FROM Users FULL OUTER JOIN Tasks ON Users.id = Tasks.id;