DROP TABLE Users;

CREATE TABLE Users(
  id serial PRIMARY KEY,
  login varchar(64) NOT NULL,
  passwordHash text NOT NULL,
  role Roles
);

INSERT INTO Users(fullName, langs) VALUES
('Daniel Smith', '{"ua", "eng", "sp"}'),
('Megan Miller', '{"eng", "pl", "de"}');

SELECT langs[2] FROM Users;

UPDATE Users SET langs = '{"ua", "pl", "de"}' WHERE id = 2;

UPDATE Users SET langs[2] = 'eng' WHERE id = 2;

CREATE TYPE Roles AS ENUM ('admin', 'moderator', 'helper', 'user', 'guest');

INSERT INTO Users(login, passwordHash, role) VALUES
('Jacob', 'qwerty', 'moderator'),
('Megan', 'ytrewq', 'admin'),
('John', 'sertdg', 'user'),
('David', 'qwsazxc', 'helper');

UPDATE Users SET role = 'guest' WHERE id = 3;

ALTER TYPE Roles
ADD VALUE 'anon';