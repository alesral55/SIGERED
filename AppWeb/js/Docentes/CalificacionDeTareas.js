var Punteo
var CalificacionFinal = ''
var idTarea = sessionStorage.getItem("idTarea")
var idTipoCalificacion
var idFormatoCalificaion

if (typeof urlarchivos2 === 'undefined') {
    var urlarchivos2 = []; // Declárala si no existe
} else {
    urlarchivos2.length = 0; // Límpiala si ya existe
}

cargardatos()
async function cargardatos() {
    if (typeof Tarea === 'undefined') {
        cargarFormulario(34)
        return
    } else
        if (!Tarea) {
            cargarFormulario(34)
            return
        }
    console.log(Tarea);
    // Actualiza los elementos HTML con los datos recibidos
    let bloqueoEntrega = document.getElementById('bloqueoEntrega')
    document.getElementById("idTarea").value = Tarea.idTarea
    document.getElementById("nombreTarea").textContent = Tarea.nombreTarea;
    document.getElementById("descripcionTarea").textContent = "Descripción de la tarea: " + Tarea.descripcionTarea;
    document.getElementById("fechaCreacion").textContent = "Fecha de Creación: " + formatearFecha(Tarea.fechaCreacion);
    document.getElementById("fechaVencimiento").textContent = "Fecha de Vencimiento: " + formatearFecha(Tarea.fechaVence);
    document.getElementById("estado").textContent = "Estado: " + Tarea.estado;
    document.getElementById("punteo").textContent = "Punteo: " + Tarea.puntaje;
    Punteo = Tarea.puntaje
    document.getElementById("descripcionCurso").textContent = "Curso: " + Tarea.descripcionCurso;
    document.getElementById("descripcionBloque").textContent = "Seccion: " + Tarea.descripcionB;
    idTipoCalificacion = Tarea.idTipoCalificacion
    idFormatoCalificaion = Tarea.idFormatoCalificaion
    if (Tarea.bloqueoEntrega == 1) {
        bloqueoEntrega.checked = true
    }
    if (Tarea.idTipoCalificacion == 1) {
        ObtenerRubrica(Tarea.idFormatoCalificaion)
    }
    else if (Tarea.idTipoCalificacion == 2) {
        ObtenerListaCotejo(Tarea.idFormatoCalificaion)
    }
    else if (Tarea.idTipoCalificacion == 3) {
        ObtenerEscalaRango(Tarea.idFormatoCalificaion)
    }

}


var archivoActual = 0; // Índice del archivo actual

// Muestra el archivo correspondiente al índice
function verarchivos(indice) {
    const fileUrl = urlarchivos2[indice];
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
    if (archivoActual < urlarchivos2.length - 1) {
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





function ObtenerRubrica(id) {
    fetch("/Alumnos/DescripcionRubricas?id=" + id)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
        })
        .then(function (rubricaData) {
            // Llama a la función para crear la tabla HTML con los datos obtenidos
            crearTablaRubrica(rubricaData);
        });
}

var respuestaRubrica = []

