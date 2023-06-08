CREATE TABLE Groups(
  id serial PRIMARY KEY,
  name varchar(100) NOT NULL
)
DROP TABLE GROUPS

CREATE TABLE Roles(
  id serial PRIMARY KEY,
  name varchar(100) NOT NULL,
  description text,
  idGroup integer REFERENCES Groups(id) ON DELETE SET NULL ON UPDATE CASCADE
)
DROP TABLE ROLES

CREATE TABLE Users(
  id serial,
  email varchar(255) NOT NULL UNIQUE,
  login varchar(255) NOT NULL UNIQUE,
  passwordHash text NOT NULL,
  fullName varchar(255) NOT NULL,
  idRole integer REFERENCES Roles(id) ON DELETE SET NULL ON UPDATE CASCADE
)
DROP TABLE USERS

INSERT INTO Groups (name) VALUES
('users_dev'), ('users_home'), ('users_main'), ('moderator'), ('admin');

INSERT INTO Roles (name, idGroup) VALUES
('trainee', 1), ('junior', 1), ('middle', 1), ('senior', 1),
('unknown', 2), ('guest', 3), ('moderator_db', 4), ('moderator_net', 4), ('moderator_pro', 4),
('admin_db', 5), ('admin_net', 5), ('admin_pro', 5);

INSERT INTO Users(email, login, passwordHash, fullName, idRole) VALUES
('test1@example.com', 'test1', 'test1password1', 'test1fullname', 1),
('test2@example.com', 'test2', 'test2password2', 'test2fullname', 2),
('test3@example.com', 'test3', 'test3password3', 'test3fullname', 3),
('test4@example.com', 'test4', 'test4password4', 'test4fullname', 2),
('test5@example.com', 'test5', 'test5password5', 'test5fullname', 7),
('test6@example.com', 'test6', 'test6password6', 'test6fullname', 4),
('test7@example.com', 'test7', 'test7password7', 'test7fullname', 5),
('test8@example.com', 'test8', 'test8password8', 'test8fullname', 3),
('test9@example.com', 'test9', 'test9password9', 'test9fullname', 7),
('test10@example.com', 'test10', 'test10password10', 'test10fullname', 11),
('test11@example.com', 'test11', 'test11password11', 'test11fullname', 12),
('test12@example.com', 'test12', 'test12password12', 'test12fullname', 10),
('tes139@example.com', 'test13', 'test13password13', 'test13fullname', 9);

SELECT * FROM Roles;

SELECT Groups.name, Roles.name FROM Roles, Groups WHERE Groups.name = 'users_dev' AND Groups.id = Roles.idGroup;

SELECT Roles.name, Users.email, Users.login, Users.fullName FROM Roles, Users WHERE Roles.name = 'trainee' AND Roles.id = Users.idRole;

SELECT Roles.name, Users.email, Users.login FROM Groups, Roles, Users WHERE Groups.name = 'users_dev' AND Groups.id = Roles.idGroup AND Roles.id = Users.idRole;

SELECT * FROM Groups, Roles, Users WHERE Groups.id = Roles.idGroup AND Roles.id = Users.idRole OFFSET 0 LIMIT 5;

SELECT Groups.name, Roles.name FROM Groups, Roles WHERE Groups.id = Roles.idGroup ORDER BY Groups.name;

SELECT * FROM Users WHERE login LIKE '%test1%';

SELECT Groups.name, Roles.name, Users.email, Users.fullname FROM Groups, Roles, Users WHERE Groups.id = Roles.idGroup AND Roles.id = Users.idRole ORDER BY Groups.name LIMIT 10 OFFSET 0;

CREATE TABLE Product(
  id serial PRIMARY KEY,
  name varchar(100) NOT NULL,
  price money CHECK(price >= money(0)) NOT NULL
)

CREATE TABLE Sales(
  id serial PRIMARY KEY,
  dateSale date DEFAULT now(),
  idProduct integer REFERENCES Product(id) ON DELETE SET NULL ON UPDATE CASCADE,
  countProduct integer DEFAULT 1 CHECK(countProduct >= 1) NOT NULL,
  sumProduct money DEFAULT (money(0)) CHECK(sumProduct >= money(0)) NOT NULL
)

INSERT INTO Product(name, price) VALUES
('хліб білий', 20), ('хліб чорний', 22), ('молоко простоквашино', 35), ('молоко селянське', 32), ('шоколад чорний', 30), ('шоколад молочний', 40), ('сир', 15);


INSERT INTO Sales (dateSale, idProduct, countProduct) VALUES
('2023-03-10', 1, 5),
('2023-03-12', 2, 2),
('2023-04-05', 4, 7),
('2023-04-10', 2, 2),
('2023-04-17', 6, 3),
('2023-04-20', 1, 5),
('2023-05-15', 1, 5),
('2023-05-20', 1, 5),
(now(), 3, 4),
(now(), 7, 20),
(now(), 6, 15),
(now(), 5, 12),
(now(), 6, 13),
(now(), 4, 10),
(now(), 2, 5);

UPDATE Sales
SET sumProduct = Sales.countProduct * Product.price
FROM Product
WHERE Sales.idProduct = Product.id;

SELECT * FROM Sales;

SELECT * FROM Sales WHERE dateSale = now();

UPDATE Sales
SET sumProduct = money(0)
WHERE Sales.id = 2;

UPDATE Sales
SET sumProduct = Sales.countProduct * Product.price
FROM Product
WHERE Sales.idProduct = Product.id AND Sales.id = 2;