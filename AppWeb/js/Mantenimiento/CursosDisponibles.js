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

if (typeof nivelesCargados === 'undefined') {
    var nivelesCargados = []; // Declárala si no existe
} else {
    nivelesCargados.length = 0; // Límpiala si ya existe
}


ObtenerTbMantenimiento()
// Función para obtener todas las personas
function ObtenerTbMantenimiento() {

    fetch(cursosDisponiblesPath)
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
        if (estado != 'I') {
            btnEstado.onclick = function () {
                generarTabla('I'); // Modo actualización
            };
            const fila = document.createElement('tr');
            btnEstado.innerText = 'Secciones  Inactivas'

                if(mantenimiento.estado != 'I'){
                    fila.innerHTML = `
                    <td>${mantenimiento.idCursoDispobible}</td>  
                    <td>${mantenimiento.nombreCurso}</td>  
                    <td>${mantenimiento.DescripcionRequisito}</td>  
                    <td>${formatearFecha(mantenimiento.fechaInicio)}</td>  


                    <td>
                        <button class="btn btnAzul btn-dark" onclick="abrirModalEditar(${mantenimiento.idCursoDispobible})">Editar</button>
                        <button class="btn btnRojo btn-dark" onclick="EliminarMantenimiento(${mantenimiento.idCursoDispobible})">Eliminar</button>
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
                    <td>${mantenimiento.idCursoDispobible}</td>  
                    <td>${mantenimiento.nombreCurso}</td>  
                    <td>${mantenimiento.DescripcionRequisito}</td>  
                    <td>${formatearFecha(mantenimiento.fechaInicio)}</td>  
                    <td>
                        <button class="btn btnRojo btn-dark" onclick="EliminarMantenimiento(${mantenimiento.idCursoDispobible})">Reactivar Curso Disponible</button>
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
    if (!data.idCurso || !data.fechaInicio ) {
        AWarning("Todos los campos obligatorios");
        return;
    }
    if (data.idCurso == data.requisito ) {
        AWarning("El Requisito y el Curso no pueden ser iguales");
        return;
    }
    $('#modalMantenimiento').modal('hide');
    // Realizar la solicitud fetch para crear el mantenimiento
    fetch(cursosDisponiblesPath, {
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
    data.idCursoDispobible = id

    $('#modalMantenimiento').modal('hide');
    // Realizar la solicitud fetch para crear el mantenimiento
    fetch(cursosDisponiblesPath, {
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
    if (!data.idCurso || !data.fechaInicio ) {
        AWarning("Todos los campos obligatorios");
        return;
    }
    if (data.idCurso == data.requisito ) {
        AWarning("El Requisito y el Curso no pueden ser iguales");
        return;
    }
    $('#modalMantenimiento').modal('hide');
    // Realizar la solicitud fetch para crear el mantenimiento
    fetch(cursosDisponiblesPath, {
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
function LlenarSelectCursos(cursoSeleccionado = null, requisitoSeleccionado = null) {
    // Limpiar el select

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
    if(requisitoSeleccionado){
        LlenarSelectRequisitos(requisitoSeleccionado)
    }else{
        LlenarSelectRequisitos()
    }

}

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


// Función para llenar el select de REQUISITOS
function LlenarSelectRequisitos(requisitoSeleccionado = null) {
    const selectElement = document.querySelector('select[name="requisito"]');
    selectElement.innerHTML = '';

    // Añadir opción por defecto: "Sin Requisito" (valor 0)
    const opcionSinRequisito = document.createElement('option');
    opcionSinRequisito.value = 0;
    opcionSinRequisito.text = 'Sin Requisito';
    selectElement.appendChild(opcionSinRequisito);

        // Llenar el select con los niveles
        ObtenerNiveles().then(niveles => {
            niveles.forEach(nivel => {
                const option = document.createElement('option');
                option.value = nivel.idNivel;
                option.text = nivel.nombreNivel;
    
                // Si estamos actualizando, marcar el nivel seleccionado
                if (requisitoSeleccionado && requisitoSeleccionado === nivel.idNivel) {
                    option.selected = true;
                }
    
                selectElement.appendChild(option);
            });
        });
   /* // Llenar el select con los cursos (usamos la misma lista de la otra función)
    ObtenerCursos().then(Cursos => {
        Cursos.forEach(curso => {
            const option = document.createElement('option');
            option.value = curso.idCurso;
            option.text = curso.nombreCurso;

            // Si estamos actualizando, marcar el requisito seleccionado
            if (requisitoSeleccionado && requisitoSeleccionado === curso.idCurso) {
                option.selected = true;
            }

            selectElement.appendChild(option);
        });
    });*/
}



function abrirModalInsertar() {
    // Abrir el modal
    $('#modalMantenimiento').modal('show');

    // Llenar el select de cursos sin seleccionar ninguno
    LlenarSelectCursos();


    // Cambiar el botón de guardar para creación
    document.getElementById('btnGuardar').onclick = function () {
        CrearMantenimiento();
    };
    document.getElementById('tituloModal').innerText = 'Agregar Horario';
}

function abrirModalEditar(id) {
    // Encontrar el mantenimiento por su ID
    const mantenimiento = datosMantenimiento.find(item => item.idCursoDispobible == id);
    if (mantenimiento) {
        document.querySelector('input[name="idCursoDispobible"]').value = mantenimiento.idCursoDispobible;
        document.querySelector('input[name="fechaInicio"]').value = formatearFecha2(mantenimiento.fechaInicio);

        // Llenar el select de cursos y seleccionar el correspondiente
        LlenarSelectCursos( mantenimiento.idCurso, mantenimiento.requisito);
        
        $('#modalMantenimiento').modal('show');

        // Cambiar el botón de guardar para actualización
        document.getElementById('btnGuardar').onclick = function () {
            ActualizarMantenimiento();
        };
        document.getElementById('tituloModal').innerText = 'Actualizar Horario';
    }
}
