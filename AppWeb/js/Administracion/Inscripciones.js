// Variable global para almacenar los datos obtenidos
if (typeof datosPersonas === 'undefined') {
    var datosPersonas = []; // Declárala si no existe
} else {
    datosPersonas.length = 0; // Límpiala si ya existe
}

console.log('incripciones');

obtenerPersonas()
// Función para obtener todas las personas
function obtenerPersonas(page = 1, pageSize = 10) {
    const data = {
        estado: '',
        idRol: 0,
        usrCui: sessionStorage.getItem('cui'),
        tkn: sessionStorage.getItem('token'),
        metodo: 1
    };

    fetch(inscripcionesPath)/*, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })*/
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
    // const filtroEstado = document.getElementById('filtroEstado').value.trim().toLowerCase();

    // Filtrar los datos
    let personasFiltradas = datosPersonas.filter(persona => {
        const cumpleCUI = filtroCUI ? persona.CUI.toLowerCase().includes(filtroCUI) : true;
        //const cumpleEstado = filtroEstado ? persona.estado.toLowerCase() == filtroEstado : true;
        const cumpleInteligente = filtroInteligente ? (
            persona.Nombres.toLowerCase().includes(filtroInteligente) ||
            persona.Apellidos.toLowerCase().includes(filtroInteligente) ||
            persona.correo.toLowerCase().includes(filtroInteligente) ||
            persona.telefono.toLowerCase().includes(filtroInteligente) ||
            formatearFecha(persona.fechaDeNacimiento).includes(filtroInteligente) // También buscar por fecha
        ) : true;

        return cumpleCUI && cumpleInteligente;
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

        fila.innerHTML = `
            <td>${persona.CUI}</td>
            <td>${persona.Nombres}</td>
            <td>${persona.Apellidos}</td>
            <td>${persona.correo}</td>
            <td>${persona.telefono || ''}</td>
            <td>${persona.genero}</td>
            <td>${formatearFecha(persona.fechaDeNacimiento)}</td>
            <td>${persona.nombreCurso}</td>
            <td>
                <button class="btn btnAzul btn-dark btn-sm" onclick="mostrarDetallesAlumno('${persona.CUI}')">Detalle de Inscripcion</button>
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


function mostrarDetallesAlumno(CUI) {
    const alumno = datosPersonas.find(persona => persona.CUI === CUI);

    if (alumno) {
        document.getElementById('detalleCUI').value = alumno.CUI;
        document.getElementById('detalleNombres').value = alumno.Nombres;
        document.getElementById('detalleApellidos').value = alumno.Apellidos;
        document.getElementById('detalleCorreo').value = alumno.correo;
        document.getElementById('detalleTelefono').value = alumno.telefono || 'No disponible';
        document.getElementById('detalleGenero').value = alumno.genero;
        document.getElementById('detalleFechaNacimiento').value = formatearFecha(alumno.fechaDeNacimiento);
        document.getElementById('detalleCurso').value = alumno.nombreCurso;
        document.getElementById('detalleDireccion').value = alumno.direccion || 'No disponible';
        document.getElementById('detalleEstado').value = alumno.estado;
        document.getElementById('detalleDiscapacidad').value = alumno.discapacidad;
        document.getElementById('detalleResidenciaLocal').value = alumno.residenteLocal;
        document.getElementById('detalleFechaPago').value = formatearFecha(alumno.fechaPago);
        document.getElementById('detalleHorario').value = alumno.horario;
        document.getElementById('detalleNombreDiscapacidad').value = alumno.nombreDiscapacidad;
        document.getElementById('detalleSistemaDePago').value = alumno.sistemaDePago;
        document.getElementById('detalleDireccionNit').value = alumno.direccionNit;
        // Campos adicionales
        document.getElementById('montoPago').value = alumno.montoPago;
        //document.getElementById('detalleIdRol').value = alumno.idRol;
        document.getElementById('detalleCodigoPersonal').value = alumno.codigoPersonal;
        document.getElementById('detalleTipoDocumento').value = alumno.tipoDocumento;
        document.getElementById('detalleNombreGrupo').value = alumno.nombreGrupo;
        document.getElementById('detalleEsColaborador').value = alumno.esColaborador === 'S' ? 'Sí' : 'No';
        document.getElementById('detalleAreaDeTrabajo').value = alumno.areaDeTrabajo || 'No disponible';
        document.getElementById('detalleNombreCuentaOrigen').value = alumno.nombreCuentaOrigen || 'No disponible';
        document.getElementById('detalleRelacionInscrito').value = alumno.relacionInscrito || 'No disponible';
        document.getElementById('detalleNit').value = alumno.nit || 'No disponible';
        document.getElementById('detalleNombreNit').value = alumno.nombreNit || 'No disponible';
        document.getElementById('detalleNumeroAutorizacion').value = alumno.numeroAutorizacion || 'No disponible';

        // Asignar las URL de las imágenes a los elementos del modal
        imgDPI = alumno.imgDPI;
        imgTransferencia = alumno.imgTransferencia;
        currentCUI = CUI;
        currentIdAlumno = alumno.idAlumno;
        currentIdPago = alumno.idPago;

        const modal = new bootstrap.Modal(document.getElementById('modalAlumno'));
        modal.show();
    } else {
        console.error(`No se encontró el alumno con CUI: ${CUI}`);
    }

}
let currentCUI
let imgDPI
let imgTransferencia
let currentIdAlumno
let currentIdPago
// Array para almacenar cada revisión
const revisiones = [];

// Función para abrir la imagen y registrar la visualización
function abrirImagen(n) {
    // Registrar la apertura de cada imagen en el array con su CUI y el tipo de imagen
    if (n === 1) {
        revisiones.push({ cui: currentCUI, imagen: 'imgDPI' });
        window.open(imgDPI, '_blank');
    } else if (n === 2) {
        revisiones.push({ cui: currentCUI, imagen: 'imgTransferencia' });
        window.open(imgTransferencia, '_blank');
    }
}

// Ejemplo de verificación para saber si un usuario ha visto ambas imágenes
function verificarVisualizaciones(cui) {
    const revisionesCUI = revisiones.filter(rev => rev.cui == cui);
    const haVistoDPI = revisionesCUI.some(rev => rev.imagen === 'imgDPI');
    const haVistoTransferencia = revisionesCUI.some(rev => rev.imagen === 'imgTransferencia');

    return haVistoDPI && haVistoTransferencia;
}

//funcion para eliminar persona -- solo descativa
function apobar() {
    const cui = currentCUI
    const verificacion = verificarVisualizaciones(cui)
    if (!verificacion) {
        AWarning('Debe verificar los adjuntos antes de continuar')
        return
    }
    Swal.fire({
        title: "¿Estás seguro/a de aprobar la inscripcion?",
        text: "Esta acción habilitara el proceso de asignacion de cursos para la persona seleccionada.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, estoy seguro/a",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {

            const data = {
                cui: cui,
                usrCui: sessionStorage.getItem('cui'),
                tkn: sessionStorage.getItem('token'),
                metodo: 4
            };

            fetch(personasPath, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(function (respuesta) {
                    if (respuesta.status === 401) {
                        $('#modalAlumno').modal('hide');
                        // Si el token ha expirado, mostrar la pantalla de reautenticación
                        mostrarModalReautenticacion(); 
                    }
                    if (respuesta.ok) {
                        return respuesta.json();
                    }
                })
                .then(function (datos) {
                    if(datos){
                        if(datos.code ==1){
                            enviarCorreo(2,'')
                        }
                        else{
                            generarAlerta(datos)
                        }

                    }

                })

        }
    });


}


async function enviarCorreo(metodo, msj) {
    const loader = document.getElementById('loader');
    loader.style.display = 'flex'; // Muestra el loader
    const url = 'https://17hqvm0qu1.execute-api.us-east-2.amazonaws.com/Prod/'; // Reemplaza con la URL de tu Lambda
    const correo = document.getElementById('detalleCorreo').value 
    const primerNombre = document.getElementById('detalleNombres').value
    const apellido =    document.getElementById('detalleApellidos').value
    const nombre = primerNombre + " " + apellido
    const data = {
        correo: correo,
        nombre: nombre,
        metodo: metodo,
        mensaje: msj
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        setTimeout(() => {
            loader.style.display = 'none';
        }, 10); // Retraso de 500 ms, ajusta según sea necesario
        if (response.ok) {
            if(metodo ==3 ){
                ASucces('Se ha rechazado la inscripcion y notificado al estudiante correctamente')
            }
            else{
                ASucces('Se ha aprobado la inscripcion y notificado al estudiante correctamente')
            }
            loader.style.display = 'none';
            obtenerPersonas()
        } else {
            AError('Ocurrio un error al enviar el correo al alumno')
        }
    } catch (error) {
        setTimeout(() => {
            loader.style.display = 'none';
        }, 10); // Retraso de 500 ms, ajusta según sea necesario
        AError('Ocurrio un error en el servidor Reporte este problema a la Academia')
        console.error('Error en la solicitud:', error);
    }
}

function rechazar() {
    let mensaje = document.getElementById(['txtMensaje']).value
    Swal.fire({
        title: "¿Estás seguro/a de rechazar la inscripcion?",
        text: "Esta acción finalizara el proceso de inscripcion para la persona seleccionada.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, estoy seguro/a",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {


    let data = {}

    // Agregar datos adicionales de sesión
    data.usrCui = sessionStorage.getItem('cui');
    data.tkn = sessionStorage.getItem('token');
    data.metodo = 3;
    data.idAlumno = currentIdAlumno
    data.idPago = currentIdPago

    fetch(inscripcionesPath, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(function (respuesta) {
            if (respuesta.status === 401) {
                $('#modalAlumno').modal('hide');

                mostrarModalReautenticacion(); 
            }
            if (respuesta.ok) {
                return respuesta.json();
            }
        })
        .then(function (datos) {
            if(datos){
                if(datos.code ==1){
                    enviarCorreo(3,mensaje)
                }
                else{
                    generarAlerta(datos)
                }

            }

        })
    }
});

}


        // Función para abrir el modal
        function openModal() {
            const cui = currentCUI
            const verificacion = verificarVisualizaciones(cui)
            if (!verificacion) {
                AWarning('Debe verificar los adjuntos antes de continuar')
                return
            }
            $('#rechazoModal').modal('show');

        }
