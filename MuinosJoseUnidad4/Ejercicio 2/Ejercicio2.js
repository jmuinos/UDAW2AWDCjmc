// Listener del evento de 'submit'
document.getElementById('dniForm').addEventListener('submit', function (event) {
	event.preventDefault(); // Para prevenir la acción por defecto del formulario (envío/recarga de la página)
	const letraIntroducida = document.getElementById('letra').value.toUpperCase();
	const indiceLetrasDNI = "TRWAGMYFPDXBNJZSQVHLCKE";
	let dniConLetra = [];
	
	// Iterar sobre los posibles números de DNI de tres cifras (001 a 999)
	for (let i = 1; i <= 999; i++) {
		// Convertir el número a cadena de tres dígitos (añadiendo ceros a la izquierda si es necesario)
		let dni = i.toString().padStart(3, '0');
		
		/* Para calcular la letra del DNI: hay que obtener el resto de dividir
		   el número por 23 y usar ese valor como índice en la cadena de letras.*/
		let letraDNI = indiceLetrasDNI.charAt(parseInt(dni) % 23);
		if (letraDNI === letraIntroducida) {
			dniConLetra.push(dni + letraDNI);
		}
	}
	mostrarResultados(dniConLetra);
});

function mostrarResultados(dniConLetra) {
	const resultadosDiv = document.getElementById('resultados');
	
	resultadosDiv.innerHTML = '<h3>DNIs encontrados:</h3>';
	resultadosDiv.innerHTML += '<ul>';
	dniConLetra.forEach(dni => {
		resultadosDiv.innerHTML += `<li>${dni}</li>`;
	});
	resultadosDiv.innerHTML += '</ul>';
}
