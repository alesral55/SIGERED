let imgDPI
document.addEventListener('DOMContentLoaded', function () {
    ObtenerCurso();
});


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
            formValido = false;
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
    const validarBtn = document.getElementById('reenviarBtn');
    const inputCodigo = document.getElementById('inputCodigo');
    const IncorrectCodigo = document.getElementById('IncorrectCodigo');
    const correo = document.querySelector('input[name="correo"]').value

    document.getElementById('lblVerificacion').innerText = `Te hemos enviado un codigo a ${correo}, por favor ingresalo:`
    // Mostrar el modal y vaciar el campo del código
    modal.style.display = 'flex';
    inputCodigo.value = ''; // Vaciar el campo cada vez que se abre el modal

    // Manejar el evento de cancelar
    cancelarBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        //  console.log('El proceso ha sido cancelado.');
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
            /*Swal.fire(
                'Success',
                'El codigo se ha validado Correctamente, recuerda que ese codigo te servira para ingresar por primera vez al sistema',
                'success'
            )*/
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
    const loader = document.getElementById('loader');
    loader.style.display = 'flex'; // Muestra el loader
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
        setTimeout(() => {
            loader.style.display = 'none';
        }, 10); // Retraso de 500 ms, ajusta según sea necesario
        if (response.ok) {
            //console.log('Correo enviado correctamente:', result);
            // Aquí mostrarías el modal para ingresar el código

            mostrarModal(result.codigo);
        } else {
            console.error('Error al enviar el correo:', result);
        }
    } catch (error) {
        setTimeout(() => {
            loader.style.display = 'none';
        }, 10); // Retraso de 500 ms, ajusta según sea necesario
        AError('Ocurrio un error en el servidor Reporte este problema a la Academia')
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
            // console.log('grupo etnico');
            const opcionDefault = document.createElement('option');
            opcionDefault.value = '';
            opcionDefault.text = 'Seleccione un Grupo Etnico';
            selectElement.appendChild(opcionDefault);


            datosMantenimiento.forEach(mante => {
                const option = document.createElement('option');
                option.value = mante.idGrupo;
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

function ObtenerCurso() {
    // console.log('obtener cruaso');
    const selectElement = document.getElementById('idCurso')

    // const selectElement = document.querySelector('select[name="idCurso"]');
    // console.log(selectElement);
    const opcionDefault = document.createElement('option');
    const idCurso = sessionStorage.getItem('idCurso');
    opcionDefault.value = idCurso
    opcionDefault.text = sessionStorage.getItem('nombreCurso');
    selectElement.appendChild(opcionDefault);

}

function ObtenerHorario() {
    const idCurso = sessionStorage.getItem('idCurso')
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
                datosMantenimiento = datos.data.filter(dato => dato.estado === 'A' && dato.idCurso == idCurso);
                //console.log(datosMantenimiento);

            }
            const selectElement = document.querySelector('select[name="idHorario"]');
            //console.log('obtener horario');
            // console.log(selectElement);
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
        AWarning('Por favor selecciona un archivo.');
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
        //console.log(result);
        //alert(result.message);
        return result.fileUrl;
    } catch (error) {
        AError('Ocurrio un error en el servidor Reporte este problema a la Academia')
        console.error('Error al enviar el archivo:', error);
        throw error; // Propagar el error para manejarlo en el llamado de la función
    }
}



function agregarDocente(pwd) {
    const loader = document.getElementById('loader');
    loader.style.display = 'flex'; // Muestra el loader
    document.getElementsByName("contrasenia").value = pwd
    let form = document.getElementById('formDatosPersonales');
    let formData2 = new FormData(form);
    let data = Object.fromEntries(formData2.entries());

    const usuarioPath = urlConsulta + '/usuario';
    // Enviar la solicitud fetch
    //console.log(data);
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
            setTimeout(() => {
                loader.style.display = 'none';
            }, 10); // Retraso de 500 ms, ajusta según sea necesario
            if (datos.code == 1) {
                //agregarPago()

                agregarAlumnoYPago()
            }
            else {
                generarAlerta(datos)
            }

        })
}

async function agregarPago() {

    let form = document.getElementById('formPagos');
    let formData2 = new FormData(form);
    let data = Object.fromEntries(formData2.entries());
    const pagoPath = urlConsulta + '/pago'
    const imgTransferencia = await cargarArchivosS3('imgTransferencia');
    if (!imgTransferencia) {
        AWarning('No se pudo cargar la imagen. No se realizará la inserción.');
        return; // Detener la ejecución si la imagen no se cargó
    }
    const result = imgTransferencia
    data.imgTransferencia = result

    //console.log(data);

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


async function agregarAlumnoYPago() {
    const loader = document.getElementById('loader');
    loader.style.display = 'flex'; // Muestra el loader
    // Obtener el formulario de datos personales
    let formAlumnos = document.getElementById('formAlumnos');
    let formDataAlumno = new FormData(formAlumnos);
    let dataAlumno = Object.fromEntries(formDataAlumno.entries());

    // Obtener el formulario de pagos
    let formPagos = document.getElementById('formPagos');
    let formDataPago = new FormData(formPagos);
    let dataPago = Object.fromEntries(formDataPago.entries());

    // Cargar la imagen de transferencia a S3
    const imgTransferencia = await cargarArchivosS3('imgTransferencia');
    if (!imgTransferencia) {
        setTimeout(() => {
            loader.style.display = 'none';
        }, 10); // Retraso de 500 ms, ajusta según sea necesario
        AWarning('No se pudo cargar la imagen. No se realizará la inserción.');
        return;
    }

    // Agregar imagen de transferencia al pago
    dataPago.imgTransferencia = imgTransferencia;

    const imgDPI = await cargarArchivosS3('imgDPI');
    if (!imgDPI) {
        setTimeout(() => {
            loader.style.display = 'none';
        }, 10); // Retraso de 500 ms, ajusta según sea necesario
        AWarning('No se pudo cargar la imagen. No se realizará la inserción.');
        return;
    }

    // Agregar imagen de transferencia al pago
    dataAlumno.imgDPI = imgDPI;
    dataAlumno.cui = document.querySelector('input[name="cui"]').value
    // Combinar los datos de alumno y pago en un solo objeto
    const combinedData = {
        alumno: dataAlumno,
        pago: dataPago
    };

    // Revisar los datos combinados antes de enviar
    // console.log('combino la data');
    // console.log(combinedData);

    // URL para el endpoint que maneja la inserción de alumno y pago
    const alumnoPagoPath = urlConsulta + '/alumnoYPago';

    // Enviar los datos combinados usando fetch
    fetch(alumnoPagoPath, {
        method: 'POST',
        body: JSON.stringify(combinedData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(function (respuesta) {
            if (respuesta.ok) {
                return respuesta.json();
            } else {
                throw new Error('Error en la solicitud.');
            }
        })
        .then(function (datos) {
            setTimeout(() => {
                loader.style.display = 'none';
            }, 10); // Retraso de 500 ms, ajusta según sea necesario
            generarAlerta(datos); // Mostrar la alerta con los datos recibidos
        })
        .catch(function (error) {
            setTimeout(() => {
                loader.style.display = 'none';
            }, 10); // Retraso de 500 ms, ajusta según sea necesario
            console.error('Error al procesar la solicitud:', error);
            AWarning('Hubo un error al registrar el alumno y el pago.');
        });
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

