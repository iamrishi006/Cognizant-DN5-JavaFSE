BEGIN

    FOR customerRecord IN
    (
        SELECT CustomerID
        FROM Customers
        WHERE Age > 60
    )
    LOOP

        UPDATE Loans
        SET InterestRate = InterestRate - 1
        WHERE CustomerID = customerRecord.CustomerID;

    END LOOP;

    COMMIT;

END;
/