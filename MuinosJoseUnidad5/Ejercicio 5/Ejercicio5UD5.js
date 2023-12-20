import {DiscoAux} from "./DiscoAux.js";

const arrayDiscos = [];
let arrayInputs = [];

document.addEventListener('DOMContentLoaded', () => {
	const form = document.querySelector('.needs-validation');
	arrayInputs = [...form.querySelectorAll('input')];
	const generoMusical = document.getElementById('generoMusical');
	
	form.addEventListener('submit', event => {
		event.preventDefault();
		if (!form.checkValidity()) {
			event.stopPropagation();
			validacionCustom(arrayInputs);
		} else {
			const nuevoDisco = new DiscoAux(
				arrayInputs[0].value,
				arrayInputs[1].value,
				arrayInputs[2].value,
				generoMusical.value,
				arrayInputs[3].value
			);
			arrayDiscos.push(nuevoDisco);
			addDiscoTableRow();
		}
		form.classList.add('was-validated');
	});
});

function validacionCustom(inputArray) {
	inputArray.forEach(input => {
		const inputElement = document.getElementById(input.name);
		const errorContainer = document.getElementById(`${input.name}Invalid`);
		const value = inputElement.value;
		
		switch (input.name) {
			case 'nombreDisco':
			case 'nombreGrupo':
				if (!value) {
					errorContainer.innerText = "El campo no puede estar vacío.";
				}
				break;
			case 'anoPublicacion':
				const ano = parseInt(value);
				const anoActual = new Date().getFullYear();
				if (isNaN(ano) || ano < 1900 || ano > anoActual) {
					errorContainer.innerText = "El año debe ser un número entero y estar entre 1900 y 2023).";
				}
				break;
			case 'localizacionDisco':
				if (isNaN(parseInt(value))) {
					errorContainer.innerText = "La estantería debe ser un número entero.";
				}
				break;
			case 'condiciones':
				if (!input.checked) {
					errorContainer.innerText = "Debes aceptar las condiciones.";
				}
				break;
		}
	});
}

function addDiscoTableRow() {
	let tabla = '';
	tabla = arrayDiscos.map(disco => `
        <tr>
            <td >${disco.nombre}</td>
            <td>${disco.grupo}</td>
            <td>${disco.ano}</td>
            <td>${disco.generoMusical}</td>
            <td>${disco.localizacion}</td>
        </tr>
    `).join('');
	document.getElementById('listaDiscos').innerHTML = tabla;
}
