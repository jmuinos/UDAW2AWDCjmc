export class Puerta {
	constructor(numeroPuerta, nombrePropietario) {
		this._numero = numeroPuerta;
		this._propietario = nombrePropietario;
	}
	
	// GETTERS Y SETTERS
	get numero() {
		return this._numero;
	}
	
	set numero(numeroPuerta) {
		this._numero = numeroPuerta;
	}
	
	get propietario() {
		return this._propietario;
	}
	
	set propietario(nombrePropietario) {
		this._propietario = nombrePropietario;
	}
}