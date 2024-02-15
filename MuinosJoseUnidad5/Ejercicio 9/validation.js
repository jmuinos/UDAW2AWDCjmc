document.addEventListener('DOMContentLoaded', () => {
	const formulario = document.getElementById('miFormulario');
	formulario.addEventListener('submit', validarFormulario);
});

function validarFormulario(e) {
	e.preventDefault();
	let validacionCorrecta = true;
	
	// Validación de Nombre y Apellido
	validarCampoVacio('nombreApellido', '<i class="fa-sharp fa-solid fa-exclamation me-2"></i> Introduce tu nombre');
	
	// Validación de Teléfono o Email
	const telefonoEmail = document.getElementById('telefonoEmail');
	if (telefonoEmail.value === '') {
		mostrarError(telefonoEmail, '<i class="fa-sharp fa-solid fa-exclamation me-2"></i> Indica tu dirección de e-mail o teléfono móvil');
		validacionCorrecta = false;
	} else {
		const regexTelefonoEmail = /^(\d{9}|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
		if (!regexTelefonoEmail.test(telefonoEmail.value)) {
			mostrarError(telefonoEmail, '<i class="fa-sharp fa-solid fa-exclamation me-2"></i> La dirección de correo electrónico o el número de teléfono móvil faltan o son inválidos. Corríjalo e inténtelo de nuevo.');
			validacionCorrecta = false;
		} else {
			limpiarError(telefonoEmail);
		}
	}
	
	// Validación de Contraseña
	const contrasena = document.getElementById('contrasena');
	if (contrasena.value.trim() === '') {
		mostrarError(contrasena, '<i class="fa-sharp fa-solid fa-exclamation me-2"></i> Mínimo de 6 caracteres obligatorios!');
		validacionCorrecta = false;
	} else if (contrasena.value.length < 6) {
		mostrarError(contrasena, '<i class="fa-sharp fa-solid fa-exclamation me-2"></i> La contraseña debe tener al menos 6 caracteres.');
		validacionCorrecta = false;
	} else {
		limpiarError(contrasena);
	}
	
	// Validación de Confirmación de Contraseña
	const confirmacionContrasena = document.getElementById('confirmacionContrasena');
	if (confirmacionContrasena.value === '') {
		mostrarError(confirmacionContrasena, '<i class="fa-sharp fa-solid fa-exclamation me-2"></i> Introduce tu contraseña otra vez!');
		validacionCorrecta = false;
	} else if (contrasena.value !== confirmacionContrasena.value) {
		mostrarError(confirmacionContrasena, '<i class="fa-sharp fa-solid fa-exclamation me-2"></i> Las contraseñas no coinciden.');
		validacionCorrecta = false;
	} else {
		limpiarError(confirmacionContrasena);
	}
	
	if (validacionCorrecta) {
		alert("Formulario enviado con éxito.");
	}
}

function mostrarError(input, mensaje) {
	const divFeedback = input.nextElementSibling;
	divFeedback.innerHTML = mensaje;
	divFeedback.style.display = 'block';
	input.classList.add('is-invalid');
}

function limpiarError(input) {
	const divFeedback = input.nextElementSibling;
	divFeedback.style.display = 'none';
	input.classList.remove('is-invalid');
}

function validarCampoVacio(idCampo, mensajeError) {
	const campo = document.getElementById(idCampo);
	if (campo.value.trim() === '') {
		mostrarError(campo, mensajeError);
		// La siguiente línea se elimina para evitar referencia antes de asignación
		//validacionCorrecta = false;
	} else {
		limpiarError(campo);
	}
}
