let imgDPI

async function VALIDAR() {
    // Obtener los tres formularios
    const form1 = document.getElementById('formDatosPersonales');
    const form2 = document.getElementById('formAlumnos');
    const form3 = document.getElementById('formPagos');

    // Variable para rastrear si todos los formularios son válidos
    let formValido = true;

    // Validar cada formulario falta el dorm3 
    [form1, form2, form3].forEach(function (formulario) {
        if (!formulario.checkValidity()) {
            formValido = true;
            formulario.classList.add('was-validated');
        } else {
            formulario.classList.add('was-validated');
        }
    });


    if (formValido) {
        // Aquí puedes ejecutar tu lógica si todos los formularios son correctos
        // Por ejemplo, enviar los datos o realizar otra acción:
        //enviarDatos();
        // agregarDocente()
        //imgTransferencia = await cargarArchivosS3('imgTransferencia');
        //imgDPI = await cargarArchivosS3('imgDPI');
        enviarCorreo()
        //agregarPago()
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Atencion!!!',
            text: "Por favor, completa todos los campos requeridos en cada formulario.",
        });

    }
};

function enviarDatos() {
    // Lógica para enviar o procesar los datos de los tres formularios
    Swal.fire({
        icon: 'Succes',
        title: 'Succes',
        text: "Todos los datos son correctos",
    });
}



function FormularioCompleto() {
    document.getElementById("formAlumnos").style.display = "block";
    document.getElementById("formPagos").style.display = "block";
    document.getElementById("btnFormularioCompleto").style.display = "none";
    document.getElementById("btnInscribirse").style.display = "block";
    document.getElementById("btnSeccion1").style.display = "none";
    document.getElementById("btnSeccion2").style.display = "none";

}

function Seccion1() {
    document.getElementById("formDatosPersonales").style.display = "block";
    document.getElementById("formAlumnos").style.display = "none";
    document.getElementById("formPagos").style.display = "none";
    document.getElementById("btnFormularioCompleto").style.display = "none";
    document.getElementById("btnInscribirse").style.display = "none";
    document.getElementById("btnSeccion1").style.display = "none";
    document.getElementById("btnSeccion2").style.display = "none";

}


function Seccion2() {
    document.getElementById("formDatosPersonales").style.display = "none";
    document.getElementById("formAlumnos").style.display = "block";
    document.getElementById("formPagos").style.display = "none";
    document.getElementById("btnFormularioCompleto").style.display = "none";
    document.getElementById("btnInscribirse").style.display = "none";
    document.getElementById("btnSeccion1").style.display = "none";
    document.getElementById("btnSeccion2").style.display = "none";

}

function Seccion3() {
    document.getElementById("formDatosPersonales").style.display = "none";
    document.getElementById("formAlumnos").style.display = "none";
    document.getElementById("formPagos").style.display = "block";
    document.getElementById("btnFormularioCompleto").style.display = "none";
    document.getElementById("btnInscribirse").style.display = "none";
    document.getElementById("btnSeccion1").style.display = "none";
    document.getElementById("btnSeccion2").style.display = "none";

}

function mostrarModal(codigoEsperado) {
    const modal = document.getElementById('modalCodigo');
    const cancelarBtn = document.getElementById('cancelarBtn');
    const validarBtn = document.getElementById('reenviarBtn'); // Lo usamos para validar ahora
    const inputCodigo = document.getElementById('inputCodigo');
    const IncorrectCodigo = document.getElementById('IncorrectCodigo');

    // Mostrar el modal y vaciar el campo del código
    modal.style.display = 'flex';
    inputCodigo.value = ''; // Vaciar el campo cada vez que se abre el modal

    // Manejar el evento de cancelar
    cancelarBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        console.log('El proceso ha sido cancelado.');
    });

    // Manejar el evento de validar código
    validarBtn.addEventListener('click', () => {
        // Validar el código ingresado
        if (inputCodigo.value.trim() === '') {
            Swal.fire({
                icon: 'warning',
                title: 'Atencion!!!',
                text: "Debes ingresar tu codigo de verificacion para continuar",
            });
        } else if (inputCodigo.value === codigoEsperado) {
            Swal.fire(
                'Success',
                'El codigo se ha validado Correctamente, recuerda que ese codigo te servira para ingresar por primera vez al sistema',
                'success'
            )
            modal.style.display = 'none';
            agregarDocente(codigoEsperado)
            // Continúa el proceso después de la verificación
        } else {
            IncorrectCodigo.style.display = 'block';
        }
    });

    // Limpiar mensajes de error mientras el usuario escribe
    inputCodigo.addEventListener('input', () => {
        // Limpiar el mensaje de error si se empieza a escribir
        IncorrectCodigo.style.display = 'none';
    });
}



