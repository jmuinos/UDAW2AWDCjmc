let coleccionDiscos = [];

document.addEventListener("DOMContentLoaded", obtenerDiscosDelJson);

// CON XHR
// function obtenerDiscosDelJson() {
// 	let xhr = new XMLHttpRequest();
// 	xhr.addEventListener("readystatechange", function () {
// 		if (this.readyState === 4 && this.status === 200) {
// 			let discosJson = JSON.parse(this.responseText);
// 			coleccionDiscos = discosJson.map(disco => new Disco(disco.nombre, disco.grupo, disco.anno, disco.tipoMusica, disco.localizacion, disco.prestado));
// 			alert('Discos cargados correctamente.');
// 		}
// 	});
// 	xhr.open("GET", "discos.json", true);
// 	xhr.send();
// }

// CON FETCH
function obtenerDiscosDelJson() {
	fetch('discos.json')
		.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json(); // Convierte la respuesta a JSON
		})
		.then(discosJson => {
			coleccionDiscos = discosJson.map(disco => new Disco(disco.nombre, disco.grupo, disco.anno, disco.tipoMusica, disco.localizacion, disco.prestado));
			alert('Discos cargados correctamente.');
		})
		.catch(error => {
			console.error('Fetch error:', error);
		});
}



function mostrarTablaDiscos() {
	let orden = prompt("¿Cómo deseas ordenar los discos? (normal, inverso, alfabético)");
	let discosOrdenados = [...coleccionDiscos];
	
	if (orden === "inverso") discosOrdenados.reverse();
	else if (orden === "alfabético") discosOrdenados.sort((a, b) => a.nombre.localeCompare(b.nombre));
	
	// Columnas para la tabla completa
	const columnas = ["Nombre", "Grupo", "Año", "Tipo de Música", "Localización", "Prestado"];
	construirYMostrarTabla(discosOrdenados, columnas);
}

function mostrarDiscosPorAnno() {
	let intervalo = prompt("Introduce el intervalo de años en formato inicio-fin (ejemplo: 1990-2000):");
	let [inicio, fin] = intervalo.split("-").map(Number);
	let discosPorAnno = coleccionDiscos.filter(disco => disco.anno >= inicio && disco.anno <= fin);
	
	// Columnas para la tabla de discos por año
	const columnas = ["Nombre", "Grupo", "Año", "Tipo de Música", "Localización", "Prestado"];
	construirYMostrarTabla(discosPorAnno, columnas);
}

function mostrarNumeroDiscos() {
	alert(`Número total de discos: ${coleccionDiscos.length}`);
}

function anadirDisco() {
	// Solicita al usuario los detalles del nuevo disco
	let nombre = prompt("Nombre del disco:");
	let grupo = prompt("Grupo de música o cantante:");
	let anno = parseInt(prompt("Año de publicación:"));
	let tipoMusica = prompt("Tipo de música (rock, pop, punk, indie):");
	let localizacion = parseInt(prompt("Número de estantería:"));
	let nuevoDisco = new Disco(nombre, grupo, anno, tipoMusica, localizacion, false);
	
	// Determina si el disco se añadirá al principio o al final del array
	let posicion = prompt("¿Quieres añadir al principio o al final de la colección? (principio/final)");
	if (posicion === "principio") coleccionDiscos.unshift(nuevoDisco);  // Añade al principio
	else coleccionDiscos.push(nuevoDisco);// Añade al final
}

function borrarDisco() {
	if (coleccionDiscos.length === 0) {
		alert("No hay discos en la colección para borrar.");
		return;
	}
	
	let posicion = prompt("¿Quieres borrar el disco al principio o al final de la colección? (principio/final)");
	if (posicion === "principio") coleccionDiscos.shift();
	else coleccionDiscos.pop();
}

function consultarDisco() {
	let criterio = prompt("¿Quieres consultar por posición o por nombre? (posición/nombre)");
	let discoEncontrado;
	
	// Busca el disco según el criterio elegido
	if (criterio === "posición") {
		let posicion = parseInt(prompt("Introduce la posición del disco:"));
		discoEncontrado = coleccionDiscos[posicion - 1];
	} else {
		let nombre = prompt("Introduce el nombre del disco:");
		discoEncontrado = coleccionDiscos.find(disco => disco.nombre.toLowerCase() === nombre.toLowerCase());
	}
	
	// Muestra la información del disco encontrado o un mensaje si no se encuentra
	if (discoEncontrado) alert(discoEncontrado.mostrarInformacion());
	else alert("DiscoAux no encontrado.");
}

function construirYMostrarTabla(discos, columnas) {
	let tabla = document.createElement("table");
	tabla.className = "table";
	let thead = document.createElement("thead");
	let tbody = document.createElement("tbody");
	
	// Añadir cabecera
	let trHead = document.createElement("tr");
	columnas.forEach(col => {
		let th = document.createElement("th");
		th.textContent = col;
		trHead.appendChild(th);
	});
	thead.appendChild(trHead);
	
	// Añadir filas
	discos.forEach(disco => {
		let tr = document.createElement("tr");
		columnas.forEach(col => {
			let td = document.createElement("td");
			switch (col.toLowerCase()) {
				case "nombre":
					td.textContent = disco.nombre;
					break;
				case "grupo":
					td.textContent = disco.grupo;
					break;
				case "año":
					td.textContent = disco.anno;
					break;
				case "tipo de música":
					td.textContent = disco.tipoMusica;
					break;
				case "localización":
					td.textContent = disco.localizacion;
					break;
				case "prestado":
					td.textContent = disco.prestado ? 'Sí' : 'No';
					break;
				// Añade más casos si hay más columnas
			}
			tr.appendChild(td);
		});
		tbody.appendChild(tr);
	});
	
	// Añadir thead y tbody a la tabla
	tabla.appendChild(thead);
	tabla.appendChild(tbody);
	
	// Añadir la tabla al elemento del DOM
	let resultado = document.getElementById('resultado');
	while (resultado.firstChild) resultado.removeChild(resultado.firstChild);
	resultado.appendChild(tabla);
}
