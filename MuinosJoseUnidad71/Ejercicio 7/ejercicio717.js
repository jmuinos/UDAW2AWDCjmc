document.addEventListener('DOMContentLoaded', function() {
	cargarPilotos();
});

let pilotos = [];
const pilotosPorPagina = 3;
let paginaActual = 1;

function cargarPilotos() {
	fetch('pilotos.json')
		.then(response => response.json())
		.then(data => {
			pilotos = data.pilotos;
			actualizarFiltroNacionalidades();
			filtrarYOrdenar(); // Inicializa la vista con los datos cargados
		})
		.catch(error => console.error('Error al cargar los pilotos:', error));
}

function actualizarFiltroNacionalidades() {
	const nacionalidades = Array.from(new Set(pilotos.map(piloto => piloto.nacionalidad)));
	const filtroNacionalidad = document.getElementById('filtroNacionalidad');
	nacionalidades.forEach(nacionalidad => {
		const opcion = document.createElement('option');
		opcion.value = nacionalidad;
		opcion.textContent = nacionalidad;
		filtroNacionalidad.appendChild(opcion);
	});
}

function filtrarYOrdenar() {
	const orden = document.getElementById('ordenarPor').value;
	const filtro = document.getElementById('filtroNacionalidad').value;
	
	let pilotosFiltrados = pilotos.filter(piloto => filtro === 'todos' || piloto.nacionalidad === filtro);
	
	if (orden === 'nombre') {
		pilotosFiltrados.sort((a, b) => a.nombre.localeCompare(b.nombre));
	} else if (orden === 'equipo') {
		pilotosFiltrados.sort((a, b) => a.equipo.localeCompare(b.equipo));
	}
	
	mostrarPilotos(pilotosFiltrados);
}

function mostrarPilotos(pilotosFiltrados) {
	const lista = document.getElementById('listaPilotos');
	lista.innerHTML = '';
	
	const inicio = (paginaActual - 1) * pilotosPorPagina;
	const fin = inicio + pilotosPorPagina;
	const pilotosPagina = pilotosFiltrados.slice(inicio, fin);
	
	pilotosPagina.forEach(piloto => {
		const item = document.createElement('div');
		item.textContent = `${piloto.nombre} - ${piloto.equipo} - ${piloto.nacionalidad}`;
		item.onclick = function() { destacarPiloto(item); };
		lista.appendChild(item);
	});
	
	actualizarControlesPaginacion(pilotosFiltrados.length);
}

function actualizarControlesPaginacion(totalPilotos) {
	const controlesPaginacion = document.getElementById('controlesPaginacion');
	controlesPaginacion.innerHTML = '';
	const numeroPaginas = totalPilotos <= pilotosPorPagina ? 1 : Math.ceil(totalPilotos / pilotosPorPagina);
	
	for (let i = 1; i <= numeroPaginas; i++) {
		const botonPagina = document.createElement('button');
		botonPagina.textContent = i;
		botonPagina.onclick = function() {
			paginaActual = i;
			filtrarYOrdenar();
		};
		controlesPaginacion.appendChild(botonPagina);
	}
}

function destacarPiloto(elemento) {
	elemento.classList.toggle('destacado');
}

// Event listeners para ordenar y filtrar
document.getElementById('ordenarPor').addEventListener('change', filtrarYOrdenar);
document.getElementById('filtroNacionalidad').addEventListener('change', filtrarYOrdenar);