function crearTablaRubrica(rubricaData) {
    let correlativo = 0
    var rubricaContainer = document.getElementById('rubricaContainer');
    var numColumnas = rubricaData[0].dimension;
    var tablaHtml = '<table id="rubricaTable" class="table table-bordered mi-tabla-personalizada"><thead><tr><th>Criterio</th><th>Exelente</th><th>Bueno</th><th>Regular</th>';
    if (numColumnas >= 4) {
        tablaHtml += '<th>Suficiente</th>';
    }
    if (numColumnas === 5) {
        tablaHtml += '<th>Debe Mejorar</th>';
    }
    tablaHtml += '</tr></thead><tbody>';
    rubricaData.forEach(function (fila) {
        tablaHtml += '<tr>';
        tablaHtml += '<td>' + fila.descripcionCriterio + `<input type="hidden" name="idDescripcionRubrica" value="${fila.idDescripcionRubrica}" />     
<input type="hidden" name="dimension" value="${fila.dimension}" /> </td>`;
        tablaHtml += '<td class="seleccionable seleccionada" onclick="cambiarColor(this)">' + fila.exelente + '<br />' + 'Punteo: ' + `    <label name="exelente">${fila.valorExelente}</label>

                        <input type="hidden" name="correlativo" value="${correlativo}" />` + '</td>';

        tablaHtml += '<td class="seleccionable " onclick="cambiarColor(this)">' + fila.bueno + '<br />' + 'Punteo: ' + `    <label name="bueno">${fila.valorBueno}</label>
                        <input type="hidden" name="correlativo" value="${correlativo}" />` + '</td>';
        tablaHtml += '<td class="seleccionable " onclick="cambiarColor(this)">' + fila.regular + '<br />' + 'Punteo: ' + `    <label name="regular">${fila.valorRegular}</label>
                        <input type="hidden" name="correlativo" value="${correlativo}" />` + '</td>';


        if (numColumnas >= 4) {
            tablaHtml += '<td class="seleccionable " onclick="cambiarColor(this)">' + fila.suficiente + '<br />' + 'Punteo: ' + `    <label name="suficiente">${fila.valorSuficiente}</label>
                        <input type="hidden" name="correlativo" value="${correlativo}" />` + '</td>';
        }
        if (numColumnas === 5) {
            tablaHtml += '<td class="seleccionable " onclick="cambiarColor(this)">' + fila.debeMejorar + '<br />' + 'Punteo: ' + `    <label name="debeMejorar">${fila.valorDebeMejorar}</label>
                        <input type="hidden" name="correlativo" value="${correlativo}" />` + '</td>';
        }
        tablaHtml += '</tr>';
        let filaData = {
            correlativo: correlativo,
            debeMejorar: 0,
            suficiente: 0,
            regular: 0,
            bueno: 0,
            exelente: fila.valorExelente
        }
        correlativo++
        respuestaRubrica.push(filaData);
    });
    console.log(respuestaRubrica)
    console.log(correlativo)
    tablaHtml += '</tbody></table>';
    rubricaContainer.innerHTML = tablaHtml;


}
function cambiarColor(celda) {
    // Obtener todas las celdas de la fila actual
    var celdasFila = celda.parentNode.getElementsByTagName('td');

    // Eliminar la clase 'seleccionada' de todas las celdas de la fila
    for (var i = 0; i < celdasFila.length; i++) {
        celdasFila[i].classList.remove('seleccionada');
    }

    // Agregar la clase 'seleccionada' a la celda clicada
    celda.classList.add('seleccionada');
    let correlativo = celda.querySelector('input[name="correlativo"]').value;

    // Inicializar la filaData para evitar valores indefinidos
    let filaData = {
        correlativo: correlativo,
        debeMejorar: 0,
        suficiente: 0,
        regular: 0,
        bueno: 0,
        exelente: 0
    };

    // Obtener valores solo si los labels están presentes
    let debeMejorarLabel = celda.querySelector('label[name="debeMejorar"]');
    if (debeMejorarLabel) {
        filaData.debeMejorar = parseFloat(debeMejorarLabel.innerText);
    }

    let suficienteLabel = celda.querySelector('label[name="suficiente"]');
    if (suficienteLabel) {
        filaData.suficiente = parseFloat(suficienteLabel.innerText);
    }

    let regularLabel = celda.querySelector('label[name="regular"]');
    if (regularLabel) {
        filaData.regular = parseFloat(regularLabel.innerText);
    }

    let buenoLabel = celda.querySelector('label[name="bueno"]');
    if (buenoLabel) {
        filaData.bueno = parseFloat(buenoLabel.innerText);
    }

    let exelenteLabel = celda.querySelector('label[name="exelente"]');
    if (exelenteLabel) {
        filaData.exelente = parseFloat(exelenteLabel.innerText);
    }

    let index = respuestaRubrica.findIndex(obj => obj.correlativo == correlativo);

    if (index !== -1) {
        respuestaRubrica.splice(index, 1);
    }

    console.log(filaData);
    respuestaRubrica.push(filaData);
    console.log(respuestaRubrica);
}



