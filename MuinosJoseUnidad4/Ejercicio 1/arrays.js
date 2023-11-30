// arrays.js

// Mostrar el número de elementos del array
export function numeroDeElementos(array) {
	return array.length;
}

// Mostrar todos los elementos del array
export function mostrarElementos(array) {
	return array.join(', ');
}

// Muestra los elementos del array en sentido inverso
export function elementosInverso(array) {
	return [...array].reverse().join(', ');
}

// Muestra los elementos del array ordenados alfabéticamente
export function elementosOrdenados(array) {
	return [...array].sort().join(', ');
}

// Añadir un elemento al principio del array
export function anadirAlPrincipio(elemento, array) {
	array.unshift(elemento);
}

// Añadir un elemento al final del array
export function anadirAlFinal(elemento, array) {
	array.push(elemento);
}

// Borrar un elemento al principio del array
export function borrarDelPrincipio(array) {
	return array.shift();
}

// Borrar un elemento al final del array
export function borrarDelFinal(array) {
	return array.pop();
}

// Muestra el elemento que se encuentra en una posición
export function elementoEnPosicion(posicion, array) {
	return array[posicion];
}

// Muestra la posición de un elemento
export function posicionDeElemento(elemento, array) {
	return array.indexOf(elemento);
}
