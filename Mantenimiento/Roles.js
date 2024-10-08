import { poolPromise } from '../db.js';
import sql from 'mssql';
import bcrypt from 'bcryptjs';


export async function Roles(rolesBody) {
    const Roles = rolesBody;

    return {
        status: 200,
        data: result.recordset,
        message: "Consulta exitosa"
    };
    

}


export async function obtenerRoles() {

    console.log('Ingresa al método antes de obtener roles');



    try {
        // Conectar al pool de la base de datos
        const pool = await poolPromise;
        const request = pool.request();

        const result = await request.execute('sp_consultarTodosRoles');

        // Resultados
        if (result.recordset.length > 0) {
            return {
                status: 200,
                data: result.recordset,
                message: "Consulta exitosa"
            };
        } else {
            return {
                status: 200,
                data: [],
                message: "No se encontraron resultados"
            };
        }

    } catch (err) {
        console.error(`Error al obtener los roles: ${err.message}`);
        throw new Error(`Error al obtener los roles: ${err.message}`);
    }
}