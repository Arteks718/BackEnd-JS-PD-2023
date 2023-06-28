DROP TABLE  Orders CASCADE;
CREATE TABLE Products(
  id serial PRIMARY KEY,
  name varchar(128) NOT NULL,
  description text,
  weight numeric(6,2) NOT NULL CHECK(weight > 0),
  price money NOT NULL CHECK (price > money(0))
);
CREATE TABLE Clients(
  id serial PRIMARY KEY,
  fullName varchar(128) NOT NULL,
  phone_number char(13) NOT NULL CHECK(length(phone_number) = 13),
  address text
);

CREATE TABLE Cheque(
  id serial PRIMARY KEY,
  date_sale date DEFAULT now(),
  total_sum money CHECK(total_sum >= money(0)) DEFAULT 0,
  client_id integer NOT NULL
);

CREATE TABLE Orders(
  id serial PRIMARY KEY,
  product_id integer REFERENCES Products(id) ON UPDATE CASCADE ON DELETE SET NULL,
  cheque_id integer REFERENCES Cheque(id) ON UPDATE CASCADE ON DELETE SET NULL,
  count integer NOT NULL CHECK(count > 0),
  sale_price money CHECK (sale_price >= money(0)) DEFAULT 0
);

CREATE TABLE App(
  cheque_id integer REFERENCES Cheque(id) ON UPDATE CASCADE ON DELETE SET NULL,
  total_sum money CHECK(total_sum >= money(0)) DEFAULT 0,
  profit money CHECK(profit >= money(0)) DEFAULT 0
);

INSERT INTO Products(name, weight, price) VALUES
('Філадельфія мікс', 280, 255), ('Філадельфія Лайт', 230, 229), ('Філадельфія Ред', 230, 219), ('Каліфорнія з тигровою креветкою', 210, 179),
('Каліфорнія Голд', 270, 285), ('Сет Vinyl XL', 1450, 749), ('Філадельфія XL', 1200, 899), ('Юджин 3.0', 1100, 789), 
('Тяхан з морепродуктами', 400, 235), ('Локшина по сінгапурські', 450, 219);

INSERT INTO Clients(fullName, phone_number) VALUES
('Chester Gray', '+380637374819'), ('Jesus Jimenez', '+380974704220'), ('Ethel Williams', '+380689041779'), 
('Abigail Rose', '+380956112631'), ('Max Fisher', '+380508250707'), ('Jim Stevens', '+380664016276');

INSERT INTO Cheque (client_id) VALUES
(2), (4), (3), (5), (3), (1);

INSERT INTO Orders(product_id, cheque_id, count) VALUES
(1, 1, 1), (3, 1, 1), (10, 1, 2), ((SELECT id from Products WHERE name = 'Юджин 3.0'), 2, 2), 
((SELECT id from Products WHERE name = 'Філадельфія XL'), 3, 3), ((SELECT id from Products WHERE name = 'Каліфорнія з тигровою креветкою'), 3, 2),
((SELECT id from Products WHERE name = 'Тяхан з морепродуктами'), 4, 1), ((SELECT id from Products WHERE name = 'Локшина по сінгапурські'), 4, 2),
((SELECT id from Products WHERE name = 'Сет Vinyl XL'), 5, 2), ((SELECT id from Products WHERE name = 'Каліфорнія Голд'), 5, 4),
((SELECT id from Products WHERE name = 'Філадельфія мікс'), 6, 1), ((SELECT id from Products WHERE name = 'Філадельфія Лайт'), 6, 1),
((SELECT id from Products WHERE name = 'Філадельфія Ред'), 6, 1), ((SELECT id from Products WHERE name = 'Каліфорнія з тигровою креветкою'), 6, 1);

-- обновление суммы заказа умножением цены на количество
UPDATE Orders
SET sale_price = Res.price
FROM Orders AS O,
  (SELECT O.id, (P.price * O.count) AS price
  FROM Orders AS O
  INNER JOIN Products AS P ON P.id = O.product_id
  GROUP BY O.id, P.price, O.count) AS Res
WHERE Res.id = Orders.id;

-- сумма заказа
UPDATE Cheque
SET total_sum = Res.total
FROM Cheque AS C,
(SELECT O.cheque_id, sum(O.sale_price) AS total
  FROM Cheque AS C
  INNER JOIN Orders AS O ON O.cheque_id = C.id
  GROUP BY O.cheque_id) AS Res
WHERE Res.cheque_id = Cheque.id;

-- Подсчет скидки клиентам при заказе от 1000 грн
UPDATE Cheque SET total_sum = total_sum * (1-0.02) WHERE total_sum >= money(1000);

-- Добавление id таблицы Cheque в таблицу App
INSERT INTO App (cheque_id) (SELECT id FROM Cheque GROUP BY id);

-- Подсчет доли приложения от заказов
UPDATE App SET profit = Res.total_sum * 0.03
FROM App AS A,
  (SELECT id, total_sum FROM Cheque) AS Res
WHERE App.cheque_id = Res.id;

-- состав и стоимость (определенного) заказа
SELECT P.name, O.sale_price FROM Orders AS O 
INNER JOIN Products AS P ON P.id = O.product_id
INNER JOIN Cheque AS C ON C.id = O.cheque_id
WHERE C.id = 3;

-- перечень заказов на сегодня
SELECT P.name, O.count, O.sale_price, C.date_sale FROM Orders AS O
INNER JOIN Cheque AS C ON O.cheque_id = C.id
INNER JOIN Products AS P ON P.id = O.product_id
WHERE C.date_sale = current_date;

-- перечень заказов за неделю
SELECT P.name, O.count, O.sale_price, C.date_sale FROM Orders AS O
INNER JOIN Cheque AS C ON O.cheque_id = C.id
INNER JOIN Products AS P ON P.id = O.product_id
WHERE EXTRACT(DAY FROM C.date_sale) BETWEEN EXTRACT(DAY FROM current_date) - 7 AND EXTRACT(DAY FROM current_date);

-- выручку за день
SELECT sum(total_sum), date_sale FROM Cheque
WHERE date_sale = current_date
GROUP BY date_sale;

-- выручку за месяц (сумма всех заказов за месяц)
SELECT sum(total_sum), date_sale FROM Cheque
WHERE EXTRACT(MONTH FROM date_sale) = EXTRACT(MONTH FROM current_date)
GROUP BY date_sale;

-- список клиентов, которые обслуживались в этом месяце
SELECT Cl.fullname, C.total_sum, C.date_sale FROM Cheque AS C
INNER JOIN Clients AS Cl ON Cl.id = C.client_id
WHERE EXTRACT(MONTH FROM C.date_sale) = EXTRACT(MONTH FROM current_date);

--топ 5 блюд за месяц
SELECT P.name, count(O.cheque_id) FROM Orders AS O
INNER JOIN Products AS P ON P.id = O.product_id
GROUP BY P.name
ORDER BY count(O.cheque_id) DESC
LIMIT 5;

--Ваш доход от продаж за месяц
SELECT sum(profit) FROM App
INNER JOIN Cheque ON App.cheque_id = Cheque.id
WHERE EXTRACT(MONTH FROM Cheque.date_sale) = EXTRACT(MONTH FROM current_date);