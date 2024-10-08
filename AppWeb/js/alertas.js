
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


function CalendarioPreV(titulo, contenido, eventoId) {
    Swal.fire({
        icon: '',
        title: titulo,
        html: `${contenido } <br /><br /><a href="/Alumnos/ApartadoTarea?tarea=${eventoId}" class="btn btn-primary">Ir al enlace</a>`,
            showConfirmButton: false,
            showCancelButton: false
        
    });
}


function generarAlerta(datos){
    if (datos.code == 1) {
        ASucces(datos.message)
    }
    else if (datos.code == -1) {
        AWarning(datos.message)
    }
    else  {
        AError(datos.message)
    }

}



  
function mostrarModalReautenticacion() {
    const modal = document.getElementById('modalReautenticacion');
    if (modal) {
        modal.style.display = 'flex'; // Mostrar el modal centrado
    }
}


function ocultarModalReautenticacion() {
    const modal = document.getElementById('modalReautenticacion');
    if (modal) {
        modal.style.display = 'none'; // Ocultar el modal
    }
}


// Función para reautenticar al usuario
function reautenticar() {
    const Correo = document.getElementById('CorreoReauth').value;
    const Contrasenia = document.getElementById('ContraseniaReauth').value;

    if (!Correo) {
        document.getElementById('CorreoMsgReauth').style.display = 'block';
        return;
    } else {
        document.getElementById('CorreoMsgReauth').style.display = 'none';
    }
    
    if (!Contrasenia) {
        document.getElementById('ContraseniaMsgReauth').style.display = 'block';
        return;
    } else {
        document.getElementById('ContraseniaMsgReauth').style.display = 'none';
    }
    const loginPath = urlConsulta + '/login'
    fetch(loginPath, {
        method: 'POST',
        body: JSON.stringify({ correo: Correo, contrasenia: Contrasenia }),
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
        if (datos && datos.token) {
            // Guardar el token y otros datos en sessionStorage
            sessionStorage.setItem('token', datos.token);
            ocultarModalReautenticacion(); // Ocultar modal tras éxito
        } else {
            document.getElementById('IncorrectReauth').style.display = 'block';
        }
    })
    .catch(function (error) {
        console.error('Error en la reautenticación:', error);
    });
}

