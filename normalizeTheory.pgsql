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

CREATE TABLE testTable(
  column1 integer,
  column2 varchar(50)
);
-- добавление столбца
ALTER TABLE testTable ADD COLUMN column3 text;
ALTER TABLE testTable ADD COLUMN column4 int CHECK(column4 > 0);

INSERT INTO testTable VALUES
(10, '12321', 'asdadzxc', 12),
(15, '12321', 'asdadzxc', 13),
(20, '12321', 'asdadzxc', 14);

ALTER TABLE testTable ADD COLUMN columnTel char(13);
ALTER TABLE testTable ADD COLUMN isMale bool DEFAULT true;

INSERT INTO testTable VALUES
(17, 'test', 'dfgdf', 43, '+38054353', false);

SELECT * FROM testUsers

UPDATE testTable SET columntel = '+38064536456' WHERE column2 = 'test2'; 

-- удаление столбца
--ALTER TABLE table1 DROP COLUMN column1;
--ALTER TABLE table1 DROP COLUMN column1 CASCADE;

ALTER TABLE testTable DROP COLUMN column3;

-- добавления ограничения
ALTER TABLE table1 ADD CHECK();
ALTER TABLE ADD CONSTRAINT name1;
ALTER TABLE table1 ADD FOREIGN KEY id_column REFERENCES table2

--вопрос об обязательном поле
ALTER TABLE table1 ALTER COLUMN column1 SET NOT NULL

ALTER TABLE testTable ALTER COLUMN column2 SET NOT NULL

ALTER TABLE testTable ADD CHECK(column4 <= 100)

ALTER TABLE testTable ADD CONSTRAINT column4 UNIQUE (column4);
DELETE FROM testTable WHERE column1 = 12;

INSERT INTO testTable VALUES
(22, 'vbndfg', 22, '+38045343412', false);

--удаления ограничения
--ALTER TABLE table1 DROP CONSTRAINT name_constraint;
--ALTER TABLE table1 DROP CONSTRAINT name_constraint CASCADE;

--not null!!
--ALTER TABLE table1 ALTER COLUMN column1 DROP NOT NULL;

ALTER TABLE testTable ALTER COLUMN column2 DROP NOT NULL;

--изменение значения по умолчанию
--ALTER TABLE table1 ALTER COLUMN column1 SET DEFAULT new_value

ALTER TABLE testTable ALTER COLUMN column4 SET DEFAULT 20;

ALTER TABLE testTable ALTER COLUMN column2 SET DEFAULT 'hello!';

INSERT INTO testTable (column1, columnTel, isMale) VALUES
(13, '+380543543', true);

-- удаление значения по-умолчанию
ALTER TABLE testTable ALTER COLUMN column4 DROP DEFAULT;

--изменение типа данных для столбца
--ALTER TABLE table1 ALTER COLUMN column1 TYPE new_type

ALTER TABLE testTable ALTER COLUMN column2 TYPE text

ALTER TABLE testTable ALTER COLUMN column4 TYPE numeric(10,2)

ALTER TABLE testTable ALTER COLUMN column4 TYPE int2;

--переименование столбца
--ALTER TABLE table1 RENAME COLUMN column1 TO column1_newname

--переименование таблицы
--ALTER TABLE table1 RENAME TO table1_rename

ALTER TABLE testTable RENAME COLUMN column2 TO login;
ALTER TABLE testTable RENAME COLUMN column1 TO id;
ALTER TABLE testTable RENAME COLUMN column4 TO age;
ALTER TABLE testTable RENAME COLUMN columntel TO phone_number;


ALTER TABLE testTable RENAME TO testUsers

INSERT INTO testUsers VALUES
(14, 'John', 21, '+38053454331', false);

CREATE SCHEMA sandbox;

CREATE TABLE sandbox.testTable(
  column1 integer,
  column2 varchar(50)
)

SELECT * FROM sandbox.testTable;

DROP SCHEMA sandbox CASCADE