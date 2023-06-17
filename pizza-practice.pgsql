CREATE TYPE product_type AS ENUM ('pizza', 'additive');
DROP TABLE Products, Manufacturers, Clients, Orders, Products_to_manufacturers, Products_to_orders;
CREATE TABLE Products(
  id serial PRIMARY KEY,
  type product_type NOT NULL,
  name varchar(100) NOT NULL,
  description text
);

CREATE TABLE Clients(
  id serial PRIMARY KEY,
  name varchar(100) NOT NULL,
  tel varchar(13) UNIQUE NOT NULL,
  email varchar(100) UNIQUE,
  card varchar(16) UNIQUE,
  discount integer CHECK(discount <= 100 AND discount >= 0)
);

CREATE TABLE Manufacturers(
  id serial PRIMARY KEY,
  name varchar(100) UNIQUE NOT NULL,
  gain numeric(3,2) NOT NULL CHECK(gain <= 100 AND gain >= 0)
);

CREATE TABLE Orders(
  id serial PRIMARY KEY,
  id_manufacturer integer REFERENCES Manufacturers(id) ON DELETE SET NULL ON UPDATE CASCADE,
  id_clients integer REFERENCES Clients(id) ON DELETE SET NULL ON UPDATE CASCADE,
  totalSum money CHECK(totalSum >= money(0)) DEFAULT 0,
  dateOrder date DEFAULT now()
);

CREATE TABLE Products_to_orders(
  id_order integer REFERENCES Orders(id) ON DELETE SET NULL ON UPDATE CASCADE,
  id_product integer REFERENCES Products(id) ON DELETE SET NULL ON UPDATE CASCADE,
  count integer NOT NULL DEFAULT 1 CHECK (count > 0)
);

CREATE TABLE Products_to_manufacturers(
  id_product integer REFERENCES Products(id) ON DELETE SET NULL ON UPDATE CASCADE,
  id_manufacturer integer REFERENCES Manufacturers(id) ON DELETE SET NULL ON UPDATE CASCADE,
  weight integer NOT NULL CHECK (weight > 0),
  price money NOT NULL CHECK (price > money(0))
);

INSERT INTO Products(type, name) VALUES
('pizza', 'pizza name#1'), ('pizza', 'pizza name#2'), ('pizza', 'pizza name#3'), 
('pizza', 'pizza name#4'), ('pizza', 'pizza name#5'), ('pizza', 'pizza name#6'),
('additive', 'additive name#1'), ('additive', 'additive name#2'), 
('additive', 'additive name#3'), ('additive', 'additive name#4');

INSERT INTO Manufacturers(name, gain) VALUES
('Pizzeria #1', 5.5),
('Pizzeria #2', 7),
('Pizzeria #3', 2.5),
('Pizzeria #4', 6.5);

INSERT INTO Clients(name, tel) VALUES
('Smith', '+380634653298'), ('Williams', '+380961327645'), ('Pratt', '+380501536880'), 
('Spencer', '+380996450723'), ('Hollie', '+380674236590'), ('Wade', '+380970321654');

INSERT INTO Orders (id_manufacturer, id_clients) VALUES
((SELECT id FROM Manufacturers WHERE name = 'Pizzeria #1'), (SELECT id FROM Clients WHERE name = 'Smith')),
((SELECT id FROM Manufacturers WHERE name = 'Pizzeria #2'), (SELECT id FROM Clients WHERE name = 'Williams')),
((SELECT id FROM Manufacturers WHERE name = 'Pizzeria #3'), (SELECT id FROM Clients WHERE name = 'Hollie')),
((SELECT id FROM Manufacturers WHERE name = 'Pizzeria #1'), (SELECT id FROM Clients WHERE name = 'Hollie')),
((SELECT id FROM Manufacturers WHERE name = 'Pizzeria #4'), (SELECT id FROM Clients WHERE name = 'Wade')),
((SELECT id FROM Manufacturers WHERE name = 'Pizzeria #2'), (SELECT id FROM Clients WHERE name = 'Spencer')),
((SELECT id FROM Manufacturers WHERE name = 'Pizzeria #3'), (SELECT id FROM Clients WHERE name = 'Williams')),
((SELECT id FROM Manufacturers WHERE name = 'Pizzeria #4'), (SELECT id FROM Clients WHERE name = 'Pratt')),
((SELECT id FROM Manufacturers WHERE name = 'Pizzeria #2'), (SELECT id FROM Clients WHERE name = 'Smith')),
((SELECT id FROM Manufacturers WHERE name = 'Pizzeria #1'), (SELECT id FROM Clients WHERE name = 'Hollie'));

