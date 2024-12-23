 function agregarDocente() {
    document.getElementsByName("contrasenia").value = document.getElementsByName("cui").value
    let form = document.getElementById('formI');
    let formData2 = new FormData(form);
    let data = Object.fromEntries(formData2.entries());

    if(!data.cui||!data.primerNombre||!data.fechaDeNacimiento||!data.correo||!data.idRol||!data.codigoPersonal||!data.genero){AWarning("Debe ingresar los campos obligatorios");return}

    // Agregar los campos adicionales (usrCui y tkn)
    data.usrCui = sessionStorage.getItem('cui');
    data.tkn =  sessionStorage.getItem('token');
    //console.log(data);


    const usuarioPath = urlConsulta+'/usuario';
    // Enviar la solicitud fetch
    fetch(usuarioPath, {

        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
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
        generarAlerta(datos)
    })
}


function limpiarFormulario() {
    document.getElementById("formI").reset();
}

function ObtenerRoles() {
    let datosMantenimiento
    fetch(rolesPath)
        .then(function (respuesta) {
            if (respuesta.ok) {
                return respuesta.json();

            }

        })
        .then(function (datos) {
            //console.log(datos);
            if (datos) {
                //console.log(datos);
                datosMantenimiento = datos.data
                //console.log(datosMantenimiento);

            }
            const selectElement = document.querySelector('select[name="idRol"]');

            const opcionDefault = document.createElement('option');
            opcionDefault.value = '';
            opcionDefault.text = 'Seleccione el Rol';
            selectElement.appendChild(opcionDefault);


            datosMantenimiento.forEach(mante => {
                const option = document.createElement('option');
                option.value = mante.idRol;
                option.text = mante.descripcionDeRol;


                selectElement.appendChild(option);
            });

        });

}
ObtenerRoles()