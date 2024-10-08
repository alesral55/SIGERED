import { buildResponse } from './utils/utils.js';
import { validarUsuario } from './Personas.js';
import { cambiarContrasenia } from './Personas.js';
import { nuevoUsuario } from './Usuarios.js';
import { obtenerPersonas } from './Personas.js';
import { obtenerPersona } from './Personas.js';
import { actualizarPersona } from './Personas.js';
import { eliminarPersona } from './Personas.js';
import { verifyToken } from './utils/auth.js';
import { Roles } from './Mantenimiento/Roles.js';
import { obtenerRoles } from './Mantenimiento/Roles.js';
import { Ciclos } from './Mantenimiento/CicloEscolar.js';
import { Niveles } from './Mantenimiento/Nieveles.js'
import { TipoDoc } from './Mantenimiento/TipoDocumento.js'; 
import { SistemaPago} from './Mantenimiento/SistemaDePago.js'
import { TipoCalificacion } from './Mantenimiento/Tipocalificacion.js';
import { TipoTarea } from './Mantenimiento/TipoTarea.js';
import { TipoEscala } from './Mantenimiento/TipoEscala.js';
import { GrupoEtnico } from './Mantenimiento/GrupoEtnico.js';
import { Discapacidad } from './Mantenimiento/Discapacidad.js';


const loginPath = '/login';
const registerPath = '/register';
const healthPath = '/health';
const docentesPath = '/docente'
const usuarioPath = '/usuario';
const personasPath = '/persona'
const rolesPath = '/rol'
const ciloPath = '/ciclo'
const nivelPath = '/nivel'
const tpDocPath = '/tpDoc'
const tpSisPago ='/tpSisPago'
const tpCalificacionPath = '/tpCalificacion'
const tpTareaPath = '/tpTarea'
const tpEscalaPath = '/tpEscala'
const grupoEtnicoPath = '/gpEtnico'
const discapacidadPath = '/discapacidad'



