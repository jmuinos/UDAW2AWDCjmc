$(document).ready(function() {
	cargarEquipos();
});

function cargarEquipos() {
	$.ajax({
		url: 'equipos.json',
		type: 'GET',
		dataType: 'json',
		success: function(equipos) {
			llenarSelectConEquipos(equipos);
		},
		error: function() {
			console.error('No se pudieron cargar los equipos');
		}
	});
}

function llenarSelectConEquipos(equipos) {
	const $select = $('#equiposSelect');
	equipos.forEach(equipo => {
		$('<option>', {
			value: JSON.stringify(equipo),
			text: equipo.nombre
		}).appendTo($select);
	});
}

function mostrarDatosEquipo() {
	const equipoSeleccionado = JSON.parse($('#equiposSelect').val());
	const $contenedor = $('#datosEquipo');
	
	// Ocultar con animación tipo persiana
	$contenedor.slideUp(300, function() {
		// Actualizar los datos del equipo seleccionado
		$contenedor.html(`
            <p>Partidos Jugados: ${equipoSeleccionado.PJ}</p>
            <p>Partidos Ganados: ${equipoSeleccionado.PG}</p>
            <p>Partidos Perdidos: ${equipoSeleccionado.PP}</p>
            <p>Partidos Empatados: ${equipoSeleccionado.PE}</p>
        `);
		// Mostrar con animación tipo persiana
		$contenedor.slideDown(300);
	});
}

$('#equiposSelect').change(function() {
	mostrarDatosEquipo();
});
