let jugador = {
	fuerza: 1,
	
	incrementarFuerza: function () {
		this.fuerza++;
	},
	
	consultarFuerza: function () {
		alert(`Tu fuerza es ${this.fuerza}`);
	}
};
