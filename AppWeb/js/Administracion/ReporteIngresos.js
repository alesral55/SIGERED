
let ingresosAnuales = [];
const loader = document.getElementById('loader');
loader.style.display = 'flex'; // Muestra el loader
fetch(reportesPath) 

    .then(function (respuesta) {
        if (respuesta.ok) {
            return respuesta.json();
        }
    })
    .then(function (datos) {
        loader.style.display = 'none'; 

        graficosIngresos(datos.data.ingresosPorTipoPago)
        graficosIngresosAnuales(datos.data.ingresosAnuales)
        
    })
    .catch(function (error) {
        console.error('Error al obtener los datos de ingresos:', error);
        loader.style.display = 'none'; 

    });

    function graficosIngresos(ingresosPorTipoPago) {
        // Extraer categorías, cantidades y montos
        const categorias = ingresosPorTipoPago.map(item => item.nombre);
        const cantidades = ingresosPorTipoPago.map(item => item.CantidadPagos);
        const montos = ingresosPorTipoPago.map(item => item.pagos);
    
        // Sumar las cantidades y montos para mostrarlos en el caption
        const totalCantidadPagos = cantidades.reduce((total, num) => total + num, 0);
        const totalMontoPagos = montos.reduce((total, num) => total + num, 0);
    
        // Gráfico para Cantidad de Pagos
        Highcharts.chart("containerCantidad", {
            chart: {
                type: "column"
            },
            title: {
                text: "Cantidad de Pagos por Tipo de Pago"
            },
            xAxis: {
                categories: categorias,
                title: {
                    text: "Tipo de Pago"
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: "Cantidad de Pagos"
                }
            },
            series: [{
                name: "Cantidad de Pagos",
                data: cantidades,
                colorByPoint: true
            }],
            caption: {
                text: `<b>Total de Cantidad de Pagos: ${totalCantidadPagos}</b>`
            }
        });
    
        // Gráfico para Montos de Pagos
        Highcharts.chart("containerMontos", {
            chart: {
                type: "column"
            },
            title: {
                text: "Montos Totales por Tipo de Pago"
            },
            xAxis: {
                categories: categorias,
                title: {
                    text: "Tipo de Pago"
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: "Monto Total de Pagos"
                }
            },
            series: [{
                name: "Monto de Pagos",
                data: montos,
                colorByPoint: true
            }],
            caption: {
                text: `<b>Total de Montos de Pagos: ${totalMontoPagos}</b>`
            }
        });
    
        // Generar tabla de resumen
        const tablaContainer = document.getElementById("tablaIngresos");
        tablaContainer.innerHTML = `
            <table border="1" style="width:100%; text-align:center; margin-top:20px;"  class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Tipo de Pago</th>
                        <th>Cantidad de Pagos</th>
                        <th>Monto Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${ingresosPorTipoPago.map(item => `
                        <tr>
                            <td>${item.nombre}</td>
                            <td>${item.CantidadPagos}</td>
                            <td>Q. ${item.pagos}</td>
                        </tr>
                    `).join('')}
                    <tr style="font-weight:bold;">
                        <td>Total</td>
                        <td>${totalCantidadPagos}</td>
                        <td>Q. ${totalMontoPagos}</td>
                    </tr>
                </tbody>
            </table>
        `;
    }
    

    function graficosIngresosAnuales(ingresosAnuales) {
        // Extraer los años, cantidades de pagos y total de ingresos
        const anos = ingresosAnuales.map(item => `Año ${item.Año}`);
        const cantidades = ingresosAnuales.map(item => item.CantidadPagos);
        const ingresosTotales = ingresosAnuales.map(item => item.TotalIngresos);
    
        // Sumar las cantidades y montos para mostrarlos en el caption
        const totalCantidadPagos = cantidades.reduce((total, num) => total + num, 0);
        const totalIngresos = ingresosTotales.reduce((total, num) => total + num, 0);
    
        // Gráfico para Cantidad de Pagos por Año
        Highcharts.chart("containerAnualCantidad", {
            chart: {
                type: "column"
            },
            title: {
                text: "Cantidad de Pagos por Año"
            },
            xAxis: {
                categories: anos,
                title: {
                    text: "Año"
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: "Cantidad de Pagos"
                }
            },
            series: [{
                name: "Cantidad de Pagos",
                data: cantidades,
                colorByPoint: true
            }],
            caption: {
                text: `<b>Total de Cantidad de Pagos: ${totalCantidadPagos}</b>`
            }
        });
    
        // Gráfico para Total de Ingresos por Año
        Highcharts.chart("containerAnualIngresos", {
            chart: {
                type: "column"
            },
            title: {
                text: "Ingresos Totales por Año"
            },
            xAxis: {
                categories: anos,
                title: {
                    text: "Año"
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: "Total de Ingresos"
                }
            },
            series: [{
                name: "Total de Ingresos",
                data: ingresosTotales,
                colorByPoint: true
            }],
            caption: {
                text: `<b>Total de Ingresos: ${totalIngresos}</b>`
            }
        });
    
        // Generar tabla de resumen
        const tablaAnualContainer = document.getElementById("tablaIngresosAnuales");
        tablaAnualContainer.innerHTML = `
            <table border="1" style="width:100%; text-align:center; margin-top:20px;"  class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Año</th>
                        <th>Cantidad de Pagos</th>
                        <th>Total de Ingresos</th>
                    </tr>
                </thead>
                <tbody>
                    ${ingresosAnuales.map(item => `
                        <tr>
                            <td>${item.Año}</td>
                            <td>${item.CantidadPagos}</td>
                            <td>Q. ${item.TotalIngresos}</td>
                        </tr>
                    `).join('')}
                    <tr style="font-weight:bold;">
                        <td>Total</td>
                        <td>${totalCantidadPagos}</td>
                        <td>Q. ${totalIngresos}</td>
                    </tr>
                </tbody>
            </table>
        `;
    }
    
    function imprimirFormulario() {
        // Seleccionamos el contenido del formulario o el área que deseas imprimir
        var contenidoFormulario = document.getElementById('body-content').innerHTML;
        
        // Abrimos una nueva ventana
        var newWindow = window.open('', 'SIGERED', 'width=800,height=600');
        
        // Escribimos el contenido en la nueva ventana
        newWindow.document.write('<html><head><title>SIGERED Reporte Ingresos Formulario</title>');
        
        // Añadimos una hoja de estilos específica para la impresión
        newWindow.document.write('<style>');
        newWindow.document.write('@media print { body { font-family: Arial, sans-serif; } }');
        newWindow.document.write('@page { margin: 1cm; }');  // Márgenes de impresión
        newWindow.document.write('body { margin: 10px; }');  // Márgenes generales
        newWindow.document.write('</style>');
        
        newWindow.document.write('</head><body>');
        newWindow.document.write(contenidoFormulario);  // Solo el formulario
        newWindow.document.write('</body></html>');
        
        // Cerramos el documento para que termine de cargarse
        newWindow.document.close();
        
        // Esperamos a que la ventana se cargue completamente y luego iniciamos la impresión
        newWindow.onload = function() {
            newWindow.print();  // Inicia la impresión
            newWindow.close();   // Cierra la ventana después de la impresión
        };
    }
    
    function imprimirReporte2() {
        var contenidoReporte = document.getElementById('contImpresion').outerHTML; 
    
        var ventanaReporte = window.open('/Reportes/ReporteIngresos.html', 'Reporte', 'width=900,height=700');

        ventanaReporte.onload = function() {
            ventanaReporte.document.getElementById('contenidoReporte').innerHTML = contenidoReporte;
    
            setTimeout(function() {
                ventanaReporte.print(); 
                ventanaReporte.close();  
            }, 500); 
        };
    }
    