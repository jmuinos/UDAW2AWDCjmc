document.addEventListener('DOMContentLoaded', init);

async function init() {
	try {
		await cargarTareasIniciales();
		configurarEventosUI();
		renderizarTareas();
	} catch (error) {
		console.error("Error al cargar las tareas iniciales:", error);
	}
}

async function cargarTareasIniciales() {
	const response = await fetch('tareasIniciales.json');
	if (!response.ok) {
		throw new Error('Falló la carga de tareas iniciales');
	}
	tareasIniciales = await response.json();
}

function configurarEventosUI() {
	const btnAnadir = document.getElementById('anadirTareaBtn');
	const inputTarea = document.getElementById('nuevaTareaInput');
	
	btnAnadir.addEventListener('click', () => {
		const textoTarea = inputTarea.value.trim();
		if (textoTarea) {
			agregarTarea(textoTarea);
			inputTarea.value = ''; // Limpiar input
			renderizarTareas();
		}
	});
}

function agregarTarea(texto) {
	tareasIniciales.push({ texto: texto, realizada: false });
}

function renderizarTareas() {
	const listaTareas = document.getElementById('listaTareas');
	listaTareas.style.listStyleType = 'none';
	listaTareas.style.padding='0';
	listaTareas.innerHTML = ''; // Limpiar lista
	
	tareasIniciales.forEach((tarea, index) => {
		const li = crearElementoTarea(tarea, index);
		listaTareas.appendChild(li);
	});
}

function crearElementoTarea(tarea, index) {
	const li = document.createElement('li');
	const checkbox = document.createElement('input');
	checkbox.type = 'checkbox';
	checkbox.checked = tarea.realizada;
	checkbox.addEventListener('click', () => marcarTarea(index, checkbox.checked));
	
	const texto = document.createTextNode(tarea.texto);
	li.appendChild(checkbox);
	li.appendChild(texto);
	
	if (tarea.realizada) {
		li.classList.add('tarea-realizada');
	}
	
	return li;
}

function marcarTarea(index, realizada) {
	tareasIniciales[index].realizada = realizada;
	renderizarTareas();
}

let tareasIniciales = [];
