CREATE PROCEDURE InsertRegistration(
    IN p_first_name NVARCHAR(50),
    IN p_last_name NVARCHAR(50),
    IN p_mobile_number NVARCHAR(10),
    IN p_password NVARCHAR(255)
)
BEGIN
    INSERT INTO registration (first_name, last_name, mobile_number, password)
    VALUES (p_first_name, p_last_name, p_mobile_number, p_password);
END;

CREATE PROCEDURE SelectRegistration(
    IN p_id INT
)
BEGIN
    SELECT * FROM registration WHERE id = p_id;
END;

CREATE PROCEDURE UpdateRegistration(
    IN p_id INT,
    IN p_first_name VARCHAR(50),
    IN p_last_name VARCHAR(50),
    IN p_mobile_number VARCHAR(10),
    IN p_password VARCHAR(255),
    IN p_updated_by VARCHAR(50)
)
BEGIN
    UPDATE registration
    SET first_name = p_first_name,
        last_name = p_last_name,
        mobile_number = p_mobile_number,
        password = p_password,
        updated_by = p_updated_by
    WHERE id = p_id;
END;

CREATE PROCEDURE DeleteRegistration(
    IN p_id INT
)
BEGIN
    DELETE FROM registration WHERE id = p_id;
END;