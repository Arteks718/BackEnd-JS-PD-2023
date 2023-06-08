CREATE TABLE Discipline(
  id serial PRIMARY KEY,
  name varchar(100) NOT NULL CHECK(char_length(name) > 1),
  description text NOT NULL,
  numberOfHours integer NOT NULL CHECK(numberOfHours > 10)
)

CREATE TABLE Exam(
  id serial PRIMARY KEY,
  fullNameStudent varchar(255) NOT NULL,
  disciplinePassedId integer REFERENCES Discipline(id),
  grade integer NOT NULL,
  dueDate date DEFAULT now()
)

-- 1
INSERT INTO Discipline (name, description, numberOfHours) VALUES
('data base', 'database discipline', 60),
('OOP', 'object oriented programming', 80),
('web development', 'learn HTML, CSS, JS', 70),
('algorithms', 'learn various algorithms', 40),
('1C', 'useless discipline', 30);

INSERT INTO Exam (fullNameStudent, disciplinePassedId, grade) VALUES
('Test1 Testovich1', 1, 4),
('Tom Fox', 1, 5),
('Tom Fox', 2, 3),
('Tom Fox', 4, 4),
('John Merphy', 3, 3),
('Elizabeth Smith', 2, 4),
('Olga Sladkova', 4, 5),
('Gregory Dezi', 5, 3);

-- 2
SELECT * FROM discipline;

-- 3
SELECT Exam.fullnamestudent, discipline.name FROM Discipline, Exam WHERE Exam.disciplinePassedId=1 AND Discipline.id = Exam.disciplinePassedId;

-- 4
SELECT Exam.fullnamestudent, discipline.name, Exam.grade, Exam.duedate FROM Discipline, Exam WHERE Exam.grade = 5 AND Discipline.id = Exam.disciplinePassedId;

-- 5
SELECT Exam.fullNameStudent, Discipline.name FROM Discipline, Exam WHERE Exam.fullnamestudent = 'Tom Fox' AND Discipline.id = Exam.disciplinePassedId;

-- 6
SELECT * FROM Discipline WHERE numberOfHours >= 40;

-- 7
UPDATE Discipline SET numberOfHours = 20 WHERE name='1C';

-- 8
DELETE FROM discipline WHERE name='1C';
