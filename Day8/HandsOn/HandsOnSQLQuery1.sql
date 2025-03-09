CREATE DATABASE DemoDb1;

USE DemoDb1;

CREATE TABLE Employee (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    dept VARCHAR(50) NOT NULL,
    salary DECIMAL(10,2) NOT NULL
);

INSERT INTO Employee (name, dept, salary) 
VALUES ('John Doe', 'IT', 50000.00);

SELECT * FROM Employee;

UPDATE Employee SET salary = 60000.00 WHERE id = 1;

INSERT INTO Employee (name, dept, salary)
VALUES ('Ashish', 'IT', 80000.00);

DELETE FROM Employee WHERE id = 1;


