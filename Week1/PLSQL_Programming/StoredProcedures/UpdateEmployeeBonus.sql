CREATE OR REPLACE PROCEDURE UpdateEmployeeBonus
(
    departmentName VARCHAR2,
    bonusPercent NUMBER
)
IS
BEGIN

    UPDATE Employees
    SET Salary = Salary + (Salary * bonusPercent / 100)
    WHERE Department = departmentName;

    COMMIT;

END;
/