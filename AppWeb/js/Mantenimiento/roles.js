// Variable global para almacenar los datos obtenidos

let datosRoles = [];
obtenerRoles()
// Función para obtener todas las personas
function obtenerRoles() {

    fetch(rolesPath)
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
                generarTabla(datos.data)
            }
            else { return }

        });
}



// Función para generar la tabla
function generarTabla(roles) {
    //console.log(roles);
    const tabla = document.getElementById('tablaPersonas');
    tabla.innerHTML = '';

    roles.forEach((rol) => {
        const fila = document.createElement('tr');

        fila.innerHTML = `
            <td>${rol.idRol}</td>  
            <td>${rol.descripcionDeRol}</td>
            <td>${rol.accesos}</td>
            <td>
                <button class="btn btnAzul btn-dark btn-sm" onclick="actualizarRol('${rol.idRol}')">Actualizar</button>
                <button class="btn btnRojo btn-dark btn-sm" onclick="eliminarRol('${rol.idRol}')">Eliminar</button>
            </td>
        `;
        tabla.appendChild(fila);
    });
}

///funciones 

function obtenerRoles() {
    fetch(rolesPath)
        .then(function (respuesta) {
            if (respuesta.ok) {
                return respuesta.json();
            }
        })
        .then(function (datos) {
            const data = datos.data
            const tabla = document.getElementById("tablaRoles");
            const tbody = tabla.querySelector("tbody");

            tbody.innerHTML = "";

            data.forEach(function (et) {
                var row = document.createElement("tr");
                row.innerHTML = `
                    <td style="display: none;">${et.accesos}</td>
                    <td>${et.idRol}</td>
                    <td>${et.descripcionDeRol}</td>
                    <td><button class="btn btnBuscar" onclick="CargarAccesos(this)" data-id="1">VER</button>
                    <button class="btn btnEliminar" onclick="EliminarRol(this)" data-id="1">Eliminar</button>
                    </td>

                `;

                tbody.appendChild(row);
            });

            const seleccionarBotones = document.querySelectorAll(".seleccionar-btn");
            seleccionarBotones.forEach(function (boton) {
                boton.addEventListener("click", function () {
                    const idSeleccionado = boton.getAttribute("data-id");
                    marcarCheckboxesDeAccesos(idSeleccionado);
                });
            });
        });
}

obtenerRoles();

function CargarAccesos(btnActualizar) {
    let fila = btnActualizar.closest('tr');
    let accesosColumn = fila.cells[0].innerText;
    let idRol = fila.cells[1].innerText;
    let descripcion = fila.cells[2].innerText;


            if (accesosColumn) {
                const idsAccesos = accesosColumn.split(";").map(id => id.trim());
                const checkboxes = document.querySelectorAll("input[name='accesoCheckbox']");
                checkboxes.forEach(function (checkbox) {
                    checkbox.checked = idsAccesos.includes(checkbox.value);
                });
            }
    document.getElementById("Selccionado").innerHTML = 'Rol Seleccionado: '+descripcion
    document.getElementById("idRolH").value = idRol
    document.getElementById("descripcionDeRol").value = descripcion
}


function obtenerAccesos() {
    fetch("/Mantenimiento/ObtenerAccesos")
        .then(function (respuesta) {
            if (respuesta.ok) {
                return respuesta.json();
            }
        })
        .then(function (data) {

            const tabla = document.getElementById("tablaAccesos");
            const tbody = tabla.querySelector("tbody");

            tbody.innerHTML = "";

            data.forEach(function (et) {
                var row = document.createElement("tr");
                row.innerHTML = `
                     <td> <input class="form-check" type="checkbox" name="accesoCheckbox" value="${et.idAcceso}" /></td>
                    <td>${et.idAcceso}</td>
                    <td>${et.descripcionAcceso}</td>
                `;

                tbody.appendChild(row);
            });
        });
}


obtenerAccesos();

const divElement = document.getElementById('nuevoRol');

// Haz que el div sea visible
function mostrarDiv() {
    if (divElement.style.display === 'block') {
        divElement.style.display = 'none';
    }
    else {
        divElement.style.display = 'block';
    }

}

