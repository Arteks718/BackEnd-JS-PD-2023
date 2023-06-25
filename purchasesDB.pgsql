DROP TABLE Supplies, Providers, Employees, Contents, Products, Categories, Employees, Positions

--Закупки
CREATE TABLE Supplies(
  id serial PRIMARY KEY,
  date timestamp DEFAULT now(),
  id_provider integer REFERENCES Providers(id) ON DELETE SET NULL ON UPDATE CASCADE,
  id_employee integer REFERENCES Providers(id) ON DELETE SET NULL ON UPDATE CASCADE,
  total_sum money DEFAULT 0 CHECK(total_sum >= money(0))
);

--Состав закупки
CREATE TABLE Contents(
  id_supply integer REFERENCES Supplies(id) ON DELETE SET NULL ON UPDATE CASCADE,
  id_product integer REFERENCES Products(id) ON DELETE SET NULL ON UPDATE CASCADE,
  counts integer CHECK(counts >= 0),
  supply_price money CHECK(supply_price > money(0))
);

CREATE TABLE Products(
  id serial PRIMARY KEY,
  name varchar(100) NOT NULL,
  id_category integer REFERENCES Categories(id) ON DELETE SET NULL ON UPDATE CASCADE,
  sale_price money CHECK(sale_price >= money(0))
);

ALTER TABLE Products ADD COLUMN markup integer CHECK(markup>0)
SELECT * FROM Products;
UPDATE Products SET markup = 10 WHERE id = 5;
CREATE TABLE Categories(
  id serial PRIMARY KEY,
  name varchar(100) NOT NULL,
  description text
);

CREATE TABLE Employees(
  id serial PRIMARY KEY,
  name varchar(64) NOT NULL,
  surname varchar(64) NOT NULL,
  id_position integer REFERENCES Positions(id) ON DELETE SET NULL ON UPDATE CASCADE,
  staff_id varchar(30) NOT NULL,
  personal_info text
);

CREATE TABLE Positions(
  id serial PRIMARY KEY,
  name varchar(100) NOT NULL,
  salary money NOT NULL CHECK(salary > money(0)),
  percent_of_sales integer DEFAULT 5
);

CREATE TABLE Providers(
  id serial PRIMARY KEY,
  name varchar(100) NOT NULL,
  phone_number char(13) NOT NULL UNIQUE CHECK(length(phone_number) = 13),
  email varchar(100) UNIQUE,
  bank_account char(20) CHECK(length(bank_account) = 20),
  additional_info text
);

ALTER TABLE Contents ADD COLUMN supply_sum money CHECK(supply_price >= money(0))

ALTER TABLE Contents DROP column supply_sum;

INSERT INTO Positions (name, salary) VALUES
('manager', 15000), ('operator', 12000), ('designer', 18000), ('programmer', 20000), ('HR', 16000);

INSERT INTO Employees (name, surname, id_position, staff_id) VALUES
('John', 'Singh', (SELECT id FROM Positions WHERE name = 'manager'), '51232'),
('Tom', 'Fox', (SELECT id FROM Positions WHERE name = 'designer'), '51200'),
('Chris', 'Evans', (SELECT id FROM Positions WHERE name = 'programmer'), '51215'),
('Test', 'Testovich', (SELECT id FROM Positions WHERE name = 'operator'), '51210'),
('Name', 'Namovich', (SELECT id FROM Positions WHERE name = 'HR'), '51227');

INSERT INTO Providers (name, phone_number, bank_account) VALUES
('provider1', '+380631326532', '12345678901234567890'),
('provider2', '+380965436512', '12345678901234567891'),
('provider3', '+380505438754', '12345678901234567892'),
('provider4', '+380995873421', '12345678901234567893'),
('provider5', '+380979784321', '12345678901234567894');

INSERT INTO Categories (name) VALUES
('categories1'), ('categories2'), ('categories3'), ('categories4'), ('categories5');

INSERT INTO Products (name, id_category) VALUES
('product 1', (SELECT id FROM Categories WHERE name = 'categories2')),
('product 2', (SELECT id FROM Categories WHERE name = 'categories1')),
('product 3', (SELECT id FROM Categories WHERE name = 'categories2')),
('product 4', (SELECT id FROM Categories WHERE name = 'categories3')),
('product 5', (SELECT id FROM Categories WHERE name = 'categories4'));

SELECT * FROM Products;

INSERT INTO Supplies(id_provider, id_employee) VALUES
((SELECT id FROM Providers WHERE name = 'provider1'), (SELECT id FROM Employees WHERE staff_id = '51200')),
((SELECT id FROM Providers WHERE name = 'provider2'), (SELECT id FROM Employees WHERE staff_id = '51232')),
((SELECT id FROM Providers WHERE name = 'provider3'), (SELECT id FROM Employees WHERE staff_id = '51200')),
((SELECT id FROM Providers WHERE name = 'provider1'), (SELECT id FROM Employees WHERE staff_id = '51215')),
((SELECT id FROM Providers WHERE name = 'provider4'), (SELECT id FROM Employees WHERE staff_id = '51227')),
((SELECT id FROM Providers WHERE name = 'provider3'), (SELECT id FROM Employees WHERE staff_id = '51200')),
((SELECT id FROM Providers WHERE name = 'provider2'), (SELECT id FROM Employees WHERE staff_id = '51232')),
((SELECT id FROM Providers WHERE name = 'provider4'), (SELECT id FROM Employees WHERE staff_id = '51200')),
((SELECT id FROM Providers WHERE name = 'provider1'), (SELECT id FROM Employees WHERE staff_id = '51215')),
((SELECT id FROM Providers WHERE name = 'provider1'), (SELECT id FROM Employees WHERE staff_id = '51227'));

