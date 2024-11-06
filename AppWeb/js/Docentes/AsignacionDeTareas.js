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
LlenarSelectCursos()
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
                docentesCargados = datos.data.filter(docente => docente.estado == 'A');
                return docentesCargados;
            } else {
                return [];
            }
        });
}


//#endregion ARCHIVOS S3
var archivosBase64 = []; // Almacenará los archivos en base64
var archivoActual = 0; // Índice del archivo actualmente mostrado

function previsualizarArchivos() {
    const input = document.getElementById('archivos');
    archivosBase64 = []; // Limpiar los archivos previos
    archivoActual = 0; // Reiniciar el índice

    if (input.files.length > 4) {
        AWarning("Por favor, selecciona un máximo de 4 archivos.");
        return;
    }

    Array.from(input.files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = function (e) {
            const base64Data = e.target.result;
            archivosBase64.push({ nombre: file.name, base64: base64Data });
            if (archivosBase64.length === 1) {
                mostrarArchivo(0); // Mostrar el primer archivo
            }
        };
        reader.readAsDataURL(file); // Convertir a Base64
    });
}

function mostrarArchivo(indice) {
    const viewer = document.getElementById('file-viewer');
    viewer.innerHTML = ''; // Limpiar contenido previo

    const archivo = archivosBase64[indice];
    const fileExtension = archivo.nombre.split('.').pop().toLowerCase();

    if (fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'png' || fileExtension === 'gif') {
        const img = document.createElement('img');
        img.src = archivo.base64;
        img.alt = "Archivo de imagen";
        viewer.appendChild(img);
    } else if (fileExtension === 'pdf') {
        const iframe = document.createElement('iframe');
        iframe.src = archivo.base64;
        viewer.appendChild(iframe);
    } else {
        viewer.innerHTML = "<p>Tipo de archivo no soportado para visualización.</p>";
    }
}

function mostrarSiguiente() {
    if (archivoActual < archivosBase64.length - 1) {
        archivoActual++;
        mostrarArchivo(archivoActual);
    } else {
        AWarning("Has llegado al último archivo.");
    }
}

function mostrarAnterior() {
    if (archivoActual > 0) {
        archivoActual--;
        mostrarArchivo(archivoActual);
    } else {
        AWarning("Estás en el primer archivo.");
    }
}


async function cargarArchivosS3(campo) {
    const fileInput = document.querySelector(`input[name=${campo}]`);
    const files = fileInput.files;

    if (!files || files.length === 0) {
        AWarning('Por favor selecciona al menos un archivo.');
        return;
    }

    // Limitar la cantidad de archivos a 4
    const maxFiles = 4;
    const urls = [];

    for (let i = 0; i < Math.min(files.length, maxFiles); i++) {
        const file = files[i];

        // Convertir archivo a base64
        const base64String = await new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.readAsDataURL(file);

            reader.onload = () => {
                const base64 = reader.result.split(',')[1]; // Extraer solo la parte base64
                resolve(base64);
            };

            reader.onerror = (error) => {
                console.error('Error al leer el archivo:', error);
                reject(error);
            };
        });

        // Enviar el archivo al backend
        try {
            const response = await fetch(urlPath, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fileName: file.name,
                    fileType: file.type,
                    base64File: base64String,
                }),
            });

            const result = await response.json();
            if (result.fileUrl) {
                urls.push(result.fileUrl);
            }
        } catch (error) {
            AError('Ocurrió un error en el servidor. Reporte este problema.');
            console.error('Error al enviar el archivo:', error);
            throw error;
        }
    }

    // Asignar URLs a variables si necesitas acceder individualmente
    //const [url1, url2, url3, url4] = urls;
    // return { url1, url2, url3, url4 };
    return urls
}
//#endregion


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


LlenarSelectCursos()
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

if (typeof TpTareasCargadas === 'undefined') {
    var TpTareasCargadas = []; // Declárala si no existe
} else {
    TpTareasCargadas.length = 0; // Límpiala si ya existe
}



async function ObtenerTpTarea() {
    if (TpTareasCargadas.length > 0) {
        return TpTareasCargadas;
    }

    return fetch(tpTareaPath)
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
                // Filtrar solo las secciones con estado 'A'
                TpTareasCargadas = datos.data.filter(seccion => seccion.estado === 'A');
                return TpTareasCargadas;
            } else {
                return [];
            }
        });
}
LlenarSelectTpTarea()
function LlenarSelectTpTarea(tareaId) {
    const selectElement = document.querySelector('select[name="idTipoTarea"]');
    selectElement.innerHTML = '';

    const opcionDefault = document.createElement('option');
    opcionDefault.value = '';
    opcionDefault.text = 'Seleccione una Sección';
    selectElement.appendChild(opcionDefault);

    // Obtener y filtrar secciones por curso y horario seleccionados
    ObtenerTpTarea().then(Secciones => {

        TpTareasCargadas.forEach(seccion => {
            const option = document.createElement('option');
            option.value = seccion.idTipoTarea;
            option.text = seccion.descripcion;

            if (tareaId && tareaId === seccion.idTipoTarea) {
                option.selected = true;
            }

            selectElement.appendChild(option);
        });
    });
}


