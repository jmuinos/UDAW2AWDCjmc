let edificios = [];

document.getElementById("formCrearEdificio").addEventListener("submit", function(e) {
	e.preventDefault();
	
	const direccion = document.getElementById("direccion").value;
	const plantas = parseInt(document.getElementById("plantas").value, 10);
	const puertasPorPlanta = parseInt(document.getElementById("puertasPorPlanta").value, 10);
	
	if (direccion && plantas > 0 && puertasPorPlanta > 0) {
		const nuevoEdificio = {
			direccion,
			plantas: Array.from({length: plantas}, () => Array(puertasPorPlanta).fill('Sin propietario'))
		};
		edificios.push(nuevoEdificio);
		alert("Edificio creado exitosamente");
		actualizarListaEdificios();
		actualizarSelectEdificio();
	} else {
		alert("Por favor, ingrese datos válidos.");
	}
});

document.getElementById("formModificarPropietario").addEventListener("submit", function(e) {
	e.preventDefault();
	
	const edificioSeleccionadoIndex = document.querySelector('input[name="edificioSeleccionado"]:checked')?.value;
	const planta = parseInt(document.getElementById("planta").value, 10);
	const puerta = parseInt(document.getElementById("puerta").value, 10);
	const propietario = document.getElementById("propietario").value;
	
	if (edificioSeleccionadoIndex !== undefined && planta >= 0 && puerta >= 0 && propietario) {
		edificios[edificioSeleccionadoIndex].plantas[planta][puerta] = propietario;
		alert("Propietario modificado exitosamente");
	} else {
		alert("Por favor, complete todos los campos correctamente.");
	}
});

document.getElementById("btnMostrarEdificio").addEventListener("click", function() {
	const edificioIndex = document.getElementById("selectEdificio").value;
	const edificio = edificios[edificioIndex];
	const tablaEdificioElement = document.getElementById("tablaEdificio");
	tablaEdificioElement.innerHTML = '';
	
	const tabla = document.createElement("table");
	tabla.className = "table table-striped"; // Aplicar clases de Bootstrap
	
	edificio.plantas.forEach((planta, plantaIndex) => {
		planta.forEach((propietario, puertaIndex) => {
			const fila = tabla.insertRow();
			const celdaPlanta = fila.insertCell();
			celdaPlanta.textContent = `Planta ${plantaIndex}, Puerta ${puertaIndex}`;
			const celdaPropietario = fila.insertCell();
			celdaPropietario.textContent = propietario;
		});
	});
	tablaEdificioElement.appendChild(tabla);
});

function actualizarListaEdificios() {
	const listaEdificiosElement = document.getElementById("listaEdificios");
	listaEdificiosElement.innerHTML = '';
	edificios.forEach((edificio, index) => {
		const radioInput = document.createElement("input");
		radioInput.type = "radio";
		radioInput.name = "edificioSeleccionado";
		radioInput.value = index;
		
		const label = document.createElement("label");
		label.textContent = edificio.direccion;
		label.prepend(radioInput);
		
		listaEdificiosElement.appendChild(label);
		listaEdificiosElement.appendChild(document.createElement("br"));
	});
}

function actualizarSelectEdificio() {
	const selectEdificio = document.getElementById("selectEdificio");
	selectEdificio.innerHTML = '';
	edificios.forEach((edificio, index) => {
		const option = document.createElement("option");
		option.value = index;
		option.textContent = edificio.direccion;
		selectEdificio.appendChild(option);
	});
}

// Inicializar la lista de edificios y el select al cargar la página
actualizarListaEdificios();
actualizarSelectEdificio();