export const handler = async (event) => {
  let response;
  console.log("entra al index");
  console.log(event);

  try {
    switch (true) {

      case event.httpMethod === 'GET' && event.path === healthPath:
        response = buildResponse(200, { message: 'Health check OK' });
        break;
      case event.httpMethod === 'GET' && event.path === rolesPath:
        const rolesResult = await obtenerRoles();

        console.log(rolesResult, "respuesta de la validación");

        // Verificar si `loginResult` es null o no
        if (rolesResult) {
          response = buildResponse(200, rolesResult);
        } else {
          response = buildResponse(200, { message: 'Credenciales incorrectas' });
        }
        break;
      case event.httpMethod === 'POST' && event.path === loginPath:
        const loginBody = JSON.parse(event.body);

        // Agregar await para esperar a la resolución de la promesa
        const loginResult = await validarUsuario(loginBody.correo, loginBody.contrasenia);

        console.log(loginResult, "respuesta de la validación");

        // Verificar si `loginResult` es null o no
        if (loginResult) {
          response = buildResponse(200, loginResult);
        } else {
          response = buildResponse(200, { message: 'Credenciales incorrectas' });
        }

        break;
      case event.httpMethod === 'PUT' && event.path === loginPath:
        const loginBodyP = JSON.parse(event.body);

        // Agregar await para esperar a la resolución de la promesa
        const loginResultP = await cambiarContrasenia(loginBodyP.cui, loginBodyP.contraseniaActual, loginBodyP.nuevaContrasenia, loginBodyP.tkn);

        console.log(loginResultP, "respuesta de la validación");

        // Verificar si `loginResult` es null o no
        if (loginResultP) {
          response = buildResponse(200, loginResultP);
        } else {
          response = buildResponse(200, { message: 'Credenciales incorrectas' });
        }

        break;

      case event.httpMethod === 'POST' && event.path === docentesPath:
        const docentesBody = JSON.parse(event.body);

        // Agregar await para esperar a la resolución de la promesa
        const docentesResult = await cambiarContrasenia(docentesBody);

        console.log(loginResultP, "respuesta de la validación");

        // Verificar si `loginResult` es null o no
        if (docentesResult) {
          response = buildResponse(200, docentesResult);
        } else {
          response = buildResponse(200, { message: 'Credenciales incorrectas' });
        }

        break;
      case event.httpMethod === 'POST' && event.path === usuarioPath:
        const usuarioBody = JSON.parse(event.body);
        console.log('ingreso al index');
        console.log(usuarioBody);
        // Agregar await para esperar a la resolución de la promesa
        const usuarioResult = await nuevoUsuario(usuarioBody);

        console.log(usuarioResult, "respuesta de la validación");

        // Verificar si `loginResult` es null o no
        if (usuarioResult) {
          response = buildResponse(200, usuarioResult);
        } else {
          response = buildResponse(200, { message: 'Credenciales incorrectas' });
        }

        break;
      case event.httpMethod === 'POST' && event.path === personasPath:
        const personasBody = JSON.parse(event.body);
        const verification = await verifyToken(personasBody.usrCui, personasBody.tkn);
        console.log(verification);
        if (verification.verified === false) {
          response = buildResponse(401, { message: 'Token no válido, inicia session de nuevo' });
        } else {
          let personaResult
          if (personasBody.metodo == 1) { personaResult = await obtenerPersonas(personasBody); }
          else if (personasBody.metodo == 2) { personaResult = await obtenerPersona(personasBody); }
          else if (personasBody.metodo == 3) { personaResult = await actualizarPersona(personasBody); }
          else if (personasBody.metodo == 4) { personaResult = await eliminarPersona(personasBody); }


          // Verificar si `loginResult` es null o no
          if (personaResult) {
            response = buildResponse(200, personaResult);
          } else {
            response = buildResponse(200, { message: 'Credenciales incorrectas' });
          }
        }
        break;
      ///////////////REGION DE CICLO////////////////////////////////
      case event.path === ciloPath:
        let cicloResponse
        if (event.httpMethod === 'GET') { cicloResponse = await Ciclos('GET') }
        else if (event.httpMethod === 'POST') {
          const cicloBody = JSON.parse(event.body);
          const verification = await verifyToken(cicloBody.usrCui, cicloBody.tkn);
          console.log(verification);
          if (verification.verified === false) {
            response = buildResponse(401, { message: 'Token no válido, inicia session de nuevo' });
          } else {
            cicloResponse = await Ciclos(cicloBody)
          }
        }

        if (cicloResponse) {
          response = buildResponse(200, cicloResponse);
        }
        break;
      ///////////////REGION DE NIVELES////////////////////////////////
      case event.path === nivelPath:
        let nivelesResponse
        if (event.httpMethod === 'GET') { nivelesResponse = await Niveles('GET') }
        else if (event.httpMethod === 'POST') {
          const nivelesBody = JSON.parse(event.body);
          const verification = await verifyToken(nivelesBody.usrCui, nivelesBody.tkn);
          console.log(verification);
          if (verification.verified === false) {
            response = buildResponse(401, { auth: 0, message: 'Token no válido, inicia session de nuevo' });
          } else {
            console.log('entra al esle');
            nivelesResponse = await Niveles(nivelesBody)
          }
        }

        if (nivelesResponse) {

          response = buildResponse(200, nivelesResponse);
        } 
        break;
      ///////////////REGION DE TIPOdoc////////////////////////////////
      case event.path === tpDocPath:
        let tpDocResponse
        if (event.httpMethod === 'GET') { tpDocResponse = await TipoDoc('GET') }
        else if (event.httpMethod === 'POST') {
          const tpDocBody = JSON.parse(event.body);
          const verification = await verifyToken(tpDocBody.usrCui, tpDocBody.tkn);
          console.log(verification);
          if (verification.verified === false) {
            response = buildResponse(401, { auth: 0, message: 'Token no válido, inicia session de nuevo' });
          } else {
            console.log('entra al esle');
            tpDocResponse = await TipoDoc(tpDocBody)
          }
        }

        if (tpDocResponse) {

          response = buildResponse(200, tpDocResponse);
        } 
        break;

      ///////////////REGION SISTEMA DE PAGO////////////////////////////////
      case event.path === tpSisPago:
        console.log('SISTEMA DE PAGO');
        let tpSistemaPagoResponse
        if (event.httpMethod === 'GET') { tpSistemaPagoResponse = await SistemaPago('GET') }
        else if (event.httpMethod === 'POST') {
          const tpSisPagoBody = JSON.parse(event.body);
          const verification = await verifyToken(tpSisPagoBody.usrCui, tpSisPagoBody.tkn);
          console.log(verification);
          if (verification.verified === false) {
            response = buildResponse(401, { auth: 0, message: 'Token no válido, inicia session de nuevo' });
          } else {
            console.log('entra al esle sistemaPago');
            tpSistemaPagoResponse = await SistemaPago(tpSisPagoBody)
          }
        }

        if (tpSistemaPagoResponse) {

          response = buildResponse(200, tpSistemaPagoResponse);
        } 
        break;

      ///////////////REGION Tipo de Calificacion////////////////////////////////
      case event.path === tpCalificacionPath:
        console.log('TipoCalificacion');
        let tpCalificacionResponse
        if (event.httpMethod === 'GET') { tpCalificacionResponse = await TipoCalificacion('GET') }
        else if (event.httpMethod === 'POST') {
          const tpMantenimientoBody = JSON.parse(event.body);
          const verification = await verifyToken(tpMantenimientoBody.usrCui, tpMantenimientoBody.tkn);
          console.log(verification);
          if (verification.verified === false) {
            response = buildResponse(401, { auth: 0, message: 'Token no válido, inicia session de nuevo' });
          } else {
            console.log('entra al esle TipoCalificacion');
            tpCalificacionResponse = await TipoCalificacion(tpMantenimientoBody)
          }
        }

        if (tpCalificacionResponse) {

          response = buildResponse(200, tpCalificacionResponse);
        } 
        break;
    
      ///////////////REGION Tipo Tarea////////////////////////////////
      case event.path === tpTareaPath:
        console.log('TipoTarea');
        let tpTareaResponse
        if (event.httpMethod === 'GET') { tpTareaResponse = await TipoTarea('GET') }
        else if (event.httpMethod === 'POST') {
          const tpMantenimientoBody = JSON.parse(event.body);
          const verification = await verifyToken(tpMantenimientoBody.usrCui, tpMantenimientoBody.tkn);
          console.log(verification);
          if (verification.verified === false) {
            response = buildResponse(401, { auth: 0, message: 'Token no válido, inicia session de nuevo' });
          } else {
            console.log('entra al esle tipo tarea');
            tpTareaResponse = await TipoTarea(tpMantenimientoBody)
          }
        }

        if (tpTareaResponse) {

          response = buildResponse(200, tpTareaResponse);
        } 
        break;

      ///////////////REGION Tipo Escala////////////////////////////////
      case event.path === tpEscalaPath:
        console.log('TipoTarea');
        let tpEscalaResponse
        if (event.httpMethod === 'GET') { tpEscalaResponse = await TipoEscala('GET') }
        else if (event.httpMethod === 'POST') {
          const tpMantenimientoBody = JSON.parse(event.body);
          const verification = await verifyToken(tpMantenimientoBody.usrCui, tpMantenimientoBody.tkn);
          console.log(verification);
          if (verification.verified === false) {
            response = buildResponse(401, { auth: 0, message: 'Token no válido, inicia session de nuevo' });
          } else {
            console.log('entra al esle tipo tarea');
            tpEscalaResponse = await TipoEscala(tpMantenimientoBody)
          }
        }

        if (tpEscalaResponse) {

          response = buildResponse(200, tpEscalaResponse);
        } 
        break;
      ///////////////REGION GRUPO ETNICO////////////////////////////////
      case event.path === grupoEtnicoPath:
        console.log('TipoTarea');
        let tpGrupoEtnicoResponse
        if (event.httpMethod === 'GET') { tpGrupoEtnicoResponse = await GrupoEtnico('GET') }
        else if (event.httpMethod === 'POST') {
          const tpMantenimientoBody = JSON.parse(event.body);
          const verification = await verifyToken(tpMantenimientoBody.usrCui, tpMantenimientoBody.tkn);
          console.log(verification);
          if (verification.verified === false) {
            response = buildResponse(401, { auth: 0, message: 'Token no válido, inicia session de nuevo' });
          } else {
            console.log('entra al esle tipo tarea');
            tpGrupoEtnicoResponse = await GrupoEtnico(tpMantenimientoBody)
          }
        }

        if (tpGrupoEtnicoResponse) {

          response = buildResponse(200, tpGrupoEtnicoResponse);
        } 
        break;

              ///////////////REGION GRUPO ETNICO////////////////////////////////
      case event.path === discapacidadPath:
        console.log('Discapacidad');
        let discapacidadResponse
        if (event.httpMethod === 'GET') { discapacidadResponse = await Discapacidad('GET') }
        else if (event.httpMethod === 'POST') {
          const tpMantenimientoBody = JSON.parse(event.body);
          const verification = await verifyToken(tpMantenimientoBody.usrCui, tpMantenimientoBody.tkn);
          console.log(verification);
          if (verification.verified === false) {
            response = buildResponse(401, { auth: 0, message: 'Token no válido, inicia session de nuevo' });
          } else {
            console.log('entra al esle tdiscapacidad');
            discapacidadResponse = await Discapacidad(tpMantenimientoBody)
          }
        }

        if (discapacidadResponse) {

          response = buildResponse(200, discapacidadResponse);
        } 
        break;
      ///////////////FIN ////////////////////////////////
      default:
        response = buildResponse(404, { message: 'Ruta no encontrada' });
    }
  } catch (error) {
    response = buildResponse(500, { message: `Error: ${error.message}` });
  }

  return response;
}