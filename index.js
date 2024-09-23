import { buildResponse } from './utils/utils.js';
import { validarUsuario } from './Personas.js';
import { cambiarContrasenia } from './Personas.js';
import { nuevoUsuario } from './Usuarios.js';
import { obtenerPersonas } from './Personas.js';
import { obtenerPersona } from './Personas.js';
import { actualizarPersona } from './Personas.js';
import { eliminarPersona } from './Personas.js';
import { verifyToken } from './utils/auth.js';

const loginPath = '/login';
const registerPath = '/register';
const healthPath = '/health';
const docentesPath = '/docente'
const usuarioPath ='/usuario';
const personasPath ='/persona'

export const handler = async (event) => {
  let response;
  console.log("entra al index");
  console.log(event);

  try {
    switch (true) {

      case event.httpMethod === 'GET' && event.path === healthPath:
        response = buildResponse(200, { message: 'Health check OK' });
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
                }else{
                  let personaResult 
                  if(personasBody.metodo==1){personaResult= await obtenerPersonas(personasBody);}
                  else if(personasBody.metodo==2){personaResult= await obtenerPersona(personasBody);}
                  else if(personasBody.metodo==3){personaResult= await actualizarPersona(personasBody);}
                  else if(personasBody.metodo==4){personaResult= await eliminarPersona(personasBody);}


                // Verificar si `loginResult` es null o no
                if (personaResult) {
                  response = buildResponse(200, personaResult);
                } else {
                  response = buildResponse(200, { message: 'Credenciales incorrectas' });
                }
                }

        
                break;

      default:
        response = buildResponse(404, { message: 'Ruta no encontrada' });
    }
  } catch (error) {
    response = buildResponse(500, { message: `Error: ${error.message}` });
  }

  return response;
}
