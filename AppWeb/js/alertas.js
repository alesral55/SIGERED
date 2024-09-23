
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

// Cuando el token expira, mostrar el modal de reautenticación
function mostrarModalReautenticacion() {
    const loader = document.getElementById('loader');
   loader.style.display = 'flex'; 

  }
  

  
function reautenticar() {
    // Selecciona el elemento del loader
    const Correo = document.getElementById('CorreoReauth').value;
    const Contrasenia = document.getElementById('ContraseniaReauth').value;

    if (!Correo) {
        document.getElementById('CorreoMsgReauth').style.display = 'block';
        return;
    }
    if (!Contrasenia) {
        document.getElementById('ContraseniaMsgReauth').style.display = 'block';
        return;
    }


const loginPath = urlConsulta+'/login';

     fetch(loginPath, {

        method: 'POST',
        body: JSON.stringify({
            correo: Correo,
            contrasenia: Contrasenia
        }),
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
            console.log(datos);
            if (datos.nombre) {
                // Guardar datos en sessionStorage
                sessionStorage.setItem('nombre', datos.nombre);
                sessionStorage.setItem('idRol', datos.idRol);
                sessionStorage.setItem('accesos', datos.accesos);
                sessionStorage.setItem('cui', datos.cui);
                sessionStorage.setItem('requiereCambio', datos.requiereCambio);
                sessionStorage.setItem('token', datos.token);
                const loader = document.getElementById('loader');
                loader.style.display = 'none'; 
         }
            else {
                document.getElementById('CorreoMsgReauth').style.display = 'none';
                document.getElementById('ContraseniaMsgReauth').style.display = 'none';
                document.getElementById('IncorrectReauth').style.display = 'block';
            }

        })
        .catch(function (error) {
            console.error('Error:', error);
        })


}

