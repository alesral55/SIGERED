import { poolPromise } from './db.js';
import sql from 'mssql';
import { generateToken } from './utils/auth.js';
import { verifyToken } from './utils/auth.js';
import bcrypt from 'bcryptjs';

export async function validarUsuario(correo, contrasenia) {
    console.log("Validando usuario:", correo);

    try {
        const pool = await poolPromise;
        const request = pool.request();

        // Parámetros de entrada
        request.input('correo', sql.NVarChar(510), correo);

        // Parámetros de salida
        request.output('contrasenia', sql.NVarChar(sql.MAX));
        request.output('Nombre', sql.NVarChar(200));
        request.output('idRol', sql.Int);
        request.output('accesos', sql.NVarChar(40));
        request.output('cui', sql.NVarChar(30));
        request.output('cambio', sql.Int);

        // Ejecutar el procedimiento almacenado
        const result = await request.execute('sp_validarUsuario');
        console.log(result);

        // Verificar que la contraseña no sea null y comparar con bcrypt
        const passwordDB = result.output.contrasenia?.trim();
        const passwordMatches = bcrypt.compareSync(contrasenia.trim(), passwordDB);

        if (!passwordMatches) {
            console.log("Contraseña incorrecta");
            return null;
        }

        if (!result.output.Nombre || !result.output.idRol) {
            console.log("El usuario no existe en la base de datos");
            return null;
        }

        const userTkn = {
            cui: result.output.cui,
            nombre: result.output.Nombre,
        };

        const token = generateToken(userTkn);

        return {
            nombre: result.output.Nombre,
            idRol: result.output.idRol,
            accesos: result.output.accesos,
            cui: result.output.cui,
            requiereCambio: result.output.cambio,
            token: token,
        };

    } catch (err) {
        throw new Error(`Error al validar usuario: ${err.message}`);
    }
}

//          CAMBIO DE CONTRASENIA

export async function cambiarContrasenia(cui, contraseniaActual, nuevaContrasenia, tkn) {
    console.log("Iniciando el cambio de contraseña para CUI:", cui);

    console.log(tkn);
    // Verificar el token (esperar a que la promesa se resuelva)
    const verification = verifyToken(cui, tkn);
    console.log(verification);
    if (verification.verified == false) {
        return util.buildResponse(401, verification);
    }

    console.log('El token es válido');

    try {
        // Conectar al pool de la base de datos
        const pool = await poolPromise;
        const request = pool.request();

        // 1. Obtener la contraseña actual de la base de datos
        request.input('cui', sql.NVarChar(30), cui);
        const result = await request.execute('sp_obtenerContrasenia');

        const contraseniaBD = result.recordset[0]?.contrasenia?.trim();
        if (!contraseniaBD) {
            console.log("No se encontró la contraseña en la base de datos");
            return {
                status: 404,
                message: "Usuario no encontrado"
            };
        }

        // 2. Comparar la contraseña actual con la almacenada en la base de datos
        const passwordMatches = bcrypt.compareSync(contraseniaActual.trim(), contraseniaBD);
        if (!passwordMatches) {
            console.log("La contraseña actual es incorrecta");
            return {
                status: 400,
                message: "La contraseña actual no coincide"
            };
        }

        // 3. Encriptar la nueva contraseña
        const nuevaContraseniaEncriptada = bcrypt.hashSync(nuevaContrasenia.trim(), 10);

        // 4. Actualizar la contraseña en la base de datos
        const updateRequest = pool.request();
        updateRequest.input('cui', sql.NVarChar(30), cui);
        updateRequest.input('contrasenia', sql.NVarChar(sql.MAX), nuevaContraseniaEncriptada);
        updateRequest.output('resultado', sql.Int);

        const updateResult = await updateRequest.execute('sp_cambiarContrasenia');
        const resultado = updateResult.output.resultado;
        console.log(resultado + 'resultado');
        if (resultado === 1) {
            return {
                status: 200,
                code: 1,
                message: "Persona ingresada correctamente",
                token: tkn  // Devuelve el mismo token
            }
        }

        else {
            return {
                status: 500,
                message: "Error al actualizar la contraseña"
            };
        }

    } catch (err) {
        console.error(`Error al cambiar la contraseña: ${err.message}`);
        throw new Error(`Error al cambiar la contraseña: ${err.message}`);
    }
}




