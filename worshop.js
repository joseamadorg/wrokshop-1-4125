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

function validarApellido(nodoInput){
    var inputApellido = nodoInput.value
    if( inputApellido){
        nodoInput.className = 'form-control is-valid ingreso'
        
    } else {
        nodoInput.className = 'form-control is-invalid'
    }
    habilitarBtn()
}

function validarDNI(nodoInput) {
    var documentoIngresado = nodoInput.value;
   
    let listaEnStorage = JSON.parse(localStorage.getItem("lista"));
    var encontradosEnLocal = [];
   
    if (localStorage.getItem("lista")) {
      listaEnStorage.forEach(alumno => {
        if (alumno.dni == documentoIngresado) {
          encontradosEnLocal.push(alumno.dni);
        }
      });
    }   
    //indicar que ese dni ya esta registrado
    if (encontradosEnLocal.length > 0) {
    //Acceder a div del dni
      var avisoErrorDni = document.getElementById("errorDni");
      avisoErrorDni.innerHTML = "Ese DNI ya esta registrado";
    } else {
      var avisoErrorDni = document.getElementById("errorDni");
      avisoErrorDni.innerHTML = "";
    }
   
    if (nodoInput.value > 0 && encontradosEnLocal.length == 0) {
      nodoInput.className = "form-control is-valid ingreso";
    } else {
      nodoInput.className = "form-control is-invalid";
    }
 habilitarBtn()
}

function validarEmail(nodoInput) {
    var mail = nodoInput.value;
    //Patron para que sea un mail valido
    var patron = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    if (mail.search(patron) == 0) {
      nodoInput.className = "form-control is-valid ingreso";
    } else {
      nodoInput.className = "form-control is-invalid";
    }
    habilitarBtn(nodoInput);
}

//guardar los datos en el localstorage

class objetoAlumno {
    constructor(nombre, apellido,dni, mail){
    this.nombre = nombre;
    this.apellido = apellido;
    this.dni = dni;
    this.mail = mail;
    }  
}


function guardar(){
    var nombre = document.getElementById('inputName').value
    var apellido = document.getElementById('inputLastName').value
    var dni = document.getElementById('inputDni').value
    var mail = document.getElementById('inputEmail').value
    var objetoEstudiante = new objetoAlumno(nombre, apellido ,dni, mail)
    var estudiantes = document.getElementById('listaEstudiante')
    var estudiante = document.createElement('li')
    estudiante.className = 'list-group item'
    estudiantes.appendChild(estudiante)
    var outputNombre = document.createElement('h3')
    var outputApellido = document.createElement('h3')
    var outputDni = document.createElement('p')
    var outputMail = document.createElement('p')
    estudiante.id = dni
    estudiante.appendChild(outputNombre)
    estudiante.appendChild(outputApellido)
    estudiante.appendChild(outputDni)
    estudiante.appendChild(outputMail)
    outputNombre.innerHTML = nombre
    outputApellido.innerHTML = apellido 
    outputMail.innerHTML = mail + "<hr>" 
    outputDni.innerHTML = dni

    if (localStorage.getItem("lista") === null) {
        let usuarios = []
        usuarios.push(objetoEstudiante)
        localStorage.setItem("lista", JSON.stringify(usuarios));
    }else{
        let usuarios = JSON.parse(localStorage.getItem("lista"))
        usuarios.push(objetoEstudiante)
        localStorage.setItem("lista" , JSON.stringify(usuarios))
    }
   mostrarAlumnosDelLS() 
}

//habilita el boton de envio de los datos 

function habilitarBtn(){
    var datosValidados = document.getElementsByClassName('ingreso')
    var boton = document.getElementById('submit1')
    if(datosValidados.length == 4){
        boton.disabled = false
    } else{
        boton.disabled = true
    }
}

//Eliminar Alumno
function eliminarAlumno() {
    var dniElimina = document.getElementById("dniEliminar").value;
    var listaEnStorage = JSON.parse(localStorage.getItem("lista"));
    var listaNueva = listaEnStorage.filter(alumno => alumno.dni != dniElimina)
       localStorage.setItem("lista", JSON.stringify(listaNueva));

    mostrarAlumnosDelLS()
}


function mostrarAlumnosDelLS(){
  var alumnosEnPantalla = JSON.parse(localStorage.getItem("lista"))
  var mostrarPantalla = document.getElementById("listaEstudiante")
  mostrarPantalla.innerHTML = ""
  if(localStorage.getItem("lista")){
  for(var i = 0; i <= alumnosEnPantalla.length; i++){
      var name = alumnosEnPantalla[i].nombre
      var apellido = alumnosEnPantalla[i].apellido
      var dni = alumnosEnPantalla[i].dni
      var mail = alumnosEnPantalla[i].mail
      mostrarPantalla.innerHTML += `<li><p>${name} ${apellido}<p>
      <p>${dni}</p><p>${mail}</p></li>`
    }
}
}

mostrarAlumnosDelLS()

//Buscar alumno
function buscarAlumno() {
    let alumnos = JSON.parse(localStorage.getItem("lista"));
    let textoBuscado = document.getElementById("searchName").value.toLowerCase();
    var listaEncontrados = document.getElementById("resultadoBusqueda");
   listaEncontrados.innerHTML = ""
    alumnos.forEach(alumno => {
      if (
        alumno.nombre.toLowerCase().includes(textoBuscado) ||
        alumno.apellido.toLowerCase().includes(textoBuscado)
      ) {
        var alumnoEncontrado = document.createElement("li");
   
        listaEncontrados.appendChild(alumnoEncontrado);
   
        //piso con los datos li
        alumnoEncontrado.innerHTML = `
      <h4> ${alumno.nombre} ${alumno.apellido} </h4>
      <h5>${alumno.dni} </h5>
      <h6> ${alumno.mail}</h6>
      <hr>`;
      }
    });
   }




