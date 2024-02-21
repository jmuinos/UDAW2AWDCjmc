document.addEventListener('DOMContentLoaded', function() {
	const zonadibujo = document.getElementById('zonadibujo');
	const paleta = document.getElementById('paleta');
	const estadoPincel = document.getElementById('estadoPincel');
	let colorActual = 'blanco'; // Color inicial
	let pintar = false;
	
	// Colores para la paleta
	const colores = ['blanco', 'azul', 'amarillo', 'rojo', 'verde', 'marron'];
	
	// Generar paleta de colores
	colores.forEach(color => {
		const colorDiv = document.createElement('div');
		colorDiv.className = color;
		colorDiv.addEventListener('click', () => {
			document.querySelectorAll('#paleta div').forEach(div => {
				div.classList.remove('seleccionado');
			});
			colorActual = color;
			colorDiv.classList.add('seleccionado');
			pintar = false;
			estadoPincel.textContent = 'PINCEL DESACTIVADO';
		});
		paleta.appendChild(colorDiv);
	});
	
	// Generar tablero de 30x30 celdas
	for (let i = 0; i < 900; i++) {
		const celda = document.createElement('div');
		celda.className = 'celda';
		celda.addEventListener('mouseenter', function() {
			if (pintar) {
				this.className = 'celda ' + colorActual;
			}
		});
		celda.addEventListener('mousedown', function(e) {
			e.preventDefault(); // Prevenir el arrastre del texto u otros elementos
			pintar = !pintar;
			this.className = 'celda ' + colorActual;
			estadoPincel.textContent = pintar ? 'PINCEL ACTIVADO' : 'PINCEL DESACTIVADO';
		});
		zonadibujo.appendChild(celda);
	}
	
	// Permitir detener el pintado cuando el usuario suelta el clic del ratón en cualquier lugar
	document.addEventListener('mouseup', () => {
		pintar = false;
		estadoPincel.textContent = 'PINCEL DESACTIVADO';
	});
});
