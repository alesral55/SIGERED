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

if (typeof docentesCargados === 'undefined') {
    var docentesCargados = []; // Declárala si no existe
} else {
    docentesCargados.length = 0; // Límpiala si ya existe
}
if (typeof HoraiosCargados === 'undefined') {
    var HoraiosCargados = []; // Declárala si no existe
} else {
    HoraiosCargados.length = 0; // Límpiala si ya existe
}
if (typeof SeccionesCargadas === 'undefined') {
    var SeccionesCargadas = []; // Declárala si no existe
} else {
    SeccionesCargadas.length = 0; // Límpiala si ya existe
}



async function ObtenerDocentes() {
    // Si ya tenemos niveles cargados, no los volvemos a buscar
    if (docentesCargados.length > 0) {
        return docentesCargados;
    }
    const data = {
        estado: '',
        idRol: 0,
        usrCui: sessionStorage.getItem('cui'),
        tkn: sessionStorage.getItem('token'),
        metodo: 1
    };


    return fetch(personasPath, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
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
                console.log(datos);
                docentesCargados = datos.data.filter(docente => docente.estado == 'Activo');
                console.log(docentesCargados);
                return docentesCargados;
            } else {
                return [];
            }
        });
}

LlenarSelectDocente()
function LlenarSelectDocente(docenteSeleccionado = null) {
    const selectElement = document.querySelector('select[name="cui"]');
    selectElement.innerHTML = '';

    const opcionSinRequisito = document.createElement('option');
    opcionSinRequisito.value = '';
    opcionSinRequisito.text = 'Seleccione un docente';
    selectElement.appendChild(opcionSinRequisito);

    ObtenerDocentes().then(docentes => {
        docentes.forEach(docente => {
            const option = document.createElement('option');
            option.value = docente.CUI;
            option.text = docente.Nombres + ' ' + docente.Apellidos;

            if (docenteSeleccionado && docenteSeleccionado === docente.CUI) {
                option.selected = true;
            }

            selectElement.appendChild(option);
        });
    });

}

async function ObtenerCursos() {
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



function abrirModalInsertar() {
    // Abrir el modal
    $('#modalMantenimiento').modal('show');
    LlenarSelectCursos();

    document.getElementById('btnGuardar').onclick = function () {
        CrearMantenimiento();
    };
    document.getElementById('tituloModal').innerText = 'Agregar Asignacion';
}

function abrirModalEditar(id) {
    // Encontrar el mantenimiento por su ID
    const mantenimiento = datosPersonas.find(item => item.cui == id);
    if (mantenimiento) {
        console.log(mantenimiento);
        console.log(mantenimiento.cui);
        document.querySelector('input[name="idAsignacion"]').value = mantenimiento.idAsignacion;
        document.querySelector('select[name="cui"]').value = mantenimiento.cui;
        LlenarSelectCursos(mantenimiento.idCurso);
        document.querySelector('select[name="idCurso"]').value = mantenimiento.idCurso;
        LlenarSelectHorariosPorCurso(mantenimiento.idCurso, mantenimiento.idHorario)
        document.querySelector('select[name="idHorario"]').value = mantenimiento.idHorario;
        LlenarSelectSeccionesPorCursoYHorario(mantenimiento.idCurso, mantenimiento.idHorario, mantenimiento.idSeccion)
        document.querySelector('select[name="idSeccion"]').value = mantenimiento.idSeccion;


        $('#modalMantenimiento').modal('show');

        // Cambiar el botón de guardar para actualización
        document.getElementById('btnGuardar').onclick = function () {
            ActualizarMantenimiento();
        };
        document.getElementById('tituloModal').innerText = 'Actualizar Asignacion';
    }
}


async function ObtenerHorarios() {
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

    // Obtener y filtrar horarios por curso seleccionadof
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


// Función para obtener las secciones filtradas por estado y guardarlas en cache
async function ObtenerSecciones() {
    if (SeccionesCargadas.length > 0) {
        return SeccionesCargadas;
    }

    return fetch(seccionesPath) // Se debe definir `seccionesPath` con la URL de las secciones
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
                // Filtrar solo las secciones con estado 'A'
                SeccionesCargadas = datos.data.filter(seccion => seccion.estado === 'A');
                return SeccionesCargadas;
            } else {
                return [];
            }
        });
}

