function calcularLetraNIF() {
	let numeroNIF = document.getElementById('numeroNIF').value;
	if (numeroNIF.length === 8) {
		const letras = "TRWAGMYFPDXBNJZSQVHLCKE";
		const letrasIndex = parseInt(numeroNIF) % 23;
		const letraNIF = letras.charAt(letrasIndex);
		document.getElementById('letraNIF').value = letraNIF;
	} else {
		document.getElementById('nifLetter').value = "";
	}
}
