class Disco {
	constructor(nombre, grupo, anno, tipoMusica, localizacion = 0, prestado = false, caratula = 'imagen.png') {
		this.nombre = nombre;
		this.grupo = grupo;
		this.anno = anno;
		this.tipoMusica = tipoMusica;
		this.localizacion = localizacion;
		this.prestado = prestado;
		this.caratula = caratula;
	}
	
	cambiarLocalizacion(nuevaLocalizacion) {
		this.localizacion = nuevaLocalizacion;
	}
	
	cambiarPrestado() {
		this.prestado = !this.prestado;
	}
	
	mostrarInformacion() {
		return `Nombre: ${this.nombre}, Grupo: ${this.grupo}, Año: ${this.anno}, Tipo: ${this.tipoMusica}, Localización: ${this.localizacion}, Prestado: ${this.prestado}, Carátula: ${this.caratula}`;
	}
}
