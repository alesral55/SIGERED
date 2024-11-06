
if (typeof tareasCargadas === 'undefined') {
    var tareasCargadas = []; // Declárala si no existe
} else {
    tareasCargadas.length = 0; // Límpiala si ya existe
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
function mostrarDetalleTarea(idTarea) {
    // Ocultar lista de tareas y mostrar detalle
    document.getElementById('listaTareasContainer').style.display = 'none';
    document.getElementById('detalleTareaContainer').style.display = 'block';

    const TareaFiltrada = tareasCargadas.find(Tarea => Tarea.idTarea == idTarea)
    console.log(TareaFiltrada);
            document.getElementById("idTarea").value = idTarea;
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
                detalleButton.onclick = function() {
                    mostrarDetalleTarea(tarea.idTarea);
                };
                accionesCell.appendChild(detalleButton);
                row.appendChild(accionesCell);

                tareasTableBody.appendChild(row);
            });
        });
}

// Llamar a la función de carga al cargar la página
window.onload = function() {
    cargarListaTareas();
};




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
