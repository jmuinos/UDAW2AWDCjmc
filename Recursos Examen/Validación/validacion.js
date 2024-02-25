let errores = document.getElementById('errores');

export function validarFormulario() {
	let esEdadValida = validarEdad();
	let esNIFValido = validarNIF();
	let esEmailValido = validarEmail();
	let esProvinciaValida = validarProvincia();
	let esFechaValida = validarFecha();
	let esTelefonoValido = validarTelefono();
	let esHoraValida = validarHora();
	let esCondicionesValida = validarCheckbox();
	
	
	return esEdadValida && esNIFValido && esEmailValido && esProvinciaValida && esFechaValida && esTelefonoValido && esHoraValida && esCondicionesValida;
}

function validarEdad() {
	let edad = document.getElementById('edad').value;
	
	if (edad === '' || isNaN(edad) || edad < 0 || edad > 105) {
		if (!document.getElementById('errorEdad')) {
			let errorEdad = document.createElement('li');
			errorEdad.textContent = 'Edad debe estar entre 0 y 105 años';
			errorEdad.id = 'errorEdad';
			errorEdad.className = 'invalid'
			errores.appendChild(errorEdad);
		}
		document.getElementById('edad').focus();
		return false;
	} else if (document.getElementById('errorEdad')) {
		document.getElementById('errorEdad').remove();
	}
	return true;
}

function validarNIF() {
	let nif = document.getElementById('nif').value;
	let regexNIF = /^[0-9]{8}-[A-Za-z]$/;
	if (!regexNIF.test(nif)) {
		if (!document.getElementById('errorNIF')) {
			let errorNIF = document.createElement('li');
			errorNIF.textContent = 'NIF debe tener 8 dígitos seguidos de un guión y una letra';
			errorNIF.id = 'errorNIF';
			errorNIF.className = 'invalid'
			errores.appendChild(errorNIF);
		}
		document.getElementById('nif').focus();
		return false;
	} else if (document.getElementById('errorNIF')) {
		document.getElementById('errorNIF').remove();
	}
	return true;
}

function validarEmail() {
	let email = document.getElementById('email').value;
	let regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	if (!regexEmail.test(email)) {
		if (!document.getElementById('errorEmail')) {
			let errorEmail = document.createElement('li');
			errorEmail.textContent = 'Email no tiene un formato válido';
			errorEmail.id = 'errorEmail';
			errorEmail.className = 'invalid'
			errores.appendChild(errorEmail);
		}
		document.getElementById('email').focus();
		return false;
	} else if (document.getElementById('errorEmail')) {
		document.getElementById('errorEmail').remove();
	}
	return true;
}

function validarProvincia() {
	let provincia = document.getElementById('provincia').value;
	if (provincia === "Seleccione Provincia") {
		if (!document.getElementById('errorProvincia')) {
			let errorProvincia = document.createElement('li');
			errorProvincia.textContent = 'Debe seleccionar una provincia';
			errorProvincia.id = 'errorProvincia';
			errorProvincia.className = 'invalid'
			errores.appendChild(errorProvincia);
		}
		document.getElementById('provincia').focus();
		return false;
	} else if (document.getElementById('errorProvincia')) {
		document.getElementById('errorProvincia').remove();
	}
	return true;
}

function validarFecha() {
	let fecha = document.getElementById('fecha').value;
	// let regexFecha = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/; // Validaría que la fecha tenga formato (dd/mm/aaaa o dd-mm-aaaa)
	const regexFecha = /^(\d{2}[\/\-]\d{2}[\/\-]\d{4})|(\d{4}[\/\-]\d{2}[\/\-]\d{2})$/; // Valida que la fecha tenga formato (dd/mm/aaaa o dd-mm-aaaa) o (yyyy-mm-dd o yyyy/mm/dd)
	
	if (!regexFecha.test(fecha)) {
		if (!document.getElementById('errorFecha')) {
			let errorFecha = document.createElement('li');
			errorFecha.textContent = 'La fecha debe tener un formato válido (dd/mm/aaaa o dd-mm-aaaa)';
			errorFecha.id = 'errorFecha';
			errorFecha.className = 'invalid'
			errores.appendChild(errorFecha);
		}
		document.getElementById('fecha').focus();
		return false;
	} else if (document.getElementById('errorFecha')) {
		document.getElementById('errorFecha').remove();
	}
	return true;
}

function validarHora() {
	let hora = document.getElementById('hora').value;
	let regexHora = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
	if (!regexHora.test(hora)) {
		if (!document.getElementById('errorHora')) {
			let errorHora = document.createElement('li');
			errorHora.textContent = 'Hora no tiene un formato válido (hh:mm)';
			errorHora.id = 'errorHora';
			errorHora.className = 'invalid'
			errores.appendChild(errorHora);
		}
		document.getElementById('hora').focus();
		return false;
	} else if (document.getElementById('errorHora')) {
		document.getElementById('errorHora').remove();
	}
	return true;
}

function validarTelefono() {
	let telefono = document.getElementById('telefono').value;
	let regexTelefono = /^[0-9]{9}$/;
	if (!regexTelefono.test(telefono)) {
		if (!document.getElementById('errorTelefono')) {
			let errorTelefono = document.createElement('li');
			errorTelefono.textContent = 'Teléfono debe tener 9 dígitos';
			errorTelefono.id = 'errorTelefono';
			errorTelefono.className = 'invalid'
			errores.appendChild(errorTelefono);
		}
		document.getElementById('telefono').focus();
		return false;
	} else if (document.getElementById('errorTelefono')) {
		document.getElementById('errorTelefono').remove();
	}
	return true;
}
function validarCheckbox() {
	let checkbox = document.getElementById('condiciones');
	if (!checkbox.checked) {
		if (!document.getElementById('errorCondiciones')) {
			let errorCondiciones = document.createElement('li');
			errorCondiciones.textContent = 'Debes aceptar las condiciones.';
			errorCondiciones.id = 'errorCondiciones';
			errorCondiciones.className = 'invalid'
			errores.appendChild(errorCondiciones);
		}
		document.getElementById('condiciones').focus();
		return false;
	} else if (document.getElementById('errorCondiciones')) {
		document.getElementById('errorCondiciones').remove();
	}
	return true;
}