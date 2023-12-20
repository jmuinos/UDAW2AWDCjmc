export {setCookie, getCookie};

function setCookie(nombre, valor, dias) {
	let fecha = new Date();
	fecha.setTime(fecha.getTime() + (dias * 24 * 60 * 60 * 1000));
	const expira = "expires=" + fecha.toUTCString();
	document.cookie = nombre + "=" + valor + ";" + expira + ";path=/";
}

function getCookie(nombre) {
	const name = nombre + "=";
	const decodedCookie = decodeURIComponent(document.cookie);
	const ca = decodedCookie.split(';');
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) === ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) === 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}