//metodo para enviar el corrego electronico y generar el codigo de verificacion
async function enviarCorreo() {
    const url = 'https://17hqvm0qu1.execute-api.us-east-2.amazonaws.com/Prod/'; // Reemplaza con la URL de tu Lambda
    const correo = document.querySelector('input[name="correo"]').value
    const primerNombre = document.querySelector('input[name="primerNombre"]').value
    const apellido = document.querySelector('input[name="primerApellido"]').value
    const nombre = primerNombre + " " + apellido
    const data = {
        correo: correo,
        nombre: nombre
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

        if (response.ok) {
            console.log('Correo enviado correctamente:', result);
            // Aquí mostrarías el modal para ingresar el código
            mostrarModal(result.codigo);
        } else {
            console.error('Error al enviar el correo:', result);
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
}


/////////////////Funciones para llenar con comoboxes


//const urlConsulta = 'https://7q854bslmd.execute-api.us-east-2.amazonaws.com/prod'
const urlConsulta = 'http://localhost:3000'
function ObtenerPagos() {
    const tpSisPago = urlConsulta + '/tpSisPago'
    let datosMantenimiento
    fetch(tpSisPago)
        .then(function (respuesta) {
            if (respuesta.ok) {
                return respuesta.json();

            }

        })
        .then(function (datos) {
            //console.log(datos);
            if (datos) {
                //console.log(datos);
                datosMantenimiento = datos.data.filter(dato => dato.estado === 'A');
                //console.log(datosMantenimiento);

            }
            const selectElement = document.querySelector('select[name="idSistemaPago"]');

            const opcionDefault = document.createElement('option');
            opcionDefault.value = '';
            opcionDefault.text = 'Seleccione un Tipo de Pago';
            selectElement.appendChild(opcionDefault);


            datosMantenimiento.forEach(mante => {
                const option = document.createElement('option');
                option.value = mante.idSistemaPago;
                option.text = mante.nombre;


                selectElement.appendChild(option);
            });

        });

}

ObtenerPagos()

function ObtenerGrupoEtnico() {
    const grupoEtnicoPath = urlConsulta + '/gpEtnico'
    let datosMantenimiento
    fetch(grupoEtnicoPath)
        .then(function (respuesta) {
            if (respuesta.ok) {
                return respuesta.json();

            }

        })
        .then(function (datos) {
            //console.log(datos);
            if (datos) {
                //console.log(datos);
                datosMantenimiento = datos.data.filter(dato => dato.estado === 'A');
                //console.log(datosMantenimiento);

            }
            const selectElement = document.querySelector('select[name="idGrupoEtnico"]');

            const opcionDefault = document.createElement('option');
            opcionDefault.value = '';
            opcionDefault.text = 'Seleccione un Grupo Etnico';
            selectElement.appendChild(opcionDefault);


            datosMantenimiento.forEach(mante => {
                const option = document.createElement('option');
                option.value = mante.idGrupoEtnico;
                option.text = mante.nombreGrupo;


                selectElement.appendChild(option);
            });

        });

}

ObtenerGrupoEtnico()

function ObtenerTpDocumento() {
    const tpDocPath = urlConsulta + '/tpDoc'
    let datosMantenimiento
    fetch(tpDocPath)
        .then(function (respuesta) {
            if (respuesta.ok) {
                return respuesta.json();

            }

        })
        .then(function (datos) {
            //console.log(datos);
            if (datos) {
                //console.log(datos);
                datosMantenimiento = datos.data.filter(dato => dato.estado === 'A');
                //console.log(datosMantenimiento);

            }
            const selectElement = document.querySelector('select[name="idTipoDoc"]');

            const opcionDefault = document.createElement('option');
            opcionDefault.value = '';
            opcionDefault.text = 'Seleccione el Tipo de Documento';
            selectElement.appendChild(opcionDefault);


            datosMantenimiento.forEach(mante => {
                const option = document.createElement('option');
                option.value = mante.idTipoDoc;
                option.text = mante.nombre;


                selectElement.appendChild(option);
            });

        });

}

ObtenerTpDocumento()


function ObtenerTpDiscapacidad() {
    const discapacidadPath = urlConsulta + '/discapacidad'
    let datosMantenimiento
    fetch(discapacidadPath)
        .then(function (respuesta) {
            if (respuesta.ok) {
                return respuesta.json();

            }

        })
        .then(function (datos) {
            //console.log(datos);
            if (datos) {
                //console.log(datos);
                datosMantenimiento = datos.data.filter(dato => dato.estado === 'A');
                //console.log(datosMantenimiento);

            }
            const selectElement = document.querySelector('select[name="idDiscapacidad"]');

            const opcionDefault = document.createElement('option');
            opcionDefault.value = '';
            opcionDefault.text = 'Seleccione el Tipo de Discapacidad';
            selectElement.appendChild(opcionDefault);


            datosMantenimiento.forEach(mante => {
                const option = document.createElement('option');
                option.value = mante.idDiscapacidad;
                option.text = mante.nombre;


                selectElement.appendChild(option);
            });

        });

}

ObtenerTpDiscapacidad()

function ObtenerHorario() {
    const horariosPath = urlConsulta + '/horarios'
    let datosMantenimiento
    fetch(horariosPath)
        .then(function (respuesta) {
            if (respuesta.ok) {
                return respuesta.json();

            }

        })
        .then(function (datos) {
            //console.log(datos);
            if (datos) {
                //console.log(datos);
                datosMantenimiento = datos.data.filter(dato => dato.estado === 'A' && dato.idCurso == 5);
                console.log(datosMantenimiento);

            }
            const selectElement = document.querySelector('select[name="idHorario"]');

            const opcionDefault = document.createElement('option');
            opcionDefault.value = '';
            opcionDefault.text = 'Seleccione el Horario';
            selectElement.appendChild(opcionDefault);


            datosMantenimiento.forEach(mante => {
                const option = document.createElement('option');
                option.value = mante.idHorario;
                option.text = mante.horario;


                selectElement.appendChild(option);
            });

        });

}

ObtenerHorario()

///////Metodo para cargar documentos
const urlPath = 'https://06d1nesw30.execute-api.us-east-2.amazonaws.com/prueba/Archivos'




async function cargarArchivosS3(campo) {
    const fileInput = document.querySelector(`input[name=${campo}]`);
    const file = fileInput.files[0];

    if (!file) {
        alert('Por favor selecciona un archivo.');
        return;
    }

    // Usar una promesa para manejar la lectura del archivo
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
        console.log(result);
        alert(result.message);
        return result.fileUrl;
    } catch (error) {
        console.error('Error al enviar el archivo:', error);
        throw error; // Propagar el error para manejarlo en el llamado de la función
    }
}



function agregarDocente(pwd) {
    document.getElementsByName("contrasenia").value = pwd
    let form = document.getElementById('formDatosPersonales');
    let formData2 = new FormData(form);
    let data = Object.fromEntries(formData2.entries());

    const usuarioPath = urlConsulta + '/usuario';
    // Enviar la solicitud fetch
    console.log(data);
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
        })
        .then(function (datos) {
            if(datos.code ==1){
                agregarPago()
            }
            else{
                generarAlerta(datos)
            }

        })
}

async function agregarPago() {

    let form = document.getElementById('formPagos');
    let formData2 = new FormData(form);
    let data = Object.fromEntries(formData2.entries());
    const pagoPath = urlConsulta+ '/pago'
    const imgTransferencia = await cargarArchivosS3('imgTransferencia');
    const result =  imgTransferencia
    data.imgTransferencia = result
   
    console.log(data);

    fetch(pagoPath, {

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
        })
        .then(function (datos) {
            generarAlerta(datos)
        })
}



function limpiarFormulario() {
    document.getElementById("formI").reset();
}

function generarAlerta(datos) {
    if (datos.code == 1) {
        ASucces(datos.message)
    }
    else if (datos.code == -1) {
        AWarning(datos.message)
    }
    else {
        AError(datos.message)
    }

}

function ASucces(mensaje) {
    Swal.fire(
        'Success',
        mensaje,
        'success'
    )
}

function AError(mensaje) {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: mensaje,
    });
}

function AWarning(mensaje) {
    Swal.fire({
        icon: 'warning',
        title: 'Atencion!!!',
        text: mensaje,
    });
}

