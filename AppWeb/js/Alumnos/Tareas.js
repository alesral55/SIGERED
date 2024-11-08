
if (typeof tareasCargadas === 'undefined') {
    var tareasCargadas = []; // Declárala si no existe
} else {
    tareasCargadas.length = 0; // Límpiala si ya existe
}
if (typeof urlarchivos === 'undefined') {
    var urlarchivos = []; // Declárala si no existe
} else {
    urlarchivos.length = 0; // Límpiala si ya existe
}

async function ObtenerAsignacion() {
    // Si ya tenemos niveles cargados, no los volvemos a buscar

    const data = {
        usrCui: sessionStorage.getItem('cui'),
        tkn: sessionStorage.getItem('token'),
        metodo: 4
    };


    return fetch(tareaPath, {
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
                tareasCargadas = datos.data.filter(docente => docente.estado == 'A');
                return tareasCargadas;
            } else {
                return [];
            }
        });
}


async function aplicarFiltrosYMostrar() {
    const filtro = document.getElementById('filtroInteligente').value.toLowerCase();
    const tareasPorEntregar = document.getElementById('ListadoTareasAcordeonPorEntregar');
    const tareasEntregadas = document.getElementById('ListadoTareasAcordeonEntregadas');

    tareasPorEntregar.innerHTML = '';
    tareasEntregadas.innerHTML = '';
    const tareas = await ObtenerAsignacion()
    tareas.forEach(tarea => {
        const coincideFiltro =
            tarea.nombreTarea.toLowerCase().includes(filtro) ||
            tarea.descripcionTarea.toLowerCase().includes(filtro) ||
            tarea.fechaVence.toLowerCase().includes(filtro);

        if (coincideFiltro) {
            const tareaHTML = `
                <div class="accordion-item">
                    <h2 class="accordion-header" id="heading${tarea.idTarea}">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${tarea.idTarea}" aria-expanded="true" aria-controls="collapse${tarea.idTarea}">
                            ${tarea.nombreTarea}
                        </button>
                    </h2>
                    <div id="collapse${tarea.idTarea}" class="accordion-collapse collapse show" aria-labelledby="heading${tarea.idTarea}" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <strong>Descripción:</strong> ${tarea.descripcionTarea}<br>
                            <strong>Fecha de Entrega:</strong> ${formatearFecha(tarea.fechaVence)}<br>
                            <strong>Puntaje:</strong> ${tarea.puntaje} <br><br>
                            <button class="btn btnAzul btn-dark" onclick="mostrarDetalleTarea(${tarea.idTarea})">Ver detalle Tarea</button>
                        </div>
                    </div>
                </div>
            `;

            if (tarea.entregada > 0) {
                tareasEntregadas.innerHTML += tareaHTML;
            } else {
                tareasPorEntregar.innerHTML += tareaHTML;
            }
        }
    });
}

// Inicializar el filtro en la carga de la página
aplicarFiltrosYMostrar();



// Función para alternar entre vistas
async function mostrarDetalleTarea(idTarea) {
    // Ocultar lista de tareas y mostrar detalle
    document.getElementById('listaTareasContainer').style.display = 'none';
    document.getElementById('detalleTareaContainer').style.display = 'block';

    const TareaFiltrada = tareasCargadas.find(Tarea => Tarea.idTarea == idTarea)
    console.log(TareaFiltrada);
    document.getElementById("idTarea").value = idTarea;
    document.getElementById("idSeccion").value = TareaFiltrada.idSeccion;
    document.getElementById("nombreTarea").textContent = TareaFiltrada.nombreTarea;
    document.getElementById("descripcionTarea").textContent = "Descripción de la tarea: " + TareaFiltrada.descripcionTarea;
    document.getElementById("fechaCreacion").textContent = "Fecha de Creación: " + formatearFecha(TareaFiltrada.fechaCreacion);
    document.getElementById("fechaVencimiento").textContent = "Fecha de Vencimiento: " + formatearFecha(TareaFiltrada.fechaVence);
    document.getElementById("estado").textContent = "Estado: " + TareaFiltrada.estado;
    document.getElementById("punteo").textContent = "Punteo: " + TareaFiltrada.puntaje;
    document.getElementById("descripcionCurso").textContent = "Curso: " + TareaFiltrada.nombreCurso;

    if (TareaFiltrada.idTipoCalificacion == 1) {
        ObtenerRubrica(TareaFiltrada.idFormatoCalificaion);
    } else if (TareaFiltrada.idTipoCalificacion == 2) {
        ObtenerListaCotejo(TareaFiltrada.idFormatoCalificaion);
    } else if (TareaFiltrada.idTipoCalificacion == 3) {
        ObtenerEscalaRango(TareaFiltrada.idFormatoCalificaion);
    }
    if (TareaFiltrada.idArhivosAdjuntos != 'N/A') {
        const responseurlarchivos = await ObtenerArchivosDYNAMO(TareaFiltrada.idArhivosAdjuntos)
        urlarchivos = responseurlarchivos.archivos
        verarchivos(1)
    }

}

// Función para volver a la lista de tareas
function volverLista() {
    // Ocultar detalle de tarea y mostrar lista
    document.getElementById('detalleTareaContainer').style.display = 'none';
    document.getElementById('listaTareasContainer').style.display = 'block';
}

