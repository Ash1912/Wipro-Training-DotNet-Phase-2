-- Database Setup
CREATE DATABASE ElearningDB;
USE ElearningDB;

-- Users Table
CREATE TABLE Users (
    UserId INT PRIMARY KEY AUTO_INCREMENT,
    Username VARCHAR(50) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    PasswordHash VARCHAR(255) NOT NULL
);

-- Courses Table
CREATE TABLE Courses (
    CourseId INT PRIMARY KEY AUTO_INCREMENT,
    Title VARCHAR(100) NOT NULL,
    Description TEXT NOT NULL
);

-- Enrollments Table
CREATE TABLE Enrollments (
    EnrollmentId INT PRIMARY KEY AUTO_INCREMENT,
    UserId INT,
    CourseId INT,
    EnrolledAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserId) REFERENCES Users(UserId),
    FOREIGN KEY (CourseId) REFERENCES Courses(CourseId)
);

-- Quizzes Table
CREATE TABLE Quizzes (
    QuizId INT PRIMARY KEY AUTO_INCREMENT,
    CourseId INT,
    Title VARCHAR(100) NOT NULL,
    FOREIGN KEY (CourseId) REFERENCES Courses(CourseId)
);

-- Questions Table
CREATE TABLE Questions (
    QuestionId INT PRIMARY KEY AUTO_INCREMENT,
    QuizId INT,
    QuestionText TEXT NOT NULL,
    FOREIGN KEY (QuizId) REFERENCES Quizzes(QuizId)
);

-- Answers Table
CREATE TABLE Answers (
    AnswerId INT PRIMARY KEY AUTO_INCREMENT,
    QuestionId INT,
    AnswerText TEXT NOT NULL,
    IsCorrect BOOLEAN NOT NULL,
    FOREIGN KEY (QuestionId) REFERENCES Questions(QuestionId)
);

-- Quiz Attempts Table
CREATE TABLE QuizAttempts (
    AttemptId INT PRIMARY KEY AUTO_INCREMENT,
    UserId INT,
    QuizId INT,
    Score INT,
    AttemptDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (UserId) REFERENCES Users(UserId),
    FOREIGN KEY (QuizId) REFERENCES Quizzes(QuizId)
);

SELECT * FROM Users;
SELECT * FROM Courses;
SELECT * FROM Enrollments;
SELECT * FROM Quizzes;
SELECT * FROM Questions;
SELECT * FROM Attempts;
SELECT * FROM Progress;
select * from roles;

INSERT INTO Roles (RoleName) Values
('Admin'),
('Student');



INSERT INTO Users (FullName, Email, PasswordHash, Role) VALUES
('John Doe', 'john@example.com', 'john@123', 'Student'),
('Jane Smith', 'jane@example.com', 'jane@123', 'Admin'),
('Alice Johnson', 'alice@example.com', 'alice@123', 'Student');


INSERT INTO Courses (Title, Description) VALUES
('Python Basics', 'Introduction to Python programming.'),
('ReactJS Fundamentals', 'Learn ReactJS and front-end development.'),
('ASP.NET Core', 'Master backend development with ASP.NET Core.');

INSERT INTO Enrollments (UserId, CourseId) VALUES
(1, 1), -- John enrolled in Python Basics
(1, 2), -- John enrolled in ReactJS Fundamentals
(2, 3), -- Jane enrolled in ASP.NET Core
(3, 1); -- Alice enrolled in Python Basics

INSERT INTO Quizzes (CourseId, Title) VALUES
(1, 'Python Fundamentals Quiz'),
(2, 'React Basics Quiz'),
(3, 'ASP.NET Core Quiz');

INSERT INTO Questions (QuizId, QuestionText, Options, CorrectOptionIndex) VALUES
(1, 'What is the output of print(2 * 3)?', '["5", "6", "7", "8"]', 1),
(1, 'Which keyword is used for defining functions in Python?', '["func", "define", "def", "function"]', 2),
(2, 'What is JSX?', '["A database", "A CSS framework", "A syntax extension for JavaScript", "A library"]', 2);

INSERT INTO Attempts (UserId, QuizId, Score, TotalQuestions) VALUES
(1, 1, 8, 10), -- John attempted Python quiz and scored 8/10
(2, 3, 7, 10), -- Jane attempted ASP.NET quiz and scored 7/10
(3, 1, 9, 10); -- Alice attempted Python quiz and scored 9/10

INSERT INTO Progress (UserId, CourseId, CompletionPercentage) VALUES
(1, 1, 40), -- John completed 40% of Python Basics
(1, 2, 20), -- John completed 20% of ReactJS Fundamentals
(2, 3, 75), -- Jane completed 75% of ASP.NET Core
(3, 1, 50); -- Alice completed 50% of Python Basics
