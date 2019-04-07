//validar datos formulario

function validarNombre(nodoInput){
 var inputNombre = nodoInput.value
 if( inputNombre){
     nodoInput.className = 'form-control is-valid ingreso'
     
 } else{
     nodoInput.className = 'form-control is-invalid'
 }
 habilitarBtn()
}

function validarDNI(nodoInput){
 var inputDocumento = nodoInput.value
 if(inputDocumento > 0){
    nodoInput.className = 'form-control is-valid ingreso'
     
} else{
    nodoInput.className = 'form-control is-invalid'
 }   
 habilitarBtn()
}

//guardar los datos en el localstorage

class objetoAlumno {
    constructor(nombre, dni){
    this.nombre = nombre;
    this.dni = dni;}  
}


function guardar(){
    var nombre = document.getElementById('inputName').value
    var dni = document.getElementById('inputDni').value
    var objetoEstudiante = new objetoAlumno(nombre, dni)
    var estudiantes = document.getElementById('listaEstudiante')
    var estudiante = document.createElement('li')
    estudiante.className = 'list-group item'
    estudiantes.appendChild(estudiante)
    var outputNombre = document.createElement('h3')
    var outputDni = document.createElement('p')
    estudiante.appendChild(outputNombre)
    estudiante.appendChild(outputDni)
    outputNombre.innerHTML = nombre 
    outputDni.innerHTML = dni + "<hr>" 

    if (localStorage.getItem("lista") === null) {
        let usuarios = []
        usuarios.push(objetoEstudiante)
        localStorage.setItem("lista", JSON.stringify(usuarios));
    }else{
        let usuarios = JSON.parse(localStorage.getItem("lista"))
        usuarios.push(objetoEstudiante)
        localStorage.setItem("lista" , JSON.stringify(usuarios))
    }
    
}
























/*var formularioAlumno = document.getElementById('formulario')
formularioAlumno.addEventListener('onblur', function(){
    console.log('entro')
    var inputNombre = document.getElementById('inputName')
    var inputDocumento = document.getElementById('inputDni')
    if(inputNombre.className == 'form-control is-valid ingreso' && 
    inputDocumento == 'form-control is-valid ingreso'){
    var boton = document.getElementById('submit1')
    boton.className = 'btn btn-primary'
    }
})
*/ 
    
function habilitarBtn(){
    var datosValidados = document.getElementsByClassName('ingreso')
    var boton = document.getElementById('submit1')
    if(datosValidados.length == 2){
        boton.disabled = false
    } else{
        boton.disabled = true
    }
}


