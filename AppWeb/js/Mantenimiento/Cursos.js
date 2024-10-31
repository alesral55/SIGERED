if (typeof datosMantenimiento === 'undefined') {
    var datosMantenimiento = []; // Declárala si no existe
} else {
    datosMantenimiento.length = 0; // Límpiala si ya existe
}

if (typeof nivelesCargados === 'undefined') {
    var nivelesCargados = []; // Declárala si no existe
} else {
    nivelesCargados.length = 0; // Límpiala si ya existe
}




ObtenerTbMantenimiento()
// Función para obtener todas las personas
function ObtenerTbMantenimiento() {

    fetch(cursosPath)
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
            btnNiveles.innerText = 'Cursos  Inactivos'

                if(mantenimiento.estado == 'A'){
                    fila.innerHTML = `
                    <td>${mantenimiento.idCurso}</td>  
                    <td>${mantenimiento.nombreCurso}</td>  
                    <td>${mantenimiento.descripcionCurso}</td>  
                    <td>${mantenimiento.nombreNivel}</td>  


                    <td>
                        <button class="btn btnAzul btn-dark" onclick="abrirModalEditar(${mantenimiento.idCurso})">Editar</button>
                        <button class="btn btnRojo btn-dark" onclick="EliminarMantenimiento(${mantenimiento.idCurso})">Eliminar</button>
                    </td>
        
                `;
                tabla.appendChild(fila);
                }

        }
        else if (estado == "I") {
            btnNiveles.onclick = function () {
                generarTabla('A'); // Modo actualización
            };
            btnNiveles.innerText = 'Cursos Activos'

            const fila = document.createElement('tr');
            if (mantenimiento.estado == 'I') {
                fila.innerHTML = `
                    <td>${mantenimiento.idCurso}</td>  
                    <td>${mantenimiento.nombreCurso}</td>  
                    <td>${mantenimiento.descripcionCurso}</td>  
                    <td>${mantenimiento.nombreNivel}</td>  
                    <td>
                        <button class="btn btnRojo btn-dark" onclick="EliminarMantenimiento(${mantenimiento.idCurso})">Reactivar Sistema de Pago</button>
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
    if (!data.nombreCurso || !data.idNivel) {
        AWarning("Todos los campos obligatorios");
        return;
    }
    $('#modalMantenimiento').modal('hide');
    // Realizar la solicitud fetch para crear el mantenimiento
    fetch(cursosPath, {
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

/*
function abrirModalEditar(id) {
    console.log(datosMantenimiento);
    console.log(id);
    const mantenimiento = datosMantenimiento.find(item => item.idSistemaPago == id);
    console.log(mantenimiento);
    if (mantenimiento) {
        document.querySelector('input[name="idSistemaPago"]').value = mantenimiento.idSistemaPago;
        document.querySelector('input[name="nombre"]').value = mantenimiento.nombre;
        document.querySelector('input[name="DESCRIPCION"]').value = mantenimiento.DESCRIPCION;

        $('#modalMantenimiento').modal('show');

        // Cambiar el botón de guardar para actualización
        document.getElementById('btnGuardar').onclick = function () {
            ActualizarMantenimiento(); // Modo actualización
        };
        document.getElementById('tituloModal').innerText = 'Actualizar Sistema de Pago';

    }
}

function abrirModalInsertar() {


    $('#modalMantenimiento').modal('show');

    // Cambiar el botón de guardar para actualización
    document.getElementById('btnGuardar').onclick = function () {
        CrearMantenimiento(); // Modo actualización
    };
    document.getElementById('tituloModal').innerText = 'Agregar  Sistema de Pago';


}*/


function EliminarMantenimiento(id) {

    let data = {}

    // Agregar datos adicionales de sesión
    data.usrCui = sessionStorage.getItem('cui');
    data.tkn = sessionStorage.getItem('token');
    data.metodo = 3;
    data.idCurso = id

    $('#modalMantenimiento').modal('hide');
    // Realizar la solicitud fetch para crear el mantenimiento
    fetch(cursosPath, {
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
    if (!data.nombreCurso) {
        AWarning("Todos los campos obligatorios");
        return;
    }
    $('#modalMantenimiento').modal('hide');
    // Realizar la solicitud fetch para crear el mantenimiento
    fetch(cursosPath, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(function (respuesta) {
            if (respuesta.status === 401) {
                // Si el token ha expirado, mostrar la pantalla de reautenticación
                mostrarModalReautenticacion(); 
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

/////////logica para cargar datos al select de niveles 



// Variable global para almacenar los niveles


async  function ObtenerNiveles() {
    // Si ya tenemos niveles cargados, no los volvemos a buscar
    if (nivelesCargados.length > 0) {
        return nivelesCargados;
    }

    return fetch(nivelesPath)
        .then(function (respuesta) {
            if (respuesta.ok) {
                return respuesta.json();
            } else if (respuesta.status === 401) {
                mostrarModalReautenticacion();
                return;
            }
        })
        .then(function (datos) {
            if (datos) {
                // Filtrar solo los niveles con estado 'A'
                nivelesCargados = datos.data.filter(nivel => nivel.estado === 'A');
                return nivelesCargados;
            } else {
                return [];
            }
        });
}

// Función para llenar el select de niveles
function LlenarSelectNiveles(selectElement, nivelSeleccionado = null) {
    // Limpiar el select
    selectElement.innerHTML = '';

    // Añadir opción por defecto
    const opcionDefault = document.createElement('option');
    opcionDefault.value = '';
    opcionDefault.text = 'Seleccione un nivel';
    selectElement.appendChild(opcionDefault);

    // Llenar el select con los niveles
    ObtenerNiveles().then(niveles => {
        niveles.forEach(nivel => {
            const option = document.createElement('option');
            option.value = nivel.idNivel;
            option.text = nivel.nombreNivel;

            // Si estamos actualizando, marcar el nivel seleccionado
            if (nivelSeleccionado && nivelSeleccionado === nivel.idNivel) {
                option.selected = true;
            }

            selectElement.appendChild(option);
        });
    });
}

function abrirModalInsertar() {
    // Abrir el modal
    $('#modalMantenimiento').modal('show');

    // Llenar el select de niveles sin seleccionar ninguno
    const selectNiveles = document.querySelector('select[name="idNivel"]');
    LlenarSelectNiveles(selectNiveles);

    // Cambiar el botón de guardar para creación
    document.getElementById('btnGuardar').onclick = function () {
        CrearMantenimiento();
    };
    document.getElementById('tituloModal').innerText = 'Agregar Curso';
}

function abrirModalEditar(id) {
    // Encontrar el mantenimiento por su ID
    const mantenimiento = datosMantenimiento.find(item => item.idCurso == id);
    if (mantenimiento) {
        document.querySelector('input[name="idCurso"]').value = mantenimiento.idCurso;
        document.querySelector('input[name="nombreCurso"]').value = mantenimiento.nombreCurso;
        document.querySelector('textarea[name="descripcionCurso"]').value = mantenimiento.descripcionCurso;

        // Llenar el select de niveles y seleccionar el correspondiente
        const selectNiveles = document.querySelector('select[name="idNivel"]');
        LlenarSelectNiveles(selectNiveles, mantenimiento.idNivel);

        // Abrir el modal
        $('#modalMantenimiento').modal('show');

        // Cambiar el botón de guardar para actualización
        document.getElementById('btnGuardar').onclick = function () {
            ActualizarMantenimiento();
        };
        document.getElementById('tituloModal').innerText = 'Actualizar Curso';
    }
}
