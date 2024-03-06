window.onload = function () {
	cargarEquipos();
};

//Con xhr
// function cargarEquipos() {
// 	const xhr = new XMLHttpRequest();
// 	xhr.open('GET', 'equipos.json', true);
// 	xhr.onload = function () {
// 		if (this.status === 200) {
// 			const equipos = JSON.parse(this.responseText);
// 			llenarSelectConEquipos(equipos);
// 		} else { console.error('No se pudieron cargar los equipos');}
//  };
// 	xhr.send();
// }

//CON FETCH
function cargarEquipos() {
	fetch('equipos.json')
		.then(response => {
			if (!response.ok) {
				throw new Error('No se pudieron cargar los equipos');
			}
			return response.json();
		})
		.then(equipos => {
			llenarSelectConEquipos(equipos);
		})
		.catch(error => {
			console.error(error);
		});
}

function llenarSelectConEquipos(equipos) {
	const select = document.getElementById('equiposSelect');
	equipos.forEach(equipo => {
		const option = document.createElement('option');
		option.value = JSON.stringify(equipo);
		option.textContent = equipo.nombre;
		select.appendChild(option);
	});
}

function mostrarDatosEquipo() {
	const equipoSeleccionado = JSON.parse(document.getElementById('equiposSelect').value);
	const contenedor = document.getElementById('datosEquipo');
	contenedor.innerHTML = `
        <p>Partidos Jugados: ${equipoSeleccionado.PJ}</p>
        <p>Partidos Ganados: ${equipoSeleccionado.PG}</p>
        <p>Partidos Perdidos: ${equipoSeleccionado.PP}</p>
        <p>Partidos Empatados: ${equipoSeleccionado.PE}</p>
    `;
}
