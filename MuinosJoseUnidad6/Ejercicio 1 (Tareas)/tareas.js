document.addEventListener('DOMContentLoaded', () => {
	const tareasIniciales = [
		{ texto: 'Hacer la colada', realizada: false },
		{ texto: 'Preparar la cena', realizada: false },
		{ texto: 'Tirar la basura', realizada: false }
	];
	
	const listaTareas = document.getElementById('listaTareas');
	const inputTarea = document.getElementById('nuevaTareaInput');
	const btnAnadir = document.getElementById('anadirTareaBtn');
	
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
	
	renderizarTareas(); // Renderizar tareas iniciales
});
