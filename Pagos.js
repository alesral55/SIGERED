import { poolPromise } from './db.js';
import sql from 'mssql';

export async function nuevoPago(pagoBody) {
    const Pago = pagoBody;
    console.log(Pago);

    try {
        // Conectar al pool de la base de datos
        const pool = await poolPromise;
        const request = pool.request();

        // Definir los parámetros de entrada
        request.input('fechaPago', sql.DATETIME, Pago.fechaPago);
        request.input('montoPago', sql.DECIMAL(18, 0), Pago.montoPago);
        request.input('nombreCuentaOrigen', sql.NVARCHAR(255), Pago.nombreCuentaOrigen);
        request.input('relacionInscrito', sql.NVARCHAR(100), Pago.relacionInscrito);
        request.input('nit', sql.NVARCHAR(15), Pago.nit);
        request.input('nombreNit', sql.NVARCHAR(255), Pago.nombreNit);
        request.input('direccionNit', sql.NVARCHAR(300), Pago.direccionNit);
        request.input('numeroAutorizacion', sql.NVARCHAR(100), Pago.numeroAutorizacion);
        request.input('imgTransferencia', sql.NVARCHAR(2024), Pago.imgTransferencia);
        request.input('idSistemaPago', sql.INT, Pago.idSistemaPago);

        // Definir el parámetro de salida
        request.output('idPago', sql.Int);

        // Ejecutar el procedimiento almacenado
        const result = await request.execute('sp_insertarPago');
        const idPago = result.output.idPago;

        // Verificar el resultado
        if (idPago > 0) {
            return {
                status: 200,
                code: 1,
                message: "El pago fue ingresado correctamente",
                idPago: idPago // Devolver el idPago generado
            };
        } else if (idPago === -1) {
            return {
                status: 200,
                code: -1,
                message: "El número de autorización ya se encuentra registrado"
            };
        } else {
            return {
                status: 500,
                message: "Error al ingresar el pago"
            };
        }

    } catch (err) {
        console.error(`Error al ingresar el pago: ${err.message}`);
        throw new Error(`Error al ingresar el pago: ${err.message}`);
    }
}
