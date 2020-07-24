USE store;
DROP PROCEDURE IF EXISTS productFunctions;

DELIMITER #
CREATE PROCEDURE productFunctions(
    IN _clave INT,
    IN _nombre VARCHAR(20),
    IN _precio INT,
    IN _categoria VARCHAR(20),
    IN _likes DECIMAL(2,1),
    IN _img VARCHAR(255))

BEGIN
    IF _clave = 0 THEN 
      INSERT INTO products (nombre,precio,categoria,likes,img) VALUES (_nombre,_precio,_categoria,_likes,_img);
    ELSE
        UPDATE products SET nombre = _nombre,
        precio = _precio,
        categoria = _categoria,
        img = _img
        WHERE clave = _clave;
    END IF;
END#
DELIMITER ;