if (typeof TpCalificacion === 'undefined') {
    var TpCalificacion = []; // Declárala si no existe
} else {
    TpCalificacion.length = 0; // Límpiala si ya existe
}



async function ObtenerTpCalificacion() {
    if (TpCalificacion.length > 0) {
        return TpCalificacion;
    }

    return fetch(tpCalificacionPath)
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
                TpCalificacion = datos.data.filter(seccion => seccion.estado === 'A');
                return TpCalificacion;
            } else {
                return [];
            }
        });
}
LlenarSelectTpCalificaion()
function LlenarSelectTpCalificaion(tareaId) {
    const selectElement = document.querySelector('select[name="idTipoCalificacion"]');
    selectElement.innerHTML = '';

    const opcionDefault = document.createElement('option');
    opcionDefault.value = '';
    opcionDefault.text = 'Seleccione una Sección';
    selectElement.appendChild(opcionDefault);

    // Obtener y filtrar secciones por curso y horario seleccionados
    ObtenerTpCalificacion().then(Secciones => {

        TpCalificacion.forEach(seccion => {
            const option = document.createElement('option');
            option.value = seccion.idTipoCalificacion;
            option.text = seccion.descripcion;

            selectElement.appendChild(option);
        });
    });
}


async function CargarArchivosDYNAMO(url) {
    if (!url) {
        return 'N/A'
    }
    console.log(url)

    try {
        const response = await fetch(archivosDynamoPath, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: "guardar",
                archivos: url
            }),
        });

        const result = await response.json();
        console.log(result);
        return result
    } catch (error) {
        AError('Ocurrió un error en el servidor. Reporte este problema.');
        console.error('Error al enviar el archivo:', error);
        throw error;
    }


}

async function CrearTarea() {

    const fileInput = document.querySelector(`input[name='archivos']`);
    const files = fileInput.files;

    if (!files || files.length === 0) {
        GuardarTarea()
    }
    else {
        const urls3 = await cargarArchivosS3('archivos')
        const dynamo = await CargarArchivosDYNAMO(urls3)
        GuardarTarea(dynamo)
    }


}


