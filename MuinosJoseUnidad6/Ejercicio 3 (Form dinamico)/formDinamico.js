import {DiscoAux} from "./DiscoAux.js";

const arrayDiscos = [];

document.addEventListener('DOMContentLoaded', () => {
	crearFormulario();
	crearTablaDiscos();
	
	const form = document.querySelector('form');
	const nombreDisco = document.getElementById('nombreDisco');
	const nombreGrupo = document.getElementById('nombreGrupo');
	const anoPublicacion = document.getElementById('anoPublicacion');
	const generoMusical = document.getElementById('generoMusical');
	const localizacionDisco = document.getElementById('localizacionDisco');
	const condiciones = document.getElementById('condiciones');
	
	form.addEventListener('submit', event => {
		event.preventDefault();
		// Aplicar validación solo en el intento de envío
		const inputs = [nombreDisco, nombreGrupo, anoPublicacion, localizacionDisco, condiciones];
		if (form.checkValidity() && condiciones.checked) {
			const nuevoDisco = new DiscoAux(
				nombreDisco.value,
				nombreGrupo.value,
				anoPublicacion.value,
				generoMusical.value,
				localizacionDisco.value
			);
			arrayDiscos.push(nuevoDisco);
			addDiscoTableRow();
			form.reset(); // Resetear el formulario después de agregar un disco
			// Borrar la clase 'was-validated' para limpiar la validación visual
			form.classList.remove('was-validated');
		} else {
			// Asegurar que los mensajes de error se muestren solo tras el intento de envío
			validacionCustom(inputs);
			form.classList.add('was-validated'); // Mantener estilos de validación tras intento fallido
		}
	});
	
	// Limpiar manualmente la validación visual
	form.addEventListener('reset', () => {
		form.classList.remove('was-validated'); // Borrar los estilos de validación
		// Limpiar mensajes de error específicos de cada input
		limpiarMensajesError();
	});
});

function limpiarMensajesError() {
	// Ocultar los mensajes de error
	document.querySelectorAll('.invalid-feedback').forEach(errorDiv => {
		errorDiv.style.display = 'none';
	});
	
	// Borrar la clase 'is-invalid' de cada input que la tenga
	document.querySelectorAll('.is-invalid').forEach(input => {
		input.classList.remove('is-invalid');
	});
}

