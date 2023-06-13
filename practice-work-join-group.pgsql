DROP TABLE Exams, Students, Courses

CREATE TABLE Courses(
  id serial PRIMARY KEY,
  title varchar(255) NOT NULL,
  discription text,
  hours integer NOT NULL CHECK(hours >= 10)
);

CREATE TABLE Students(
  id serial PRIMARY KEY,
  name varchar(255) NOT NULL,
  surname varchar(255) NOT NULL
);

CREATE TABLE Exams(
  id_stud integer REFERENCES Students(id) ON DELETE SET NULL ON UPDATE CASCADE,
  id_course integer REFERENCES Courses(id) ON DELETE SET NULL ON UPDATE CASCADE,
  mark integer NOT NULL CHECK(mark > 0)
);

INSERT INTO Courses (title, hours) VALUES
('Math', 30), ('Physics', 40), ('Music', 25), ('Chemistry', 40), ('IT', 40), ('Biology', 35), ('History', 30);

INSERT INTO Students (name, surname) VALUES
('Genry', 'Watson'), ('John', 'Wither'), ('Tom', 'Smith'), ('Elizabeth', 'Snow'), ('Catherine', 'Georgetta');

INSERT INTO Exams VALUES (1, 3, 4), (3, 2, 4), (2, 5, 3), (2, 4, 4), (5, 7, 5), (4, 6, 5);
INSERT INTO Exams VALUES (2, 1, 3), (3, 1, 3), (4, 2, 4), (5, 6, 4), (4, 7, 5), (1, 3, 2), (1, 4, 4), (2, 3, 5), (4, 3, 4);

-- 1
SELECT * FROM Students;

-- 2
SELECT * FROM Courses;

-- 3
SELECT * FROM Exams INNER JOIN Courses ON Courses.id = Exams.id_course JOIN Students ON Students.id = Exams.id_stud WHERE Courses.title = 'IT';

-- 4
SELECT concat(Students.surname, ' ', Students.name), Exams.mark FROM Exams INNER JOIN Students ON Students.id = Exams.id_stud;

-- 5
SELECT concat(Students.surname, ' ', Students.name), Courses.title FROM Exams 
INNER JOIN Students ON Students.id = Exams.id_stud
INNER JOIN Courses ON Courses.id = Exams.id_course
WHERE Students.id = 3;

-- 6
SELECT * FROM Courses WHERE hours >= 40;

-- 7
SELECT concat(Students.surname, ' ', Students.name), round(avg(Exams.mark), 2) FROM Exams INNER JOIN Students ON Students.id = Exams.id_stud GROUP BY Students.id;

-- 8
SELECT Courses.title, max(Exams.mark) 
FROM Exams 
INNER JOIN Courses ON Courses.id = Exams.id_course 
INNER JOIN Students ON Students.id = Exams.id_stud
GROUP BY Courses.title;

-- 9
SELECT Courses.title, min(Exams.mark) 
FROM Exams 
INNER JOIN Courses ON Courses.id = Exams.id_course 
INNER JOIN Students ON Students.id = Exams.id_stud
GROUP BY Courses.title;

-- 10 
SELECT Courses.title, COUNT(id_stud)
FROM Exams
INNER JOIN Courses ON Courses.id = Exams.id_course 
GROUP BY Courses.id;

-- 11 
SELECT Courses.title, round(avg(Exams.mark), 2) as avgCourseMark
FROM Exams
INNER JOIN Courses ON Courses.id = Exams.id_course
GROUP BY Courses.title
ORDER BY avgCourseMark DESC;

-- 12 *
SELECT Courses.title, max(Exams.mark) as bestMark
FROM Exams
INNER JOIN Courses ON Courses.id = Exams.id_course
WHERE Courses.id = 5
GROUP BY Courses.title
ORDER BY bestMark DESC;

/* 
8 какой предмет студент сдал лучше остальных
9 какой предмет студент сдал хуже остальных
10 сколько человек сдали(изучают) каждый курс
11* средний бал по группе студентов по каждому курсу
12* кто учится лучше из студентов по конкретному курсу
*/