class Cliente {
	constructor(nombre, localidad, cuota) {
		this.nombre = nombre;
		this.localidad = localidad;
		this.cuota = cuota;
	}
}

const clientes = [
	new Cliente("Laura", "Santander", 50),
	new Cliente("Álvaro", "Castro", 50),
	new Cliente("Igor", "Castro", 60),
	new Cliente("Ivan", "Santander", 40),
	new Cliente("Mónica", "Zamora", 30),
	new Cliente("Javi", "Bilbao", 30),
	new Cliente("David", "Bilbao", 50)
];

function mostrarTodosLosClientes() {
	document.getElementById('resultado').innerHTML = crearTabla(clientes);
}

// Solicita al usuario la localidad y llama a la función para mostrar los clientes pertenecientes
function pedirLocalidad() {
	const localidad = prompt("Ingrese la localidad:");
	mostrarClientesPorLocalidad(localidad);
}

// Recibe un nombre de una localidad, filtra por este y muestra los clientes de esta
function mostrarClientesPorLocalidad(localidad) {
	const filtrados = clientes.filter(cliente => cliente.localidad.toLowerCase() === localidad.toLowerCase());
	document.getElementById('resultado').innerHTML = crearTabla(filtrados);
}

// Solicita al usuario una cuota y llama a la función para mostrar los clientes con cuota mayor
function pedirCuota() {
	const cuota = prompt("Ingrese el valor de la cuota:");
	mostrarClientesPorCuota(parseInt(cuota));
}

// Recibe un valor de cuota, filtra por este y muestra clientes con cuota mayor
function mostrarClientesPorCuota(cuota) {
	const filtrados = clientes.filter(cliente => cliente.cuota > cuota);
	document.getElementById('resultado').innerHTML = crearTabla(filtrados);
}

// Crea una tabla HTML con la información de los clientes
function crearTabla(clientes) {
	let tabla = '<table class="table"><thead><tr><th>Nombre</th><th>Localidad</th><th>Cuota</th></tr></thead><tbody>';
	//Añadir cada cliente como una fila de la tabla
	clientes.forEach(cliente => {
		tabla += `<tr><td>${cliente.nombre}</td><td>${cliente.localidad}</td><td>${cliente.cuota}</td></tr>`;
	});
	tabla += '</tbody></table>';
	return tabla;
}
