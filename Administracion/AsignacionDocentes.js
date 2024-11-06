import { poolPromise } from '../db.js';
import sql from 'mssql';

let pool;
const lblMantenimiento = 'Asignaciones';

// Controlador principal
export async function Asignaciones(mantenimientoBody) {
    if (mantenimientoBody === 'GET') {
        const obtenerAsignaciones = await consultarAsignaciones();
        console.log(obtenerAsignaciones);
        return obtenerAsignaciones;
    } else if (mantenimientoBody.metodo == 1) {
        const insertarAsignacion = await nuevaAsignacion(mantenimientoBody);
        return insertarAsignacion;
    } else if (mantenimientoBody.metodo == 2) {
        const actualizarAsignacionresponse = await actualizarAsignacion(mantenimientoBody);
        console.log(actualizarAsignacionresponse);
        return actualizarAsignacionresponse;
    } else if (mantenimientoBody.metodo == 3) {
        const eliminarAsignacionResponse = await eliminarAsignacion(mantenimientoBody);
        console.log(eliminarAsignacionResponse);
        return eliminarAsignacionResponse;
    }
    else if (mantenimientoBody.metodo == 5) {
        const obtenerAsignacionesCuiResponse = await obtenerAsignacionesPorCui(mantenimientoBody);
        console.log(obtenerAsignacionesCuiResponse);
        return obtenerAsignacionesCuiResponse;
    }
}

// Consultar todas las asignaciones
async function consultarAsignaciones() {
    try {
        if (!pool) {
            pool = await poolPromise;
        }
        const request = pool.request();
        request.input('idRol', sql.Int, 2);
        const result = await request.execute('sp_obtenerAsignacionesPorRol');

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
        console.error(`Error al consultar asignaciones: ${err.message}`);
        throw new Error(`Error al consultar asignaciones: ${err.message}`);
    }
}

// Insertar nueva asignación
async function nuevaAsignacion(mantenimientoBody) {
    const asignacion = mantenimientoBody;
    try {
        const pool = await poolPromise;
        const request = pool.request();
        request.input('cui', sql.NVARCHAR(30), asignacion.cui);
        request.input('idCurso', sql.Int, asignacion.idCurso);
        request.input('idRol', sql.Int, asignacion.idRol);
        request.input('idHorario', sql.Int, asignacion.idHorario);
        request.input('idSeccion', sql.Int, asignacion.idSeccion);
        request.output('resultado', sql.Int);

        const result = await request.execute('sp_insertarAsignacionDeCurso');
        const resultado = result.output.resultado;

        if (resultado === 1) {
            return {
                status: 200,
                code: 1,
                message: "La asignación fue creada correctamente"
            };
        } else if (resultado === -1) {
            return {
                status: 200,
                code: -1,
                message: "La asignación ya está registrada"
            };
        } else {
            return {
                status: 500,
                message: "Error al crear la nueva asignación"
            };
        }
    } catch (err) {
        console.error(`Error al crear la nueva asignación: ${err.message}`);
        throw new Error(`Error al crear la nueva asignación: ${err.message}`);
    }
}

// Actualizar asignación
async function actualizarAsignacion(mantenimientoBody) {
    const asignacion = mantenimientoBody;
    try {
        const pool = await poolPromise;
        const request = pool.request();
        request.input('idAsignacion', sql.Int, asignacion.idAsignacion);
        request.input('cui', sql.NVARCHAR(30), asignacion.cui);
        request.input('idCurso', sql.Int, asignacion.idCurso);
        request.input('idRol', sql.Int, asignacion.idRol);
        request.input('idHorario', sql.Int, asignacion.idHorario);
        request.input('idSeccion', sql.Int, asignacion.idSeccion);
        request.output('resultado', sql.Int);

        const result = await request.execute('sp_actualizarAsignacionDeCurso');
        const resultado = result.output.resultado;

        if (resultado === 1) {
            return {
                status: 200,
                code: 1,
                message: "La asignación fue actualizada correctamente"
            };
        } else if (resultado === -1) {
            return {
                status: 200,
                code: -1,
                message: "La asignación ya está registrada"
            };
        } else {
            return {
                status: 500,
                message: "Error al actualizar la asignación"
            };
        }
    } catch (err) {
        console.error(`Error al actualizar la asignación: ${err.message}`);
        throw new Error(`Error al actualizar la asignación: ${err.message}`);
    }
}

// Eliminar o cambiar el estado de asignación
async function eliminarAsignacion(mantenimientoBody) {
    const asignacion = mantenimientoBody;
    try {
        const pool = await poolPromise;
        const request = pool.request();
        request.input('idAsignacion', sql.Int, asignacion.idAsignacion);
        request.output('resultado', sql.Int);

        const result = await request.execute('sp_eliminarAsignacionDeCurso');
        const resultado = result.output.resultado;

        if (resultado === 1) {
            return {
                status: 200,
                code: 1,
                message: "La asignación fue eliminada correctamente"
            };
        } else if (resultado === 2) {
            return {
                status: 200,
                code: 2,
                message: "La asignación fue reactivada correctamente"
            };
        } else if (resultado === -1) {
            return {
                status: 200,
                code: -1,
                message: "La asignación ya está registrada"
            };
        } else {
            return {
                status: 500,
                message: "Error al eliminar la asignación"
            };
        }
    } catch (err) {
        console.error(`Error al eliminar la asignación: ${err.message}`);
        throw new Error(`Error al eliminar la asignación: ${err.message}`);
    }
}



export async function obtenerAsignacionesPorCui(usuarioBody) {
    const Usuario = usuarioBody;

    try {
        // Conectar al pool de la base de datos
        const pool = await poolPromise;
        const request = pool.request();

        request.input('CUI', sql.NVARCHAR(30), Usuario.usrCui);

        const result = await request.execute('sp_obtenerAsifnacionCursosPorCUI');

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
        console.error(`Error al ingresar la persona: ${err.message}`);
        throw new Error(`Error al ingresar la persona: ${err.message}`);
    }
}
