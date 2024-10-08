let datosNivel = [];
ObtenerNiveles()
// Función para obtener todas las personas
function ObtenerNiveles() {

    fetch(cicloPath)
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
                datosNivel = datos.data
                generarTabla(datosNivel)
            }
            else { return }

        });
}


// Función para generar la tabla
function generarTabla(ciclos) {
    //console.log(roles);
    const tabla = document.getElementById('tablaCiclos');
    tabla.innerHTML = '';

    ciclos.forEach((ciclo) => {
        const fila = document.createElement('tr');

        fila.innerHTML = `
            <td>${ciclo.idCicloEscolar}</td>  
            <td>${ciclo.descripcion}</td>  
            <td>${formatearFecha(ciclo.fecharInicio)}</td>  
            <td>${formatearFecha(ciclo.fechaFin)}</td>  
            <td>${ciclo.anio}</td>  

        `;
        tabla.appendChild(fila);
    });
}



function CrearCiclo() {
    Swal.fire({
        title: "¿Estás seguro de crear un nuevo ciclo?",
        text: "Esta acción deshabilitará todos los módulos vinculados al ciclo actual.",
        icon: "warning",
        showCancelButton: true,   
        confirmButtonText: "Sí, crear ciclo",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            let form = document.getElementById('formI');
            let formData2 = new FormData(form);
            let data = Object.fromEntries(formData2.entries());
            data.usrCui = sessionStorage.getItem('cui');
            data.tkn =  sessionStorage.getItem('token');
            data.metodo =1;
            // Validación de campos
            if (!data.descripcion || !data.fechaFin || !data.fecharInicio) {
                AWarning("Todos los campos obligatorios");
                return;
            }

            fetch(cicloPath, {

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
                    return;
                }
            })
            .then(function (datos) {
                generarAlerta(datos)
                $('#modalInsertarPersona').modal('hide');
                ObtenerNiveles();
            });


        }
    });
}
