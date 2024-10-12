/*
// Deshabilitar clic derecho
 document.addEventListener('contextmenu', function(e) {
     e.preventDefault();
 }, false);
 
 // Intento de bloquear la consola
 (function() {
     var _z = console;
     Object.defineProperty(window, "console", {
         get: function() {
             return _z;
         },
         set: function(val) {
             _z = val;
         }
     });
 })();*/





//const urlConsulta = 'https://7q854bslmd.execute-api.us-east-2.amazonaws.com/prod'
const urlConsulta = 'http://localhost:3000'
const personasPath = urlConsulta + '/persona';
const rolesPath = urlConsulta + '/rol';
const cicloPath = urlConsulta + '/ciclo';
const nivelesPath = urlConsulta + '/nivel'
const tpDocPath = urlConsulta + '/tpDoc'
const tpSisPago = urlConsulta + '/tpSisPago'
const tpCalificacionPath = urlConsulta + '/tpCalificacion'
const tpTareaPath = urlConsulta + '/tpTarea'
const tpEscalaPath = urlConsulta + '/tpEscala'
const grupoEtnicoPath = urlConsulta + '/gpEtnico'
const discapacidadPath = urlConsulta + '/discapacidad'
const cursosPath = urlConsulta +  '/cursos'
const horariosPath =urlConsulta +'/horarios'
const seccionesPath = urlConsulta +'/secciones'
const cursosDisponiblesPath =  urlConsulta +'/cursosDisponibles'

function cargarInicio() {
    const cambio = sessionStorage.getItem('requiereCambio')
    if (cambio == 1) {
        cargarFormulario(60)
    }
    else {
        const rol = sessionStorage.getItem('idRol')
        if (rol == 2) {
            document.getElementById('liAlumnos').style.display = 'none';
            document.getElementById('liMantenimiento').style.display = 'none';
            document.getElementById('liDocentes').style.display = 'block';
            document.getElementById('liAdministracion').style.display = 'none';
            cargarFormulario(30)
        }
        if (rol == 3) {
            document.getElementById('liAlumnos').style.display = 'block';
            document.getElementById('liMantenimiento').style.display = 'none';
            document.getElementById('liDocentes').style.display = 'none';
            document.getElementById('liAdministracion').style.display = 'none';
            cargarFormulario(20)
        }
        if (rol == 1) {
            cargarFormulario(50)
        }

    }

}

function cargarFormulario(direccion) {


    let dropdowns = document.querySelectorAll('.dropdown-menu.show');
    dropdowns.forEach((dd) => {
        let instance = bootstrap.Dropdown.getInstance(dd);
        if (instance) {
            instance.hide();  // Cierra el dropdown si está abierto
        }
    });

    let url
    let src
    switch (direccion) {
        case 1:
            url = '/componentes/inicioAlumnos.html'
            break;
        case 20:
            url = '/componentes/inicioAlumnos.html'
            break;
        case 30:
            url = '/componentes/inicioDocentes.html'
            break;
        case 40:
            url = '/componentes/inicioAdministracion.html'
            break;
        case 47:
            url = '/Administracion/reporteDocentes.html'
            src = '/js/Administracion/reporteDocentes.js'
            break;
        case 50:
            url = '/componentes/inicioMantenimiento.html'
            break;
        case 51:
            url = '/Mantenimiento/nuevoDocente.html'
            src = '/js/Mantenimiento/nuevoUsuario.js'
            break;
        case 52:
            url = '/Mantenimiento/actualizarDocente.html'
            src = '/js/Mantenimiento/actualizarDocente.js'
            break;
        case 53:
            url = '/Mantenimiento/Cursos.html'
            src = '/js/Mantenimiento/Cursos.js'
            break;
        case 54:
            url = '/Mantenimiento/roles.html'
            src = '/js/Mantenimiento/roles.js'
            break;
        case 55:
            url = '/Mantenimiento/cicloEscolar.html'
            src = '/js/Mantenimiento/cicloEscolar.js'
            break;
        case 56:
            url = '/Mantenimiento/niveles.html'
            src = '/js/Mantenimiento/niveles.js'
            break;
        case 57:
            url = '/Mantenimiento/tipoEscala.html'
            src = '/js/Mantenimiento/niveles.js'
            break;
        case 58:
            url = '/Mantenimiento/tipoTarea.html'
            src = '/js/Mantenimiento/niveles.js'
            break;
        case 59:
            url = '/Mantenimiento/tipoDocumento.html'
            src = '/js/Mantenimiento/tipoDocumento.js'
            break;
        case 61:
            url = '/Mantenimiento/sistemaDePago.html'
            src = '/js/Mantenimiento/sistemaDePago.js'
            break;
        case 62:
            url = '/Mantenimiento/TipoCalificacion.html'
            src = '/js/Mantenimiento/TipoCalificacion.js'
            break;
        case 63:
            url = '/Mantenimiento/TipoTarea.html'
            src = '/js/Mantenimiento/TipoTarea.js'
            break;
        case 64:
            url = '/Mantenimiento/TipoEscala.html'
            src = '/js/Mantenimiento/TipoEscala.js'
            break;

        case 65:
            url = '/Mantenimiento/GrupoEtnico.html'
            src = '/js/Mantenimiento/GrupoEtnico.js'
            break;
        case 66:
            url = '/Mantenimiento/Discapacidad.html'
            src = '/js/Mantenimiento/Discapacidad.js'
            break;
            case 67:
                url = '/Mantenimiento/Horarios.html'
                src = '/js/Mantenimiento/Horarios.js'
                break;
                case 68:
                    url = '/Mantenimiento/Secciones.html'
                    src = '/js/Mantenimiento/Secciones.js'
                    break;
                    case 69:
                    url = '/Mantenimiento/CursosDisponibles.html'
                    src = '/js/Mantenimiento/CursosDisponibles.js'
                    break;

        case 60:
            url = '/usuario/cambiarContrasenia.html'
            break;

        default:
            alert('No existe la ruta')
            return
    }

    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById('body-content').innerHTML = data;
            //eliminar y agregar el nuevo script
            $('#partialScript').remove();
            if (src) {
                let script = document.createElement('script');
                script.id = "partialScript";
                script.src = src
                document.body.appendChild(script);
            }

        })
        .catch(error => console.log('Error:', error));
}
