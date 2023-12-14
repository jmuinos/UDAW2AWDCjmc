export class DiscoAux {
	constructor(nombre, grupo, ano, tipoMusica, localizacion) {
		this.nombre = nombre;
		this.grupo = grupo;
		this.ano = ano;
		this.localizacion = localizacion;
	}
	
	mostrarInformacion() {
		return `Nombre: ${this.nombre}, Grupo: ${this.grupo}, Año: ${this.ano}, Localización: ${this.localizacion}`;
	}
}