INSERT INTO Products_to_orders VALUES
(3, (SELECT id FROM Products WHERE name = 'pizza name#1'), 1), (2, (SELECT id FROM Products WHERE name = 'pizza name#2'), 3), 
(4, (SELECT id FROM Products WHERE name = 'pizza name#3'), 1), (1, (SELECT id FROM Products WHERE name = 'pizza name#4'), 2), 
(5, (SELECT id FROM Products WHERE name = 'pizza name#3'), 4), (6, (SELECT id FROM Products WHERE name = 'pizza name#1'), 1), 
(3, (SELECT id FROM Products WHERE name = 'additive name#1'), 2), (2, (SELECT id FROM Products WHERE name = 'additive name#1'), 2),
(5, (SELECT id FROM Products WHERE name = 'additive name#4'), 1), (6, (SELECT id FROM Products WHERE name = 'additive name#3'), 1);

INSERT INTO Products_to_manufacturers VALUES
-- pizza1
((SELECT id FROM Products WHERE name = 'pizza name#1'), 1, 560, 120),
((SELECT id FROM Products WHERE name = 'pizza name#1'), 2, 520, 125),
((SELECT id FROM Products WHERE name = 'pizza name#1'), 3, 540, 130),
((SELECT id FROM Products WHERE name = 'pizza name#1'), 4, 580, 140),
-- pizza2
((SELECT id FROM Products WHERE name = 'pizza name#2'), 1, 480, 80),
((SELECT id FROM Products WHERE name = 'pizza name#2'), 2, 500, 105),
((SELECT id FROM Products WHERE name = 'pizza name#2'), 3, 490, 90),
((SELECT id FROM Products WHERE name = 'pizza name#2'), 4, 520, 110),
-- pizza3
((SELECT id FROM Products WHERE name = 'pizza name#3'), 1, 560, 120),
((SELECT id FROM Products WHERE name = 'pizza name#3'), 2, 520, 125),
((SELECT id FROM Products WHERE name = 'pizza name#3'), 3, 540, 130),
((SELECT id FROM Products WHERE name = 'pizza name#3'), 4, 580, 140),
-- pizza4
((SELECT id FROM Products WHERE name = 'pizza name#4'), 1, 550, 125),
((SELECT id FROM Products WHERE name = 'pizza name#4'), 2, 540, 115),
((SELECT id FROM Products WHERE name = 'pizza name#4'), 3, 560, 130),
((SELECT id FROM Products WHERE name = 'pizza name#4'), 4, 520, 100),

-- additive1
((SELECT id FROM Products WHERE name = 'additive name#1'), 1, 60, 20),
((SELECT id FROM Products WHERE name = 'additive name#1'), 2, 40, 15),
((SELECT id FROM Products WHERE name = 'additive name#1'), 3, 50, 17),
((SELECT id FROM Products WHERE name = 'additive name#1'), 4, 45, 20),

-- additive2
((SELECT id FROM Products WHERE name = 'additive name#2'), 1, 20, 7),
((SELECT id FROM Products WHERE name = 'additive name#2'), 2, 15, 6),
((SELECT id FROM Products WHERE name = 'additive name#2'), 3, 25, 10),
((SELECT id FROM Products WHERE name = 'additive name#2'), 4, 35, 15),

-- additive3
((SELECT id FROM Products WHERE name = 'additive name#3'), 1, 50, 25),
((SELECT id FROM Products WHERE name = 'additive name#3'), 2, 55, 28),
((SELECT id FROM Products WHERE name = 'additive name#3'), 3, 45, 23),
((SELECT id FROM Products WHERE name = 'additive name#3'), 4, 40, 20),

-- additive4
((SELECT id FROM Products WHERE name = 'additive name#4'), 1, 100, 40),
((SELECT id FROM Products WHERE name = 'additive name#4'), 2, 90, 35),
((SELECT id FROM Products WHERE name = 'additive name#4'), 3, 110, 37),
((SELECT id FROM Products WHERE name = 'additive name#4'), 4, 80, 25);

SELECT * FROM Products WHERE name LIKE 'pizza%';

SELECT * FROM Products WHERE name LIKE 'additive%';

SELECT * FROM Clients;

SELECT * FROM Manufacturers;

SELECT id_clients, id_manufacturer, totalSum, dateOrder FROM Orders;

SELECT M.name, C.name, C.tel, C.email, O.totalSum, O.dateOrder
FROM Orders AS O
INNER JOIN Manufacturers AS M ON M.id = O.id_manufacturer
INNER JOIN Clients AS C ON C.id = O.id_clients;

-- order1

SELECT M.name, C.name, C.tel, C.email, O.totalSum, O.dateOrder
FROM Orders AS O
INNER JOIN Manufacturers AS M ON M.id = O.id_manufacturer
INNER JOIN Clients AS C ON C.id = O.id_clients
WHERE O.id = 1;

SELECT PTO.id_order, PTO.id_product, PTO.count
FROM Products_to_orders AS PTO
WHERE PTO.id_order = 1;

SELECT PTO.id_order, P.type, P.name, PTO.count
FROM Products_to_orders AS PTO
INNER JOIN Products AS P ON P.id = PTO.id_product
WHERE PTO.id_order = 1;