function crearFormulario() {
	const container = document.querySelector('.container');
	const form = document.createElement('form');
	form.className = 'row g-3 needs-validation';
	form.setAttribute('novalidate', 'novalidate');
	
	// Campos del form
	const campos = [
		{ id: 'nombreDisco', label: 'Título', placeholder: 'Ej: Highway to Hell', type: 'text', required: true, pattern: null, title: null },
		{ id: 'nombreGrupo', label: 'Grupo o Cantante', placeholder: 'Ej: ACDC', type: 'text', required: true, pattern: null, title: null },
		{ id: 'anoPublicacion', label: 'Año de Publicación', placeholder: 'Ej: 1980', type: 'text', required: true, pattern: '^(19\\d{2}|20[01]\\d|202[0-3])$', title: 'El año debe ser entre 1900 y 2023.' },
		{ id: 'localizacionDisco', label: 'Número de estantería', placeholder: 'Ej: 5', type: 'text', required: true, pattern: '\\d+', title: 'La localización debe ser un número entero.' }
	];
	
	campos.forEach(({id, label, placeholder, type, required, pattern, title}) => {
		const divCampo = document.createElement('div');
		divCampo.className = 'col-md-4';
		
		const labelCampo = document.createElement('label');
		labelCampo.className = 'form-label';
		labelCampo.setAttribute('for', id);
		labelCampo.textContent = label;
		
		const inputCampo = document.createElement('input');
		inputCampo.type = type;
		inputCampo.className = 'form-control';
		inputCampo.id = id;
		inputCampo.name = id;
		inputCampo.placeholder = placeholder;
		if (required) inputCampo.setAttribute('required', '');
		if (pattern) inputCampo.setAttribute('pattern', pattern);
		if (title) inputCampo.setAttribute('title', title);
		
		divCampo.appendChild(labelCampo);
		divCampo.appendChild(inputCampo);
		
		// Div para el mensaje de error
		const errorDiv = document.createElement('div');
		errorDiv.className = 'invalid-feedback';
		errorDiv.id = `${id}Invalid`;
		
		divCampo.appendChild(errorDiv);
		form.appendChild(divCampo);
	});
	
	// Select para el género musical
	const divGeneroMusical = document.createElement('div');
	divGeneroMusical.className = 'col-md-3';
	
	const labelGeneroMusical = document.createElement('label');
	labelGeneroMusical.className = 'form-label';
	labelGeneroMusical.setAttribute('for', 'generoMusical');
	labelGeneroMusical.textContent = 'Género Musical';
	
	const selectGeneroMusical = document.createElement('select');
	selectGeneroMusical.className = 'form-select';
	selectGeneroMusical.id = 'generoMusical';
	selectGeneroMusical.innerHTML = `
        <option selected disabled value="">Elegir...</option>
        <option>Rock</option>
        <option>Pop</option>
        <option>Funk</option>
    `;
	
	divGeneroMusical.appendChild(labelGeneroMusical);
	divGeneroMusical.appendChild(selectGeneroMusical);
	
	// Añadir el div para el mensaje de error del select
	const errorGeneroMusical = document.createElement('div');
	errorGeneroMusical.id = 'generoMusicalInvalid';
	errorGeneroMusical.className = 'invalid-feedback';
	
	divGeneroMusical.appendChild(errorGeneroMusical);
	form.appendChild(divGeneroMusical);
	
	// Checkbox para las condiciones del servicio
	const divCondiciones = document.createElement('div');
	divCondiciones.className = 'col-12';
	
	const divCheck = document.createElement('div');
	divCheck.className = 'form-check';
	
	const inputCondiciones = document.createElement('input');
	inputCondiciones.className = 'form-check-input';
	inputCondiciones.type = 'checkbox';
	inputCondiciones.id = 'condiciones';
	inputCondiciones.name = 'condiciones';
	inputCondiciones.setAttribute('required', '');
	
	const labelCondiciones = document.createElement('label');
	labelCondiciones.className = 'form-check-label';
	labelCondiciones.setAttribute('for', 'condiciones');
	labelCondiciones.textContent = 'Aceptar condiciones del servicio.';
	
	divCheck.appendChild(inputCondiciones);
	divCheck.appendChild(labelCondiciones);
	
	// Añadir el div para el mensaje de error del checkbox
	const errorCondiciones = document.createElement('div');
	errorCondiciones.id = 'condicionesInvalid';
	errorCondiciones.className = 'invalid-feedback';
	
	divCheck.appendChild(errorCondiciones);
	divCondiciones.appendChild(divCheck);
	form.appendChild(divCondiciones);
	
	// Botón de envío
	const botonEnviar = document.createElement('button');
	botonEnviar.className = 'btn btn-primary w-25 mb-5';
	botonEnviar.type = 'submit';
	botonEnviar.textContent = 'Enviar formulario';
	form.appendChild(botonEnviar);
	
	// Añadir formulario al contenedor
	container.appendChild(form);
}

function crearTablaDiscos() {
	// Contenedor principal
	const container = document.querySelector('.container');
	
	// Crear tabla
	const table = document.createElement('table');
	table.className = 'table table-hover';
	const thead = document.createElement('thead');
	thead.innerHTML = `<tr><th>Nombre</th><th>Grupo</th><th>Año</th><th>Género</th><th>Localización</th></tr>`;
	table.appendChild(thead);
	
	// Cuerpo de la tabla
	const tbody = document.createElement('tbody');
	tbody.id = 'listaDiscos';
	table.appendChild(tbody);
	
	// Añadir tabla al contenedor
	container.appendChild(table);
}

function validacionCustom(inputArray) {
	inputArray.forEach(input => {
		const errorContainer = document.getElementById(`${input.id}Invalid`);
		errorContainer.textContent = ''; // Limpiar mensaje de error anterior
		
		if (!input.checkValidity()) {
			if (input.validity.valueMissing) {
				errorContainer.textContent = "Este campo es obligatorio.";
			} else if (input.validity.patternMismatch) {
				errorContainer.textContent = input.title; // Aclaración: uso el atributo title para el mensaje de error
			} else if (input.validity.typeMismatch) {
				errorContainer.textContent = "Por favor, ingrese un valor válido.";
			}
			
			errorContainer.style.display = 'block';
		} else {
			errorContainer.style.display = 'none';
		}
	});
}

function addDiscoTableRow() {
	const listaDiscos = document.getElementById('listaDiscos');
	listaDiscos.innerHTML = ''; // Limpiar tabla antes de añadir filas nuevas
	arrayDiscos.sort((a, b) => a.nombre.localeCompare(b.nombre)) // Orden alfabético por nombre
		.forEach(disco => {
			const tr = document.createElement('tr');
			tr.innerHTML = `<td>${disco.nombre}</td><td>${disco.grupo}</td><td>${disco.ano}</td><td>${disco.generoMusical}</td><td>${disco.localizacion}</td>`;
			listaDiscos.appendChild(tr);
		});
}
