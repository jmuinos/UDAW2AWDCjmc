document.getElementById('testTecnologia').addEventListener('submit', function(e) {
	e.preventDefault();
	
	const respuestasCorrectas = ['1', '1', '1', '1']; // Representa las respuestas correctas para cada pregunta
	let aciertos = 0;
	let todasRespondidas = true;
	
	for (let i = 1; i <= 4; i++) {
		const pregunta = document.getElementById(`pregunta${i}`);
		const respuesta = document.querySelector(`input[name="pregunta${i}"]:checked`);
		
		// Limpiar estados previos
		pregunta.classList.remove('text-danger');
		const iconoPrevio = pregunta.querySelector('i');
		if (iconoPrevio) {
			pregunta.removeChild(iconoPrevio);
		}
		
		if (!respuesta) {
			todasRespondidas = false;
			pregunta.classList.add('text-danger');
		} else {
			const icono = document.createElement('i');
			if (respuesta.value === respuestasCorrectas[i - 1]) {
				aciertos++;
				icono.className = 'fas fa-check text-success';
				pregunta.prepend(icono);
			} else {
				icono.className = 'fas fa-times text-danger';
				pregunta.prepend(icono);
			}
			pregunta.prepend(document.createTextNode(' ')); // Añadir espacio antes del icono
			pregunta.prepend(icono); // Añadir el icono al principio del párrafo
		}
	}
	
	if (!todasRespondidas) {
		alert("No has respondido a todas las preguntas.");
	} else {
		alert(`Has acertado ${aciertos} preguntas.`);
	}
});
