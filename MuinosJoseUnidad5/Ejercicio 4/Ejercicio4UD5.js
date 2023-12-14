const boletoGanador = ['28', '39', '37', '06', '43'];
const boletoGanadorOrdenadoAsc = boletoGanador.slice().sort((a, b) => a - b);
let boletoContainer = document.getElementById('boleto');
let isOrdenadoAparicion = false;

document.addEventListener("DOMContentLoaded", startPrograma, true);
document.getElementById('ordenToggler').addEventListener("mouseenter", toggleOrdenBoleto, false);
document.getElementById('ordenToggler').addEventListener("mouseout", toggleOrdenBoleto, false);

function startPrograma() {
	let boletoContentHTML = '';
	boletoGanadorOrdenadoAsc.forEach(numero => {
		boletoContentHTML += `<div class="col"><div class="bolita bg-dark text-white fw-bold">${numero}</div></div>`;
	});
	boletoContainer.innerHTML = boletoContentHTML;
}

function toggleOrdenBoleto() {
	if (isOrdenadoAparicion) {
		mostrarPorOrdenCreciente();
		isOrdenadoAparicion = false;
		
	} else {
		mostrarPorOrdenAparicion();
		isOrdenadoAparicion = true;
	}
}

function mostrarPorOrdenCreciente() {
	let bolitas = boletoContainer.querySelectorAll('.bolita');
	bolitas.forEach((bolita, index) => {
		bolita.innerText = boletoGanadorOrdenadoAsc[index];
		bolita.classList.remove('bg-secondary');
		bolita.classList.add('bg-dark');
	});
}

function mostrarPorOrdenAparicion() {
	let bolitas = boletoContainer.querySelectorAll('.bolita');
	bolitas.forEach((bolita, index) => {
		bolita.innerText = boletoGanador[index];
		bolita.classList.remove('bg-dark');
		bolita.classList.add('bg-secondary');
	});
}