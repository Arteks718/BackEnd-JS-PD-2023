CREATE TABLE Users(
  id serial PRIMARY KEY,
  name varchar(64),
  surname varchar(64),
  login varchar(100) NOT NULL UNIQUE CHECK(length(login) > 6),
  passwordHash text NOT NULL
);

CREATE TABLE Chats(
  id serial PRIMARY KEY,
  owner_id int REFERENCES Users(id) ON DELETE SET NULL ON UPDATE CASCADE,
  name varchar(100),
  created timestamp DEFAULT now()
);

CREATE TABLE Users_to_chats (
  user_id int REFERENCES Users(id) ON DELETE SET NULL ON UPDATE CASCADE,
  chat_id int REFERENCES Chats(id) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE Messages(
  id serial PRIMARY KEY,
  value text NOT NULL,
  created timestamp DEFAULT now(),
  updated timestamp DEFAULT now(),
  author_id int REFERENCES Users(id) ON DELETE SET NULL ON UPDATE CASCADE,
  chat_id int REFERENCES Chats(id) ON DELETE SET NULL ON UPDATE CASCADE
);

INSERT INTO Users(name, surname, login, passwordHash) VALUES
('Test1', 'Testovich1', 'log_test1', 'qwerty1'),
('Test2', 'Testovich2', 'log_test2', 'qwerty2'),
('Test3', 'Testovich3', 'log_test3', 'qwerty3'),
('Test4', 'Testovich4', 'log_test4', 'qwerty4'),
('Test5', 'Testovich5', 'log_test5', 'qwerty5');

INSERT INTO Chats(owner_id, name) VALUES
(1, 'JavaScript'), (2, 'TypeScript'), (3, 'Python'), (4, 'Java'), (5, 'Ruby'), (3, 'C#'), (4, 'C++');

INSERT INTO Users_to_chats(user_id, chat_id) VALUES
((SELECT id FROM Users WHERE login = 'log_test1'), (SELECT id FROM Chats WHERE name = 'TypeScript')),
((SELECT id FROM Users WHERE login = 'log_test4'), (SELECT id FROM Chats WHERE name = 'TypeScript')),
((SELECT id FROM Users WHERE login = 'log_test5'), (SELECT id FROM Chats WHERE name = 'TypeScript')),
((SELECT id FROM Users WHERE login = 'log_test3'), (SELECT id FROM Chats WHERE name = 'JavaScript')),
((SELECT id FROM Users WHERE login = 'log_test2'), (SELECT id FROM Chats WHERE name = 'JavaScript')),
((SELECT id FROM Users WHERE login = 'log_test2'), (SELECT id FROM Chats WHERE name = 'Python')),
((SELECT id FROM Users WHERE login = 'log_test5'), (SELECT id FROM Chats WHERE name = 'Ruby')),
((SELECT id FROM Users WHERE login = 'log_test1'), (SELECT id FROM Chats WHERE name = 'C#')),
((SELECT id FROM Users WHERE login = 'log_test3'), (SELECT id FROM Chats WHERE name = 'C#')),
((SELECT id FROM Users WHERE login = 'log_test4'), (SELECT id FROM Chats WHERE name = 'C++'));


INSERT INTO Messages (value, author_id, chat_id)
SELECT 'hello', Users.id, Chats.id
FROM Users
JOIN Users_to_chats AS UC ON Users.id = UC.user_id
JOIN Chats ON Chats.id = UC.chat_id
WHERE (Users.login = 'log_test1' AND Chats.name = 'TypeScript')
  UNION ALL
SELECT 'anybody', Users.id, Chats.id
FROM Users
JOIN Users_to_chats AS UC ON Users.id = UC.user_id
JOIN Chats ON Chats.id = UC.chat_id
WHERE (Users.login = 'log_test2' AND Chats.name = 'JavaScript')
  UNION ALL
SELECT 'What?', Users.id, Chats.id
FROM Users
JOIN Users_to_chats AS UC ON Users.id = UC.user_id
JOIN Chats ON Chats.id = UC.chat_id
WHERE (Users.login = 'log_test3' AND Chats.name = 'JavaScript')
  UNION ALL
SELECT 'No', Users.id, Chats.id
FROM Users
JOIN Users_to_chats AS UC ON Users.id = UC.user_id
JOIN Chats ON Chats.id = UC.chat_id
WHERE (Users.login = 'log_test4' AND Chats.name = 'C++');

DROP TABLE Users, Chats, Users_to_chats, messages;

SELECT * FROM Messages;