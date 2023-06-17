DROP TABLE Products, Sales, Cheque;
CREATE TABLE Products(
  id serial PRIMARY KEY,
  name varchar(255) NOT NULL,
  price money NOT NULL CHECK(price > money(0))
);

CREATE TABLE Sales(
  id serial PRIMARY KEY,
  dateSale date DEFAULT now(),
  totalSum money NOT NULL CHECK(totalSum >= money(0)) DEFAULT money(0)
);

CREATE TABLE Cheque(
  id serial PRIMARY KEY,
  id_sale integer REFERENCES Sales(id) ON DELETE SET NULL ON UPDATE CASCADE,
  id_Product integer REFERENCES Products(id) ON DELETE SET NULL ON UPDATE CASCADE,
  count_Product integer NOT NULL CHECK(count_Product > 0) DEFAULT 1,
  sum_Product money NOT NULL CHECK(sum_Product >= money(0)) DEFAULT money(0)
);

INSERT INTO Products (name, price) VALUES
('Monitor', 5000), ('Scaner', 3000), ('Printer', 4000), ('Computer mouse', 800), ('Keyboard', 1500), ('Router', 1200), ('Smartphone', 8000), ('Laptop Asus', 15000), ('Laptop Aser', 17200), ('Laptop MSI', 20000), ('Laptop Apple', 35000), ('TV', 10000);

INSERT INTO Sales (dateSale) VALUES
('09.06.2023'), ('10.06.2023'), ('10.06.2023'), ('12.06.2023'), ('13.06.2023'), 
('15.06.2023'), ('15.06.2023'), ('16.06.2023'), ('16.06.2023'), ('14.06.2023');

INSERT INTO Cheque (id_sale, id_Product, count_Product) VALUES
(3, (SELECT id FROM Products WHERE name = 'Monitor'), 4), (4, (SELECT id FROM Products WHERE name = 'Keyboard'), 2), (1, (SELECT id FROM Products WHERE name = 'TV'), 1),
(10, (SELECT id FROM Products WHERE name = 'Printer'), 3), (3, (SELECT id FROM Products WHERE name = 'Router'), 2), (5, (SELECT id FROM Products WHERE name = 'Laptop'), 3),
(6, (SELECT id FROM Products WHERE name = 'Computer mouse'), 6), (1, (SELECT id FROM Products WHERE name = 'Computer mouse'), 1), (4, (SELECT id FROM Products WHERE name = 'Scaner'), 1), 
(4, (SELECT id FROM Products WHERE name = 'Printer'), 1);

INSERT INTO Cheque (id_sale, id_Product, count_Product) VALUES
(8, (SELECT id FROM Products WHERE name = 'Keyboard'), 3);

UPDATE Cheque AS C
SET sum_Product = Res.sumP
FROM Cheque, 
(SELECT C.id, C.id_sale, (C.count_Product * P.price) AS sumP FROM Cheque AS C INNER JOIN Products AS P ON P.id = C.id_Product) AS Res
WHERE Res.id_sale = C.id_sale AND Res.id = C.id;

UPDATE Sales AS S
SET totalSum = Res.total
FROM Sales,
  (SELECT C.id_sale, sum(C.sum_Product) AS total
  FROM Cheque AS C
  GROUP BY C.id_Sale) AS Res
WHERE Res.id_sale = S.id;

--  2
SELECT Cheque.id_sale, Products.name, Cheque.count_product, Cheque.sum_product
FROM Cheque
INNER JOIN Products ON Products.id = Cheque.id_product
WHERE id_sale = 4;

SELECT Products.name, Sales.totalSum FROM Cheque
INNER JOIN Products ON Cheque.id_product = Products.id
INNER JOIN Sales ON Cheque.id_sale = Sales.id;

-- 3
SELECT name FROM Products WHERE name LIKE 'Laptop%';

-- 4
SELECT name, price FROM Products WHERE price <= money(10000);

-- 5
SELECT count(id) FROM Sales WHERE EXTRACT(DAY FROM dateSale) BETWEEN EXTRACT(DAY FROM now()) - 5 AND EXTRACT(DAY FROM now());

-- 6
SELECT sum(totalSum) FROM Sales WHERE EXTRACT(DAY FROM dateSale) = EXTRACT(DAY FROM now());

-- 7
SELECT count(id) FROM Sales WHERE EXTRACT(DAY FROM dateSale) = EXTRACT(DAY FROM now());