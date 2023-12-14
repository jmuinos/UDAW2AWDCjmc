let intervalo;

document.addEventListener("DOMContentLoaded", startPrograma);

function startPrograma() {
	document.getElementById("saludarBtn").addEventListener('click', saludarCadaTresSeg, false);
	document.getElementById("pararSaludoBtn").addEventListener('click', pararSaludo, false);
}

function saludarCadaTresSeg() {
	intervalo = setInterval(saludar, 3000);
}

function saludar() {
	document.getElementById("header").innerText += "¡HOLA! ";
}

function pararSaludo() {
	clearInterval(intervalo);
}