// ejercicio1.js

import * as arrays from './arrays.js';

let countries = ['España', 'Francia', 'Alemania', 'Holanda', 'Bélgica'];

// Mostrar número de países
document.getElementById('show-number-btn').addEventListener('click', () => {
	document.getElementById('output').textContent = `Número de países: ${arrays.numeroDeElementos(countries)}`;
});

// Mostrar listado de países
document.getElementById('show-countries-btn').addEventListener('click', () => {
	document.getElementById('output').textContent = arrays.mostrarElementos(countries);
});

// Mostrar países en orden inverso
document.getElementById('show-countries-reverse-btn').addEventListener('click', () => {
	document.getElementById('output').textContent = arrays.elementosInverso(countries);
});

// Mostrar países en orden alfabético
document.getElementById('show-countries-sorted-btn').addEventListener('click', () => {
	document.getElementById('output').textContent = arrays.elementosOrdenados(countries);
});

// Añadir país al inicio
document.getElementById('add-country-start-btn').addEventListener('click', () => {
	let country = document.getElementById('add-country-input').value;
	if (country) {
		arrays.anadirAlPrincipio(country, countries);
		document.getElementById('output').textContent = `País añadido al inicio: ${country}`;
		document.getElementById('add-country-input').value = ''; // Limpiar el campo
	} else {
		document.getElementById('output').textContent = 'Por favor, introduce un país para añadir.';
	}
});

// Añadir país al final
document.getElementById('add-country-end-btn').addEventListener('click', () => {
	let country = document.getElementById('add-country-input').value;
	if (country) {
		arrays.anadirAlFinal(country, countries);
		document.getElementById('output').textContent = `País añadido al final: ${country}`;
		document.getElementById('add-country-input').value = ''; // Limpiar el campo
	} else {
		document.getElementById('output').textContent = 'Por favor, introduce un país para añadir.';
	}
});

// Borrar país del inicio
document.getElementById('remove-country-start-btn').addEventListener('click', () => {
	let removedCountry = arrays.borrarDelPrincipio(countries);
	document.getElementById('output').textContent = `País eliminado del inicio: ${removedCountry}`;
});

// Borrar país del final
document.getElementById('remove-country-end-btn').addEventListener('click', () => {
	let removedCountry = arrays.borrarDelFinal(countries);
	document.getElementById('output').textContent = `País eliminado del final: ${removedCountry}`;
});

// Buscar país por posición
document.getElementById('find-country-by-position-btn').addEventListener('click', () => {
	let position = parseInt(document.getElementById('find-country-by-position-input').value);
	if (!isNaN(position)) {
		let country = arrays.elementoEnPosicion(position, countries);
		document.getElementById('output').textContent = country ? `País en la posición ${position}: ${country}` : 'Posición fuera de rango.';
	} else {
		document.getElementById('output').textContent = 'Por favor, introduce un número válido para la posición.';
	}
});

// Buscar país por nombre
document.getElementById('find-country-by-name-btn').addEventListener('click', () => {
	let name = document.getElementById('find-country-by-name-input').value;
	if (name) {
		let position = arrays.posicionDeElemento(name, countries);
		document.getElementById('output').textContent = position >= 0 ? `Posición del país '${name}': ${position}` : 'País no encontrado.';
	} else {
		document.getElementById('output').textContent = 'Por favor, introduce un nombre de país válido.';
	}
});
