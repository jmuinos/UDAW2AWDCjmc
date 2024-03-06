let clientes = [];

class Cliente {
	constructor(nombre, localidad, cuota) {
		this.nombre = nombre;
		this.localidad = localidad;
		this.cuota = cuota;
	}
}

// CON XHR
// function cargarClientes() {
// 	let xhr = new XMLHttpRequest();
// 	xhr.open("GET", "clientes.json", true);
// 	xhr.onreadystatechange = function() {
// 		if (this.readyState === 4 && this.status === 200) {
// 			let datos = JSON.parse(this.responseText);
// 			clientes = datos.map(d => new Cliente(d.nombre, d.localidad, d.cuota));
// 			console.log("Clientes cargados con éxito.");
// 		}
// 	};
// 	xhr.send();
// }

// CON FETCH
function cargarClientes() {
	fetch('clientes.json')
		.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json(); // Convierte la respuesta a JSON
		})
		.then(datos => {
			clientes = datos.map(d => new Cliente(d.nombre, d.localidad, d.cuota));
			console.log("Clientes cargados con éxito.");
		})
		.catch(error => {
			console.error('Fetch error:', error);
		});
}

// Llamar a cargarClientes al iniciar la aplicación
window.onload = cargarClientes;

function crearTabla(clientes) {
	let tabla = document.createElement("table");
	tabla.className = "table";
	let thead = document.createElement("thead");
	let trHead = document.createElement("tr");
	let columnas = ["Nombre", "Localidad", "Cuota"];
	
	columnas.forEach(col => {
		let th = document.createElement("th");
		th.textContent = col;
		trHead.appendChild(th);
	});
	thead.appendChild(trHead);
	tabla.appendChild(thead);
	
	let tbody = document.createElement("tbody");
	clientes.forEach(cliente => {
		let tr = document.createElement("tr");
		let tdNombre = document.createElement("td");
		tdNombre.textContent = cliente.nombre;
		tr.appendChild(tdNombre);
		
		let tdLocalidad = document.createElement("td");
		tdLocalidad.textContent = cliente.localidad;
		tr.appendChild(tdLocalidad);
		
		let tdCuota = document.createElement("td");
		tdCuota.textContent = cliente.cuota;
		tr.appendChild(tdCuota);
		
		tbody.appendChild(tr);
	});
	tabla.appendChild(tbody);
	
	let resultado = document.getElementById('resultado');
	while (resultado.firstChild) resultado.removeChild(resultado.firstChild);
	resultado.appendChild(tabla);
}

function mostrarTodosLosClientes() {
	crearTabla(clientes);
}

function pedirLocalidad() {
	const localidad = prompt("Ingrese la localidad:");
	mostrarClientesPorLocalidad(localidad);
}

function mostrarClientesPorLocalidad(localidad) {
	const filtrados = clientes.filter(cliente => cliente.localidad.toLowerCase() === localidad.toLowerCase());
	crearTabla(filtrados);
}

function pedirCuota() {
	const cuota = prompt("Ingrese el valor de la cuota:");
	mostrarClientesPorCuota(parseInt(cuota));
}

function mostrarClientesPorCuota(cuota) {
	const filtrados = clientes.filter(cliente => cliente.cuota > cuota);
	crearTabla(filtrados);
}
