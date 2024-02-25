// Crea una cookie cuyo que tendrá un nombre y un valor y que expira en el tiempo determinado (dias)
// y que será accesible desde cualquier página dentro del dominio (path=/).
export function setCookie(nombre, valor, dias) {
	let fecha = new Date();
	fecha.setTime(fecha.getTime() + (dias * 24 * 60 * 60 * 1000));
	const expira = "expires=" + fecha.toUTCString();
	document.cookie = nombre + "=" + valor + ";" + expira + ";path=/";
}


// Itera sobre el array de cookies, limpia los espacios en blanco y compara los nombres.
// Si encuentra una coincidencia, devuelve el valor de la cookie.
export function getCookie(nombre) {
	const nombreCookie = nombre + "=";
	// Decodificar el string de las cookies para manejar caracteres especiales
	const listaCookies = decodeURIComponent(document.cookie).split(';');
	for (let i = 0; i < listaCookies.length; i++) {
		let cookie = listaCookies[i].trim();
		// Verificar si la cookie actual comienza con el nombre buscado
		if (cookie.startsWith(nombreCookie)) {
			return cookie.substring(nombreCookie.length);
		}
	}
	return null; // Retorna null si no se encuentra la cookie
}