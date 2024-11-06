async function ObtenerAsignacion() {

    const data = {
        estado: '',
        idRol: 0,
        usrCui: sessionStorage.getItem('cui'),
        tkn: sessionStorage.getItem('token'),
        metodo: 5
    };


    return fetch(asignacionDocentes, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(function (respuesta) {
            if (respuesta.ok) {
                return respuesta.json();
            } else if (respuesta.status === 401) {
                mostrarModalReautenticacion();
                return;
            }
        })
        .then(function (datos) {
            if (datos) {
                docentesCargados = datos.data.filter(docente => docente.estado == 'A');
                return docentesCargados;
            } else {
                return [];
            }
        });
}





generarTarjetasCursos()

async function generarTarjetasCursos() {
    const container = document.getElementById('course-container');
    container.innerHTML = ''; // Limpiar el contenedor
    const cursos = await ObtenerAsignacion()
    console.log(cursos);
    cursos.forEach(curso => {
        const card = document.createElement('div');
        card.className = 'col-md-4 mb-4';

        card.innerHTML = `
                <div class="team-member shadow-sm h-100">
                    <h2>${curso.nombreCurso}</h2>
                    <div class="team-info text-center">
                        <p><strong>Horario:</strong> ${curso.horario}</p>
                        <p><strong>Sección:</strong> ${curso.descripcion}</p>
                        <p class="badge-custom">${curso.estado}</p>
                    </div>
                </div>
            `;

        container.appendChild(card);
    });
}