async function GuardarTarea(Dynamo = null) {
    // Obtener el formulario y los datos
    let form = document.getElementById('formI');
    let formData2 = new FormData(form);
    let data = Object.fromEntries(formData2.entries());

    // Agregar datos adicionales de sesión
    data.usrCui = sessionStorage.getItem('cui');
    data.tkn = sessionStorage.getItem('token');
    data.metodo = 1;
    data.cui = data.usrCui
    if (Dynamo) {
        data.idArhivosAdjuntos = Dynamo.idArhivosAdjuntos
    }
    else {
        data.idArhivosAdjuntos = 'N/A'
    }


    // Validación de campos obligatorios
    if (!data.idCurso || !data.idHorario || !data.idSeccion) {
        AWarning("Todos los campos obligatorios");
        return;
    }
    console.log(data);

    // Realizar la solicitud fetch para crear el mantenimiento
    fetch(asignacionTareasPath, {
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
//#region  metodos de calificacion
document.getElementById('agregarFila').addEventListener('click', function () {
    var table = document.querySelector('#listaCotejo table tbody');
    var newRow = document.createElement('tr');
    newRow.innerHTML = `
                        <td><input type="text" name="descripcionCriterio" class="form-control"></td>
                        <td>x</td>
                        <td>o</td>
                `;
    table.appendChild(newRow);
});
document.getElementById('agregarFila2').addEventListener('click', function () {
    var table = document.querySelector('#escalaDeRango table tbody');
    var newRow = document.createElement('tr');
    newRow.innerHTML = `
                            <td><input type="text" name="descripcionCriterio" class="form-control"></td>
                            <td>Deficiente -> Exelente</td>

                `;
    table.appendChild(newRow);
});
function alternarCalificacionSection() {
    var seleccion = document.getElementById("idTipoCalificacion").value;
    var secciones = document.querySelectorAll(".calificacion-section-content");

    secciones.forEach(function (seccion) {
        if (seccion.getAttribute("id") === seleccion) {
            seccion.style.display = "block";
        } else {
            seccion.style.display = "none";
        }
    });
}

document.getElementById ("idTipoCalificacion").addEventListener("change", alternarCalificacionSection);

//#endregion

//#region  Rubrica

var numColumnas;
crearTablaRubrica()
function crearTablaRubrica() {
    var numFilas = parseInt(document.getElementById('numFilas').value);
    numColumnas = parseInt(document.getElementById('numColumnas').value);

    var rubricaContainer = document.getElementById('rubricaContainer');

    var tablaHtml = '<table id="rubricaTable"><thead><tr><td class="col-form-label">Criterio</td><td>Exelente</td><td>Bueno</td><td>Regular</td>';

    if (numColumnas >= 4) {
        tablaHtml += '<td>Suficiente</td>';
    }

    if (numColumnas === 5) {
        tablaHtml += '<td>Debe Mejorar</td>';
    }

    tablaHtml += '</tr></thead><tbody>';

    for (var j = 1; j <= numFilas; j++) {
        tablaHtml += '<tr>';
        tablaHtml += '<td><textarea class="form-control" rows="4" name="descripcionCriterio" required></textarea></td>';
        tablaHtml += '<td><textarea name="exelente" type="text" class="form-control" placeholder="Aspectos"></textarea>';
        tablaHtml += '<input name="valorExelente" type="number" class="form-control" min="0" max="10" placeholder="Puntaje">';
        tablaHtml += '</td>';
        tablaHtml += '<td><textarea name="bueno" type="text" class="form-control" placeholder="Aspectos"></textarea>';
        tablaHtml += '<input name="valorBueno" type="number" class="form-control" min="0" max="10" placeholder="Puntaje">';
        tablaHtml += '</td>';
        tablaHtml += '<td><textarea name="regular" type="text" class="form-control" placeholder="Aspectos"></textarea>';
        tablaHtml += '<input name="valorRegular" type="number" class="form-control" min="0" max="10" placeholder="Puntaje">';
        tablaHtml += '</td>';

        if (numColumnas >= 4) {
            tablaHtml += '<td><textarea name="suficiente" type="text" class="form-control" placeholder="Aspectos"></textarea>';
            tablaHtml += '<input name="valorSuficiente" type="number" class="form-control" min="0" max="10" placeholder="Puntaje">';
            tablaHtml += '</td>';
        }

        if (numColumnas === 5) {
            tablaHtml += '<td><textarea name="debeMejorar" type="text" class="form-control" placeholder="Aspectos"></textarea>';
            tablaHtml += '<input name="valorDebeMejorar" type="number" class="form-control" min="0" max="10" placeholder="Puntaje">';
            tablaHtml += '</td>';
        }

        tablaHtml += '</tr>';
    }

    tablaHtml += '</tbody></table>';
    rubricaContainer.innerHTML = tablaHtml;
}

function InsertarRubrica(id) {
    var rubricaTable = document.getElementById('rubricaTable');
    var listaRubrica = [];

    for (var i = 1; i < rubricaTable.rows.length; i++) {
        var fila = rubricaTable.rows[i];
        var criterio = fila.cells[0].querySelector('textarea').value;

        var filaRubrica = {
            idRubrica: id,
            descripcionCriterio: criterio,
            exelente: fila.cells[1].querySelector('textarea').value,
            valorExelente: parseFloat(fila.cells[1].querySelector('input').value),
            bueno: fila.cells[2].querySelector('textarea').value,
            valorBueno: parseFloat(fila.cells[2].querySelector('input').value),
            regular: fila.cells[3].querySelector('textarea').value,
            valorRegular: parseFloat(fila.cells[3].querySelector('input').value),
            suficiente: 'N/A',
            valorSuficiente: 0,
            debeMejorar: 'N/A',
            valorDebeMejorar: 0,
            dimension: numColumnas

        };

        if (numColumnas >= 4) {
            filaRubrica.suficiente = fila.cells[4].querySelector('textarea').value,
                filaRubrica.valorSuficiente = parseFloat(fila.cells[4].querySelector('input').value)

        }

        if (numColumnas === 5) {
            filaRubrica.debeMejorar = fila.cells[5].querySelector('textarea').value,
                filaRubrica.valorDebeMejorar = parseFloat(fila.cells[5].querySelector('input').value)

        }

        listaRubrica.push(filaRubrica);
    }

    console.log(listaRubrica);
    fetch('/Docentes/InsertarDescripcionRubrica', {
        method: "POST",
        body: JSON.stringify(listaRubrica), 
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(function (respuesta) {
            if (respuesta.ok) {
                return respuesta.json();
            }
        })
        .then(function (data) {

            if (data === 1) {
                ASucces('La Tarea se creo Correctamente!!');
            } else if (data === -1) {
                AWarning('No se pudo guardar la tarea, intente de nuevo... ')
            } else {
                AError('Ocurrio un error al crear la tarea')
            }

        });
}

//#endregion