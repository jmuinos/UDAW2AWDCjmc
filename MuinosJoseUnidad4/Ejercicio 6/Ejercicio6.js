const convocatorias = ["Marcos,Luis,Pepe,Manuel,Lolo", "Marcos,Luis,Pepe,David,Antonio,Pedro"];

function mostrarJugadoresConvocados() {
	let jugadoresConvocados = convocatorias.map(convocatoria => convocatoria.split(','));
	let jugadoresComunes = jugadoresConvocados.reduce((acumulador, convocatoriaActual) => {
		return acumulador.filter(jugador => convocatoriaActual.includes(jugador));
	});
	
	document.getElementById('resultado').innerHTML = `<p>Jugadores convocados a todos los partidos: ${jugadoresComunes.join(', ')}</p>`;
}
