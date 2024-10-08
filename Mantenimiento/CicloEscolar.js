import { poolPromise } from '../db.js';
import sql from 'mssql';
import bcrypt from 'bcryptjs';

let pool; // Variable para almacenar la conexión

export async function Ciclos(ciclosBody) {
    const ciclo = ciclosBody
    console.log('entra al ciclo');
    if(ciclosBody ==='GET'){
        const ObtenerRoles = await obtenerRoles();
        console.log(ObtenerRoles);
        return ObtenerRoles;
    }
    else if(ciclo.metodo ==1){
        const InsertarCiclo = await nuevoCicloEscolar(ciclo)
        console.log(InsertarCiclo);
        return InsertarCiclo
    }

}

async function obtenerRoles() {
    console.log('Ingresa al método antes de insertar ciclos');

    try {
        // Conectar al pool de la base de datos solo una vez
        if (!pool) {
            pool = await poolPromise;
        }
        const request = pool.request();

        const result = await request.execute('sp_consultarCiclos');

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




 async function nuevoCicloEscolar(cicloBody) {
    const Ciclo = cicloBody;
    try {
        // Conectar al pool de la base de datos
        const pool = await poolPromise;
        const request = pool.request();
        request.input('descripcion', sql.NVARCHAR(60), Ciclo.descripcion);
        request.input('fecharInicio', sql.DATE, Ciclo.fecharInicio);
        request.input('fechaFin', sql.DATE, Ciclo.fechaFin);
        request.output('resultado', sql.Int);
        
        const Result = await request.execute('sp_insertarCicloEscolar');
        const resultado = Result.output.resultado;

        if (resultado === 1) {
            return {
                status: 200,
                code: 1,
                message: "El ciclo escolar fue creado  correctamente"}
               
        }        else if (resultado === -1) {
            return {
                status: 200,
                code: -1,
                message: "El ciclo escolar  ya se encuetra registrado"}
                
        }  
        else {
            return {
                status: 500,
                message: "Error al crear el ciclo escolar "
            };
        }

    } catch (err) {
        console.error(`Error al crear el ciclo escolar: ${err.message}`);
        throw new Error(`Error al  crear el ciclo escolar: ${err.message}`);
    }
}