export async function obtenerPersonas(usuarioBody) {
    const Usuario = usuarioBody;

    try {
        // Conectar al pool de la base de datos
        const pool = await poolPromise;
        const request = pool.request();

        const estado = Usuario.estado;  // Estado 'A' o 'I'
        const idRol = Usuario.idRol;    // El valor del idRol

        // Parámetros de entrada
        request.input('estado', sql.CHAR(1), estado);
        request.input('idRol', sql.INT, idRol);

        const result = await request.execute('sp_consultarTodasPersonas');

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

export async function obtenerPersona(usuarioBody) {
    const Usuario = usuarioBody;

    console.log('Ingresa al método antes de obtener');
    console.log(Usuario);


    try {
        // Conectar al pool de la base de datos
        const pool = await poolPromise;
        const request = pool.request();

        // Parámetros de entrada
        request.input('CUI', sql.NVARCHAR(60), Usuario.cui);

        const result = await request.execute('sp_consultarPersona');
        console.log(result);

        if (result.rowsAffected == 0) {
            return {
                status: 200,
                data: [],
                code: -1,
                message: "No se encontraron resultados"
            };
        }
        // Resultados
        else if (result.recordset.length > 0) {
            return {
                status: 200,
                data: result.recordset[0],///para devolver solo el primero objeto 
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
        console.error(`Error al obtener la persona: ${err.message}`);
        throw new Error(`Error al obtener la persona: ${err.message}`);
    }
}


export async function actualizarPersona(usuarioBody) {
    const Usuario = usuarioBody;
    console.log('Ingresa a actualizar a la persona');

    try {
        // Conectar al pool de la base de datos
        const pool = await poolPromise;
        const request = pool.request();
        const idRol = Usuario.idRol;  // Obtener idRol del objeto Usuario

        request.input('CUI', sql.NVARCHAR(60), Usuario.CUI);
        request.input('primerNombre', sql.NVARCHAR(200), Usuario.primerNombre);
        request.input('segundoNombre', sql.NVARCHAR(600), Usuario.segundoNombre);
        request.input('primerApellido', sql.NVARCHAR(200), Usuario.primerApellido);
        request.input('segundoApellido', sql.NVARCHAR(600), Usuario.segundoApellido);
        request.input('fechaDeNacimiento', sql.DATE, Usuario.fechaDeNacimiento);
        request.input('correo', sql.NVARCHAR(510), Usuario.correo);
        request.input('telefono', sql.NVARCHAR(30), Usuario.telefono);
        request.input('genero', sql.CHAR(1), Usuario.genero);
        request.input('idRol', sql.INT, idRol);
        //request.input('contrasenia', sql.NVARCHAR(sql.MAX), nuevaContraseniaEncriptada);
        request.input('codigoPersonal', sql.NVARCHAR(60), Usuario.codigoPersonal);
        request.input('estado', sql.CHAR(1), Usuario.estado);
        request.input('direccion', sql.NVARCHAR(600), Usuario.direccion);
        request.output('resultado', sql.Int);

        const Result = await request.execute('sp_actualizarPersona');
        const resultado = Result.output.resultado;

        if (resultado === 1) {
            return {
                status: 200,
                code: 1,
                message: "Los datos de la persona se actualizaron correctamente"
            }

        } else if (resultado === -2) {
            return {
                status: 200,
                code: -1,
                message: " Otro usuario tiene este correo"
            }

        } else if (resultado === -1) {
            return {
                status: 200,
                code: -1,
                message: " No existe la persona"

            }
        }
        else {
            return {
                status: 500,
                message: "Error al actualizar la persona"
            };
        }

    } catch (err) {
        console.error(`Error al actualizar la persona: ${err.message}`);
        throw new Error(`Error al actualizar la persona: ${err.message}`);
    }
}

export async function eliminarPersona(usuarioBody) {
    const Usuario = usuarioBody;
    console.log('Ingresa a actualizar a la persona');

    try {
        // Conectar al pool de la base de datos
        const pool = await poolPromise;
        const request = pool.request();

        request.input('CUI', sql.NVARCHAR(60), Usuario.cui);

        request.output('resultado', sql.Int);

        const Result = await request.execute('sp_eliminarPersona');
        const resultado = Result.output.resultado;

        if (resultado === 1) {
            return {
                status: 200,
                code: 1,
                message: "La persona fue desactivada correctamente"
            }

        } else if (resultado === 2) {
            return {
                status: 200,
                code: 1,
                message: "La persona fue reactivada correctamente"
            }

        } else if (resultado === -1) {
            return {
                status: 200,
                code: -1,
                message: " No existe la persona"

            }
        }
        else {
            return {
                status: 500,
                message: "Error al actualizar la persona"
            };
        }

    } catch (err) {
        console.error(`Error al actualizar la persona: ${err.message}`);
        throw new Error(`Error al actualizar la persona: ${err.message}`);
    }
}
