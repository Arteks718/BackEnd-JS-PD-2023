CREATE TABLE Users(
  id serial PRIMARY KEY,
  name varchar(80) NOT NULL,
  surname varchar(100) NOT NULL,
  isMale boolean,
  age integer CHECK(age>0),
  tel char(13),
  email varchar(60) NOT NULL UNIQUE
);

DROP TABLE TASKS;

CREATE TABLE Tasks(
  id serial PRIMARY KEY,
  userId integer REFERENCES Users(id),
  name varchar(80) NOT NULL,
  description text,
  dateCreated date DEFAULT now() CHECK(dateCreated < deadLine),
  deadLine date NOT NULL,
  salary money NOT NULL CHECK(salary >= money(0))
);

INSERT INTO Users (name, surname, isMale, age, tel, email) VALUES
('John', 'Milson', true, 22, '+380661233322', 'johnmilson@gmail.com'),
('Tom', 'Fox', true, 24, '+380637628312', 'Tomfox@gmail.com'),
('Elizabeth', 'Gray', false, 21, '+380995343298', 'elizabethgray@gmail.com'),
('Diane', 'Reese', false, 28, '+380674753212', 'dianesereese@gmail.com'),
('Lenny', 'Tranter', true, 34, '+380504675798', 'lennytranter@gmail.com'); 

INSERT INTO Tasks (userId, name, description, deadLine, salary) VALUES
(1, 'task1', 'descTask1', '2023-06-10', 15000),
(1, 'task2', 'descTask2', '2023-06-04', 11000),
(3, 'task1', 'descTask1', '2023-06-10', 15000),
(4, 'task4', 'descTask4', '2023-06-05', 12000),
(5, 'task2', 'descTask2', '2023-06-15', 17600),
(3, 'task7', 'descTask7', '2023-06-12', 14000),
(2, 'task8', 'descTask8', '2023-06-13', 13000);

INSERT INTO Tasks (userId, name, description, deadLine, salary) VALUES
(2, 'task9', 'desktask9', '11.06.2023', 19000);

SELECT * FROM Tasks;

SELECT * FROM Users;

SELECT * FROM Users LIMIT 3;

SELECT * FROM Tasks ORDER BY deadline;

SELECT Users.name, Users.surname, Users.email, Tasks.name FROM Users, Tasks WHERE Tasks.name='task2' AND Users.id = Tasks.userId;

SELECT Users.name, Tasks.name FROM Users, Tasks WHERE Users.id = 1 AND Users.id = Tasks.userId;

SELECT * FROM Users WHERE age >= 20 AND isMale = true ORDER BY AGE DESC;

SELECT * FROM Users WHERE age <= 25 AND isMale = false ORDER BY AGE DESC;

SELECT Users.name, Users.email, Users.tel FROM Users, Tasks WHERE Users.isMale = false AND Users.id = Tasks.userId;

SELECT * FROM Users WHERE surname LIKE '%o%';

UPDATE Users SET email = 'tomfox@ukr.net' WHERE name = 'Tom';

DELETE FROM Users WHERE id=3;

SELECT Tasks.name, Tasks.deadline FROM Tasks WHERE EXTRACT(DAY FROM Tasks.deadLine) BETWEEN 2 and 8;

UPDATE Tasks SET deadLine = deadline + 2 WHERE EXTRACT(DAY FROM deadLine) BETWEEN 5 and 8;

UPDATE Tasks SET salary = salary * 1.2 WHERE name = 'task2';