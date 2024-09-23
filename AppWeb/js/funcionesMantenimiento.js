// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {
    let nombreUsuario = sessionStorage.getItem('nombre');

    fetch('../componentes/nav.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('nav-content').innerHTML = data;
        if (nombreUsuario) {
            let userDropdown = document.getElementById('userDropdown');
            userDropdown.innerText = nombreUsuario;
            let dropdowns = document.querySelectorAll('.dropdown-toggle')
            dropdowns.forEach((dd) => {
                dd.addEventListener('click', function (e) {
                    var el = this.nextElementSibling
                    el.style.display = el.style.display === 'block' ? 'none' : 'block'
                })
            })
        } else {
            window.location.href = '../index.html';
        }
    
    })
    .catch(error => console.error('Error al cargar el header:', error));
   
});



function ff(){
    ASucces("Si funciona esa weada")
    fetch('../usuario/cambiarContrasenia.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('body-content').innerHTML = data;
    })
    .catch(error => console.error('Error al cargar el header:', error));
}