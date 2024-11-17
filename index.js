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
import { SistemaPago } from './Mantenimiento/SistemaDePago.js'
import { TipoCalificacion } from './Mantenimiento/Tipocalificacion.js';
import { TipoTarea } from './Mantenimiento/TipoTarea.js';
import { TipoEscala } from './Mantenimiento/TipoEscala.js';
import { GrupoEtnico } from './Mantenimiento/GrupoEtnico.js';
import { Discapacidad } from './Mantenimiento/Discapacidad.js';
import { Cursos } from './Mantenimiento/Cursos.js'
import { Horarios } from './Mantenimiento/Horarios.js';
import { Secciones } from './Mantenimiento/Secciones.js';
import { CursosDiponibles } from './Mantenimiento/CursosDisponibles.js';
import { ArchivosS3 } from './ArchivosS3.js';
import { nuevoPago } from './Pagos.js';
import { nuevoAlumnoYPago } from './AlumnoPagoPath.js';
import { Inscripciones } from './Administracion/Inscripciones.js';
import { Asignaciones } from './Administracion/AsignacionDocentes.js';
import { AsignacionAlumnos } from './Administracion/AsignacionAlumnos.js';
import { AsignacionTareas } from './Docentes/AsignacionDeTareas.js';
import { Tareas } from './Alumnos/Tareas.js';
import { Reportes } from './Administracion/Reportes.js';

const loginPath = '/login';
const healthPath = '/health';
const docentesPath = '/docente'
const usuarioPath = '/usuario';
const personasPath = '/persona'
const rolesPath = '/rol'
const ciloPath = '/ciclo'
const nivelPath = '/nivel'
const tpDocPath = '/tpDoc'
const tpSisPago = '/tpSisPago'
const tpCalificacionPath = '/tpCalificacion'
const tpTareaPath = '/tpTarea'
const tpEscalaPath = '/tpEscala'
const grupoEtnicoPath = '/gpEtnico'
const discapacidadPath = '/discapacidad'
const cursosPath = '/cursos'
const horariosPath = '/horarios'
const seccionesPath = '/secciones'
const cursosDisponiblesPath = '/cursosDisponibles'
const archivosS3Path = '/archivosS3'
const pagoPath = '/pago'
const alumnoPagoPath = '/alumnoYPago';
const inscripcionesPath = '/inscripciones'
const asignacionDocentes = '/asignacionDocentes'
const asignacionAlumnosPath = '/asignacionAlumnos'
const asignacionTareasPath = '/asignacionTareas'
const tareaPath = '/tarea'
const reportesPath = '/reportes'

