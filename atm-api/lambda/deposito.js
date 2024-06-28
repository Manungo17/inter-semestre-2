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

    // Obtener los datos del evento (por ejemplo, el monto a depositar y el número de cuenta)
    const requestBody = JSON.parse(event.body);
    const numeroCuenta = requestBody.numeroCuenta;
    const montoDeposito = requestBody.montoDeposito;

    // Realizar la consulta para obtener el saldo actual de la cuenta
    const saldoQuery = 'SELECT saldo FROM CuentaBancaria WHERE numeroCuenta = ?';
    connection.query(saldoQuery, [numeroCuenta], (error, results) => {
        if (error) {
            connection.end();
            return {
                statusCode: 500,
                body: JSON.stringify({ message: 'Error al verificar saldo de la cuenta' })
            };
        } else {
            const saldoActual = results[0].saldo;
            // Calcular nuevo saldo después del depósito
            const nuevoSaldo = saldoActual + montoDeposito;

            // Actualizar saldo en la base de datos
            const updateQuery = 'UPDATE CuentaBancaria SET saldo = ? WHERE numeroCuenta = ?';
            connection.query(updateQuery, [nuevoSaldo, numeroCuenta], (updateError, updateResults) => {
                if (updateError) {
                    connection.end();
                    return {
                        statusCode: 500,
                        body: JSON.stringify({ message: 'Error al actualizar saldo de la cuenta' })
                    };
                } else {
                    connection.end();
                    return {
                        statusCode: 200,
                        body: JSON.stringify({ message: 'Depósito exitoso', nuevoSaldo: nuevoSaldo })
                    };
                }
            });
        }
    });
};
