const tablero = document.getElementById('tablero');
let users = [];
let primeraCarta, segundaCarta;
let bloquearTablero = false;
let aciertos = 0;
let btnReiniciar = document.getElementById('nueva-partida-btn');

document.addEventListener('DOMContentLoaded', () => {
	btnReiniciar.addEventListener('click', reiniciar);
	document.getElementById("usuario-aciertos").textContent = aciertos;
})
// CON XHR
// document.addEventListener('DOMContentLoaded', function () {
// 	let xhr = new XMLHttpRequest();
// 	xhr.open('GET', 'https://randomuser.me/api/?results=12&format=XML', true);
// 	xhr.onreadystatechange = function () {
// 		if (xhr.readyState === 4 && xhr.status === 200) {
// 			let xmlDoc = xhr.responseXML;
// 			users = xmlDoc.getElementsByTagName('results');
// 		}
// 	};
// 	xhr.send();
// 	barajar();
// 	generarCartas();
// });


//CON XHR
// function generarCartas() {
// 	let fila; // fila actual
// 	for (let i = 0; i < users.length; i++) {
// 		// Crea una nueva fila cada 4 cartas
// 		if (i % 4 === 0) {
// 			fila = document.createElement("div");
// 			fila.classList.add("row", "align-items-center", "m-0", "p-0", "row-cols-4", "h-auto");
// 			tablero.appendChild(fila);
// 		}
//
// 		let user = users[i];
// 		let imagenUrl = user.getElementsByTagName('large')[0].textContent;
// 		let email = user.getElementsByTagName('email')[0].textContent;
// 		let nombre = user.getElementsByTagName('name')[0].textContent;
//
// 		const cardElement = document.createElement("div");
// 		cardElement.classList.add("col-3-sm", "carta", "d-flex", "justify-content-center", "align-content-center");
//
// 		let divFrente = document.createElement('div');
// 		divFrente.classList.add("frente", "w-100", "h-100");
//
// 		let userImagen = document.createElement('img');
// 		userImagen.src = imagenUrl;
// 		userImagen.alt = 'User Image';
// 		userImagen.title = email;
// 		userImagen.classList.add("rounded", "d-flex", "h-100", "w-auto");
//
// 		let divReves = document.createElement('div');
// 		divReves.className = 'reves';
//
// 		divFrente.appendChild(userImagen);
// 		cardElement.appendChild(divReves);
// 		cardElement.appendChild(divFrente);
// 		cardElement.setAttribute("name", nombre);
// 		fila.appendChild(cardElement);
//
// 		cardElement.addEventListener("click", ponerCartaBocaArriba);
// 	}
// }

// CON FETCH
document.addEventListener('DOMContentLoaded', function () {
	fetch('https://randomuser.me/api/?results=12')
		.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json(); // Se convierte la respuesta a JSON
		})
		.then(data => {
			users = data.results; // Se actualiza para usar el campo 'results' del JSON
			barajar();
			generarCartas();
		})
		.catch(error => console.error('Fetch error:', error));
});

// CON FETCH
function generarCartas() {
	let fila; // fila actual
	tablero.innerHTML = ''; // Limpiar tablero
	for (let i = 0; i < users.length; i++) {
		// Crea una nueva fila cada 4 cartas
		if (i % 4 === 0) {
			fila = document.createElement("div");
			fila.classList.add("row", "align-items-center", "m-0", "p-0", "row-cols-4", "h-auto");
			tablero.appendChild(fila);
		}
		
		let user = users[i];
		let imagenUrl = user.picture.large; // Ajustar acceso a los datos según el formato JSON
		let email = user.email;
		let nombre = `${user.name.first} ${user.name.last}`; // Concatenar nombre y apellido
		
		const cardElement = document.createElement("div");
		cardElement.classList.add("col-3-sm", "carta", "d-flex", "justify-content-center", "align-content-center");
		
		let divFrente = document.createElement('div');
		divFrente.classList.add("frente", "w-100", "h-100");
		
		let userImagen = document.createElement('img');
		userImagen.src = imagenUrl;
		userImagen.alt = 'User Image';
		userImagen.title = email;
		userImagen.classList.add("rounded", "d-flex", "h-100", "w-auto");
		
		let divReves = document.createElement('div');
		divReves.className = 'reves';
		
		divFrente.appendChild(userImagen);
		cardElement.appendChild(divReves);
		cardElement.appendChild(divFrente);
		cardElement.setAttribute("data-name", nombre); // Se usa data-name para almacenar el nombre
		fila.appendChild(cardElement);
		
		cardElement.addEventListener("click", ponerCartaBocaArriba);
	}
}

function barajar() {
	let currentIndex = users.length, randomIndex, temporaryValue;
	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = users[currentIndex];
		users[currentIndex] = users[randomIndex];
		users[randomIndex] = temporaryValue;
	}
}

function ponerCartaBocaArriba() {
	if (bloquearTablero) return;
	if (this === primeraCarta) return;
	
	this.classList.add("boca-arriba");
	
	if (!primeraCarta) {
		// Esta es la primera carta que se ha volteado
		primeraCarta = this;
		return;
	}
	
	// Esta es la segunda carta que se ha volteado
	segundaCarta = this;
	
	// Verificar si las cartas coinciden
	buscarPareja();
}


function buscarPareja() {
	let isMatch = primeraCarta.dataset.name === segundaCarta.dataset.name;
	
	if (isMatch) {
		// Incrementa los aciertos solo si las cartas coinciden
		aciertos++;
		document.getElementById('usuario-aciertos').textContent = aciertos;
		desactivarCartas();
	} else {
		ponerCartasBocaAbajo();
	}
}

function desactivarCartas() {
	primeraCarta.removeEventListener("click", ponerCartaBocaArriba);
	segundaCarta.removeEventListener("click", ponerCartaBocaArriba);
	
	restablecerTablero();
}

function ponerCartasBocaAbajo() {
	setTimeout(() => {
		primeraCarta.classList.remove("boca-arriba");
		segundaCarta.classList.remove("boca-arriba");
		restablecerTablero();
	}, 1000);
}

function restablecerTablero() {
	primeraCarta = null;
	segundaCarta = null;
	bloquearTablero = false;
}


function reiniciar() {
	restablecerTablero();
	barajar();
	aciertos = 0;
	document.getElementById('usuario-aciertos').textContent = aciertos;
	tablero.innerHTML = '';
	generarCartas();
}