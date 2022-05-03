let inputTexto = document.getElementsByClassName("txt-cifrar-descifrar"); 

let btnEncriptar = document.querySelector(".btn-cifrar");
let btnDesencriptar = document.querySelector(".btn-descifrar");

let textoEncriptado = ""; 
let textoDesencriptado = ""; 

const expRegular = /[a-z ]/; 

let llaveA = "ai"; 
let llaveE = "enter"; 
let llaveI = "imes"; 
let llaveO = "ober"
let llaveU = "ufat"; 

let i; 
let j; 

let debeSeguirEncriptando = true; 
let debeSeguirDesencriptando = true; 

inputTexto[0].addEventListener("input", function (event) {
    if (expRegular.test(event.data) == false) {
        let valorTextarea = inputTexto[0].value; 
        event.target.value = valorTextarea.substring(0, valorTextarea.length - 1);  
        alert("Ingresar solamente letras minúsculas y sin acentos");
    } 
})

btnEncriptar.addEventListener("click", function (event) {
    
    event.preventDefault();

    textoEncriptado = ""; 
    textoDesencriptado = "";
    debeSeguirEncriptando = true; 

    if (ValidarTextoVacio()) {
        return;
    }

    ValidarEncriptado(); 

    if (!debeSeguirEncriptando) {
        alert("El texto que intentas encriptar ya se encuentra encriptado");
        return;    
    }

    for (i = 0; i < inputTexto[0].value.length; i++) {
        Encriptar(inputTexto[0].value[i]);
    }

    CrearMensaje(textoEncriptado); 
    
    window.location.href ="#msj";
}); 

btnDesencriptar.addEventListener("click", function (event) {
    
    event.preventDefault();
    btnCopiar = document.querySelector(".btn-copiar");
    textoDesencriptado = "";
    textoEncriptado = "";
    seDebeDesencriptar = true; 
    debeSeguirDesencriptando  = true; 

    if (ValidarTextoVacio()) {
        return;
    }

    ValidarDesencriptado(); 
    
    if (!debeSeguirDesencriptando) {
        alert("El texto que intentas desencriptar no está encriptado");
        return;    
    }

    for (j = 0; j < inputTexto[0].value.length; j++) {

        Desencriptar(inputTexto[0].value[j]);
        
    }

    CrearMensaje(textoDesencriptado); 
    window.location.href ="#msj";
}); 

function Encriptar (caracter) {
    switch (caracter) {
        case "a": 
            textoEncriptado += llaveA;
        break; 
        case "e": 
            textoEncriptado += llaveE;
        break; 
        case "i": 
            textoEncriptado += llaveI;
        break; 
        case "o": 
            textoEncriptado += llaveO;
        break; 
        case "u": 
            textoEncriptado += llaveU;
        break;
        default : 
            textoEncriptado += caracter; 
        break; 
    }    
}; 

function Desencriptar (caracter) {
    switch (caracter) {
        case "a":
            textoDesencriptado += llaveA[0];
            j = j + (llaveA.length - 1) ; 
        break; 
        case "e": 
            textoDesencriptado += llaveE[0];
            j = j + (llaveE.length - 1); 
        break; 
        case "i": 
            textoDesencriptado += llaveI[0];
            j = j + (llaveI.length - 1) ; 
        break; 
        case "o": 
            textoDesencriptado += llaveO[0];
            j = j + (llaveO.length - 1); 
        break; 
        case "u": 
            textoDesencriptado += llaveU[0];
            j = j + (llaveU.length - 1) ; 
        break;
        default : 
            textoDesencriptado += caracter; 
        break; 
    }
}; 

function ValidarEncriptado() {

    for (j = 0; j < inputTexto[0].value.length; j++) {
        Desencriptar(inputTexto[0].value[j]); 
    }

    for (let k = 0; k < textoDesencriptado.length; k++) {
        Encriptar(textoDesencriptado[k]);
    }
   
    if (textoEncriptado == inputTexto[0].value) {
        debeSeguirEncriptando = false; 
    } else {
        textoEncriptado = "";
        textoDesencriptado = "";
        debeSeguirEncriptando = true; 
    }
 
};

function ValidarDesencriptado() {
  
    for (j = 0; j < inputTexto[0].value.length; j++) {
        Desencriptar(inputTexto[0].value[j]); 
    }

    for (let k = 0; k < textoDesencriptado.length; k++) {
        Encriptar(textoDesencriptado[k]);
    }
  
    if (textoEncriptado == inputTexto[0].value) {
        debeSeguirDesencriptando = true; 
        textoEncriptado = "";
        textoDesencriptado = "";
    } else {
        debeSeguirDesencriptando = false; 
    }

};

function ValidarTextoVacio () {
    if (inputTexto[0].value.length == 0) {
        alert("Aún no has digitado ningún mensaje");
        return true; 
    }
};

function CrearMensaje(mensaje) {
    let seccionMensaje = document.querySelector(".sect-msj-cifrar"); 
    seccionMensaje.innerHTML = "";

    let p = CrearElemento("p"); 
    p.textContent =mensaje;  
    p.classList.add("mensaje");
    
    let botonCopiar = CrearElemento("button"); 
    botonCopiar.textContent = "Copiar"; 
    botonCopiar.classList.add("btn-copiar")
    botonCopiar.setAttribute("onClick", "CopiarAPortapapeles()");

    seccionMensaje.classList.add("flex-column");
    seccionMensaje.appendChild(p);
    seccionMensaje.appendChild(botonCopiar);

};

function CrearElemento(tipoElemento) {
    let elemento = document.createElement(tipoElemento);
    return elemento; 
}

function CopiarAPortapapeles() {
    let contenido = document.querySelector(".mensaje").innerHTML;

    navigator.clipboard.writeText(contenido)
        .then(() => {
        alert("Texto copiado al portapapeles")
    })
        .catch(err => {
        alert('Ocurrió un error al intentar copiar', err);
    })

    window.location.href ="#header";
}