// Ejemplo de cómo se podría cargar la lista de tareas (agrega más datos según sea necesario)
function cargarListaTareas() {
    // Suponiendo que la lista de tareas se obtiene mediante una llamada API
    fetch("/Alumnos/ObtenerListaTareas")
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
        })
        .then(function (listaTareas) {
            var tareasTableBody = document.getElementById("tareasTableBody");
            tareasTableBody.innerHTML = ""; // Limpiar contenido anterior

            listaTareas.forEach(function (tarea) {
                var row = document.createElement("tr");

                // Nombre de la tarea
                var nombreCell = document.createElement("td");
                nombreCell.textContent = tarea.nombreTarea;
                row.appendChild(nombreCell);

                // Fecha de vencimiento
                var fechaVencimientoCell = document.createElement("td");
                fechaVencimientoCell.textContent = convertirFechaJSON(tarea.fechaVencimiento);
                row.appendChild(fechaVencimientoCell);

                // Botón para ver detalle
                var accionesCell = document.createElement("td");
                var detalleButton = document.createElement("button");
                detalleButton.className = "btn btn-primary btn-sm";
                detalleButton.textContent = "Ver Detalle";
                detalleButton.onclick = function () {
                    mostrarDetalleTarea(tarea.idTarea);
                };
                accionesCell.appendChild(detalleButton);
                row.appendChild(accionesCell);

                tareasTableBody.appendChild(row);
            });
        });
}

// Llamar a la función de carga al cargar la página
window.onload = function () {
    cargarListaTareas();
};




async function ObtenerArchivosDYNAMO(url) {
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
                action: "consultar",
                idArhivosAdjuntos: url
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


var archivoActual = 0; // Índice del archivo actual

// Muestra el archivo correspondiente al índice
function verarchivos(indice) {
    const fileUrl = urlarchivos[indice];
    const fileExtension = fileUrl.split('.').pop().toLowerCase();
    const viewer = document.getElementById('file-viewer');

    // Limpia el contenido anterior
    viewer.innerHTML = "";

    if (fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'png' || fileExtension === 'gif') {
        const img = document.createElement('img');
        img.src = fileUrl;
        img.alt = "Archivo de imagen";
        viewer.appendChild(img);
    } else if (fileExtension === 'pdf') {
        const iframe = document.createElement('iframe');
        iframe.src = fileUrl;
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        iframe.setAttribute('frameborder', '0');
        viewer.appendChild(iframe);
    } else {
        viewer.innerHTML = "<p>Tipo de archivo no soportado para visualización.</p>";
    }
}

// Muestra el siguiente archivo en la lista
function mostrarSiguiente() {
    if (archivoActual < urlarchivos.length - 1) {
        archivoActual++;
        verarchivos(archivoActual);
    } else {
        AWarning("Has llegado al último archivo.");
    }
}

// Muestra el archivo anterior en la lista
function mostrarAnterior() {
    if (archivoActual > 0) {
        archivoActual--;
        verarchivos(archivoActual);
    } else {
        AWarning("Estás en el primer archivo.");
    }
}

//#region ARCHIVOS S3
var archivosBase64 = []; // Almacenará los archivos en base64
var archivoActualEntrega = 0; // Índice del archivo actualmente mostrado

function previsualizarArchivos() {
    const input = document.getElementById('archivos');
    archivosBase64 = []; // Limpiar los archivos previos
    archivoActualEntrega = 0; // Reiniciar el índice

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
    const viewer = document.getElementById('file-viewerEntrega');
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

function mostrarSiguienteEntrega() {
    if (archivoActual < archivosBase64.length - 1) {
        archivoActual++;
        mostrarArchivo(archivoActual);
    } else {
        AWarning("Has llegado al último archivo.");
    }
}

function mostrarAnteriorEntrega() {
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

async function EnviarTarea() {
    const loader = document.getElementById('loader');
    loader.style.display = 'flex'; // Muestra el loader
    const comentario = document.getElementById('comentario').value;

    const fileInput = document.querySelector(`input[name='archivos']`);
    const files = fileInput.files;

    if ((!files || files.length === 0) && !comentario) {
        loader.style.display = 'none';
        AWarning('Debe de adjuntar al menos un archivo o agregar un comentario para entregar la tarea')
        //GuardarTarea()
    }
    else if ((!files || files.length === 0) && comentario) {
        loader.style.display = 'none';
        GuardarTarea()
    }
    else {
        const urls3 = await cargarArchivosS3('archivos')
        const dynamo = await CargarArchivosDYNAMO(urls3)
        loader.style.display = 'none';
        GuardarTarea(dynamo)
    }
}

async function GuardarTarea(Dynamo = null) {

    const loader = document.getElementById('loader');
    loader.style.display = 'flex'; // Muestra el loader
    const idTarea = document.getElementById('idTarea').value
    const idSeccion = document.getElementById('idSeccion').value
    const comentario = document.getElementById('comentario').value
    let idArhivosAdjuntos
    if (Dynamo) {
        idArhivosAdjuntos = Dynamo.idArhivosAdjuntos
    }
    else {
        idArhivosAdjuntos = 'N/A'
    }

    const data = {
        usrCui: sessionStorage.getItem('cui'),
        tkn: sessionStorage.getItem('token'),
        metodo: 5,
        idTarea: idTarea, 
        idSeccion: idSeccion,
        comentario:comentario,
        idArchivosAdjuntos:idArhivosAdjuntos,
        CUIalumno:sessionStorage.getItem('cui')
    };
    // Agregar datos adicionales de sesión

    // Validación de campos obligatorios


    // Realizar la solicitud fetch para crear el mantenimiento
    fetch(tareaPath, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(function (respuesta) {
            loader.style.display = 'none';
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
                aplicarFiltrosYMostrar()
            }
        })
        .catch(function (error) {
            AError('Error del servidor, reporta esto a la Academia')
            console.error('Error:', error);
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