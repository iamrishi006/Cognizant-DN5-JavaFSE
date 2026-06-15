BEGIN

    FOR customerRecord IN
    (
        SELECT CustomerID
        FROM Customers
        WHERE Balance > 10000
    )
    LOOP

        UPDATE Customers
        SET IsVIP = 'Yes'
        WHERE CustomerID = customerRecord.CustomerID;

    END LOOP;

    COMMIT;

END;
/