function InsertarRol() {
    let descripcion = document.getElementById("descripcionI").value

    if (descripcion === '') {
        AWarning('Llene los campos necesarios para crear un rol')
        return

    }

    fetch('/Mantenimiento/InsertarRol?dato='+descripcion)
        .then(function (result) {
            if (result.ok) {
                return result.json();
            }
        })
        .then(function (data) {
            var mensaje = document.getElementById("MensajeMDL");
            var modalContent = $('#successModal .modal-content');
            modalContent.removeClass('bg-success bg-warning bg-danger');
            if (data === 1) {
                $('#successModal .modal-content').addClass('bg-success');
                mensaje.innerHTML = 'Alumno registrado exitosamente.';
                $('#successModalLabel').text('ATENCION!');
            } else if (data === -1) {
                $('#successModal .modal-content').addClass('bg-warning');
                mensaje.innerHTML = 'El alumno ya está registrado.';
                $('#successModalLabel').text('Alerta');
            } else {
                $('#successModal .modal-content').addClass('bg-danger');
                mensaje.innerHTML = 'Error al registrar el alumno.';
                $('#successModalLabel').text('¡ERROR!');

            }
           // $('#successModal').modal('show');
            if (data === 1) {
                ASucces('El Rol se creo Correctamente!!');
            } else if (data === -1) {
                AWarning('No se pudo crear el Rol , intente de nuevo... ')
            } else {
                AError('Ocurrio un error al crear el Rol')
            }
            obtenerRoles()
        });

}




function ActualizarRol() {

    const checkboxes = document.querySelectorAll("input[name='accesoCheckbox']:checked");
    const selectedAccesos = [];

    checkboxes.forEach(function (checkbox) {
        selectedAccesos.push(checkbox.value);
    });

    const selectedAccesosString = selectedAccesos.join(';');
    if (selectedAccesosString == "") { return }
    console.log(selectedAccesosString);

    let idRol=document.getElementById("idRolH").value 
    let descripcionDeRol =document.getElementById("descripcionDeRol").value
    if (descripcionDeRol == "") { return }
    fetch('/Mantenimiento/ActualizarRol', {
        method: 'POST',
        body: JSON.stringify({
            idRol: idRol,
            descripcionDeRol: descripcionDeRol,
            accesos: selectedAccesosString
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
            var mensaje = document.getElementById("MensajeMDL");
            var modalContent = $('#successModal .modal-content');
            modalContent.removeClass('bg-success bg-warning bg-danger');
            if (data === 1) {
                $('#successModal .modal-content').addClass('bg-success');
                mensaje.innerHTML = 'Alumno registrado exitosamente.';
                $('#successModalLabel').text('ATENCION!');
            } else if (data === -1) {
                $('#successModal .modal-content').addClass('bg-warning');
                mensaje.innerHTML = 'El alumno ya está registrado.';
                $('#successModalLabel').text('Alerta');
            } else {
                $('#successModal .modal-content').addClass('bg-danger');
                mensaje.innerHTML = 'Error al registrar el alumno.';
                $('#successModalLabel').text('¡ERROR!');

            }
           // $('#successModal').modal('show');
            if (data === 1) {
                ASucces('El Rol se actualizo Correctamente!!');
            } else if (data === -1) {
                AWarning('No se pudo actualizar el Rol, intente de nuevo... ')
            } else {
                AError('Ocurrio un error al actualizar el Rol')
            }
            obtenerRoles()
        });
}

function EliminarRol(btnEliminar) {
    var fila = btnEliminar.closest('tr');
    var idRol = fila.cells[1].innerText;
    fetch('/Mantenimiento/EliminarRol?dato=' + idRol)
        .then(function (result) {
            if (result.ok) {
                return result.json();
            }
        })
        .then(function (data) {
            var mensaje = document.getElementById("MensajeMDL");
            var modalContent = $('#successModal .modal-content');
            modalContent.removeClass('bg-success bg-warning bg-danger');
            if (data === 1) {
                $('#successModal .modal-content').addClass('bg-success');
                mensaje.innerHTML = 'Alumno registrado exitosamente.';
                $('#successModalLabel').text('ATENCION!');
            } else if (data === -1) {
                $('#successModal .modal-content').addClass('bg-warning');
                mensaje.innerHTML = 'El alumno ya está registrado.';
                $('#successModalLabel').text('Alerta');
            } else {
                $('#successModal .modal-content').addClass('bg-danger');
                mensaje.innerHTML = 'Error al registrar el alumno.';
                $('#successModalLabel').text('¡ERROR!');

            }
          //  $('#successModal').modal('show');
            if (data === 1) {
                ASucces('El Rol se elimno Correctamente!!');
            } else if (data === -1) {
                AWarning('No se pudo eliminar el Rol, intente de nuevo... ')
            } else {
                AError('Ocurrio un error al eliminar el Rol')
            }
            obtenerRoles()
        });

}

