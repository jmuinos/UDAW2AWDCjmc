document.addEventListener('DOMContentLoaded', function() {
	cargarDatosCliente();
	
	const formularioCliente = document.getElementById('formularioCliente');
	formularioCliente.addEventListener('submit', function(e) {
		e.preventDefault();
		almacenarDatosCliente();
		mostrarTecladoSeguridad();
	});
	
	document.getElementById('validarClave').addEventListener('click', validarClave);
});

function almacenarDatosCliente() {
	const dni = document.getElementById('dni').value;
	const fechaNacimiento = document.getElementById('fechaNacimiento').value;
	const recordarCliente = document.getElementById('recordarCliente').checked;
	
	if (recordarCliente) {
		const cliente = { dni, fechaNacimiento };
		localStorage.setItem('cliente', JSON.stringify(cliente));
	}
}

function cargarDatosCliente() {
	const clienteGuardado = JSON.parse(localStorage.getItem('cliente'));
	if (clienteGuardado) {
		document.getElementById('dni').value = clienteGuardado.dni;
		document.getElementById('fechaNacimiento').value = clienteGuardado.fechaNacimiento;
		document.getElementById('recordarCliente').checked = true;
	}
}

function mostrarTecladoSeguridad() {
	document.getElementById('formularioCliente').classList.add('d-none');
	document.getElementById('claveSeguridad').classList.remove('d-none');
	generarTecladoNumerico();
}

let claveIngresada = [];
const claveCorrecta = [0, 4, 2, 0]; // Deberías tener una forma de verificar esto contra los datos del cliente.

function generarTecladoNumerico() {
	const tecladoNumerico = document.getElementById('tecladoNumerico');
	tecladoNumerico.innerHTML = ''; // Limpiar el teclado anterior
	let numeros = Array.from({ length: 10 }, (_, i) => i);
	
	numeros.sort(() => Math.random() - 0.5); // Mezclar números aleatoriamente
	
	numeros.forEach(numero => {
		const boton = document.createElement('button');
		boton.textContent = numero;
		boton.className = 'btn btn-secondary text-white m-1 boton-clave';
		boton.addEventListener('click', () => seleccionarNumero(numero));
		tecladoNumerico.appendChild(boton);
	});
}

function seleccionarNumero(numero) {
	claveIngresada.push(numero);
	document.getElementById('entradaClave').textContent = claveIngresada.join(' ');
}

function validarClave() {
	// Simulación de la validación. Deberías implementar tu lógica de validación aquí.
	if (JSON.stringify(claveIngresada) === JSON.stringify(claveCorrecta)) {
		alert('Clave correcta. Acceso concedido.');
		// Redirigir al usuario o mostrar contenido adicional aquí.
	} else {
		alert('Clave incorrecta. Intente de nuevo.');
		claveIngresada = []; // Reiniciar la clave ingresada
		document.getElementById('entradaClave').textContent = ''; // Limpiar la visualización de la clave
	}
}
