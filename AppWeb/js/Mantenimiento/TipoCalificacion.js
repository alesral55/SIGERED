if (typeof datosMantenimiento === 'undefined') {
    var datosMantenimiento = []; // Declárala si no existe
} else {
    datosMantenimiento.length = 0; // Límpiala si ya existe
}

ObtenerTbMantenimiento()
// Función para obtener todas las personas
function ObtenerTbMantenimiento() {

    fetch(tpCalificacionPath)
        .then(function (respuesta) {
            if (respuesta.ok) {
                return respuesta.json();

            }
            else if (respuesta.status === 401) {
                mostrarModalReautenticacion();
                return
            }
        })
        .then(function (datos) {
            //console.log(datos);
            if (datos) {
                datosMantenimiento = datos.data
                generarTabla('A')
            }
            else { return }

        });
}


// Función para generar la tabla
function generarTabla(estado) {
    const Mantenimientos = datosMantenimiento
    const btnNiveles = document.getElementById('btnCamioEstado')
    //console.log(roles);
    const tabla = document.getElementById('tablaMantenimietos');
    tabla.innerHTML = '';

    Mantenimientos.forEach((mantenimiento) => {
        if (estado == 'A') {
            btnNiveles.onclick = function () {
                generarTabla('I'); // Modo actualización
            };
            const fila = document.createElement('tr');
            btnNiveles.innerText = 'Tipo de Documento  Inactivos'

                if(mantenimiento.estado == 'A'){
                    fila.innerHTML = `
                    <td>${mantenimiento.idTipoCalificacion}</td>  
                    <td>${mantenimiento.descripcion}</td>  
                    <td>
                        <button class="btn btnAzul btn-dark" onclick="abrirModalEditar(${mantenimiento.idTipoCalificacion})">Editar</button>
                        <button class="btn btnRojo btn-dark" onclick="EliminarMantenimiento(${mantenimiento.idTipoCalificacion})">Eliminar</button>
                    </td>
        
                `;
                tabla.appendChild(fila);
                }

        }
        else if (estado == "I") {
            btnNiveles.onclick = function () {
                generarTabla('A'); // Modo actualización
            };
            btnNiveles.innerText = 'Tipo de Documento Activos'

            const fila = document.createElement('tr');
            if (mantenimiento.estado == 'I') {
                fila.innerHTML = `
                    <td>${mantenimiento.idTipoCalificacion}</td>  
                    <td>${mantenimiento.descripcion}</td>  
                    <td>
                        <button class="btn btnRojo btn-dark" onclick="EliminarMantenimiento(${mantenimiento.idTipoCalificacion})">Reactivar Nivel</button>
                    </td>

                `;
              tabla.appendChild(fila);
            }

        }


    });
}


function CrearMantenimiento() {
    // Obtener el formulario y los datos
    let form = document.getElementById('formI');
    let formData2 = new FormData(form);
    let data = Object.fromEntries(formData2.entries());

    // Agregar datos adicionales de sesión
    data.usrCui = sessionStorage.getItem('cui');
    data.tkn = sessionStorage.getItem('token');
    data.metodo = 1;

    // Validación de campos obligatorios
    if (!data.descripcion) {
        AWarning("Todos los campos obligatorios");
        return;
    }
    $('#modalMantenimiento').modal('hide');
    // Realizar la solicitud fetch para crear el mantenimiento
    fetch(tpCalificacionPath, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(function (respuesta) {
            if (respuesta.status === 401) {
                // Si el token ha expirado, mostrar la pantalla de reautenticación
                mostrarModalReautenticacion(); // Asegúrate de que esta función esté definida
            }
            if (respuesta.ok) {
                return respuesta.json();
            }
        })
        .then(function (datos) {
            if (datos) {
                // Mostrar alerta con la información de respuesta
                generarAlerta(datos);
                // Ocultar el modal de mantenimiento
                ObtenerTbMantenimiento()
            }
        })
        .catch(function (error) {
            console.error('Error:', error);
        });
}


function abrirModalEditar(id) {
    console.log(datosMantenimiento);
    console.log(id);
    const mantenimiento = datosMantenimiento.find(item => item.idTipoCalificacion == id);
    console.log(mantenimiento);
    if (mantenimiento) {
        document.querySelector('input[name="idTipoCalificacion"]').value = mantenimiento.idTipoCalificacion;
        document.querySelector('input[name="descripcion"]').value = mantenimiento.descripcion;

        $('#modalMantenimiento').modal('show');

        // Cambiar el botón de guardar para actualización
        document.getElementById('btnGuardar').onclick = function () {
            ActualizarMantenimiento(); // Modo actualización
        };
        document.getElementById('tituloModal').innerText = 'Actualizar Tipo de Documento';

    }
}

function abrirModalInsertar() {


    $('#modalMantenimiento').modal('show');

    // Cambiar el botón de guardar para actualización
    document.getElementById('btnGuardar').onclick = function () {
        CrearMantenimiento(); // Modo actualización
    };
    document.getElementById('tituloModal').innerText = 'Agregar  Tipo de Documento';


}

function EliminarMantenimiento(id) {

    let data = {}

    // Agregar datos adicionales de sesión
    data.usrCui = sessionStorage.getItem('cui');
    data.tkn = sessionStorage.getItem('token');
    data.metodo = 3;
    data.idTipoCalificacion = id

    $('#modalMantenimiento').modal('hide');
    // Realizar la solicitud fetch para crear el mantenimiento
    fetch(tpCalificacionPath, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(function (respuesta) {
            if (respuesta.status === 401) {
                // Si el token ha expirado, mostrar la pantalla de reautenticación
                mostrarModalReautenticacion(); // Asegúrate de que esta función esté definida
            }
            if (respuesta.ok) {
                return respuesta.json();
            }
        })
        .then(function (datos) {
            if (datos) {
                // Mostrar alerta con la información de respuesta
                generarAlerta(datos);
                // Ocultar el modal de mantenimiento
                ObtenerTbMantenimiento()
            }
        })
        .catch(function (error) {
            console.error('Error:', error);
        });
}

function ActualizarMantenimiento() {

    // Obtener el formulario y los datos
    let form = document.getElementById('formI');
    let formData2 = new FormData(form);
    let data = Object.fromEntries(formData2.entries());

    // Agregar datos adicionales de sesión
    data.usrCui = sessionStorage.getItem('cui');
    data.tkn = sessionStorage.getItem('token');
    data.metodo = 2;

    // Validación de campos obligatorios
    if (!data.descripcion) {
        AWarning("Todos los campos obligatorios");
        return;
    }
    $('#modalMantenimiento').modal('hide');
    // Realizar la solicitud fetch para crear el mantenimiento
    fetch(tpCalificacionPath, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(function (respuesta) {
            if (respuesta.status === 401) {
                // Si el token ha expirado, mostrar la pantalla de reautenticación
                mostrarModalReautenticacion(); // Asegúrate de que esta función esté definida
            }
            if (respuesta.ok) {
                return respuesta.json();
            }
        })
        .then(function (datos) {
            if (datos) {
                // Mostrar alerta con la información de respuesta
                generarAlerta(datos);
                // Ocultar el modal de mantenimiento
                ObtenerTbMantenimiento()
            }
        })
        .catch(function (error) {
            console.error('Error:', error);
        });
}
