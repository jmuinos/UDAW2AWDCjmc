import {crearInputsDinamicos} from "./generacion.js";
import {validarFormulario} from "./validacion.js";
import {getCookie, setCookie} from "./cookie.js";

document.addEventListener('DOMContentLoaded', iniciarPagina);

function iniciarPagina() {
	crearInputsDinamicos();
	
	// Asignar eventos a los campos (Al perder el focus se pasan a mayúsculas)
	document.getElementById('nombre').onblur = convertirAMayusculas;
	document.getElementById('apellidos').onblur = convertirAMayusculas;
}

window.onload = function () {
	// Inicializar la cookie de intentos si no existe
	if (!getCookie('intentos')) {
		setCookie('intentos', 0, 1);
	}
	
	// Validar formulario antes de enviar
	document.getElementById('formulario').onsubmit = function (event) {
		// Prevenir el envío para manejarlo manualmente
		event.preventDefault();
		
		// Verificar la validación del formulario
		if (validarFormulario()) {
// Si la validación es exitosa, mostrar el mensaje de validación OK
			let errores = document.getElementById('errores');
			if (!document.getElementById('validationOK')) {
				let validationOK = document.createElement('li');
				validationOK.id = 'validationOK';
				validationOK.className = 'valid';
				validationOK.textContent = '¡Validación exitosa!';
				errores.appendChild(validationOK);
				
				// Esperar 3 segundos antes de preguntar si desea enviar el formulario
				setTimeout(() => {
					// Luego, pedir confirmación al usuario
					if (confirm('¿Desea enviar el formulario?')) {
						// Si el usuario confirma, eliminar el mensaje y enviar el formulario manualmente
						validationOK.remove(); // Opcional: eliminar el mensaje de validación
						document.getElementById('formulario').submit();
					}
				}, 100); // Ajusta este tiempo según lo necesario
			}
		}
	};
}

// Convertir texto a mayúsculas
function convertirAMayusculas() {
	this.value = this.value.toUpperCase();
}