function ObtenerListaCotejo(id) {
    fetch("/Alumnos/DescripcionLista?id=" + id)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
        })
        .then(function (ListaData) {

            crearLista(ListaData);
        });
}

// Función para manejar la selección de los checkboxes
function manejarSeleccionDeCheckboxes() {
    var checkboxes = document.querySelectorAll('.opcionCheckbox');
    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', function () {
            var fila = checkbox.parentNode.parentNode;
            var otrosCheckboxes = fila.querySelectorAll('.opcionCheckbox');
            otrosCheckboxes.forEach(function (otroCheckbox) {
                if (otroCheckbox !== checkbox) {
                    otroCheckbox.checked = false;
                }
            });
            // Aquí puedes hacer algo con el valor seleccionado (checkbox.value)
        });
    });
}

// Función para crear la lista
function crearLista(ListaData) {
    var ListaContainer = document.getElementById('listaContainer');
    var tablaHtml = '<table id="listaTable" class="table table-bordered"><thead><tr><th>Criterio</th><th>Si</th><th>No</th></tr></thead><tbody>';

    ListaData.forEach(function (fila) {
        tablaHtml += '<tr>';
        tablaHtml += '<td>' + fila.descripcionCriterio + `<input type="hidden" name="idDescripcionListaDeCotejo" value="${fila.idDescripcionListaDeCotejo}" /></td>`;
        tablaHtml += '<td><input type="checkbox" name="checkboxSi" class="opcionCheckbox" value="S"></td>';
        tablaHtml += '<td><input type="checkbox" name="checkboxNo" class="opcionCheckbox" checked=true value="N"></td>';
        tablaHtml += '</tr>';
    });

    tablaHtml += '</tbody></table>';
    ListaContainer.innerHTML = tablaHtml;
    manejarSeleccionDeCheckboxes();
}





function ObtenerEscalaRango(id) {
    var Escala
    fetch("/Alumnos/DescripcionEscala?id=" + id)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
        })
        .then(function (EscalaData) {
            Escala = EscalaData
            fetch("/Docentes/TipoEscala")
                .then(function (response) {
                    if (response.ok) {
                        return response.json();
                    }
                })
                .then(function (escalas) {

                    creareEscala(Escala, escalas);
                });
        });
}

function creareEscala(EscalaData, Escalas) {
    var ListaContainer = document.getElementById('listaContainer');
    var tablaHtml = '<table id="escalaTable" class="table table-bordered"><thead><tr><th>Criterio</th><th>Escala</th></tr></thead><tbody>';

    console.log(EscalaData);
    EscalaData.forEach(function (fila) {
        tablaHtml += '<tr>';
        tablaHtml += '<td>' + fila.descripcionCriterio + '</td>';

        // Crear un select y agregar opciones basadas en los datos de Escalas
        tablaHtml += '<td><select name="idTipoEscala">';
        Escalas.forEach(function (escala) {
            tablaHtml += `<option value="${escala.idTipoEscala}">${escala.descripcion}</option>`;
        });
        tablaHtml += `</select> <input type="hidden" name="idDescripcionEscalaDeRango" value="${fila.idDescripcionEscalaDeRango}" /></td>`;

        tablaHtml += '</tr>';
    });

    tablaHtml += '</tbody></table>';
    ListaContainer.innerHTML = tablaHtml;
}


