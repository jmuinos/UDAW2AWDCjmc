export {
	mostrarErrores,
	limpiarErrores,
	validarEdad,
	validarFecha,
	validarHora,
	validarNIF,
	validarTelefono,
	validarProvincia,
	validarEmail
};

let errores = '';

function mostrarErrores() {
	document.getElementById('errores').innerHTML = errores;
}

function limpiarErrores() {
	errores = '';
}


function validarEdad() {
	let edad = document.getElementById('edad').value;
	if (edad === '' || isNaN(edad) || edad < 0 || edad > 105) {
		let error = 'Edad debe estar entre 0 y 105 años';
		errores += error + '<br>';
		document.getElementById('edad').focus();
		return false;
	}
	return true;
}

function validarNIF() {
	let nif = document.getElementById('nif').value;
	let regexNIF = /^[0-9]{8}-[A-Za-z]$/;
	if (!regexNIF.test(nif)) {
		let error = 'NIF debe tener 8 dígitos seguidos de un guión y una letra';
		errores += error + '<br>';
		document.getElementById('nif').focus();
		return false;
	}
	return true;
}

function validarEmail() {
	let email = document.getElementById('email').value;
	let regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	if (!regexEmail.test(email)) {
		let error = 'Email no tiene un formato válido';
		errores += error + '<br>';
		document.getElementById('email').focus();
		return false;
	}
	return true;
}

function validarProvincia() {
	let provincia = document.getElementById('provincia').value;
	if (provincia === "0") {
		let error = 'Debe seleccionar una provincia';
		errores += error + '<br>';
		document.getElementById('provincia').focus();
		return false;
	}
	return true;
}

function validarFecha() {
	let fecha = document.getElementById('fecha').value;
	let regexFecha = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
	if (!regexFecha.test(fecha)) {
		let error = 'Fecha no tiene un formato válido (dd/mm/aaaa o dd-mm-aaaa)';
		errores += error + '<br>';
		document.getElementById('fecha').focus();
		return false;
	}
	return true;
}

function validarTelefono() {
	let telefono = document.getElementById('telefono').value;
	let regexTelefono = /^[0-9]{9}$/;
	if (!regexTelefono.test(telefono)) {
		let error = 'Teléfono debe tener 9 dígitos';
		errores += error + '<br>';
		document.getElementById('telefono').focus();
		return false;
	}
	return true;
}

function validarHora() {
	let hora = document.getElementById('hora').value;
	let regexHora = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
	if (!regexHora.test(hora)) {
		let error = 'Hora no tiene un formato válido (hh:mm)';
		errores += error + '<br>';
		document.getElementById('hora').focus();
		return false;
	}
	return true;
}
