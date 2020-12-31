const tarjetas = document.querySelectorAll('.tarjeta');

let tarjetaVolteada = false;
let bloquearTablero = false; 
let primeraTarjeta, segundaTarjeta;

// funcion para voltear (girar) dos tarjetas mostrando la cara.
//  Tambien impedir coincidencia haciendo doble click sobre la misma tarjeta y que esta quede descubierta
function voltearTarjeta() {
	if (bloquearTablero) return;
	if (this === primeraTarjeta) return;

	this.classList.toggle('voltear');

	if (!tarjetaVolteada) {
		//primer click
		tarjetaVolteada = true;
		primeraTarjeta = this;
		return;
	}
	//segundo click
	segundaTarjeta = this;
	chequearCoincidencia();
}

// funcion para chequear coincidencia de tarjetas
function chequearCoincidencia() {
	let coincidencia = primeraTarjeta.dataset.imagen === segundaTarjeta.dataset.imagen;

	coincidencia ? fijarTarjetas() : arreglarTarjetas();
}
// funcion para prevenir(fijar) que las tarjetas se volteen en el caso que coincidan
function fijarTarjetas() {
	primeraTarjeta.removeEventListener('click', voltearTarjeta);
	segundaTarjeta.removeEventListener('click', voltearTarjeta);

	desbloquearTablero();
}

// funcion para regresar(voltear) la tarjeta a su estado original en el caso que no coincidan
// Mientras tanto se bloquea el tablero para evitar que una tercera tarjeta se pueda voltear 
// Se establece un lapso de tiempo (1500 mseg) para apreciar el giro de las tarjetas
function arreglarTarjetas() {
	bloquearTablero = true;
	setTimeout(() => {
		primeraTarjeta.classList.remove('voltear');
		segundaTarjeta.classList.remove('voltear');

		desbloquearTablero();
	}, 1500);
}

// funcion para desbloquear el tablero despues de voltear (girar) la segunda carta
function desbloquearTablero() {
	[tarjetaVolteada, bloquearTablero] = [false, false];
	[primeraTarjeta, segundaTarjeta] = [null, null];
}

// Expresion de función ejecutada inmediatamente (IIFE). Se ejecuta al comenzar el juego
(function barajarTarjetas() {
	tarjetas.forEach(tarjeta => {
		let randomPos = Math.floor(Math.random() * 12);
		tarjeta.style.order = randomPos;
	});
})();

tarjetas.forEach(tarjeta => tarjeta.addEventListener('click', voltearTarjeta));
