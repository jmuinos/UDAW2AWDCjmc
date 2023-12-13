export class Planta {
	constructor(numeroPlanta, puertasArray) {
		this._numero = numeroPlanta;
		this._puertas = puertasArray;
	}
	
	// GETTERS Y SETTERS
	get numero() {
		return this._numero;
	}
	
	set numero(numeroPlanta) {
		this._numero = numeroPlanta;
	}
	
	get puertas() {
		return this._puertas;
	}
	
	set puertas(puertasArray) {
		this._puertas = puertasArray;
	}
}