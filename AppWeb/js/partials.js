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
            cargarFormulario(40)
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
            url = '/Mantenimiento/cursos.html'
            src = '/js/Mantenimiento/cursos.js'
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
