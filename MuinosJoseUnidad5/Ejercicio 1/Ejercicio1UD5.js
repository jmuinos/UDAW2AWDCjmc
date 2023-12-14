let isBordeAplicado = false;
document.getElementById("body").addEventListener("mousemove", function(event) {
	showCoordenadas(event);
});
	function addBorderBLACK(elementoHTML) {
		if (!isBordeAplicado){
			elementoHTML.classList.add('border');
			elementoHTML.classList.add('border-3');
			elementoHTML.classList.add('border-solid');
			elementoHTML.classList.add('border-black');
			isBordeAplicado = true;
		}
	}
	
	function removeBorderBLACK(elementoHTML) {
		if (isBordeAplicado){
			elementoHTML.classList.remove('border');
			elementoHTML.classList.remove('border-5');
			elementoHTML.classList.remove('border-solid');
			elementoHTML.classList.remove('border-black');
			isBordeAplicado = false;
		}
	}
function showCoordenadas(event) {
	let x = event.clientX;
	let y = event.clientY;
	let coords = "COORDENADAS DEL RATÓN: (" + x + "," + y + ")";
	document.getElementById("coordenadas").innerHTML = coords;
}

// function limpiarCoordenadas() {
// 	document.getElementById("coordenadas").innerHTML = "";
// }