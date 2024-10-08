import { poolPromise } from '../db.js';
import sql from 'mssql';
import bcrypt from 'bcryptjs';

let pool; // Variable para almacenar la conexión

export async function Niveles(mantenimientoBody) {
   // console.log('entra al nevel');
    if(mantenimientoBody ==='GET'){
        const ObtenerNiveles = await obtenerNiveles();
        console.log(ObtenerNiveles);
        return ObtenerNiveles;
    }
    else if(mantenimientoBody.metodo ==1){
        const InsertarCiclo = await nuevoNivel(mantenimientoBody)
        //console.log(InsertarCiclo);
        return InsertarCiclo
    }
    else if(mantenimientoBody.metodo ==2){
        const ActualziarNivel = await actualizarNivel(mantenimientoBody)
        console.log(ActualziarNivel);
        return ActualziarNivel
    }
    else if(mantenimientoBody.metodo ==3){
        const ElimianrNivel = await eliminarNivel(mantenimientoBody)
        console.log(ElimianrNivel);
        return ElimianrNivel
    }

}

async function obtenerNiveles() {
    //console.log('Ingresa al método antes de insertar ciclos');

    try {
        // Conectar al pool de la base de datos solo una vez
        if (!pool) {
            pool = await poolPromise;
        }
        const request = pool.request();

        const result = await request.execute('sp_consultarNiveles');

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




 async function nuevoNivel(mantenimientoBody) {
    const Mantenimiento = mantenimientoBody;
    try {
        // Conectar al pool de la base de datos
        const pool = await poolPromise;
        const request = pool.request();
        request.input('nombreNivel', sql.NVARCHAR(500), Mantenimiento.nombreNivel);
        request.output('resultado', sql.Int);
        
        const Result = await request.execute('sp_insertarNivel');
        const resultado = Result.output.resultado;
   
        if (resultado === 1) {
            return {
                status: 200,
                code: 1,
                message: "El Nivel  fue creado  correctamente"}
               
        }        else if (resultado === -1) {
            return {
                status: 200,
                code: -1,
                message: "El Nivel  ya se encuetra registrado"}
                
        }  
        else {
            return {
                status: 500,
                message: "Error al crear el nuevo Nivel "
            };
        }

    } catch (err) {
        console.error(`Error al crear el nuevo Nivel : ${err.message}`);
        throw new Error(`Error al  crear  el nuevo Nivel : ${err.message}`);
    }
}



async function actualizarNivel(mantenimientoBody) {
    const Mantenimiento = mantenimientoBody;
    try {
        // Conectar al pool de la base de datos
        const pool = await poolPromise;
        const request = pool.request();
        request.input('idNivel', sql.Int, Mantenimiento.idNivel);
        request.input('nombreNivel', sql.NVARCHAR(500), Mantenimiento.nombreNivel);
        request.output('resultado', sql.Int);
        
        const Result = await request.execute('sp_actualizarNivel');
        const resultado = Result.output.resultado;
   
        if (resultado === 1) {
            return {
                status: 200,
                code: 1,
                message: "El Nivel  fue actualizado  correctamente"}
               
        }        else if (resultado === -1) {
            return {
                status: 200,
                code: -1,
                message: "El Nivel  ya se encuetra registrado"}
                
        }  
        else {
            return {
                status: 500,
                message: "Error al actualizar el  Nivel "
            };
        }

    } catch (err) {
        console.error(`Error al actualizar el  Nivel : ${err.message}`);
        throw new Error(`Error al  actualizar  el  Nivel : ${err.message}`);
    }
}


async function eliminarNivel(mantenimientoBody) {
    const Mantenimiento = mantenimientoBody;
    try {
        // Conectar al pool de la base de datos
        const pool = await poolPromise;
        const request = pool.request();
        request.input('idNivel', sql.Int, Mantenimiento.idNivel);
        request.output('resultado', sql.Int);
        
        const Result = await request.execute('sp_eliminarNivel');
        const resultado = Result.output.resultado;
   console.log('resulado de eliminar'+resultado);
        if (resultado === 1) {
            return {
                status: 200,
                code: 1,
                message: "El Nivel  fue eliminado  correctamente"}
               
        }  
        else if (resultado === 2) {
            return {
                status: 200,
                code: 1,
                message: "El Nivel  fue reactivado  correctamente"}
               
        }     
           else if (resultado === -1) {
            return {
                status: 200,
                code: -1,
                message: "El Nivel  ya se encuetra registrado"}
                
        }  
        else {
            return {
                status: 500,
                message: "Error al eliminado el  Nivel "
            };
        }

    } catch (err) {
        console.error(`Error al eliminado el  Nivel : ${err.message}`);
        throw new Error(`Error al  eliminado  el  Nivel : ${err.message}`);
    }
}
