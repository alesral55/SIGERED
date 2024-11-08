import { poolPromise } from '../db.js';
import sql from 'mssql';

let pool; // Variable para almacenar la conexión al pool
const lblMantenimiento = 'Tareas';

export async function Tareas(mantenimientoBody) {
    if (mantenimientoBody === 'GET') {
        const ObtenerMantenimiento = await obtenerMantenimiento();
        console.log(ObtenerMantenimiento);
        return ObtenerMantenimiento;
    } else if (mantenimientoBody.metodo === 1) {
        const InsertarMantenimiento = await nuevaTarea(mantenimientoBody);
        return InsertarMantenimiento;
    } else if (mantenimientoBody.metodo === 2) {
        const ActualizarMantenimiento = await actualizarTarea(mantenimientoBody);
        console.log(ActualizarMantenimiento);
        return ActualizarMantenimiento;
    } else if (mantenimientoBody.metodo === 3) {
        const EliminarMantenimiento = await eliminarTarea(mantenimientoBody);
        console.log(EliminarMantenimiento);
        return EliminarMantenimiento;
    }
    else if (mantenimientoBody.metodo === 4) {
        const ObtenerListadoTareasResponse = await ObtenerListadoTareas(mantenimientoBody);
        console.log(ObtenerListadoTareasResponse);
        return ObtenerListadoTareasResponse;
    } else if (mantenimientoBody.metodo === 5) {
        const InsertarMantenimiento = await entregaTarea(mantenimientoBody);
        return InsertarMantenimiento;
}

// Función para obtener tareas
async function obtenerMantenimiento() {
    try {
        if (!pool) pool = await poolPromise;
        const request = pool.request();
        const result = await request.execute('sp_consultarTareas');
        
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
        console.error(`Error al obtener las tareas: ${err.message}`);
        throw new Error(`Error al obtener las tareas: ${err.message}`);
    }
}

async function ObtenerListadoTareas(Body) {
    try {
        if (!pool) pool = await poolPromise;
        const request = pool.request();
        request.input('cui', sql.NVARCHAR(30), Body.usrCui);
        const result = await request.execute('sp_obtenerListadoTareasPorCuiAlumno');
        
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
        console.error(`Error al obtener las tareas: ${err.message}`);
        throw new Error(`Error al obtener las tareas: ${err.message}`);
    }
}

// Función para insertar una nueva tarea
async function nuevaTarea(mantenimientoBody) {
    const tarea = mantenimientoBody;
    console.log('Nueva tarea');
    console.log(tarea);
    try {
        if (!pool) pool = await poolPromise;
        const request = pool.request();
        request.input('nombreTarea', sql.NVARCHAR(100), tarea.nombreTarea);
        request.input('descripcionTarea', sql.NVarChar(sql.MAX), tarea.descripcionTarea);
        request.input('cuiUsuarioCrea', sql.NVARCHAR(30), tarea.cui);
        request.input('fechaVence', sql.DATETIME, tarea.fechaVence);
        request.input('idTipoTarea', sql.Int, tarea.idTipoTarea);
        request.input('idTipoCalificacion', sql.Int, tarea.idTipoCalificacion);
        request.input('puntaje', sql.Numeric(18, 0), tarea.puntaje);
        request.input('idCurso', sql.Int, tarea.idCurso);
        request.input('idSeccion', sql.Int, tarea.idSeccion);
        request.input('idHorario', sql.Int, tarea.idHorario);
        request.input('bloqueoEntrega', sql.Char(1), tarea.bloqueoEntrega);
        request.input('idArhivosAdjuntos', sql.NVARCHAR(30), tarea.idArhivosAdjuntos);
        request.output('numeroEvaluacion', sql.Int);
        request.output('insertadoCorrectamente', sql.Int);

        const Result = await request.execute('sp_InsertarTarea');
        const resultado = Result.output.insertadoCorrectamente;
        const numeroEvaluacion = Result.output.numeroEvaluacion;

        if (resultado === 1) {
            return { status: 200, code: 1, message: `${lblMantenimiento} creada correctamente`, numeroEvaluacion:numeroEvaluacion };
        } else if (resultado == -1) {
            return { status: 200, code: -1, message: `${lblMantenimiento} ya se encuentra registrada` };
        } else {
            return { status: 500, message: "Error al crear la tarea" };
        }
    } catch (err) {
        console.error(`Error al crear la tarea: ${err.message}`);
        throw new Error(`Error al crear la tarea: ${err.message}`);
    }
}
// Función para insertar una nueva tarea
async function entregaTarea(mantenimientoBody) {
    const tarea = mantenimientoBody;
    console.log('Entrega de tarea');
    console.log(tarea);

    try {
        if (!pool) pool = await poolPromise;
        const request = pool.request();
        request.input('idTarea', sql.Int, tarea.idTarea);
        request.input('CUIalumno', sql.NVARCHAR(30), tarea.CUIalumno);
        request.input('idArchivosAdjuntos', sql.NVarChar(30), tarea.idArchivosAdjuntos); // Corregido
        request.input('comentario', sql.NVarChar(2000), tarea.comentario);
        request.input('idSeccion', sql.Int, tarea.idSeccion);
        request.output('resultado', sql.Int); // Corregido: sin espacio al final

        const result = await request.execute('sp_insertarEntregaDeTarea');
        const resultado = result.output.resultado;

        if (resultado === 1) {
            return { status: 200, code: 1, message: `Tarea enviada correctamente` };
        } else if (resultado === -1) {
            return { status: 200, code: -1, message: `${lblMantenimiento} ya se encuentra registrada` };
        } else if (resultado === -2) {
            return { status: 200, code: -2, message: "Entrega bloqueada por fecha vencida" };
        } else {
            return { status: 500, message: "Error al enviar la tarea" };
        }
    } catch (err) {
        console.error(`Error al actualizar la tarea: ${err.message}`);
        throw new Error(`Error al actualizar la tarea: ${err.message}`);
    }
}


// Función para actualizar una tarea
async function actualizarTarea(mantenimientoBody) {
    const tarea = mantenimientoBody;
    try {
        if (!pool) pool = await poolPromise;
        const request = pool.request();
        request.input('idTarea', sql.Int, tarea.idTarea);
        request.input('nombreTarea', sql.NVARCHAR(100), tarea.nombreTarea);
        request.input('descripcionTarea', sql.NVARCHAR(600), tarea.descripcionTarea);
        request.input('cuiUsuarioCrea', sql.NVARCHAR(30), tarea.cuiUsuarioCrea);
        request.input('fechaVence', sql.DATETIME, tarea.fechaVence);
        request.input('idTipoTarea', sql.Int, tarea.idTipoTarea);
        request.input('idTipoCalificacion', sql.Int, tarea.idTipoCalificacion);
        request.input('idFormatoCalificacion', sql.Int, tarea.idFormatoCalificacion);
        request.input('puntaje', sql.Numeric(18, 0), tarea.puntaje);
        request.input('idCurso', sql.Int, tarea.idCurso);
        request.input('idSeccion', sql.Int, tarea.idSeccion);
        request.input('idHorario', sql.Int, tarea.idHorario);
        request.input('bloqueoEntrega', sql.Char(1), tarea.bloqueoEntrega);
        request.input('idArhivosAdjuntos', sql.NVARCHAR(15), tarea.idArhivosAdjuntos);
        request.output('resultado', sql.Int);

        const Result = await request.execute('sp_actualizarTarea');
        const resultado = Result.output.resultado;

        if (resultado === 1) {
            return { status: 200, code: 1, message: `${lblMantenimiento} actualizada correctamente` };
        } else if (resultado === -1) {
            return { status: 200, code: -1, message: `${lblMantenimiento} ya se encuentra registrada` };
        } else {
            return { status: 500, message: "Error al actualizar la tarea" };
        }
    } catch (err) {
        console.error(`Error al actualizar la tarea: ${err.message}`);
        throw new Error(`Error al actualizar la tarea: ${err.message}`);
    }
}

// Función para eliminar una tarea
async function eliminarTarea(mantenimientoBody) {
    const tarea = mantenimientoBody;
    try {
        if (!pool) pool = await poolPromise;
        const request = pool.request();
        request.input('idTarea', sql.Int, tarea.idTarea);
        request.output('resultado', sql.Int);

        const Result = await request.execute('sp_eliminarTarea');
        const resultado = Result.output.resultado;

        if (resultado === 1) {
            return { status: 200, code: 1, message: `${lblMantenimiento} eliminada correctamente` };
        } else if (resultado === -1) {
            return { status: 200, code: -1, message: `${lblMantenimiento} ya se encuentra registrada` };
        } else {
            return { status: 500, message: "Error al eliminar la tarea" };
        }
    } catch (err) {
        console.error(`Error al eliminar la tarea: ${err.message}`);
        throw new Error(`Error al eliminar la tarea: ${err.message}`);
    }}
}