// Función para llenar el select de secciones filtrado por curso y horario
function LlenarSelectSeccionesPorCursoYHorario(cursoId, horarioId, SeccionSeleccionada = null) {
    const selectElement = document.querySelector('select[name="idSeccion"]');
    selectElement.innerHTML = '';

    const opcionDefault = document.createElement('option');
    opcionDefault.value = '';
    opcionDefault.text = 'Seleccione una Sección';
    selectElement.appendChild(opcionDefault);

    // Obtener y filtrar secciones por curso y horario seleccionados
    ObtenerSecciones().then(Secciones => {
        const seccionesFiltradas = Secciones.filter(seccion =>
            seccion.idCurso == cursoId && seccion.idHorario == horarioId
        );

        seccionesFiltradas.forEach(seccion => {
            const option = document.createElement('option');
            option.value = seccion.idSeccion;
            option.text = seccion.descripcion;

            if (SeccionSeleccionada && SeccionSeleccionada === seccion.idSeccion) {
                option.selected = true;
            }

            selectElement.appendChild(option);
        });
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
    data.idRol = 2;

    // Validación de campos obligatorios
    if (!data.idCurso || !data.idHorario || !data.idSeccion || !data.cui) {
        AWarning("Todos los campos obligatorios");
        return;
    }

    $('#modalMantenimiento').modal('hide');
    // Realizar la solicitud fetch para crear el mantenimiento
    fetch(asignacionDocentes, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(function (respuesta) {
            if (respuesta.status === 401) {
                mostrarModalReautenticacion();
            }
            if (respuesta.ok) {
                return respuesta.json();
            }
        })
        .then(function (datos) {
            if (datos) {
                generarAlerta(datos);
                obtenerPersonas()
            }
        })
        .catch(function (error) {
            console.error('Error:', error);
        });
}


// Variable global para almacenar los datos obtenidos
if (typeof datosPersonas === 'undefined') {
    var datosPersonas = []; // Declárala si no existe
} else {
    datosPersonas.length = 0; // Límpiala si ya existe
}

obtenerPersonas()
// Función para obtener todas las personas
function obtenerPersonas(page = 1, pageSize = 10) {
    fetch(asignacionDocentes)
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
            if (datosPersonas) {
                datosPersonas = datos.data;
                console.log(datosPersonas);
                aplicarFiltrosYMostrar(page, pageSize);
            }
            else { return }

        });
}

// Función para aplicar los filtros y mostrar la tabla
function aplicarFiltrosYMostrar(page = 1, pageSize = 10) {
    const filtroCUI = document.getElementById('filtroCUI').value.trim().toLowerCase();
    const filtroInteligente = document.getElementById('filtroInteligente').value.trim().toLowerCase();
    const filtroEstado = document.getElementById('filtroEstado').value.trim().toLowerCase();

    // Filtrar los datos
    let personasFiltradas = datosPersonas.filter(persona => {
        const cumpleCUI = filtroCUI ? persona.cui.toLowerCase().includes(filtroCUI) : true;
        const cumpleEstado = filtroEstado ? persona.estado.toLowerCase() == filtroEstado : true;
        const cumpleInteligente = filtroInteligente ? (
            persona.nombres.toLowerCase().includes(filtroInteligente) ||
            persona.apellidos.toLowerCase().includes(filtroInteligente) ||
            persona.nombreCurso.toLowerCase().includes(filtroInteligente) ||
            persona.horario.toLowerCase().includes(filtroInteligente) ||
            persona.seccion.toLowerCase().includes(filtroInteligente)  // También buscar por fecha
        ) : true;

        return cumpleCUI && cumpleEstado && cumpleInteligente;
    });

    // Determinar la paginación
    const totalItems = personasFiltradas.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const personasPaginadas = personasFiltradas.slice(startIndex, endIndex);

    generarTabla(personasPaginadas);

    generarPaginacion(totalPages, page);
}

// Función para generar la tabla
function generarTabla(personas) {
    const tabla = document.getElementById('tablaPersonas');
    tabla.innerHTML = '';

    personas.forEach((persona) => {
        const fila = document.createElement('tr');
        if (persona.estado == 'A') {
            fila.innerHTML = `
            <td>${persona.cui}</td>
            <td>${persona.nombres}</td>
            <td>${persona.apellidos}</td>
            <td>${persona.nombreCurso}</td>
            <td>${persona.horario || ''}</td>
            <td>${persona.seccion}</td>
            <td>
                <button class="btn btnAzul btn-dark btn-sm" onclick="abrirModalEditar('${persona.cui}')">Actualizar</button>
                <button class="btn btnRojo btn-dark btn-sm" onclick="EliminarMantenimiento('${persona.idAsignacion}')">Eliminar</button>
            </td>
        `;
            tabla.appendChild(fila);
        }
        else if (persona.estado == 'I') {
            fila.innerHTML = `
            <td>${persona.cui}</td>
            <td>${persona.nombres}</td>
            <td>${persona.apellidos}</td>
            <td>${persona.nombreCurso}</td>
            <td>${persona.horario || ''}</td>
            <td>${persona.seccion}</td>
            <td>
                <button class="btn btnRojo btn-dark btn-sm" onclick="EliminarMantenimiento('${persona.idAsignacion}')">Reactivar Asignacion</button>
            </td>
        `;
            tabla.appendChild(fila);
        }

    });
}

// Función para generar la paginación
function generarPaginacion(totalPages, currentPage) {
    const paginacion = document.getElementById('paginacion');
    paginacion.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement('li');
        li.classList.add('page-item');

        if (i === currentPage) {
            li.classList.add('active');
        }

        li.innerHTML = `<a class="page-link" href="#" onclick="aplicarFiltrosYMostrar(${i})">${i}</a>`;
        paginacion.appendChild(li);
    }

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
    if (!data.idCurso || !data.idHorario || !data.idSeccion || !data.cui) {
        AWarning("Todos los campos obligatorios");
        return;
    }
    $('#modalMantenimiento').modal('hide');
    // Realizar la solicitud fetch para crear el mantenimiento
    fetch(asignacionDocentes, {
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
                obtenerPersonas()
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
    data.idAsignacion = id

    $('#modalMantenimiento').modal('hide');
    // Realizar la solicitud fetch para crear el mantenimiento
    fetch(asignacionDocentes, {
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
                obtenerPersonas()
            }
        })
        .catch(function (error) {
            console.error('Error:', error);
        });
}


