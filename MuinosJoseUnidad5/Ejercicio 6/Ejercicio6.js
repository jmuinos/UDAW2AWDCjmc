/**
 * Escucha el evento DOMContentLoaded y realiza acciones iniciales.
 * Recupera y muestra el nombre del jugador y el número de visitas desde las cookies.
 * Agrega un listener al formulario para iniciar el juego.
 */
document.addEventListener('DOMContentLoaded', function () {
	let jugadorNombre = document.getElementById('nombreJugador');
	let visitasJugador = document.getElementById('visitasJugador');
	
	let nombreGuardado = obtenerValorCookie("nombreJugador");
	let visitasGuardadas = obtenerValorCookie("numeroVisitas");
	
	if (nombreGuardado != null) {
		jugadorNombre.value = nombreGuardado;
		visitasJugador.textContent = "Visitas: " + (visitasGuardadas || 0);
	}
	
	document.getElementById('formJugador').addEventListener('submit', function (event) {
		event.preventDefault();
		document.cookie = "nombreJugador=" + jugadorNombre.value + ";";
		visitasGuardadas = parseInt(visitasGuardadas) || 0;
		document.cookie = "numeroVisitas=" + (visitasGuardadas + 1) + ";";
		visitasJugador.textContent = "Visitas: " + (visitasGuardadas + 1);
		distribuirCartas();
	});
});

/**
 * Representa las rutas de las imágenes de las cartas para el juego.
 */
let cartas = ['./img1.png', './img2.png', './img3.png', './img4.png', './img5.png', './img6.png',
	'./img1.png', './img2.png', './img3.png', './img4.png', './img5.png', './img6.png'];

/**
 * Contador de aciertos del jugador.
 * @type {number}
 */
let aciertos = 0;

/**
 * Array para almacenar las cartas seleccionadas actualmente por el jugador.
 * @type {HTMLImageElement[]}
 */
let cartasSeleccionadas = [];

/**
 * Distribuye y mezcla las cartas en el tablero de juego.
 * Crea y agrega elementos de imagen a las celdas de la tabla, asignando eventos de clic a cada uno.
 */
function distribuirCartas() {
	let tabla = document.getElementById('tablaJuego');
	tabla.innerHTML = ''; // Limpiar tabla si ya contiene celdas
	let cartasMezcladas = cartas.sort(() => 0.5 - Math.random());
	
	for (let i = 0; i < 12; i++) {
		let td = document.createElement('td');
		let img = document.createElement('img');
		img.src = cartasMezcladas[i];
		img.style.display = 'none';
		td.appendChild(img);
		td.addEventListener("click", function () {
			manejarSeleccionCarta(img);
		});
		if (i % 4 === 0) {
			let tr = document.createElement('tr');
			tabla.appendChild(tr);
		}
		tabla.lastChild.appendChild(td);
	}
}

/**
 * Maneja la lógica de selección de cartas en el juego.
 * Muestra la imagen seleccionada y compara con la selección anterior para determinar un acierto.
 * @param {HTMLImageElement} img - Elemento de imagen de la carta seleccionada.
 */
function manejarSeleccionCarta(img) {
	img.style.display = 'block';
	cartasSeleccionadas.push(img);
	if (cartasSeleccionadas.length === 2) {
		if (cartasSeleccionadas[0].src === cartasSeleccionadas[1].src) {
			aciertos++;
			document.getElementById("totalAciertos").textContent = aciertos;
			cartasSeleccionadas = [];
		} else {
			setTimeout(function () {
				cartasSeleccionadas.forEach(function (img) {
					img.style.display = 'none';
				});
				cartasSeleccionadas = [];
			}, 1000);
		}
	}
}

/**
 * Obtiene el valor de una cookie por su nombre.
 * @param {string} nombre - El nombre de la cookie que se quiere recuperar.
 * @returns {string|null} Valor de la cookie o null si no se encuentra.
 */
function obtenerValorCookie(nombre) {
	let nombreCookie = nombre + "=";
	let decodificarCookie = decodeURIComponent(document.cookie);
	let arrayCookie = decodificarCookie.split(';');
	for (let i = 0; i < arrayCookie.length; i++) {
		let c = arrayCookie[i];
		while (c.charAt(0) === ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(nombreCookie) === 0) {
			return c.substring(nombreCookie.length, c.length);
		}
	}
	return null;
}
