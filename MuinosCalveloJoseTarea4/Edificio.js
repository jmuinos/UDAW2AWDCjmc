export class Edificio {
	constructor(calle, numeroEdificio, codigoPostal, plantasArray) {
		this._calle = calle;
		this._numero = numeroEdificio;
		this._codigoPostal = codigoPostal;
		this._plantas = plantasArray;
	}

	// GETTERS Y SETTERS
	get calle() {
		return this._calle;
	}
	
	set calle(calle) {
		this._calle = calle;
	}
	
	get numero() {
		return this._numero;
	}
	
	set numero(numeroEdificio) {
		this._numero = numeroEdificio;
	}
	
	get codigoPostal() {
		return this._codigoPostal;
	}
	
	set codigoPostal(codigoPostal) {
		this._codigoPostal = codigoPostal;
	}
	
	get plantas() {
		return this._plantas;
	}
	
	set plantas(plantasArray) {
		this._plantas = plantasArray;
	}
}