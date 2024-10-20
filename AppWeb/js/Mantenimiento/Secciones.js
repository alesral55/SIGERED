if (typeof datosMantenimiento === 'undefined') {
    var datosMantenimiento = []; // Declárala si no existe
} else {
    datosMantenimiento.length = 0; // Límpiala si ya existe
}

if (typeof cursosCargados === 'undefined') {
    var cursosCargados = []; // Declárala si no existe
} else {
    cursosCargados.length = 0; // Límpiala si ya existe
}

if (typeof HoraiosCargados === 'undefined') {
    var HoraiosCargados = []; // Declárala si no existe
} else {
    HoraiosCargados.length = 0; // Límpiala si ya existe
}


ObtenerTbMantenimiento()
// Función para obtener todas las personas
function ObtenerTbMantenimiento() {

    fetch(seccionesPath)
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
    const btnEstado = document.getElementById('btnCamioEstado')
    //console.log(roles);
    const tabla = document.getElementById('tablaMantenimietos');
    tabla.innerHTML = '';

    Mantenimientos.forEach((mantenimiento) => {
        if (estado == 'A') {
            btnEstado.onclick = function () {
                generarTabla('I'); // Modo actualización
            };
            const fila = document.createElement('tr');
            btnEstado.innerText = 'Secciones  Inactivas'

                if(mantenimiento.estado == 'A'){
                    fila.innerHTML = `
                    <td>${mantenimiento.idSeccion}</td>  
                    <td>${mantenimiento.descripcion}</td>  
                    <td>${mantenimiento.nombreCurso}</td>  
                    <td>${mantenimiento.horario}</td>  


                    <td>
                        <button class="btn btnAzul btn-dark" onclick="abrirModalEditar(${mantenimiento.idSeccion})">Editar</button>
                        <button class="btn btnRojo btn-dark" onclick="EliminarMantenimiento(${mantenimiento.idSeccion})">Eliminar</button>
                    </td>
        
                `;
                tabla.appendChild(fila);
                }

        }
        else if (estado == "I") {
            btnEstado.onclick = function () {
                generarTabla('A'); // Modo actualización
            };
            btnEstado.innerText = 'Secciones Activas'

            const fila = document.createElement('tr');
            if (mantenimiento.estado == 'I') {
                fila.innerHTML = `
                    <td>${mantenimiento.idSeccion}</td>  
                    <td>${mantenimiento.descripcion}</td>  
                    <td>${mantenimiento.nombreCurso}</td>  
                    <td>${mantenimiento.horario}</td>  
                    <td>
                        <button class="btn btnRojo btn-dark" onclick="EliminarMantenimiento(${mantenimiento.idSeccion})">Reactivar Seccion</button>
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
    if (!data.descripcion || !data.idCurso || !data.idHorario) {
        AWarning("Todos los campos obligatorios");
        return;
    }
    $('#modalMantenimiento').modal('hide');
    // Realizar la solicitud fetch para crear el mantenimiento
    fetch(seccionesPath, {
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




function EliminarMantenimiento(id) {

    let data = {}

    // Agregar datos adicionales de sesión
    data.usrCui = sessionStorage.getItem('cui');
    data.tkn = sessionStorage.getItem('token');
    data.metodo = 3;
    data.idSeccion = id

    $('#modalMantenimiento').modal('hide');
    // Realizar la solicitud fetch para crear el mantenimiento
    fetch(seccionesPath, {
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
    if (!data.descripcion || !data.idCurso || !data.idHorario) {
        AWarning("Todos los campos obligatorios");
        return;
    }
    $('#modalMantenimiento').modal('hide');
    // Realizar la solicitud fetch para crear el mantenimiento
    fetch(seccionesPath, {
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

/////////logica para cargar datos al select de cursos 



// Variable global para almacenar los cursos


async  function ObtenerCursos() {
    // Si ya tenemos cursos cargados, no los volvemos a buscar
    if (cursosCargados.length > 0) {
        return cursosCargados;
    }

    return fetch(cursosPath)
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
                // Filtrar solo los cursos con estado 'A'
                CursosCargados = datos.data.filter(curso => curso.estado === 'A');
                return CursosCargados;
            } else {
                return [];
            }
        });
}

// Función para llenar el select de CURSOS
function LlenarSelectCursos(cursoSeleccionado = null) {
    // Limpiar el select
    document.querySelector('select[name="idCurso"]').addEventListener('change', function () {
        const cursoSeleccionado = this.value;
        LlenarSelectHorariosPorCurso(cursoSeleccionado);
    });
    const selectElement = document.querySelector('select[name="idCurso"]');
    selectElement.innerHTML = '';

    // Añadir opción por defecto
    const opcionDefault = document.createElement('option');
    opcionDefault.value = '';
    opcionDefault.text = 'Seleccione un Curso';
    selectElement.appendChild(opcionDefault);

    // Llenar el select con los cursos
    ObtenerCursos().then(Cursos => {
        Cursos.forEach(curso => {
            const option = document.createElement('option');
            option.value = curso.idCurso;
            option.text = curso.nombreCurso;

            // Si estamos actualizando, marcar el curso seleccionado
            if (cursoSeleccionado && cursoSeleccionado === curso.idCurso) {
                option.selected = true;
            }

            selectElement.appendChild(option);
        });
    });
}

async  function ObtenerHorarios() {
    // Si ya tenemos cursos cargados, no los volvemos a buscar
    if (HoraiosCargados.length > 0) {
        return HoraiosCargados;
    }

    return fetch(horariosPath)
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
                // Filtrar solo los cursos con estado 'A'
                HoraiosCargados = datos.data.filter(horario => horario.estado === 'A');
                return HoraiosCargados;
            } else {
                return [];
            }
        });
}

// Función para obtener los horarios filtrados por curso
function LlenarSelectHorariosPorCurso(cursoId, HorarioSeleccionado = null) {
    // Limpiar el select
    const selectElement = document.querySelector('select[name="idHorario"]');
    selectElement.innerHTML = '';

    // Añadir opción por defecto
    const opcionDefault = document.createElement('option');
    opcionDefault.value = '';
    opcionDefault.text = 'Seleccione un Horario';
    selectElement.appendChild(opcionDefault);

    // Obtener y filtrar horarios por curso seleccionado
    ObtenerHorarios().then(Horarios => {

        const horariosFiltrados = Horarios.filter(horario => horario.idCurso == cursoId);
        
        horariosFiltrados.forEach(horario => {
            const option = document.createElement('option');
            option.value = horario.idHorario;
            option.text = horario.horario;

            // Si estamos actualizando, marcar el horario seleccionado
            if (HorarioSeleccionado && HorarioSeleccionado === horario.idHorario) {
                option.selected = true;
            }

            selectElement.appendChild(option);
        });
    });
}


function abrirModalInsertar() {
    // Abrir el modal
    $('#modalMantenimiento').modal('show');

    // Llenar el select de cursos sin seleccionar ninguno
    LlenarSelectCursos();
    //LlenarSelectHorarios();
    // Cambiar el botón de guardar para creación
    document.getElementById('btnGuardar').onclick = function () {
        CrearMantenimiento();
    };
    document.getElementById('tituloModal').innerText = 'Agregar Seccion';
}

function abrirModalEditar(id) {
    // Encontrar el mantenimiento por su ID
    const mantenimiento = datosMantenimiento.find(item => item.idSeccion == id);
    if (mantenimiento) {
        document.querySelector('input[name="idSeccion"]').value = mantenimiento.idSeccion;
        document.querySelector('input[name="descripcion"]').value = mantenimiento.descripcion;

        // Llenar el select de cursos y seleccionar el correspondiente
        LlenarSelectCursos( mantenimiento.idCurso);
        LlenarSelectHorariosPorCurso(mantenimiento.idCurso, mantenimiento.idHorario);
        // Abrir el modal
        $('#modalMantenimiento').modal('show');

        // Cambiar el botón de guardar para actualización
        document.getElementById('btnGuardar').onclick = function () {
            ActualizarMantenimiento();
        };
        document.getElementById('tituloModal').innerText = 'Actualizar Seccion';
    }
}