INSERT INTO Contents(id_supply, id_product, counts, supply_price) VALUES
(1, 1, 10, 120),
(1, 2, 8, 100),
(1, 4, 12, 80),
(1, 5, 15, 90),

(2, 1, 18, 125),
(2, 2, 9, 108),

(3, 3, 4, 90),
(3, 4, 6, 80),
(3, 5, 9, 85);

INSERT INTO Contents(id_supply, id_product, counts, supply_price) VALUES
(4, 2, 12, 100),
(4, 3, 14, 110),
(4, 1, 15, 90),
(4, 4, 17, 75);

SELECT * FROM Supplies WHERE id=1;

SELECT S.id, S.date, S.total_sum, (SELECT name FROM Positions WHERE Positions.id = E.id_position), concat(E.name, ' ', E.surname), P.name, P.phone_number
FROM Supplies AS S
JOIN providers AS P ON P.id = S.id_provider
JOIN employees AS E ON E.id = S.id_employee
WHERE S.id = 1;

SELECT * FROM Contents
JOIN Products ON Products.id = Contents.id_product
WHERE id_supply = 1;

--Вывести полную информацию о конкретном поставщике
SELECT DISTINCT id FROM Providers WHERE id = 3;
--Вывести список поставщиков с контактными данными
SELECT name, phone_number, email FROM Providers;

--Вывести общую информацию о закупке
SELECT S.id, S.date, Providers.name, employees.name FROM supplies AS S
INNER JOIN Providers ON Providers.id = S.id_provider
INNER JOIN employees ON employees.id = S.id_employee
--Вывести состав закупки
SELECT Contents.id_supply, Products.name, Contents.counts, Contents.supply_price 
FROM Contents 
INNER JOIN Products ON Products.id = Contents.id_product;

--Вывести информацию о товаре включая закупочную цену и цену реалзации
SELECT P.name, C.supply_price, P.markup,P.sale_price, CG.name FROM Contents AS C
INNER JOIN Products AS P ON P.id = C.id_product
INNER JOIN Categories AS CG ON CG.id = P.id_category
--вывести список товаров определенной категории и упорядочить по цене
SELECT P.name, C.name, P.sale_price FROM Products AS P
INNER JOIN Categories AS C ON C.id = P.id_category
WHERE C.id = 2
ORDER BY P.sale_price;

--Вывести список сотрудников с указанием должности
SELECT concat(E.surname,' ',E.name), P.name, E.staff_id, P.salary FROM Employees AS E
INNER JOIN Positions AS P ON P.id = E.id_position
--вывести список операторов
SELECT concat(E.surname,' ',E.name), P.name, E.staff_id, P.salary FROM Employees AS E
INNER JOIN Positions AS P ON P.id = E.id_position
WHERE P.name = 'operator'

--вычислить цену реализации товара Products.sale_price
UPDATE Products SET sale_price = Res.sp
FROM Products AS P,
(SELECT P.id, (C.supply_price * P.markup) as sp FROM Contents AS C
INNER JOIN Products AS P ON P.id = C.id_product) AS Res
WHERE Res.id = P.id

UPDATE Products AS P
SET sale_price = Res.sp
FROM Products,
  (SELECT P.id,(max(C.supply_price) * P.markup) as sp FROM Products AS P
  INNER JOIN Contents AS C ON C.id_product = P.id
  GROUP BY P.id, C.supply_price, P.markup) AS Res
WHERE Res.id = P.id

SELECT * FROM Products;
SELECT * FROM Contents;

SELECT P.id, max((C.supply_price) * P.markup) as sp FROM Products AS P
  INNER JOIN Contents AS C ON C.id_product = P.id
  GROUP BY P.id, C.supply_price, P.markup;

-- сколько поставок сделал каждый поставщик
SELECT id_provider, count(id) FROM Supplies
GROUP BY id_provider;
-- сколько поставок сделал каждый поставщик за текущий месяц
SELECT id_provider, count(id) FROM Supplies
WHERE EXTRACT(MONTH FROM date) = EXTRACT(MONTH FROM now())
GROUP BY id_provider;
-- сколько поставок сделал каждый поставщик за этот год
SELECT id_provider, count(id) FROM Supplies
WHERE EXTRACT(YEAR FROM date) = EXTRACT(YEAR FROM now())
GROUP BY id_provider;
-- сколько товаров в каждой категории
SELECT id_category, count(id) FROM Products
GROUP BY id_category;
-- сколько сотрудников по каждой должности
SELECT id_position, count(id) FROM Employees
GROUP BY id_position;
