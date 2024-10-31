import { poolPromise } from './db.js';
import sql from 'mssql';

export async function nuevoAlumnoYPago(alumnoPagoBody) {
    const AlumnoPago = alumnoPagoBody;
    console.log(AlumnoPago);
    console.log('alumno');
    console.log(AlumnoPago.alumno);
    console.log('pago');
    console.log(AlumnoPago.pago);

    try {
        // Conectar al pool de la base de datos
        const pool = await poolPromise;
        const request = pool.request();

        // Definir los parámetros de entrada para el alumno y el pago
        request.input('cui', sql.NVARCHAR(30), AlumnoPago.alumno.cui);
        request.input('idHorario', sql.INT, AlumnoPago.alumno.idHorario);
        request.input('residenteLocal', sql.CHAR(1), AlumnoPago.alumno.residenteLocal);
        request.input('idTipoDoc', sql.INT, AlumnoPago.alumno.idTipoDoc);
        request.input('idGrupoEtnico', sql.INT, AlumnoPago.alumno.idGrupoEtnico);
        request.input('discapacidad', sql.CHAR(1), AlumnoPago.alumno.discapacidad);
        request.input('idDiscapacidad', sql.INT, AlumnoPago.alumno.idDiscapacidad);
        request.input('esColaborador', sql.CHAR(1), AlumnoPago.alumno.esColaborador);
        request.input('areaDeTrabajo', sql.NVARCHAR(255), AlumnoPago.alumno.areaDeTrabajo);
        request.input('imgDPI', sql.NVARCHAR(2024), AlumnoPago.alumno.imgDPI);

        request.input('idCurso', sql.INT, AlumnoPago.alumno.idCurso);
       // request.input('idCicloEscolar', sql.INT, AlumnoPago.alumno.idCicloEscolar);

        // Parámetros para el pago
        request.input('idSistemaPago', sql.INT, AlumnoPago.pago.idSistemaPago);
        request.input('fechaPago', sql.DATETIME, AlumnoPago.pago.fechaPago);
        request.input('montoPago', sql.DECIMAL(18, 0), AlumnoPago.pago.montoPago);
        request.input('nombreCuentaOrigen', sql.NVARCHAR(255), AlumnoPago.pago.nombreCuentaOrigen);
        request.input('relacionInscrito', sql.NVARCHAR(100), AlumnoPago.pago.relacionInscrito);
        request.input('nit', sql.NVARCHAR(15), AlumnoPago.pago.nit);
        request.input('nombreNit', sql.NVARCHAR(255), AlumnoPago.pago.nombreNit);
        request.input('direccionNit', sql.NVARCHAR(300), AlumnoPago.pago.direccionNit);
        request.input('numeroAutorizacion', sql.NVARCHAR(100), AlumnoPago.pago.numeroAutorizacion);
        request.input('imgTransferencia', sql.NVARCHAR(2024), AlumnoPago.pago.imgTransferencia);

        // Parámetro de salida para idPago
        request.output('idPago', sql.INT);

        // Ejecutar el procedimiento almacenado
        const result = await request.execute('sp_insertarAlumnoYPago');
        const idPago = result.output.idPago;

        // Verificar el resultado
        if (idPago > 0) {
            return {
                status: 200,
                code: 1,
                message: "Tus datos han sido registrados de forma correcta, se ha iniciado el proceso de inscripcion de forma correcta, pronto nos pondremos en contacto contigo",
                idPago: idPago // Devolver el idPago generado
            };
        } else if (idPago === -1) {
            return {
                status: 200,
                code: -1,
                message: "El número de autorización ya se encuentra registrado"
            };
        } else if (idPago === -2) {
            return {
                status: 500,
                message: "Error al ingresar el alumno"
            };
        } else {
            return {
                status: 500,
                message: "Error al ingresar el pago"
            };
        }

    } catch (err) {
        console.error(`Error al ingresar el alumno y pago: ${err.message}`);
        throw new Error(`Error al ingresar el alumno y pago: ${err.message}`);
    }
}
