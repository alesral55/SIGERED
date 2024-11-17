//#region  select filtros
if (typeof cursosCargados2 === 'undefined') {
    var cursosCargados2 = []; // Declárala si no existe
} else {
    cursosCargados2.length = 0; // Límpiala si ya existe
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
if (typeof docentesCargados === 'undefined') {
    var docentesCargados = []; // Declárala si no existe
} else {
    docentesCargados.length = 0; // Límpiala si ya existe
}
if (typeof datosTareas === 'undefined') {
    var datosTareas = []; // Declárala si no existe
} else {
    datosTareas.length = 0; // Límpiala si ya existe
}
if (typeof Tarea === 'undefined') {
    var Tarea = {}; // Declárala si no existe
} else {
    Tarea.length = 0; // Límpiala si ya existe
}


ObtenerAsignacion()
async function ObtenerAsignacion() {
    // Si ya tenemos niveles cargados, no los volvemos a buscar
    if (docentesCargados.length > 0) {
        return docentesCargados;
    }
    const data = {
        estado: '',
        idRol: 0,
        usrCui: sessionStorage.getItem('cui'),
        tkn: sessionStorage.getItem('token'),
        metodo: 5
    };


    return fetch(asignacionDocentes, {
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
                docentesCargados = datos.data.filter(docente => docente.estado == 'A');
                return docentesCargados;
            } else {
                return [];
            }
        });
}

async function ObtenerCursos() {
    // Si ya tenemos cursos cargados, no los volvemos a buscar
    if (cursosCargados2.length > 0) {
        return cursosCargados2;
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
                CursosCargados2 = datos.data.filter(curso => curso.estado === 'A');
                return CursosCargados2;
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
    ObtenerCursos().then(cursos => {

        const cursosFiltrados = cursos.filter(curso =>
            docentesCargados.some(docente => docente.idCurso == curso.idCurso)
        );
        // Llenar el select con los cursos filtrados
        cursosFiltrados.forEach(curso => {
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

        const horariosFiltrados = Horarios.filter(horario =>
            horario.idCurso == cursoId &&
            docentesCargados.some(docente => docente.idHorario === horario.idHorario)
        );
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
    console.log(docentesCargados);
    // Obtener y filtrar secciones por curso y horario seleccionados
    ObtenerSecciones().then(Secciones => {
        const seccionesFiltradas = Secciones.filter(seccion =>
            seccion.idCurso == cursoId &&
            seccion.idHorario == horarioId &&
            docentesCargados.some(docente =>
                docente.idCurso == cursoId &&
                docente.idHorario == horarioId &&
                docente.idSeccion == seccion.idSeccion
            )
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

//#endregion

//#region  listado de tareaslet datosTareas = []; // Variable global para almacenar los datos de tareas

// Función para obtener las tareas
obtenerTareas()
function obtenerTareas(page = 1, pageSize = 10) {
    const data = {
        usrCui: sessionStorage.getItem('cui'),
        tkn: sessionStorage.getItem('token'),
        metodo: 4
    };

    fetch(asignacionTareasPath, {
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
            datosTareas = datos.data;
            aplicarFiltrosYMostrar(page, pageSize);
            LlenarSelectCursos()
        }
    });
}

// Función para aplicar filtros y mostrar los resultados
function aplicarFiltrosYMostrar(page = 1, pageSize = 10) {
    const filtroInteligente = document.getElementById('filtroInteligente').value.trim().toLowerCase();
    const filtroCurso = document.querySelector('select[name=idCurso]').value;
    const filtroHorario = document.querySelector('select[name=idHorario]').value;
    const filtroSeccion = document.querySelector('select[name=idSeccion]').value;

    // Filtrar las tareas
    let tareasFiltradas = datosTareas.filter(tarea => {
        const cumpleCurso = filtroCurso ? tarea.idCurso == filtroCurso : true;
        const cumpleHorario = filtroHorario ? tarea.idHorario == filtroHorario : true;
        const cumpleSeccion = filtroSeccion ? tarea.idSeccion == filtroSeccion : true;
        const cumpleInteligente = filtroInteligente ? (
            tarea.nombreTarea.toLowerCase().includes(filtroInteligente) ||
            tarea.fechaVence.toLowerCase().includes(filtroInteligente) ||
            tarea.puntaje.toString().includes(filtroInteligente)
        ) : true;

        return cumpleCurso && cumpleHorario && cumpleSeccion && cumpleInteligente;
    });

    // Paginación
    const totalItems = tareasFiltradas.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const tareasPaginadas = tareasFiltradas.slice(startIndex, endIndex);

    generarTabla(tareasPaginadas);
    generarPaginacion(totalPages, page);
}

// Función para generar la tabla de tareas
function generarTabla(tareas) {
    const tabla = document.getElementById('tablaTareas');
    tabla.innerHTML = '';

    tareas.forEach((tarea) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${tarea.idTarea}</td>
            <td>${tarea.nombreTarea}</td>
            <td>${formatearFecha(tarea.fechaVence)}</td>
            <td>${tarea.puntaje}</td>
            <td>
                <button class="btn btn-primary btn-sm" onclick="calificarTarea('${tarea.idTarea}')">Calificar</button>
                <button class="btn btn-danger btn-sm" onclick="eliminarTarea('${tarea.idTarea}')">Eliminar</button>
            </td>
        `;
        tabla.appendChild(fila);
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

var selectCurso = document.querySelector('select[name=idCurso]');
var selectHorario = document.querySelector('select[name=idHorario]');
var selectSeccion = document.querySelector('select[name=idSeccion]');
var filtroInteligente = document.getElementById('filtroInteligente');
selectCurso.addEventListener('change', () => aplicarFiltrosYMostrar());
selectHorario.addEventListener('change', () => aplicarFiltrosYMostrar());
selectSeccion.addEventListener('change', () => aplicarFiltrosYMostrar());
filtroInteligente.addEventListener('input', () => aplicarFiltrosYMostrar());


// Utiliza esta función al cargar la página o al cambiar un filtro
document.addEventListener('DOMContentLoaded', obtenerTareas);
document.addEventListener('DOMContentLoaded', LlenarSelectCursos);



//#endregion


function calificarTarea(idTarea){

Tarea = datosTareas.find(Tarea => Tarea.idTarea == idTarea)
console.log(Tarea);
cargarFormulario(33)
}





