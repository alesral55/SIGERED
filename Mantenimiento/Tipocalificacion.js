import { poolPromise } from '../db.js';
import sql from 'mssql';


let pool; // Variable para almacenar la conexión
const lblMantenimiento = 'Tipo de Calificacion'; 

export async function TipoCalificacion(mantenimientoBody) {
   // console.log('entra al nevel');
    if(mantenimientoBody ==='GET'){
        const ObtenerMantenimiento = await obtenerMantenimiento();
        console.log(ObtenerMantenimiento);
        return ObtenerMantenimiento;
    }
    else if(mantenimientoBody.metodo ==1){
        const InsertarMantenimiento = await nuevoMantenimiento(mantenimientoBody)
        //console.log(InsertarCiclo);
        return InsertarMantenimiento
    }
    else if(mantenimientoBody.metodo ==2){
        const ActualziarMantenimiento = await actualizarMantenimiento(mantenimientoBody)
        console.log(ActualziarMantenimiento);
        return ActualziarMantenimiento
    }
    else if(mantenimientoBody.metodo ==3){
        const ElimianrMantenimiento = await eliminarMantenimiento(mantenimientoBody)
        console.log(ElimianrMantenimiento);
        return ElimianrMantenimiento
    }

}

async function obtenerMantenimiento() {
    //console.log('Ingresa al método antes de insertar ciclos');

    try {
        // Conectar al pool de la base de datos solo una vez
        if (!pool) {
            pool = await poolPromise;
        }
        const request = pool.request();

        const result = await request.execute('sp_consultarTipocalificacion');

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




 async function nuevoMantenimiento(mantenimientoBody) {
    const Mantenimiento = mantenimientoBody;
    try {
        // Conectar al pool de la base de datos
        const pool = await poolPromise;
        const request = pool.request();
        request.input('descripcion', sql.NVARCHAR(500), Mantenimiento.descripcion);
        request.output('resultado', sql.Int);
        
        const Result = await request.execute('sp_insertarTipocalificacion');
        const resultado = Result.output.resultado;
   
        if (resultado === 1) {
            return {
                status: 200,
                code: 1,
                message: "El "+lblMantenimiento+" fue creado  correctamente"}
               
        }        else if (resultado === -1) {
            return {
                status: 200,
                code: -1,
                message: "El   "+lblMantenimiento+"  ya se encuetra registrado"}
                
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



async function actualizarMantenimiento(mantenimientoBody) {
    const Mantenimiento = mantenimientoBody;
    try {
        // Conectar al pool de la base de datos
        const pool = await poolPromise;
        const request = pool.request();
        request.input('idTipoCalificacion', sql.Int, Mantenimiento.idTipoCalificacion);
        request.input('descripcion', sql.NVARCHAR(500), Mantenimiento.descripcion);
        request.output('resultado', sql.Int);
        
        const Result = await request.execute('sp_actualizarTipocalificacion');
        const resultado = Result.output.resultado;
   
        if (resultado === 1) {
            return {
                status: 200,
                code: 1,
                message: "El Mantenimiento  fue actualizado  correctamente"}
               
        }        else if (resultado === -1) {
            return {
                status: 200,
                code: -1,
                message: "El Mantenimiento  ya se encuetra registrado"}
                
        }  
        else {
            return {
                status: 500,
                message: "Error al actualizar el  Mantenimiento "
            };
        }

    } catch (err) {
        console.error(`Error al actualizar el  Mantenimiento : ${err.message}`);
        throw new Error(`Error al  actualizar  el  Mantenimiento : ${err.message}`);
    }
}


async function eliminarMantenimiento(mantenimientoBody) {
    const Mantenimiento = mantenimientoBody;
    try {
        // Conectar al pool de la base de datos
        const pool = await poolPromise;
        const request = pool.request();
        request.input('idTipoCalificacion', sql.Int, Mantenimiento.idTipoCalificacion);
        request.output('resultado', sql.Int);
        
        const Result = await request.execute('sp_eliminarTipocalificacion');
        const resultado = Result.output.resultado;
   console.log('resulado de eliminar'+resultado);
        if (resultado === 1) {
            return {
                status: 200,
                code: 1,
                message: "El Mantenimiento  fue eliminado  correctamente"}
               
        }  
        else if (resultado === 2) {
            return {
                status: 200,
                code: 1,
                message: "El Mantenimiento  fue reactivado  correctamente"}
               
        }     
           else if (resultado === -1) {
            return {
                status: 200,
                code: -1,
                message: "El Mantenimiento  ya se encuetra registrado"}
                
        }  
        else {
            return {
                status: 500,
                message: "Error al eliminar el  Mantenimiento "
            };
        }

    } catch (err) {
        console.error(`Error al eliminar el  Mantenimiento : ${err.message}`);
        throw new Error(`Error al  eliminar  el  Mantenimiento : ${err.message}`);
    }
}