function contarFilasYSumarValores() {

    if (idTipoCalificacion == 1) {

        var tabla = document.getElementById("rubricaTable")
        var filas = tabla.getElementsByTagName('tr');
        var suma = 0;

        for (var i = 1; i < filas.length; i++) {
            var notaMax = parseFloat(filas[i].querySelector('label[name="exelente"]').innerText);
            suma = suma + notaMax
        }


        let sumaTotal = 0;

        respuestaRubrica.forEach(objeto => {
            for (let propiedad in objeto) {
                if (propiedad !== "correlativo") {
                    sumaTotal += objeto[propiedad];
                }
            }
        });


        var totalFilas = filas.length - 1;
        console.log('Número de filas en la tabla: ' + totalFilas);
        console.log('Número puntos maz ' + suma);
        console.log('PUNTEO: ' + Punteo)
        console.log('tiuma total: ' + sumaTotal);
        let Subpunteo = parseFloat(Punteo) / parseFloat(suma)


        CalificacionFinal = parseFloat(Subpunteo) * parseFloat(sumaTotal)
        CalificacionFinal = CalificacionFinal.toFixed(2);
        console.log('calificacionFibnal ', CalificacionFinal)
        document.getElementById("CalificacionFinal").innerText = 'La nota fial es: ' + CalificacionFinal

    }
    else if (idTipoCalificacion == 2) {
        var tabla = document.getElementById('listaTable');
        var filas = tabla.getElementsByTagName('tr');
        var sumaSi = 0;

        for (var i = 1; i < filas.length; i++) {
            var checkbox = filas[i].querySelector('input[name="checkboxSi"]');
            if (checkbox.checked) {
                sumaSi++;
            }
        }

        var totalFilas = filas.length - 1; // Resta 1 para excluir la fila de encabezado

        console.log('Número de filas en la tabla: ' + totalFilas);
        console.log('Número de checkboxes "Sí" seleccionados: ' + sumaSi);
        console.log('PUNTEO: ' + Punteo)
        let Subpunteo = parseFloat(Punteo) / parseFloat(totalFilas)
        CalificacionFinal = parseFloat(Subpunteo) * parseFloat(sumaSi)
        CalificacionFinal = CalificacionFinal.toFixed(2);
        console.log('calificacionFibnal ', CalificacionFinal)
        document.getElementById("CalificacionFinal").innerText = 'La nota fial es: ' + CalificacionFinal
    }


    else if (idTipoCalificacion == 3) {

        var tabla = document.getElementById('escalaTable');
        var filas = tabla.getElementsByTagName('tr');
        var suma = 0;

        for (var i = 1; i < filas.length; i++) {
            var select = filas[i].querySelector('select');
            var valorSeleccionado = select.value;
            suma += parseInt(valorSeleccionado);
        }

        var totalFilas = filas.length - 1;

        console.log('Número de filas en la tabla: ' + totalFilas);
        console.log('Suma de valores seleccionados: ' + suma);
        console.log('PUNTEO: ' + Punteo)
        let Subpunteo = parseFloat(Punteo) / (parseFloat(totalFilas) * 4)
        console.log(Subpunteo)
        CalificacionFinal = parseFloat(Subpunteo) * parseFloat(suma)
        CalificacionFinal = CalificacionFinal.toFixed(2);
        console.log('calificacionFibnal ', CalificacionFinal)
        document.getElementById("CalificacionFinal").innerText = 'La nota fial es: ' + CalificacionFinal
    }

}




