
// Deshabilitar clic derecho
 document.addEventListener('contextmenu', function(e) {
     e.preventDefault();
 }, false);
 
 // Intento de bloquear la consola
 (function() {
     var _z = console;
     Object.defineProperty(window, "console", {
         get: function() {
             return _z;
         },
         set: function(val) {
             _z = val;
         }
     });
 })();

    if (sessionStorage.getItem("cui")!=null) {
        window.location.href = "/SIGERED.html";
    }


function Login() {
    // Selecciona el elemento del loader
    const loader = document.getElementById('loader');
    loader.style.display = 'flex'; // Muestra el loader
    const Correo = document.getElementById('Correo').value;
    const Contrasenia = document.getElementById('Contrasenia').value;
    document.getElementById('CorreoMsg').style.display = 'none';
    document.getElementById('ContraseniaMsg').style.display = 'none';

    if (Correo === '') {
        document.getElementById('CorreoMsg').style.display = 'block';
                    // Oculta el loader después de un retraso
                    setTimeout(() => {
                        loader.style.display = 'none';
                    }, 500); // Retraso de 500 ms, ajusta según sea necesario
        return;
    }
    if (Contrasenia === '') {
        document.getElementById('ContraseniaMsg').style.display = 'block';
                    // Oculta el loader después de un retraso
                    setTimeout(() => {
                        loader.style.display = 'none';
                    }, 500); // Retraso de 500 ms, ajusta según sea necesario
        return;
    }

    // Encriptar la contraseña antes de enviarla
    const encryptedPassword = CryptoJS.AES.encrypt(Contrasenia, 'AELMVCPIWTPCP').toString();
    //alert(encryptedPassword);
        //const urlConsulta = 'https://7q854bslmd.execute-api.us-east-2.amazonaws.com/prod'
        //const urlConsulta = 'http://localhost:3000'
        const urlConsulta = 'https://7q854bslmd.execute-api.us-east-2.amazonaws.com/prod'

const loginPath = urlConsulta+'/login';

   //fetch('http://localhost:3000/login', {
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

                // Verifica si los datos se han guardado correctamente
                //console.log("Datos de sesión guardados:", sessionStorage.getItem('token'));
                // Redireccionar al usuario a la página de inicio
                window.location.href = '/SIGERED.html'; // Redirigir al usuario
            }
            else {
                document.getElementById('CorreoMsg').style.display = 'none';
                document.getElementById('ContraseniaMsg').style.display = 'none';
                document.getElementById('Incorrect').style.display = 'block';
            }

        })
        .catch(function (error) {
            console.error('Error:', error);
        })
        .finally(() => {
            // Oculta el loader después de un retraso
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500); // Retraso de 500 ms, ajusta según sea necesario
        });

}

