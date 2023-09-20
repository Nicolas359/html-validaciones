export function validar(input){
    const tipoDeInput = input.dataset.tipo
    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);
    }

    if(input.validity.valid) {
        input.parentElement.classList.remove("input-container--invalid")
        input.parentElement.querySelector(".input-message-error").innerHTML = ""
    }else {
        input.parentElement.classList.add("input-container--invalid")
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input);
    }
};

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError"
]

const mensajesDeError = {
    name: {
        valueMissing: "Este campo no puede estar vacío."
    },
    email: {
        valueMissing: "Este campo no puede estar vacío.",
        typeMismatch: "El correo no es válido."
    },
    password: {
        valueMissing: "Este campo no puede estar vacío.",
        patternMismatch: "No cumple el patrón"
    },
    birth: {
        valueMissing: "Este campo no puede estar vacío.",
        customError: "Debes tener al menos 18 años."
    },
    phoneNumber:{
        valueMissing: "Este campo no puede estar vacío.",
        patternMismatch: "No cumple el patrón"
    },
    direccion: {
        valueMissing: "Este campo no puede estar vacío.",
        patternMismatch: "No cumple el patrón"
    }
};

function mostrarMensajeDeError(tipo, input) {
    let mensaje = "";

    tipoDeErrores.forEach( error => {
        if (input.validity[error]){
            mensaje = mensajesDeError[tipo][error];
        }
    });

    return mensaje
}

const validadores = {
    birth: (input) => validarNacimiento(input)
}

function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    mayorDeEdad(fechaCliente)

    let mensaje = ""

    if(!mayorDeEdad(fechaCliente)){
        mensaje = "Debes tener al menos 18 años."
    }
    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(fecha.getUTCFullYear() + 18, fecha.getUTCMonth(), fecha.getUTCDate());
    return diferenciaFechas <= fechaActual
}

