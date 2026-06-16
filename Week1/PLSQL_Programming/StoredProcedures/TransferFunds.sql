CREATE OR REPLACE PROCEDURE TransferFunds
(
    fromAccount NUMBER,
    toAccount NUMBER,
    transferAmount NUMBER
)
IS

    availableBalance NUMBER;

BEGIN

    SELECT Balance
    INTO availableBalance
    FROM Accounts
    WHERE AccountID = fromAccount;

    IF availableBalance >= transferAmount THEN

        UPDATE Accounts
        SET Balance = Balance - transferAmount
        WHERE AccountID = fromAccount;

        UPDATE Accounts
        SET Balance = Balance + transferAmount
        WHERE AccountID = toAccount;

        COMMIT;

        DBMS_OUTPUT.PUT_LINE('Transfer Completed Successfully');

    ELSE

        DBMS_OUTPUT.PUT_LINE('Insufficient Balance');

    END IF;

END;
/