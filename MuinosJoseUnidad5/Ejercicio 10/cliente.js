class Cliente {
	constructor(dni, fechaNacimiento) {
		this.dni = dni;
		this.fechaNacimiento = fechaNacimiento;
	}
}
let claveIngresada = [];
const claveCorrecta = [0, 4, 2, 0]; // Clave usada de forma estática en este caso

document.addEventListener('DOMContentLoaded', () => {
	cargarDatosCliente();
	
	document.getElementById('formularioCliente').addEventListener('submit', function(e) {
		e.preventDefault();
		almacenarDatosCliente();
		mostrarTecladoSeguridad();
	});
});

function almacenarDatosCliente() {
	const dni = document.getElementById('dni').value;
	const fechaNacimiento = document.getElementById('fechaNacimiento').value;
	const recordarCliente = document.getElementById('recordarCliente').checked;
	
	if (recordarCliente) {
		const cliente = new Cliente(dni, fechaNacimiento);
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

function generarTecladoNumerico() {
	const tecladoNumerico = document.getElementById('tecladoNumerico');
	tecladoNumerico.innerHTML = '';
	let numeros = Array.from({ length: 10 }, (_, i) => i);
	
	numeros.sort(() => Math.random() - 0.5);
	
	numeros.forEach(numero => {
		const boton = document.createElement('button');
		boton.textContent = numero;
		boton.className = 'boton-clave btn btn-secondary text-white m-1';
		boton.addEventListener('click', () => seleccionarNumero(numero));
		tecladoNumerico.appendChild(boton);
	});
}

function seleccionarNumero(numero) {
	claveIngresada.push(numero);
	document.getElementById('entradaClave').textContent = claveIngresada.join(' ');
}

function validarClave() {
	if (JSON.stringify(claveIngresada) === JSON.stringify(claveCorrecta)) {
		alert('Clave correcta. Bienvenido al Banco ING.');
	} else {
		alert('Clave incorrecta. Intenta de nuevo.');
		claveIngresada = [];
		document.getElementById('entradaClave').textContent = '';
		generarTecladoNumerico(); // Regenera el teclado para un nuevo intento
	}
}
