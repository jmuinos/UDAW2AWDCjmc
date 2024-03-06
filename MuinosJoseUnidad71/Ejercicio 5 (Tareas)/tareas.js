document.addEventListener('DOMContentLoaded', () => {
	let tareasIniciales = [];
	
	const listaTareas = document.getElementById('listaTareas');
	const inputTarea = document.getElementById('nuevaTareaInput');
	const btnAnadir = document.getElementById('anadirTareaBtn');
	
	cargarTareasIniciales();
	
	// Función para cargar tareas iniciales desde un archivo JSON
	function cargarTareasIniciales() {
		//CON XHR SERÍA ASÍ:
		// const xhr = new XMLHttpRequest();
		// xhr.open('GET', 'tareasIniciales.json', true);
		//
		// xhr.onload = function () {
		// 	if (this.status === 200) {
		// 		tareasIniciales = JSON.parse(this.responseText);
		// 	} else {
		// 		console.error('No se pudieron cargar los equipos');
		// 	}
		// };
		// xhr.send();
		fetch('tareasIniciales.json')
			.then(response => response.json())
			.then(data => {
				tareasIniciales = data;
				renderizarTareas(); // Asegurarse de renderizar las tareas después de cargarlas
			})
			.catch(error => console.error("Error al cargar las tareas iniciales:", error));
	}
	
	// Añadir tarea
	btnAnadir.addEventListener('click', () => {
		if (inputTarea.value.trim() !== '') {
			tareasIniciales.push({ texto: inputTarea.value, realizada: false });
			inputTarea.value = ''; // Limpiar input
			renderizarTareas();
		}
	});
	
	// Renderizar tareas
	function renderizarTareas() {
		listaTareas.style.listStyleType = 'none';
		listaTareas.style.padding='0';
		listaTareas.innerHTML = ''; // Limpiar lista
		tareasIniciales.forEach((tarea, index) => {
			const li = document.createElement('li');
			const checkbox = document.createElement('input');
			checkbox.type = 'checkbox';
			checkbox.checked = tarea.realizada;
			checkbox.addEventListener('click', () => marcarTarea(index, checkbox.checked));
			
			const texto = document.createTextNode(tarea.texto);
			li.appendChild(checkbox);
			li.appendChild(texto);
			if (tarea.realizada) {
				li.classList.add('incorrecto');
			}
			
			listaTareas.appendChild(li);
		});
	}
	
	// Marcar tarea como completada
	function marcarTarea(index, realizada) {
		tareasIniciales[index].realizada = realizada;
		renderizarTareas();
	}
});
