const path = 'http://localhost:3000/'

document.addEventListener('DOMContentLoaded', function () {
    let nombreUsuario = sessionStorage.getItem('nombre');

    fetch('/componentes/nav.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('nav-content').innerHTML = data;
        if (nombreUsuario) {
            const dropdowns = document.querySelectorAll('.nav-item.dropdown');

            dropdowns.forEach(dropdown => {
                // Abrir el dropdown al pasar el mouse
                dropdown.addEventListener('mouseenter', function() {
                    const menu = this.querySelector('.dropdown-menu');
                    menu.classList.add('show');
                });
        
                // Cerrar el dropdown al salir el mouse
                dropdown.addEventListener('mouseleave', function() {
                    const menu = this.querySelector('.dropdown-menu');
                    menu.classList.remove('show');
                });
            });
        
            // Cerrar todos los dropdowns al hacer clic en cualquier parte del documento
            document.addEventListener('click', function(e) {
                if (!e.target.closest('.nav-item.dropdown')) {
                    dropdowns.forEach(d => d.querySelector('.dropdown-menu').classList.remove('show'));
                }
            });
            cargarInicio();
        } else {
            window.location.href = '/index.html';
        }
    
    })
    .catch(error => console.error('Error al cargar el header:', error));
   
});


function logout() {
    // Eliminar todas las variables de sessionStorage
    sessionStorage.clear();
    // Redirigir al usuario a la página de login
    window.location.href = '/index.html';
}

function compararPWD() {
    const Incorrect = document.getElementById('Incorrect')
    const contraseniaActual = document.getElementById('contraseniaActual').value
    const nuevaContrasenia = document.getElementById('nuevaContrasenia').value
    const confirmarContrasenia = document.getElementById('confirmarContrasenia').value
    if (!contraseniaActual || !confirmarContrasenia || !nuevaContrasenia) {
        Incorrect.style.display = 'block'
        Incorrect.innerHTML = 'Debe completar todos los campos'
        return
    }
    if (nuevaContrasenia === confirmarContrasenia) {
        cambiarContrasenia(nuevaContrasenia, contraseniaActual)
    }
    else {

        Incorrect.style.display = 'block'
        Incorrect.innerHTML = 'Las contrase;as no conciden'
        return
    }
}

function cambiarContrasenia(nuevaContrasenia, contraseniaActual) {
    const cui = sessionStorage.getItem('cui')
    const token = sessionStorage.getItem('token')
    fetch('http://localhost:3000/login', {
        method: 'PUT',
        body: JSON.stringify({
            cui: cui,
            contraseniaActual: contraseniaActual,
            nuevaContrasenia: nuevaContrasenia,
            tkn: token
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

                generarAlerta(datos)

        })

}

// Función para formatear la fecha
function formatearFecha(fechaISO) {
    const fecha = new Date(fechaISO);
    const dia = fecha.getUTCDate().toString().padStart(2, '0');
    const mes = (fecha.getUTCMonth() + 1).toString().padStart(2, '0');
    const anio = fecha.getUTCFullYear();
    return `${dia}/${mes}/${anio}`;
}

function formatearFecha2(fecha) {
    // Si `fecha` es un objeto Date, se formatea directamente.
    if (typeof fecha === 'string' || fecha instanceof Date) {
        const fechaObj = new Date(fecha); // Asegúrate de que es un objeto Date
        const year = fechaObj.getFullYear();
        const month = String(fechaObj.getMonth() + 1).padStart(2, '0'); // Mes empieza en 0
        const day = String(fechaObj.getDate()+1).padStart(2, '0');
        
        // Retornar en el formato que los campos de tipo date requieren: YYYY-MM-DD
        return `${year}-${month}-${day}`;
    }
    return ''; // Si no es una fecha válida, retornar un string vacío
}
