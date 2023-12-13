import {Edificio} from "./Edificio.js";
import {Planta} from "./Planta.js";
import {Puerta} from "./Puerta.js";

const edificioSeleccionado = document.getElementById('selector-edificio');
const edificiosLista = [];
const cardPlantasPuertas = document.getElementById('card-agregar-plantas-puertas');
const cardPropietario = document.getElementById('card-agregar-propietario');
const cardEdificioInfo = document.getElementById('card-edificio-info');

document.addEventListener('DOMContentLoaded', inicializarEventListeners);

/**
 * Inicializa los event listeners en la carga del documento
 */
function inicializarEventListeners() {
	edificioSeleccionado.addEventListener('change', handlerEdificioSeleccionadoChange);
	document.getElementById('crearEdificioBtn').addEventListener('click', crearEdificio);
	document.getElementById('agregarPlantasPuertasBtn').addEventListener('click', agregarPlantasYPuertas);
	document.getElementById('agregarPropietarioBtn').addEventListener('click', agregarPropietario);
}

/**
 * Manejador del cambio de selección de edificio
 */
function handlerEdificioSeleccionadoChange() {
	toggleCards();
	const edificioActual = obtenerEdificioSeleccionado();
	if (edificioActual) {
		mostrarInformacionEdificio(edificioActual);
	}
}

/**
 * Muestra u oculta tarjetas basadas en si hay un edificio seleccionado
 */
function toggleCards() {
	const isSelected = edificioSeleccionado.value !== "null";
	[cardPlantasPuertas, cardPropietario, cardEdificioInfo].forEach(card => {
		card.classList.toggle('d-none', !isSelected);
		card.classList.toggle('d-block', isSelected);
	});
}

/**
 * Muestra la información detallada del edificio seleccionado
 * @param {Edificio} edificio - El edificio cuya información se va a mostrar
 */
function mostrarInformacionEdificio(edificio) {
	let infoHtml = `<h3>Información del Edificio</h3>
                    <p>Calle: ${edificio.calle}</p>
                    <p>Número: ${edificio.numero}</p>
                    <p>Código Postal: ${edificio.codigoPostal}</p>
                    <p>Número de Plantas: ${edificio.plantas.length}</p>`;
	
	edificio.plantas.forEach(planta => {
		infoHtml += `<div>
                        <h4>Planta: ${planta.numero}</h4>
                        <ul>`;
		planta.puertas.forEach(puerta => {
			infoHtml += `<li>Puerta ${puerta.numero}: Propietario - ${puerta.propietario}</li>`;
		});
		infoHtml += `</ul></div>`;
	});
	
	cardEdificioInfo.innerHTML = `<div class="container p-3">${infoHtml}</div>`;
}

/**
 * Rellena el selector de edificios con opciones basadas en la lista de edificios
 */
function rellenarSelectorEdificios() {
	const selector = document.getElementById('selector-edificio');
	selector.innerHTML = '<option value="" disabled selected>Seleccione una</option>';
	edificiosLista.forEach(({calle, numero}) => {
		selector.innerHTML += `<option value="${numero}-${calle}">${numero} - ${calle}</option>`;
	});
}

/**
 * Crea un nuevo edificio y lo añade a la lista
 * @param {Event} event - El evento del botón 'Crear Edificio'
 */
function crearEdificio(event) {
	event.preventDefault();
	const calle = document.getElementById('calle').value;
	const numero = document.getElementById('numero').value;
	const codigoPostal = document.getElementById('codigoPostal').value;
	const numeroPlantas = parseInt(document.getElementById('numeroPlantas').value);
	
	const plantas = crearArrayDePlantas(numeroPlantas);
	edificiosLista.push(new Edificio(calle, numero, codigoPostal, plantas));
	rellenarSelectorEdificios();
}

/**
 * Crea un array de objetos Planta basado en la cantidad especificada de plantas
 * @param {number} cantidadPlantas - La cantidad de plantas a crear
 * @returns {Planta[]} Un array de objetos Planta
 */
function crearArrayDePlantas(cantidadPlantas) {
	let plantas = [];
	for (let i = 0; i < cantidadPlantas; i++) {
		const numeroPlanta = i + 1;
		const cantidadPuertas = parseInt(prompt(`Número de puertas para la planta ${numeroPlanta}:`)) || 0;
		const puertas = crearArrayDePuertas(cantidadPuertas);
		plantas.push(new Planta(numeroPlanta, puertas));
	}
	return plantas;
}

/**
 * Crea un array de objetos Puerta basado en la cantidad especificada de puertas
 * @param {number} cantidadPuertas - La cantidad de puertas a crear
 * @returns {Puerta[]} Un array de objetos Puerta
 */
function crearArrayDePuertas(cantidadPuertas) {
	let puertas = [];
	for (let i = 0; i < cantidadPuertas; i++) {
		const numeroPuerta = i + 1;
		const nombrePropietario = prompt(`Nombre del propietario para la puerta ${numeroPuerta}:`) || 'Sin asignar';
		puertas.push(new Puerta(numeroPuerta, nombrePropietario));
	}
	return puertas;
}

/**
 * Agrega plantas y puertas al edificio actualmente seleccionado
 */
function agregarPlantasYPuertas() {
	const numPlantas = parseInt(document.getElementById('numPlantas').value) || 0;
	const numPuertas = parseInt(document.getElementById('numPuertas').value) || 0;
	const edificioActual = obtenerEdificioSeleccionado();
	if (!edificioActual) return;
	
	for (let i = 0; i < numPlantas; i++) {
		const numeroPlanta = edificioActual.plantas.length + 1;
		const nuevasPuertas = crearArrayDePuertas(numPuertas);
		edificioActual.plantas.push(new Planta(numeroPlanta, nuevasPuertas));
	}
	
	toggleCards();
	mostrarInformacionEdificio(edificioActual);
}

/**
 * Agrega un propietario a una puerta específica de un edificio
 */
function agregarPropietario() {
	const numeroPlanta = parseInt(document.getElementById('plantaPropietario').value) || 0;
	const numeroPuerta = parseInt(document.getElementById('puertaPropietario').value) || 0;
	const nombrePropietario = document.getElementById('nombrePropietario').value;
	const edificioActual = obtenerEdificioSeleccionado();
	if (!edificioActual) return;
	
	const planta = edificioActual.plantas.find(planta => planta.numero === numeroPlanta);
	if (!planta) return;
	
	const puerta = planta.puertas.find(puerta => puerta.numero === numeroPuerta);
	if (!puerta) return;
	
	puerta.propietario = nombrePropietario;
	
	toggleCards();
	mostrarInformacionEdificio(edificioActual);
}

/**
 * Obtiene el edificio actualmente seleccionado
 * @return {Edificio|null} El edificio seleccionado o null si no hay ninguno
 */
function obtenerEdificioSeleccionado() {
	const [numero, calle] = edificioSeleccionado.value.split('-');
	return edificiosLista.find(edificio => edificio.numero === numero && edificio.calle === calle);
}