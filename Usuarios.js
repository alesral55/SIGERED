import { poolPromise } from './db.js';
import sql from 'mssql';
import { generateToken } from './utils/auth.js';
import { verifyToken } from './utils/auth.js';
import bcrypt from 'bcryptjs';

export async function nuevoUsuario(usuarioBody) {
    const Usuario = usuarioBody;
    
    console.log('Ingresa al método antes de insertar');
    console.log(Usuario);
    console.log(Usuario.tkn);

    // Verificar el token (agregar await si verifyToken es asincrónico)
    const verification = await verifyToken(Usuario.usrCui, Usuario.tkn);
    console.log(verification);
    if (verification.verified === false) {
        return {
            status: 401,
            message: 'Token no válido, inicia session de nuevo'
        };
    }
    
    console.log('El token es válido');

    try {
        // Conectar al pool de la base de datos
        const pool = await poolPromise;
        const request = pool.request();
        const nuevaContraseniaEncriptada = bcrypt.hashSync(Usuario.contrasenia.trim(), 10);
        // Asegúrate de pasar el valor correcto para idRol
        const idRol = Usuario.idRol;  // Obtener idRol del objeto Usuario

        request.input('CUI', sql.NVARCHAR(60), Usuario.cui);
        request.input('primerNombre', sql.NVARCHAR(200), Usuario.primerNombre);
        request.input('segundoNombre', sql.NVARCHAR(600), Usuario.segundoNombre);
        request.input('primerApellido', sql.NVARCHAR(200), Usuario.primerApellido);
        request.input('segundoApellido', sql.NVARCHAR(600), Usuario.segundoApellido);
        request.input('fechaDeNacimiento', sql.DATE, Usuario.fechaDeNacimiento);
        request.input('correo', sql.NVARCHAR(510), Usuario.correo);
        request.input('telefono', sql.NVARCHAR(30), Usuario.telefono);
        request.input('genero', sql.CHAR(1), Usuario.genero);
        request.input('idRol', sql.INT, idRol);
        request.input('contrasenia', sql.NVARCHAR(sql.MAX), nuevaContraseniaEncriptada);
        request.input('codigoPersonal', sql.NVARCHAR(60), Usuario.codigoPersonal);
        request.input('estado', sql.CHAR(1), Usuario.estado);
        request.input('direccion', sql.NVARCHAR(600), Usuario.direccion);
        request.output('resultado', sql.Int);

        const Result = await request.execute('sp_insertarPersona');
        const resultado = Result.output.resultado;

        if (resultado === 1) {
            return {
                status: 200,
                code: 1,
                message: "La persona fue ingresada correctamente"}
               
        }        else if (resultado === -2) {
            return {
                status: 200,
                code: -1,
                message: "El correo de la persona ya se encuetra registrado"}
                
        }        else if (resultado === -1) {
            return {
                status: 200,
                code: -1,
                message: "El cui de la persona ya se encuetra registrado"
               
            }
        }  
        else {
            return {
                status: 500,
                message: "Error al ingresar la persona"
            };
        }

    } catch (err) {
        console.error(`Error al ingresar la persona: ${err.message}`);
        throw new Error(`Error al ingresar la persona: ${err.message}`);
    }
}
