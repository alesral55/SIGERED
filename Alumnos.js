// Alumnos.js
//import { poolPromise } from './db.js';

export class Alumnos {
    static async insertarAlumno(data) {
        try {
            const pool = await poolPromise;
            const request = pool.request();
            request.input('CUI', sql.NVarChar(60), data.CUI);
            request.input('primerNombre', sql.NVarChar(200), data.primerNombre);
            request.input('segundoNombre', sql.NVarChar(600), data.segundoNombre);
            request.input('primerApellido', sql.NVarChar(200), data.primerApellido);
            request.input('segundoApellido', sql.NVarChar(600), data.segundoApellido);
            request.input('fechaDeNacimiento', sql.Date, data.fechaDeNacimiento);
            request.input('correo', sql.NVarChar(510), data.correo);
            request.input('telefono', sql.NVarChar(30), data.telefono);
            request.input('genero', sql.Char(1), data.genero);
            request.input('idRol', sql.Int, data.idRol);
            request.input('contrasenia', sql.NVarChar(4048), data.contrasenia);
            request.input('requiereCambio', sql.Char(1), data.requiereCambio);
            request.input('codigoPersonal', sql.NVarChar(60), data.codigoPersonal);
            request.input('estado', sql.Char(1), data.estado);
            request.input('direccion', sql.NVarChar(600), data.direccion);

            const result = await request.output('resultado', sql.Int).execute('sp_insertarPersona');
            return result.output.resultado;
        } catch (err) {
            throw new Error(`Error al insertar el alumno: ${err.message}`);
        }
    }

    static async actualizarAlumno(data) {
        try {
            const pool = await poolPromise;
            const request = pool.request();
            request.input('CUI', sql.NVarChar(60), data.CUI);
            //... todos los demás campos como en el método insertar

            const result = await request.output('resultado', sql.Int).execute('sp_actualizarPersona');
            return result.output.resultado;
        } catch (err) {
            throw new Error(`Error al actualizar el alumno: ${err.message}`);
        }
    }

    static async eliminarAlumno(CUI) {
        try {
            const pool = await poolPromise;
            const request = pool.request();
            request.input('CUI', sql.NVarChar(60), CUI);
            
            const result = await request.output('resultado', sql.Int).execute('sp_eliminarPersona');
            return result.output.resultado;
        } catch (err) {
            throw new Error(`Error al eliminar el alumno: ${err.message}`);
        }
    }

    static async consultarAlumno(CUI) {
        try {
            const pool = await poolPromise;
            const request = pool.request();
            request.input('CUI', sql.NVarChar(60), CUI);

            const result = await request.execute('sp_consultarPersona');
            return result.recordset[0];
        } catch (err) {
            throw new Error(`Error al consultar el alumno: ${err.message}`);
        }
    }

    static async validarUsuario(correo, contrasenia) {
        try {
            const pool = await poolPromise;
            const request = pool.request();
            request.input('correo', sql.NVarChar(510), correo);
            request.input('contrasenia', sql.NVarChar(sql.MAX), contrasenia);

            request.output('Nombre', sql.NVarChar(200));
            request.output('idRol', sql.Int);
            request.output('accesos', sql.NVarChar(40));
            request.output('cui', sql.NVarChar(30));
            request.output('cambio', sql.Int);

            const result = await request.execute('sp_validarUsuario');

            return {
                nombre: result.output.Nombre,
                idRol: result.output.idRol,
                accesos: result.output.accesos,
                cui: result.output.cui,
                requiereCambio: result.output.cambio
            };
        } catch (err) {
            throw new Error(`Error al validar usuario: ${err.message}`);
        }
    }
}
