
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
            ObtenerCui()
        });

}
ObtenerRoles()


//funcion para obtener el cui desde el reporte
function ObtenerCui() {
    const CUI = sessionStorage.getItem('cuiBusca')
    if (CUI) {
        obtDocente(CUI)
    }

}

//funcion para obtener el cui desde el formulario
function btnObtenerCui() {
    const CUI = document.getElementById('cuiB').value
    if (CUI) { obtDocente(CUI); }
    else { AWarning('Debe Ingresar el CUI antes de buscar'); }
}
//funcion para obtener los datos del docente
function obtDocente(cui) {
    sessionStorage.removeItem('cuiBusca');

    const data = {
        cui: cui,
        usrCui: sessionStorage.getItem('cui'),
        tkn: sessionStorage.getItem('token'),
        metodo: 2
    };

    fetch(personasPath, {
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
            if (datos.code == -1) {
                AWarning('No se econtro a la persona')
                return
            }
            if (datos.data) {
                const form = document.getElementById('formI');

                for (const key in datos.data) {
                    if (datos.data.hasOwnProperty(key)) {
                        const field = form.querySelector(`[name="${key}"]`);
                        if (field) {
                            if (field.tagName === 'SELECT') {
                                field.value = datos.data[key];
                            }
                            else if (field.type === 'date') {
                                const dateValue = new Date(datos.data[key]);
                                field.value = dateValue.toISOString().split('T')[0];
                            }
                            else {
                                field.value = datos.data[key];
                            }
                        }
                    }
                }
            }

        });

}
//funcion para limpiar el fromulario 
function limpiarFormulario() {
    document.getElementById("formI").reset();
}

//funcion para actualizar los datos del docente
function actualizarDocente() {
    document.getElementsByName("contrasenia").value = document.getElementsByName("cui").value
    const form = document.getElementById('formI');
    const formData2 = new FormData(form);
    const data = Object.fromEntries(formData2.entries());

    if (!data.CUI || !data.primerNombre || !data.primerApellido || !data.fechaDeNacimiento || !data.correo || !data.idRol || !data.codigoPersonal || !data.genero) { AWarning("Debe ingresar los campos obligatorios"); return }

    data.usrCui = sessionStorage.getItem('cui');
    data.tkn = sessionStorage.getItem('token');
    data.metodo = 3;
    //console.log(data);
    fetch(personasPath, {

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

