import {getCookie, setCookie} from "./cookies.js";
import {
	mostrarErrores,
	limpiarErrores,
	validarEdad,
	validarEmail,
	validarFecha,
	validarHora,
	validarNIF,
	validarProvincia,
	validarTelefono
} from "./validaciones.js";


window.onload = function () {
	// Inicializar la cookie de intentos si no existe
	if (!getCookie('intentos')) {
		setCookie('intentos', 0, 1);
	}
	
	// Asignar eventos a los campos (Al perder el focus se pasan a mayúsculas)
	document.getElementById('nombre').onblur = convertirAMayusculas;
	document.getElementById('apellidos').onblur = convertirAMayusculas;
	
	// Validar formulario antes de enviar
	document.getElementById('formulario').onsubmit = function (event) {
		limpiarErrores();
		if (!validarFormulario()) {
			event.preventDefault(); // Detiene la acción por defecto si la validación falla
		} else if (!confirm('¿Desea enviar el formulario?')) {
			event.preventDefault(); // Detiene la acción por defecto si el usuario cancela
		}
		mostrarErrores();
	};

	
	// Actualizar el número de intentos cada vez que se intente enviar el formulario
	document.getElementById('enviar').onclick = function () {
		let intentos = parseInt(getCookie('intentos')) + 1;
		setCookie('intentos', intentos, 1);
		document.getElementById('intentos').innerHTML = 'Intento de Envíos del formulario: ' + intentos;
	};
};

function convertirAMayusculas() {
	this.value = this.value.toUpperCase();
}

function validarFormulario() {
	let esEdadValida = validarEdad();
	let esNIFValido = validarNIF();
	let esEmailValido = validarEmail();
	let esProvinciaValida = validarProvincia();
	let esFechaValida = validarFecha();
	let esTelefonoValido = validarTelefono();
	let esHoraValida = validarHora();
	
	return esEdadValida && esNIFValido && esEmailValido && esProvinciaValida && esFechaValida && esTelefonoValido && esHoraValida;
}




