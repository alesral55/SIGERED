// Variable global para almacenar los datos obtenidos

let datosPersonas = [];
obtenerPersonas()
// Función para obtener todas las personas
function obtenerPersonas(page = 1, pageSize = 10) {
    const data = {
        estado: '',
        idRol: 0,
        usrCui: sessionStorage.getItem('cui'),
        tkn: sessionStorage.getItem('token'),
        metodo: 1
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
            //console.log(datos);
            if (datosPersonas) {
                datosPersonas = datos.data;
                aplicarFiltrosYMostrar(page, pageSize);
            }
            else { return }

        });
}

// Función para aplicar los filtros y mostrar la tabla
function aplicarFiltrosYMostrar(page = 1, pageSize = 10) {
    const filtroCUI = document.getElementById('filtroCUI').value.trim().toLowerCase();
    const filtroInteligente = document.getElementById('filtroInteligente').value.trim().toLowerCase();
    const filtroEstado = document.getElementById('filtroEstado').value.trim().toLowerCase();

    // Filtrar los datos
    let personasFiltradas = datosPersonas.filter(persona => {
        const cumpleCUI = filtroCUI ? persona.CUI.toLowerCase().includes(filtroCUI) : true;
        const cumpleEstado = filtroEstado ? persona.estado.toLowerCase() == filtroEstado : true;
        const cumpleInteligente = filtroInteligente ? (
            persona.Nombres.toLowerCase().includes(filtroInteligente) ||
            persona.Apellidos.toLowerCase().includes(filtroInteligente) ||
            persona.correo.toLowerCase().includes(filtroInteligente) ||
            persona.telefono.toLowerCase().includes(filtroInteligente) ||
            formatearFecha(persona.fechaDeNacimiento).includes(filtroInteligente) // También buscar por fecha
        ) : true;

        return cumpleCUI && cumpleEstado && cumpleInteligente;
    });

    // Determinar la paginación
    const totalItems = personasFiltradas.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const personasPaginadas = personasFiltradas.slice(startIndex, endIndex);

    generarTabla(personasPaginadas);

    generarPaginacion(totalPages, page);
}

// Función para generar la tabla
function generarTabla(personas) {
    const tabla = document.getElementById('tablaPersonas');
    tabla.innerHTML = '';

    personas.forEach((persona) => {
        const fila = document.createElement('tr');

        fila.innerHTML = `
            <td>${persona.CUI}</td>
            <td>${persona.Nombres}</td>
            <td>${persona.Apellidos}</td>
            <td>${persona.correo}</td>
            <td>${persona.telefono || ''}</td>
            <td>${persona.genero}</td>
            <td>${formatearFecha(persona.fechaDeNacimiento)}</td>
            <td>${persona.estado}</td>
            <td>
                <button class="btn btnAzul btn-dark btn-sm" onclick="actualizarPersona('${persona.CUI}')">Actualizar</button>
                <button class="btn btnRojo btn-dark btn-sm" onclick="eliminarPersona('${persona.CUI}')">Eliminar</button>
            </td>
        `;
        tabla.appendChild(fila);
    });
}

// Función para generar la paginación
function generarPaginacion(totalPages, currentPage) {
    const paginacion = document.getElementById('paginacion');
    paginacion.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement('li');
        li.classList.add('page-item');

        if (i === currentPage) {
            li.classList.add('active');
        }

        li.innerHTML = `<a class="page-link" href="#" onclick="aplicarFiltrosYMostrar(${i})">${i}</a>`;
        paginacion.appendChild(li);
    }

}


function actualizarPersona(cui) {
    sessionStorage.setItem('cuiBusca', cui)
    cargarFormulario(52)
}

//funcion para eliminar persona -- solo descativa
function eliminarPersona(cui) {
    const data = {
        cui: cui,
        usrCui: sessionStorage.getItem('cui'),
        tkn: sessionStorage.getItem('token'),
        metodo: 4
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
            generarAlerta(datos)
        })

}