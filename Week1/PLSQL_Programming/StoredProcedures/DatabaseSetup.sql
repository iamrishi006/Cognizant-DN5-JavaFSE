CREATE TABLE Accounts (
    AccountID NUMBER PRIMARY KEY,
    CustomerName VARCHAR2(50),
    Balance NUMBER
);

CREATE TABLE Employees (
    EmployeeID NUMBER PRIMARY KEY,
    EmployeeName VARCHAR2(50),
    Department VARCHAR2(30),
    Salary NUMBER
);

INSERT INTO Accounts VALUES (101,'Rushikesh',50000);
INSERT INTO Accounts VALUES (102,'Aishwarya',42000);
INSERT INTO Accounts VALUES (103,'Rahul',30000);

INSERT INTO Employees VALUES (201,'Priya','IT',55000);
INSERT INTO Employees VALUES (202,'Karan','IT',60000);
INSERT INTO Employees VALUES (203,'Sneha','HR',45000);

COMMIT;