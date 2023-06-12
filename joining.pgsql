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

/*Connection Many to Many */

CREATE TABLE Products(
  id serial PRIMARY KEY,
  name varchar(100) NOT NULL,
  description text,
  price money CHECK(price >= money(0)) NOT NULL
);

CREATE TABLE Orders(
  id serial PRIMARY KEY,
  dateSale date DEFAULT now() NOT NULL,
  totalSum money DEFAULT money(0) NOT NULL,
  sale integer DEFAULT 0
);

CREATE TABLE Cheque(
  id serial PRIMARY KEY,
  idOrder integer REFERENCES Orders(id) ON DELETE SET NULL ON UPDATE CASCADE,
  idProduct integer REFERENCES Products(id) ON DELETE SET NULL ON UPDATE CASCADE,
  countProduct integer DEFAULT 1,
  sumProduct money DEFAULT money(0)
);

INSERT INTO Products (name, price) VALUES
('product1', 101), ('product2', 200), ('product3', 80), ('product4', 60), 
('product5', 150), ('product6', 130), ('product7', 190);

INSERT INTO Orders (dateSale) VALUES
('01.06.2023'), ('04.06.2023'), ('03.06.2023'), ('02.06.2023'), ('01.06.2023'), ('07.06.2023'),
('09.06.2023'), ('10.06.2023'), ('02.06.2023'), ('03.06.2023'), ('06.06.2023'), ('08.06.2023'),
('11.06.2023'), ('03.06.2023'), ('04.06.2023'), ('05.06.2023'), ('08.06.2023'), ('05.06.2023');

INSERT INTO Cheque (idOrder, idProduct, countProduct) VALUES
(13, 1, 12), (3, 4, 4), (5, 4, 3), (14, 5, 10), (18, 6, 8), (10, 3, 6),
(5, 6, 13), (7, 5, 3), (6, 2, 7), (12, 1, 4), (5, 2, 12), (16, 7, 20), 
(9, 4, 12), (12, 6, 14), (10, 3, 15), (4, 3, 2), (11, 5, 12), (2, 2, 4);

SELECT * FROM ORDERS;
SELECT * From Cheque;
SELECT * From Products;

DROP TABLE Cheque, Products, Orders;
DELETE FROM Cheque;
DELETE FROM Products;
DELETE FROM Orders;

UPDATE Cheque as C
SET sumProduct = Res.sumP
FROM Cheque,
  (SELECT C.id, C.idOrder, (C.countProduct * P.price) as sumP
  FROM Cheque as C
  JOIN Products as P ON P.id = C.idProduct
  GROUP BY C.id, C.idOrder, C.countProduct, P.price) as Res
WHERE Res.idorder = C.idOrder and C.id = Res.id;

/*Aggregate*/

-- count
SELECT idOrder, count(countproduct)
FROM Cheque
GROUP BY idOrder
ORDER BY idOrder;

--sum
SELECT idOrder, sum(countproduct)
FROM Cheque
GROUP BY idOrder
ORDER BY idOrder;

--max
SELECT idOrder, max(countproduct), idProduct
FROM Cheque
GROUP BY idOrder, idProduct
ORDER BY idOrder;

SELECT idOrder, sum(sumProduct)
FROM Cheque
GROUP BY idOrder;

UPDATE Orders AS OD
SET totalSum = Res.total
FROM Orders,
  (SELECT C.idOrder, sum(C.sumproduct) as total
  FROM Cheque AS C
  GROUP BY C.idOrder) AS Res
WHERE Res.idOrder = OD.id;

CREATE TABLE Goods(
  id serial PRIMARY KEY,
  name varchar(100) NOT NULL,
  category varchar(64) NOT NULL,
  price money CHECK(price >= money(0)) NOT NULL,
  count integer DEFAULT 1 NOT NULL
);

INSERT INTO Goods (name, category, price, count) VALUES
('product1', 'category1', 1000, 10),
('product2', 'category2', 800, 15),
('product3', 'category2', 1500, 8),
('product4', 'category4', 400, 20),
('product5', 'category1', 1200, 13),
('product6', 'category4', 900, 17),
('product7', 'category2', 1800, 14),
('product8', 'category3', 600, 25),
('product9', 'category1', 1700, 19),
('product10', 'category4', 1450, 14);

DROP TABLE Goods;

SELECT category, count(name)
FROM Goods
GROUP BY category;

SELECT category, sum(Goods.count) as totalCount
FROM Goods
WHERE price >= money(1000)
GROUP BY ROLLUP(category)
HAVING sum(Goods.count) >= 20
ORDER BY category, totalCount;

/*
CREATE TABLE Tasks(
  id serial PRIMARY KEY,
  name varchar(100) NOT NULL,
  date date DEFAULT now(),
  idUser integer REFERENCES Users(id) ON DELETE SET NULL ON UPDATE CASCADE
);
*/

INSERT INTO Tasks (name, date, idUser) VALUES
('task7', '10.06.2023', 1), ('task9', '06.06.2023' ,3), ('task11', '07.06.2023', 4), ('task10', '08.06.2023', 4);


SELECT Tasks.date, count(Tasks.id)
FROM Tasks
GROUP BY Tasks.date
HAVING count(Tasks.id) > 1;