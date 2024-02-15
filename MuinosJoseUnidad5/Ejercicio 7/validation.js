document.addEventListener('DOMContentLoaded', function () {
	const formulario = document.getElementById('formularioEnvio');
	formulario.addEventListener('submit', function (e) {
		e.preventDefault();
		
		// Expresiones Regulares
		const regexFecha = /^\d{2}\/\d{2}\/\d{4}$/;
		const regexCodigoEmpleado = /^[A-Z]{2}\W\d{4}$/;
		const regexDestinatario = /^[A-Z]{2,3}_[A-Za-z]+:\d{4}$/;
		const regexPeso = /^(?:[1-9]\d{2,3}|5000)$/;
		const regexNumeroCuenta = /^IBAN[ ]?[0-9]{20}$/;
		
		// Validaciones
		const fechaCreacion = document.getElementById('fechaCreacion').value;
		const codigoEmpleado = document.getElementById('codigoEmpleado').value;
		const destinatario = document.getElementById('destinatario').value;
		const pesoGramos = document.getElementById('pesoGramos').value;
		const numeroCuenta = document.getElementById('numeroCuenta').value;
		
		let esValido = true;
		let mensajeError = "";
		
		if (!regexFecha.test(fechaCreacion)) {
			mensajeError += "La fecha de creación no tiene el formato correcto (dd/mm/aaaa).\n";
			esValido = false;
		}
		if (!regexCodigoEmpleado.test(codigoEmpleado)) {
			mensajeError += "El código de empleado no sigue el formato requerido.\n";
			esValido = false;
		}
		if (!regexDestinatario.test(destinatario)) {
			mensajeError += "El destinatario no sigue el formato requerido.\n";
			esValido = false;
		}
		if (!regexPeso.test(pesoGramos)) {
			mensajeError += "El peso debe estar entre 100 y 5000 gramos.\n";
			esValido = false;
		}
		if (!regexNumeroCuenta.test(numeroCuenta)) {
			mensajeError += "El número de cuenta no sigue el formato IBAN seguido de 20 dígitos.\n";
			esValido = false;
		}
		
		if (esValido) {
			alert("Formulario enviado con éxito!");
		} else {
			alert("Errores en el formulario:\n" + mensajeError);
		}
	});
});
