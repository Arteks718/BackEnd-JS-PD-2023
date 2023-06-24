DROP TABLE Supplies, Providers, Employees, Contents, Products, Categories, Employees, Positions

CREATE TABLE Supplies(
  id serial PRIMARY KEY,
  date timestamp DEFAULT now(),
  id_provider integer REFERENCES Providers(id) ON DELETE SET NULL ON UPDATE CASCADE,
  id_employee integer REFERENCES Providers(id) ON DELETE SET NULL ON UPDATE CASCADE,
  total_sum money DEFAULT 0 CHECK(total_sum >= money(0))
);

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