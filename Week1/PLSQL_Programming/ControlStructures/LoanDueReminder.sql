SET SERVEROUTPUT ON;

BEGIN
    FOR loanRecord IN
    (
        SELECT LoanID,
               CustomerID,
               DueDate
        FROM Loans
        WHERE DueDate BETWEEN SYSDATE AND SYSDATE + 30
    )
    LOOP
        DBMS_OUTPUT.PUT_LINE(
            'Reminder: Loan '
            || loanRecord.LoanID
            || ' for Customer '
            || loanRecord.CustomerID
            || ' is due on '
            || loanRecord.DueDate
        );
    END LOOP;
END;
/