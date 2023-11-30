let coleccionDiscos = [];

function mostrarNumeroDiscos() {
	alert(`Número total de discos: ${coleccionDiscos.length}`);
}

function mostrarTablaDiscos() {
	let orden = prompt("¿Cómo deseas ordenar los discos? (normal, inverso, alfabético)");
	let discosOrdenados = [...coleccionDiscos];
	
	if (orden === "inverso") discosOrdenados.reverse();
	else if (orden === "alfabético") discosOrdenados.sort((a, b) => a.nombre.localeCompare(b.nombre));

// Construye una tabla HTML con los datos de cada disco
	let tabla = `<table class="table">
    <thead>
        <tr><th>Nombre</th><th>Grupo</th><th>Año</th><th>Tipo de Música</th><th>Localización</th><th>Prestado</th><th>Carátula</th></tr>
    </thead>
    <tbody>`;
	
	discosOrdenados.forEach(disco => {
		// Añade cada disco como una fila en la tabla
		tabla += `<tr>
				        <td>${disco.nombre}</td>
				        <td>${disco.grupo}</td>
				        <td>${disco.anno}</td>
				        <td>${disco.tipoMusica}</td>
				        <td>${disco.localizacion}</td>
				        <td>${disco.prestado ? 'Sí' : 'No'}</td>
				        <td><img src="${disco.caratula}" alt="${disco.caratula}"></td>
                 </tr>`;
	});
	
	tabla += `</tbody></table>`;
	document.getElementById('resultado').innerHTML = tabla;
	
}

function anadirDisco() {
	// Solicita al usuario los detalles del nuevo disco
	let nombre = prompt("Nombre del disco:");
	let grupo = prompt("Grupo de música o cantante:");
	let anno = parseInt(prompt("Año de publicación:"));
	let tipoMusica = prompt("Tipo de música (rock, pop, punk, indie):");
	let localizacion = parseInt(prompt("Número de estantería:"));
	let caratula = prompt("Nombre del archivo de la carátula (deja en blanco para 'imagen.png'):");
	
	let nuevoDisco = new Disco(nombre, grupo, anno, tipoMusica, localizacion, false, caratula || 'imagen.png');
	
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
	else alert("Disco no encontrado.");
}

function mostrarDiscosPorAnno() {
	// Filtra los discos que se encuentran dentro del intervalo de años
	let intervalo = prompt("Introduce el intervalo de años en formato inicio-fin (ejemplo: 1990-2000):");
	let [inicio, fin] = intervalo.split("-").map(Number);
	
	let discosPorAnno = coleccionDiscos.filter(disco => disco.anno >= inicio && disco.anno <= fin);

// Construye y muestra una tabla con los discos filtrados
	let tabla = `<table class="table">
    <thead>
        <tr><th>Nombre</th><th>Grupo</th><th>Año</th><th>Tipo de Música</th></tr>
    </thead>
    <tbody>`;
	
	discosPorAnno.forEach(disco => {
		tabla += `<tr>
				        <td>${disco.nombre}</td>
				        <td>${disco.grupo}</td>
				        <td>${disco.anno}</td>
				        <td>${disco.tipoMusica}</td>
				  </tr>`;
	});
	
	tabla += `</tbody></table>`;
	
	document.getElementById('resultado').innerHTML = tabla;
}
