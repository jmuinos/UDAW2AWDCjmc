document.addEventListener('DOMContentLoaded', () => {
	const boton = document.getElementById('boton');
	const contenedor = document.getElementById('contenedor');
	
	boton.addEventListener('mouseover', () => {
		const maxX = contenedor.clientWidth - boton.clientWidth;
		const maxY = contenedor.clientHeight - boton.clientHeight;
		const nuevoX = Math.random() * maxX;
		const nuevoY = Math.random() * maxY;
		
		boton.style.left = nuevoX + 'px';
		boton.style.top = nuevoY + 'px';
	});
});