async function ObtenerTarea() {
    let CUIalumno = document.getElementById("CUIalumno").value;
    let idTarea = document.getElementById("idTarea").value;

    if (idTarea === '') {
        AWarning('No tiene un id de tarea, se recomienda ingresar desde la lista de tareas...');
        return;
    }

    const data = {
        idTarea: 6,
        usrCui: sessionStorage.getItem('cui'),
        tkn: sessionStorage.getItem('token'),
        cui: '',
        metodo: 5
    };

    try {
        const result = await fetch(asignacionTareasPath, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (result.ok) {
            const datos = await result.json();
            const data = datos.data[0];

            if (data.idTareaEntregada === 0) {
                AWarning('No hay más entregas sin calificación para esta tarea...');
                return;
            }

            document.getElementById("nombreEstudiante").innerText = 'Nombre del Estudiante: ' + data.nombre;
            const elementoEntrega = document.getElementById('entrega');

            elementoEntrega.style.color = (data.estado === 'Entregada con Atraso') ? 'red' : 'green';
            elementoEntrega.innerText = data.estado;
            if (data.idArchivosAdjuntos != 'N/A') {
                console.log('entra aca');
                console.log(data.idArchivosAdjuntos);
                const responseurlarchivos = await ObtenerArchivosDYNAMO(data.idArchivosAdjuntos);
                 urlarchivos2 = responseurlarchivos.archivos;
                 console.log(urlarchivos2);
                verarchivos(1);
            }
        }
    } catch (error) {
        AError('Ocurrió un error al obtener la tarea.');
        console.error(error);
    }
}


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


function InsertarTarea() {
    nota =document.getElementById("notaFilan").value
if(!nota){
    if (CalificacionFinal == '') {
        AWarning('Debe calcular la nota antes de calificar la tarea....')
        return
    }
    if (pdfData == '') {
        AWarning('No se encontro ningun alumno para calificar intente de nuevo...')
        return
    }



}CalificacionFinal = nota


ASucces('La tarea ha sido calificada con exito ')
cargarFormulario(33)
return
    console.log('calificacionFibnal ', CalificacionFinal)

    let descripcion = document.getElementById('comentario').value
    fetch('/Docentes/InsertarNota', {
        method: 'POST',
        body: JSON.stringify({
            idTarea: idTarea,
            descripcion: descripcion + ' ',
            CUIalumno: pdfData.CUIalumno,
            idTipoCalificacion: idTipoCalificacion,
            idFormatoCalificaion: idFormatoCalificaion,
            NotaFinal: CalificacionFinal
            //Nota: '3.5'

        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(function (result) {
            if (result.ok) {
                return result.json();

            }
        })
        .then(function (data) {
            console.log(data);
            if (data === 0) {
                AError('Ocurrio un error al cargar la tarea')

            } else {

                if (idTipoCalificacion == 2) {
                    InsertarLista(data, idFormatoCalificaion)
                }
                else if (idTipoCalificacion == 3) {
                    InsertarEscala(data, idFormatoCalificaion)
                }
                else if (idTipoCalificacion == 1) {
                    InsertarRubrica(data, idFormatoCalificaion)
                }
            }




        });
}

function InsertarEscala(idNota, idEscala) {
    var table = document.querySelector('#listaContainer table tbody');
    var filas = table.querySelectorAll('tr');
    var listaDeCotejo = [];

    filas.forEach(function (fila) {
        var idTipoEscala = fila.querySelector('select[name="idTipoEscala"]').value
        var idDescripcionEscalaDeRango = fila.querySelector('input[name="idDescripcionEscalaDeRango"]').value

        var filaData = {
            idTipoEscala: idTipoEscala,
            idDescripcionEscalaDeRango: idDescripcionEscalaDeRango,
            idEscalaDeRango: idEscala,
            idNota: idNota
        };

        listaDeCotejo.push(filaData);
    });

    console.log('Lista de cotejo obtenida');
    console.log(listaDeCotejo);
    fetch('/Docentes/InsertarRespuestaEscala', {
        method: "POST",
        body: JSON.stringify(listaDeCotejo),
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
                ASucces('La Tarea se califico Correctamente!!');
            } else if (data === -1) {
                AWarning('No se pudo guardar la nota de la tarea, inténtelo de nuevo...');
            } else {
                AError('Ocurrió un error al calificar la tarea');
            }
        });
}



function InsertarLista(idNota, idListaDeCotejo) {
    var table = document.querySelector('#listaContainer table tbody');
    var filas = table.querySelectorAll('tr');
    var listaDeCotejo = [];

    filas.forEach(function (fila) {
        var idDescripcionListaDeCotejo = fila.querySelector('input[name="idDescripcionListaDeCotejo"]').value;
        var resultadoVerdadero = fila.querySelector('input[name="checkboxSi"]');
        var resultadoFalso
        if (resultadoVerdadero.checked == true) {
            resultadoVerdadero = 1
            resultadoFalso = 0
        }
        else {
            resultadoFalso = 1
            resultadoVerdadero = 0
        }


        var filaData = {
            idListaDeCotejo: idListaDeCotejo,
            idDescripcionListaDeCotejo: idDescripcionListaDeCotejo,
            resultadoVerdadero: resultadoVerdadero,
            resultadoFalso: resultadoFalso,
            idNota: idNota
        };

        listaDeCotejo.push(filaData);
    });

    console.log('Lista de cotejo obtenida');
    console.log(listaDeCotejo);


    fetch('/Docentes/InsertarRespuestaLista', {
        method: "POST",
        body: JSON.stringify(listaDeCotejo),
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
                ASucces('La Tarea se creó Correctamente!!');
            } else if (data === -1) {
                AWarning('No se pudo guardar la tarea, inténtelo de nuevo...');
            } else {
                AError('Ocurrió un error al crear la tarea');
            }
        });
}

function InsertarRubrica(idNota, idRubrica) {
    var table = document.querySelector('#rubricaContainer table tbody');
    var filas = table.querySelectorAll('tr');
    var listaRubirca = [];

    filas.forEach(function (fila) {
        var idDescripcionRubrica = fila.querySelector('input[name="idDescripcionRubrica"]').value;
        var correlativo = fila.querySelector('input[name="correlativo"]').value;
        var dimension = fila.querySelector('input[name="dimension"]').value;

        var objetoExistente = respuestaRubrica.find(function (item) {
            return item.correlativo == correlativo;
        });
        console.log(objetoExistente)

        var filaData = {
            idRubrica: idRubrica,
            idDescripcionRubrica: idDescripcionRubrica,
            notaDebeMejorar: objetoExistente.debeMejorar,
            notaSuficiente: objetoExistente.suficiente,
            notaRegular: objetoExistente.regular,
            notaBueno: objetoExistente.bueno,
            notaExelente: objetoExistente.exelente,
            dimension: dimension,
            idNota: idNota
        };

        listaRubirca.push(filaData);
    });

    console.log('Lista de cotejo obtenida');
    console.log(listaRubirca);

    fetch('/Docentes/InsertarRespuestaRubrica', {
        method: "POST",
        body: JSON.stringify(listaRubirca),
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
                ASucces('La Tarea se creó Correctamente!!');
            } else if (data === -1) {
                AWarning('No se pudo guardar la tarea, inténtelo de nuevo...');
            } else {
                AError('Ocurrió un error al crear la tarea');
            }
        });
}


function ImprimirListadoAlumnos() {
    fetch('/Docentes/ImprimirHerramientaDeEvaluacion?tarea=' + idTarea)
        .then(function (response) {
            return response.text();
        })
        .then(function (data) {
            var newWindow = window.open('SIGA', 'INED');
            newWindow.document.write(data);
            newWindow.document.close();

            setTimeout(function () {
                newWindow.print();
                newWindow.close();
            }, 1000);
        })
        .catch(function (error) {
            console.error(error);
        });
}




function actualizarEstadoNotaVisible(notaVisible) {


    fetch('/Docentes/actualizarbloqueoEntrega', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idTarea: idTarea, bloqueoEntrega: notaVisible }),
    })
        .then(response => response.json())
        .then(data => {
            if (data == 1 && notaVisible == 1) {
                ASucces('La entrega de tareas despues de la fecha de vencimiento esta habilitada para los estudiantes')
            }
            else if (data == 1 && notaVisible == 0) {
                ASucces('La entrega de tareas despues de la fecha de vencimiento esta inhabilitada para los estudiantes')
            }
            else {
                AWarning('Ocurrio un error al cambiar el estado de entrega de tareas despues de la fecha de vencimiento')
            }

        })
        .catch((error) => {
            Aerror('Ocurrio un error al cambiar el estado de entrega de tareas despues de la fecha de vencimiento', error)
        });
}