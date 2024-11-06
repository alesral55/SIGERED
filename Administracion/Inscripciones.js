import { poolPromise } from '../db.js';
import sql from 'mssql';


let pool; // Variable para almacenar la conexión
const lblMantenimiento = 'Cursos'; 

export async function Inscripciones(mantenimientoBody) {
   // console.log('entra al nevel');
    if(mantenimientoBody ==='GET'){
        const ObtenerListadoInscripciones= await obtenerListadoInscripciones();
        console.log(ObtenerListadoInscripciones);
        return ObtenerListadoInscripciones;
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

async function obtenerListadoInscripciones() {

    try {
        if (!pool) {
            pool = await poolPromise;
        }
        const request = pool.request();

        const result = await request.execute('sp_consultarListadoRevisionInscripciones');

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
        request.input('nombreCurso', sql.NVARCHAR(500), Mantenimiento.nombreCurso);
        request.input('descripcionCurso', sql.NVARCHAR(1000), Mantenimiento.descripcionCurso);
        request.input('idNivel', sql.Int, Mantenimiento.idNivel);
        request.output('resultado', sql.Int);
        
        const Result = await request.execute('sp_insertarCursos');
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
        request.input('idCurso', sql.Int, Mantenimiento.idCurso);
        request.input('nombreCurso', sql.NVARCHAR(500), Mantenimiento.nombreCurso);
        request.input('descripcionCurso', sql.NVARCHAR(1000), Mantenimiento.descripcionCurso);
        request.input('idNivel', sql.Int, Mantenimiento.idNivel);
        request.output('resultado', sql.Int);
        
        const Result = await request.execute('sp_actualizarCursos');
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
        request.input('idAlumno', sql.Int, Mantenimiento.idAlumno);
        request.input('idPago', sql.Int, Mantenimiento.idPago);
        request.output('resultado', sql.Int);
        
        const Result = await request.execute('sp_rechazoInscipcion');
        const resultado = Result.output.resultado;
   console.log('resulado de eliminar'+resultado);
        if (resultado === 1) {
            return {
                status: 200,
                code: 1,
                message: "la Incripcion fue rechazada correctamente"}
               
        }     
           else if (resultado === -1) {
            return {
                status: 200,
                code: -1,
                message: "Los datos de alumno y pagon no existen"}
                
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
