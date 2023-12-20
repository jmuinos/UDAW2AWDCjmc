const tablero = document.getElementById('tablero');
let cartas = [];
let primeraCarta, segundaCarta;
let bloquearTablero = false;
let aciertos = 0;
let btnReiniciar = document.getElementById('nueva-partida-btn');

document.addEventListener('DOMContentLoaded', () => {
	btnReiniciar.addEventListener('click', reiniciar);
	document.getElementById("usuario-aciertos").textContent = aciertos;
})
fetch("./data/cartas.json")
	.then((res) => res.json())
	.then((data) => {
		cartas = [...data, ...data];
		barajar();
		generarCartas();
	});

function barajar() {
	let currentIndex = cartas.length,
		randomIndex,
		temporaryValue;
	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = cartas[currentIndex];
		cartas[currentIndex] = cartas[randomIndex];
		cartas[randomIndex] = temporaryValue;
	}
}

function generarCartas() {
	let fila; // fila actual
	for (let i = 0; i < cartas.length; i++) {
		// Crea una nueva fila cada 4 cartas
		if (i % 4 === 0) {
			fila = document.createElement("div");
			fila.classList.add("row", "align-items-center", "m-0", "p-0", "row-cols-4", "h-auto");
			tablero.appendChild(fila);
		}
		
		const cardElement = document.createElement("div");
		cardElement.classList.add("col-3-sm", "carta", "justify-content-center");
		cardElement.setAttribute("data-name", cartas[i].name);
		cardElement.innerHTML = `
          <div class="frente">
            <img class="imagen-frontal" src=${cartas[i].image}  alt=${cartas[i].name}/>
          </div>
          <div class="reves"></div>
        `;
		fila.appendChild(cardElement); // Añade la carta a la fila actual
		cardElement.addEventListener("click", ponerCartaBocaArriba);
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
	tablero.innerHTML = "";
	generarCartas();
}