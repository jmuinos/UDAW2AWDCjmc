import {DiscoAux} from "./DiscoAux.js";

let arrayDiscos = [];

document.getElementById('formularioDiscos').addEventListener('submit', function (event) {
	event.preventDefault();
	
	// Realizar la validación y aplicar estilos en el envío del formulario.
	let isFormValid = validarTodosLosCampos();
	
	
	// Si la validación es exitosa, crea un nuevo DiscoAux
	if (isFormValid) {
		let nombre = document.getElementById('nombreDisco').value;
		let grupo = document.getElementById('grupoMusica').value;
		let anno = parseInt(document.getElementById('anoPublicacion').value);
		let tipoMusica = document.getElementById('tipoMusica').value;
		let localizacion = parseInt(document.getElementById('localizacion').value);
		
		let nuevoDisco = new DiscoAux(nombre, grupo, anno, tipoMusica, localizacion);
		arrayDiscos.push(nuevoDisco);
		addDiscoTableRow();
	}
});

/**
 * Crea una table row por cada disco que hay en la lista de discos.
 */
function addDiscoTableRow() {
	let tabla = '';
	arrayDiscos.forEach(disco => {
		tabla += `<tr>
                      <td>${disco.nombre}</td>
                      <td>${disco.grupo}</td>
                      <td>${disco.ano}</td>
                      <td>${disco.localizacion}</td>
                 </tr>`;
	});
	document.getElementById('listaDiscos').innerHTML = tabla;
}

function validarTodosLosCampos() {
	return validarCampo("nombreDisco", validarCadenaMax20) &&
		validarCampo("grupoMusica", validarCadenaMax20) &&
		validarCampo("anoPublicacion", validarAnoPublicacion) &&
		validarCampo("localizacion", validarLocalizacion);
}

function validarCampo(nombreInput, nombreFuncionDeValidacion) {
	const inputElement = document.getElementById(nombreInput);
	const isValid = nombreFuncionDeValidacion(inputElement.value);
	aplicarEstilosDeValidacion(inputElement, isValid);
	return isValid;
}

function aplicarEstilosDeValidacion(inputElement, isValid) {
	if (!isValid) {
		inputElement.labels[0].classList.add('text-danger');
		inputElement.classList.add('is-invalid');
	} else {
		inputElement.labels[0].classList.remove('text-danger');
		inputElement.classList.remove('is-invalid');
	}
}

// Añadir event listeners para la validación en tiempo real.
["nombreDisco", "grupoMusica", "anoPublicacion", "localizacion"].forEach(id => {
	const inputElement = document.getElementById(id);
	inputElement.addEventListener("input", function () {
		validarCampo(id, getFuncionDeValidacion(id));
	});
});

function getFuncionDeValidacion(id) {
	switch (id) {
		case "nombreDisco":
		case "grupoMusica":
			return validarCadenaMax20;
		case "anoPublicacion":
			return validarAnoPublicacion;
		case "localizacion":
			return validarLocalizacion;
		default:
			return () => true; // Por defecto, una función que siempre valida a true.
	}
}

/**
 * Se verifica que la cadena recibida no esté vacía y que no tenga más de 20 caracteres.
 * Se usa tanto para Nombre del Disco como para Nombre del Grupo Musical
 * @param cadena
 * @returns {boolean}
 */
function validarCadenaMax20(cadena) {
	return /^.{0,20}$/.test(cadena);
}

/**
 * Se verifica que ano tenga 4 caracteres numéricos
 * @param ano
 * @returns {boolean}
 */
function validarAnoPublicacion(ano) {
	return /^\d{0,4}$/.test(ano);
}

/**
 *  Se verifica si el campo está vacío o si es un número
 * @param localizacion
 * @returns {boolean}
 */
function validarLocalizacion(localizacion) {
	return /^\d*$/.test(localizacion);
}

