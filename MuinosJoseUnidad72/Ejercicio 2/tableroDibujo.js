$(document).ready(function() {
	const $zonadibujo = $('#zonadibujo');
	const $paleta = $('#paleta');
	const $estadoPincel = $('#estadoPincel');
	let colorActual = 'blanco'; // Color inicial
	let pintar = false;
	
	// Colores para la paleta
	const colores = ['blanco', 'azul', 'amarillo', 'rojo', 'verde', 'marron'];
	
	// Generar paleta de colores
	colores.forEach(color => {
		const $colorDiv = $('<div></div>').addClass(color).click(function() {
			$('#paleta div').removeClass('seleccionado');
			colorActual = color;
			$(this).addClass('seleccionado');
			pintar = false;
			$estadoPincel.text('PINCEL DESACTIVADO');
		});
		$paleta.append($colorDiv);
	});
	
	// Generar tablero de 30x30 celdas
	for (let i = 0; i < 900; i++) {
		const $celda = $('<div></div>').addClass('celda').mouseenter(function() {
			if (pintar) {
				$(this).removeClass().addClass('celda ' + colorActual);
			}
		}).mousedown(function(e) {
			e.preventDefault(); // Prevenir el arrastre del texto u otros elementos
			pintar = !pintar;
			$(this).removeClass().addClass('celda ' + colorActual);
			$estadoPincel.text(pintar ? 'PINCEL ACTIVADO' : 'PINCEL DESACTIVADO');
		});
		$zonadibujo.append($celda);
	}
	
	// Permitir detener el pintado cuando el usuario suelta el clic del ratón en cualquier lugar
	$(document).mouseup(function() {
		pintar = false;
		$estadoPincel.text('PINCEL DESACTIVADO');
	});
});
