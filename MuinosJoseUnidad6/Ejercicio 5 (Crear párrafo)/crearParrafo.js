document.getElementById('crearParrafo').addEventListener('click', function() {
	const texto = document.getElementById('textoEntrada').value;
	const color = document.getElementById('selectorColor').value;
	const contenedorParrafos = document.getElementById('contenedorParrafos');
	
	if (texto.trim() === '') {
		alert('Por favor, introduce algún texto antes de crear un párrafo.');
		return;
	}
	
	const parrafo = document.createElement('p');
	parrafo.textContent = texto;
	parrafo.style.backgroundColor = color;
	contenedorParrafos.appendChild(parrafo);
	
	// Limpiar TextArea después de crear el párrafo
	document.getElementById('textoEntrada').value = '';
});
