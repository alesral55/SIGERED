
function compararPWD(){
    const nuevaContrasenia = document.getElementById('nuevaContrasenia').value
    const confirmarContrasenia = document.getElementById('confirmarContrasenia').value
    if(nuevaContrasenia === confirmarContrasenia){

        
    }
    else{
        const Incorrect =document.getElementById('Incorrect')
        Incorrect.style.display = 'block'
        Incorrect.innerHTML = 'Las contrase;as no conciden'
        return
    }
}