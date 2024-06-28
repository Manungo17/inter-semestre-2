const AWS = require('aws-sdk');
const mysql = require('mysql');

exports.handler = async (event) => {
    // Configurar conexión con la base de datos MySQL
    const connection = mysql.createConnection({
        host: 'database-manu.cty4k6kqc37n.sa-east-1.rds.amazonaws.com',
        user: 'admin',
        password: 'root1721',
        database: 'ATM'
    });

    // Obtener los datos del evento (por ejemplo, el número de cuenta y la nueva clave)
    const requestBody = JSON.parse(event.body);
    const numeroCuenta = requestBody.numeroCuenta;
    const nuevaClave = requestBody.nuevaClave;

    // Actualizar la clave en la base de datos
    const updateQuery = 'UPDATE CuentaBancaria SET claveTarjeta = ? WHERE numeroCuenta = ?';
    connection.query(updateQuery, [nuevaClave, numeroCuenta], (error, results) => {
        if (error) {
            connection.end();
            return {
                statusCode: 500,
                body: JSON.stringify({ message: 'Error al cambiar la clave de la tarjeta' })
            };
        } else {
            connection.end();
            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'Cambio de clave exitoso' })
            };
        }
    });
};