export const handler = async (event) => {
  let response;
  console.log("entra al index");
  //console.log(event);

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
      //#region  Personas
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
      //#endregion
      //#region  DE CICLO
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
      //#endregion
      //#region  DE NIVELES
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
      //#endregion
      //#region  DE TIPOdoc
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
      //#endregion
      //#region  SISTEMA DE PAGO
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
      //#endregion
      //#region  Tipo de Calificacion
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
      //#endregion
      //#region  Tipo Tarea
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
      //#endregion
      //#region  Tipo Escala
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
      //#endregion
      //#region  GRUPO ETNICO
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
      //#endregion
      //#region  GRUPO ETNICO
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
      //#endregion
      //#region  CURSOS
      case event.path === cursosPath:
        console.log('Cursos');
        let cursosResponse
        if (event.httpMethod === 'GET') { cursosResponse = await Cursos('GET') }
        else if (event.httpMethod === 'POST') {
          const tpMantenimientoBody = JSON.parse(event.body);
          const verification = await verifyToken(tpMantenimientoBody.usrCui, tpMantenimientoBody.tkn);
          console.log(verification);
          if (verification.verified === false) {
            response = buildResponse(401, { auth: 0, message: 'Token no válido, inicia session de nuevo' });
          } else {
            console.log('entra al esle tdiscapacidad');
            cursosResponse = await Cursos(tpMantenimientoBody)
          }
        }

        if (cursosResponse) {

          response = buildResponse(200, cursosResponse);
        }
        break;
      //#endregion
      //#region  HORARAIOS
      case event.path === horariosPath:
        console.log('horarios');
        let horariosResponse
        if (event.httpMethod === 'GET') { horariosResponse = await Horarios('GET') }
        else if (event.httpMethod === 'POST') {
          const tpMantenimientoBody = JSON.parse(event.body);
          const verification = await verifyToken(tpMantenimientoBody.usrCui, tpMantenimientoBody.tkn);
          console.log(verification);
          if (verification.verified === false) {
            response = buildResponse(401, { auth: 0, message: 'Token no válido, inicia session de nuevo' });
          } else {
            console.log('entra al esle horarios');
            horariosResponse = await Horarios(tpMantenimientoBody)
          }
        }

        if (horariosResponse) {

          response = buildResponse(200, horariosResponse);
        }
        break;
      //#endregion
      //#region  Secciones
      case event.path === seccionesPath:
        console.log('secciones');
        let seccionesResponse
        if (event.httpMethod === 'GET') { seccionesResponse = await Secciones('GET') }
        else if (event.httpMethod === 'POST') {
          const tpMantenimientoBody = JSON.parse(event.body);
          const verification = await verifyToken(tpMantenimientoBody.usrCui, tpMantenimientoBody.tkn);
          console.log(verification);
          if (verification.verified === false) {
            response = buildResponse(401, { auth: 0, message: 'Token no válido, inicia session de nuevo' });
          } else {
            console.log('entra al esle horarios');
            seccionesResponse = await Secciones(tpMantenimientoBody)
          }
        }

        if (seccionesResponse) {

          response = buildResponse(200, seccionesResponse);
        }
        break;
      //#endregion
      //#region  CURSOS DISPONIBLES
      case event.path === cursosDisponiblesPath:
        console.log('cursos Disponibels');
        let cursosDisponiblesResponse
        if (event.httpMethod === 'GET') { cursosDisponiblesResponse = await CursosDiponibles('GET') }
        else if (event.httpMethod === 'POST') {
          const tpMantenimientoBody = JSON.parse(event.body);
          const verification = await verifyToken(tpMantenimientoBody.usrCui, tpMantenimientoBody.tkn);
          console.log(verification);
          if (verification.verified === false) {
            response = buildResponse(401, { auth: 0, message: 'Token no válido, inicia session de nuevo' });
          } else {
            console.log('entra al esle horarios');
            cursosDisponiblesResponse = await CursosDiponibles(tpMantenimientoBody)
          }
        }

        if (cursosDisponiblesResponse) {

          response = buildResponse(200, cursosDisponiblesResponse);
        }
        break;
      //#endregion
      ///////////////REGION Secciones////////////////////////////////
      case event.path === archivosS3Path:
        console.log('ArchivosS3');
        let S3Response

        const MantenimientoBody = JSON.parse(event.body);

        S3Response = await ArchivosS3(MantenimientoBody)

        if (S3Response) {

          response = buildResponse(200, S3Response);
        }
        break;

      //#region  nuevo pago 

      case event.httpMethod === 'POST' && event.path === pagoPath:
        const pagoBody = JSON.parse(event.body);
        console.log('ingreso al pago');
        // Agregar await para esperar a la resolución de la promesa
        const pagoResult = await nuevoPago(pagoBody);

        console.log(pagoResult, "respuesta de la validación");

        // Verificar si `loginResult` es null o no
        if (pagoResult) {
          response = buildResponse(200, pagoResult);
        } else {
          response = buildResponse(200, { message: 'Credenciales incorrectas' });
        }

        break;
      //#endregion 
      //#region /nuevo ALUMNO Y pago 

      case event.httpMethod === 'POST' && event.path === alumnoPagoPath:
        const alumnoYpagoBody = JSON.parse(event.body);
        console.log('ingreso al ALUMNO Y pago');
        // Agregar await para esperar a la resolución de la promesa
        const alumnoYpagoResult = await nuevoAlumnoYPago(alumnoYpagoBody);

        console.log(alumnoYpagoResult, "respuesta de la validación");

        // Verificar si `loginResult` es null o no
        if (alumnoYpagoResult) {
          response = buildResponse(200, alumnoYpagoResult);
        } else {
          response = buildResponse(200, { message: 'Credenciales incorrectas' });
        }

        break;
      //#endregion 
      //#region REGION INSCRIPCIONES
      case event.path === inscripcionesPath:
        console.log('iNSCRIPCIONES');
        let inscripcionesResponse
        if (event.httpMethod === 'GET') { inscripcionesResponse = await Inscripciones('GET') }
        else if (event.httpMethod === 'POST') {
          const tpMantenimientoBody = JSON.parse(event.body);
          const verification = await verifyToken(tpMantenimientoBody.usrCui, tpMantenimientoBody.tkn);
          console.log(verification);
          if (verification.verified === false) {
            response = buildResponse(401, { auth: 0, message: 'Token no válido, inicia session de nuevo' });
          } else {
            console.log('entra al esle tdiscapacidad');
            inscripcionesResponse = await Inscripciones(tpMantenimientoBody)
          }
        }

        if (inscripcionesResponse) {

          response = buildResponse(200, inscripcionesResponse);
        }
        break;

      //#endregion 
      //#region AsignacionDocentes
      case event.path === asignacionDocentes:
        console.log('AsignacionDocentes');
        console.log(event);
        let asignacionResponse
        if (event.httpMethod === 'GET') { asignacionResponse = await Asignaciones('GET') }
        else if (event.httpMethod === 'POST') {
          const tpMantenimientoBody = JSON.parse(event.body);
          const verification = await verifyToken(tpMantenimientoBody.usrCui, tpMantenimientoBody.tkn);
          console.log(verification);
          if (verification.verified === false) {
            response = buildResponse(401, { auth: 0, message: 'Token no válido, inicia session de nuevo' });
          } else {
            console.log('entra al esle tdiscapacidad');
            asignacionResponse = await Asignaciones(tpMantenimientoBody)
          }
        }

        if (asignacionResponse) {

          response = buildResponse(200, asignacionResponse);
        }
        break;

      //#endregion 
      //#region AsignacionAlumnos
      case event.path === asignacionAlumnosPath:
        console.log('AsignacionAlumnos');
        let asignacionAResponse
        if (event.httpMethod === 'GET') { asignacionAResponse = await AsignacionAlumnos('GET') }
        else if (event.httpMethod === 'POST') {
          const tpMantenimientoBody = JSON.parse(event.body);
          const verification = await verifyToken(tpMantenimientoBody.usrCui, tpMantenimientoBody.tkn);
          console.log(verification);
          if (verification.verified === false) {
            response = buildResponse(401, { auth: 0, message: 'Token no válido, inicia session de nuevo' });
          } else {
            console.log('entra al esle tdiscapacidad');
            asignacionAResponse = await AsignacionAlumnos(tpMantenimientoBody)
          }
        }

        if (asignacionAResponse) {

          response = buildResponse(200, asignacionAResponse);
        }
        break;

      //#endregion 
      //#region AsignacionAlumnos
      case event.path === asignacionTareasPath:
        console.log('Asignacio TAREAS');
        let asignacionTResponse
        if (event.httpMethod === 'GET') { asignacionTResponse = await AsignacionTareas('GET') }
        else if (event.httpMethod === 'POST') {
          const tpMantenimientoBody = JSON.parse(event.body);
          const verification = await verifyToken(tpMantenimientoBody.usrCui, tpMantenimientoBody.tkn);
          console.log(verification);
          if (verification.verified === false) {
            response = buildResponse(401, { auth: 0, message: 'Token no válido, inicia session de nuevo' });
          } else {
            console.log('entra al esle tdiscapacidad');
            asignacionTResponse = await AsignacionTareas(tpMantenimientoBody)
          }
        }

        if (asignacionTResponse) {

          response = buildResponse(200, asignacionTResponse);
        }
        break;

      //#endregion 
      //#region AsignacionAlumnos
      case event.path === tareaPath:
        console.log('Asignacio TAREAS Alumno');
        let asignacionTAResponse
        if (event.httpMethod === 'GET') { asignacionTAResponse = await Tareas('GET') }
        else if (event.httpMethod === 'POST') {
          const tpMantenimientoBody = JSON.parse(event.body);
          const verification = await verifyToken(tpMantenimientoBody.usrCui, tpMantenimientoBody.tkn);
          console.log(verification);
          if (verification.verified === false) {
            response = buildResponse(401, { auth: 0, message: 'Token no válido, inicia session de nuevo' });
          } else {
            console.log('entra al esle tdiscapacidad');
            asignacionTAResponse = await Tareas(tpMantenimientoBody)
          }
        }

        if (asignacionTAResponse) {

          response = buildResponse(200, asignacionTAResponse);
        }
        break;

      //#endregion 
            //#region REPORTES
            case event.path === reportesPath:
              console.log('Reportes');
              let resportesResponse
              if (event.httpMethod === 'GET') { resportesResponse = await Reportes('GET') }
              else if (event.httpMethod === 'POST') {
                const tpMantenimientoBody = JSON.parse(event.body);
                const verification = await verifyToken(tpMantenimientoBody.usrCui, tpMantenimientoBody.tkn);
                console.log(verification);
                if (verification.verified === false) {
                  response = buildResponse(401, { auth: 0, message: 'Token no válido, inicia session de nuevo' });
                } else {
                  console.log('entra al esle tdiscapacidad');
                  resportesResponse = await Reportes(tpMantenimientoBody)
                }
              }
      
              if (resportesResponse) {
      
                response = buildResponse(200, resportesResponse);
              }
              break;
      
            //#endregion 
      
      ///////////////FIN ////////////////////////////////
      default:
        response = buildResponse(404, { message: 'Ruta no encontrada' });
    }
  } catch (error) {
    response = buildResponse(500, { message: `Error: ${error.message}` });
  }

  return response;
}
