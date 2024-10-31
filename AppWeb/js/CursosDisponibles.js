const urlConsulta = 'http://localhost:3000'
const cursosDisponiblesPath =  urlConsulta + '/cursosDisponibles'

// Variable global para almacenar los datos obtenidos
if (typeof datosMantenimiento === 'undefined') {
    var datosMantenimiento = []; // Declárala si no existe
} else {
    datosMantenimiento.length = 0; // Límpiala si ya existe
}

ObtenerTbMantenimiento()

// Función para obtener todos los cursos disponibles
function ObtenerTbMantenimiento(page = 1, pageSize = 10) {
    fetch(cursosDisponiblesPath)
        .then(function (respuesta) {
            if (respuesta.ok) {
                return respuesta.json();
            }
            else if (respuesta.status === 401) {
                mostrarModalReautenticacion();
                return;
            }
        })
        .then(function (datos) {
            if (datos) {
                datosMantenimiento = datos.data;
                aplicarFiltrosYMostrar(page, pageSize);
            } else {
                return;
            }
        });
}

// Función para aplicar el filtro inteligente y mostrar la tabla con paginación
function aplicarFiltrosYMostrar(page = 1, pageSize = 10) {
    const filtroInteligente = document.getElementById('filtroInteligente').value.trim().toLowerCase();

    // Filtrar los datos con el filtro inteligente
    let cursosFiltrados = datosMantenimiento.filter(curso => {
        return (
            curso.nombreCurso.toLowerCase().includes(filtroInteligente) ||
            curso.DescripcionRequisito.toLowerCase().includes(filtroInteligente) ||
            formatearFecha(curso.fechaInicio).includes(filtroInteligente)
        );
    });

    // Determinar la paginación
    const totalItems = cursosFiltrados.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const cursosPaginados = cursosFiltrados.slice(startIndex, endIndex);

    generarTabla(cursosPaginados);
    generarPaginacion(totalPages, page);
}

// Función para generar la tabla
function generarTabla(cursos) {
    const tabla = document.getElementById('tablaCursos');
    tabla.innerHTML = '';

    cursos.forEach((curso) => {
        const fila = document.createElement('tr');

        if (curso.estado !== 'I') {
            fila.innerHTML = `
                <td>${curso.idCursoDispobible}</td>  
                <td>${curso.nombreCurso}</td>  
                <td>${curso.DescripcionRequisito}</td>  
                <td>${formatearFecha(curso.fechaInicio)}</td>  
                <td>
                    <button class="btn btnAzul btn-dark" onclick="FormularioDeInscripcion(${curso.idCurso},'${curso.nombreCurso}')">Ir al Formulario</button>
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

// Función para formatear la fecha en formato DD/MM/YYYY
function formatearFecha(fechaISO) {
    const fecha = new Date(fechaISO);
    const dia = fecha.getUTCDate().toString().padStart(2, '0');
    const mes = (fecha.getUTCMonth() + 1).toString().padStart(2, '0');
    const anio = fecha.getUTCFullYear();
    return `${dia}/${mes}/${anio}`;
}

function FormularioDeInscripcion(id, nombre){
    sessionStorage.setItem('idCurso', id);
    sessionStorage.setItem('nombreCurso', nombre);

    window.location.href = '/FormularioDeInscripcion.html'; 
}