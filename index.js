const body = document.body;
const grillaHTML = document.querySelector('#grilla');
const dialogoNuevoJuego = document.querySelector('#dialogo-nuevo-juego');
const botonesNuevoJuego = document.querySelectorAll('#boton-nuevo-juego');
const botonReiniciarJuego = document.querySelector('#boton-reiniciar-juego');
const botonBuscarMatch = document.querySelector('#boton-buscar-match');
const botonModoFacil = document.querySelector('#boton-modo-facil');
const botonModoNormal = document.querySelector('#boton-modo-normal');
const botonModoDificil = document.querySelector('#boton-modo-dificil');
const items = ['🐺', '🦊', '🦝 ', '🐻 ', '🐨 ', '🐦'];
const tiempoRestanteHTML = document.querySelector('#tiempo-restante');
const overlay = document.querySelector('#overlay');
const dialogoJuegoTerminado = document.querySelector('#dialogo-juego-terminado');
const botonAyuda = document.querySelector('#boton-ayuda');
const botonIconoRestart = document.querySelector('#boton-restart');
const dialogoBienvenida = document.querySelector('#dialogo-bienvenida');
const dialogoReiniciarJuego = document.querySelector('#dialogo-reiniciar-juego');
const botonAJugar = document.querySelector('#boton-empezar-juego');
const ventanasDeDialogo = document.querySelectorAll('.dialogo');
const botonCancelar = document.querySelector('#boton-cancelar');
let contadorPuntos = document.querySelector('#contador-puntos');
let puntajeFinalObtenido = document.querySelector('#puntaje-obtenido');
let mosaicos = [];
let mosaicoSeleccionado = null;
let temporizador = null
// ------------COMPORTAMIENTO GENERAL DEL OVERLAY

//Abrir y cerrar overlay cuando se le da a reiniciar juego

const abrirModal = () => {
	overlay.classList.remove('hidden');
	//body.classList.add('no-scroll')
};

const cerrarModal = () => {
	overlay.classList.add('hidden');
	for (let dialogo of ventanasDeDialogo) {
		dialogo.classList.add('hidden');
	}
};

//-----------COMPORTAMIENTO GENERAL DE BOTONES Y MODALES

//Abrir dialogo de bienvenida
window.onload = () => {
	dialogoBienvenida.classList.remove('hidden');
};

//abrir boton ayuda
botonAyuda.onclick = () => {
	abrirModal();
	dialogoBienvenida.classList.remove('hidden');
};

//Abrir boton de reiniciar juego
botonIconoRestart.onclick = () => {
	abrirModal();
	dialogoReiniciarJuego.classList.remove('hidden');
	actualizarPuntaje();
};

//clickear boton "A jugar"
botonAJugar.onclick = () => {
	botonAJugar.parentElement.parentElement.classList.add('hidden');
	dialogoNuevoJuego.classList.remove('hidden');
};

//Cancelar el nuevo juego
botonCancelar.onclick = () => {
	cerrarModal();
	actualizarPuntaje();
};

//Permite que los botones del modal puedan funcionar al ser seleccionados
for (let boton of botonesNuevoJuego) {

	boton.onclick = () => {
		boton.parentElement.parentElement.classList.add('hidden');
		dialogoNuevoJuego.classList.remove('hidden');
	};
}


//---------ELEGIR LOS MODOS DE JUEGO

let nivelDificultad = ''; //Almaceno niveles de dificultad para reutilizar luego

botonModoFacil.onclick = () => {
	grillaFacil();
	cerrarModal();
	clicksMosaicos(mosaicos);
	nivelDificultad = 'facil';
	//resetearCuentaRegresiva()
	clearTimeout(temporizador)
	tiempoRestante = 30
	cuentaRegresiva();

};

botonModoNormal.onclick = () => {
	grillaNormal();
	cerrarModal();
	clicksMosaicos(mosaicos);
	nivelDificultad = 'normal';
	clearTimeout(temporizador)
	tiempoRestante = 30
	cuentaRegresiva();
};

botonModoDificil.onclick = () => {
	grillaDificil();
	cerrarModal();
	clicksMosaicos(mosaicos);
	nivelDificultad = 'dificil';
	clearTimeout(temporizador)
	tiempoRestante = 30
	cuentaRegresiva();
};

//-----GRILLAS
// Crear una grilla en JS y en HTML con items aleatorios
// Si hay matches, volver a generar una grilla

const grillaFacil = () => {
	do {
		vaciarGrillaHTML();
		generarGrilla(9, 9);
		generarGrillaEnHTML(9);
	} while (hayMatch());
};

const grillaNormal = () => {
	do {
		vaciarGrillaHTML();
		generarGrilla(8, 8);
		generarGrillaEnHTML(8);
	} while (hayMatch());
};

const grillaDificil = () => {
	do {
		vaciarGrillaHTML();
		generarGrilla(7, 7);
		generarGrillaEnHTML(7);
	} while (hayMatch());
};

//Obtener al azar

const obtenerNumeroAlAzar = (items) => {
	return Math.floor(Math.random() * items.length);
};

const obtenerItemAlAzar = (items) => {
	return items[obtenerNumeroAlAzar(items)];
};



let grilla = [];
const generarGrilla = (filas, columnas) => {
	grilla = [];
	for (let i = 0; i < filas; i++) {
		grilla[i] = [];
		for (let j = 0; j < columnas; j++) {
			grilla[i][j] = obtenerItemAlAzar(items);
		}
	}

	return grilla;
};

const generarMosaicos = (x, y, array) => {
	const tamanio = 50;

	const mosaico = document.createElement('div');

	mosaico.classList.add('mosaico');
	mosaico.dataset.x = x;
	mosaico.dataset.y = y;
	mosaico.innerHTML = array[x][y];
	mosaico.style.top = `${x * tamanio}px`;
	mosaico.style.left = `${y * tamanio}px`;
	return mosaico;
};

// REVISAR PARAMETROS DE MÁS (filas, columnas, items)

const generarGrillaEnHTML = (columnas) => {
	const anchoDeGrilla = 50 * columnas;
	grillaHTML.style.width = `${anchoDeGrilla}px`;
	const listadeItems = grilla;

	for (let i = 0; i < listadeItems.length; i++) {
		for (let j = 0; j < listadeItems[i].length; j++) {
			grillaHTML.appendChild(generarMosaicos(i, j, listadeItems));
		}
	}
	mosaicos = document.getElementsByClassName('mosaico');
};


//Establecer la cantidad de puntos que hay en el marcador:
puntos = 0;

// --------SELECCIONAR UN MOSAICO

const clicksMosaicos = (elementos) => {
	for (let elemento of elementos) {

		elemento.onclick = () => {

			//Al hacer click en los mosaicos

			if (mosaicoSeleccionado) {
				if (sonAdyacentes(elemento, mosaicoSeleccionado)) {
					intercambiarMosaicos(elemento, mosaicoSeleccionado);
					if (hayMatch()) {
						//vaciar matches y reemplazarlos por otros mosaicos
						reemplazarMatches();
					} else {
						//Intercambia los mosaicos a su posición original
						let mosaicoSeleccionadoPrevio = mosaicoSeleccionado;
						setTimeout(() => intercambiarMosaicos(elemento, mosaicoSeleccionadoPrevio), 500);
					}
				}
				mosaicoSeleccionado.classList.remove('seleccionado');
				mosaicoSeleccionado = null;
			} else {
				elemento.classList.add('seleccionado');
				mosaicoSeleccionado = elemento;
			}
		};
	}
};


//-------- RELLENAR MATCHES ELIMINADOS
// primera version: rellenar con elementos al azar


//Proceso de reemplazar matcher después de ser eliminados al haber combo
const reemplazarMatches = () => {
	let matches = matchesHorizontales().concat(matchesVerticales());

	for (let i = 0; i < matches.length; i++) {
		let x = matches[i][0];
		let y = matches[i][1];
		grilla[x][y] = obtenerItemAlAzar(items);
		let mosaicoMatch = document.querySelector(`div[data-x='${x}'][data-y='${y}']`);
		mosaicoMatch.classList.add('animacion-desaparecer');

		//Animaciones y su duración
		setTimeout(() => {
			mosaicoMatch.innerHTML = grilla[x][y];
			mosaicoMatch.classList.remove('animacion-desaparecer');
			mosaicoMatch.classList.add('animacion-aparecer');
			if (hayMatch()) {
				reemplazarMatches();
			}
		}, 500);

		//agregar puntos tomando en cuenta los puntos agregados con anterioridad
		puntos += 100;
		contadorPuntos.textContent = `${puntos}`;
	}
};


// -----------CUENTA REGRESIVA
let tiempoRestante = 30;
const cuentaRegresiva = () => {
	tiempoRestanteHTML.textContent = `0:${tiempoRestante}`;

	if (tiempoRestante > 0) {
		tiempoRestante--;
		temporizador = setTimeout(cuentaRegresiva, 1000); //--------COMENTADO TEMPORALMENTE PARA PODER TRABAJR TRANQUILAS----
	}
	else {
		//tiempoRestante = 10;
		terminarJuego();
	}

};

//----------PROCESO DE INTERCAMBIO DE MOSAICOS SELECCIONADOS

const intercambiarMosaicos = (elem1, elem2) => {
	const tamanio = 50;

	const datax1 = Number(elem1.dataset.x);
	const datax2 = Number(elem2.dataset.x);
	const datay1 = Number(elem1.dataset.y);
	const datay2 = Number(elem2.dataset.y);

	// modifico la grilla en JS
	let variableTemporal = grilla[datax1][datay1];
	grilla[datax1][datay1] = grilla[datax2][datay2];
	grilla[datax2][datay2] = variableTemporal;

	// modifico la grilla en HTML
	elem1.style.top = `${datax2 * tamanio}px`;
	elem2.style.top = `${datax1 * tamanio}px`;
	elem1.style.left = `${datay2 * tamanio}px`;
	elem2.style.left = `${datay1 * tamanio}px`;

	elem1.dataset.x = datax2;
	elem2.dataset.x = datax1;
	elem1.dataset.y = datay2;
	elem2.dataset.y = datay1;
};

const sonAdyacentes = (mosaico1, mosaico2) => {
	const datax1 = Number(mosaico1.dataset.x);
	const datay1 = Number(mosaico1.dataset.y);
	const datax2 = Number(mosaico2.dataset.x);
	const datay2 = Number(mosaico2.dataset.y);

	if (
		(datax1 === datax2 && datay1 === datay2 + 1) ||
		(datax1 === datax2 && datay1 === datay2 - 1) ||
		(datay1 === datay2 && datax1 === datax2 + 1) ||
		(datay1 === datay2 && datax1 === datax2 - 1)
	) {
		return true;
	}
	return false;
};


const hayMatch = () => {
	return matchesVerticales().length > 0 || matchesHorizontales().length > 0;
};


const matchesVerticales = () => {
	let matchVertical = [];

	for (let i = 0; i < grilla.length; i++) {
		for (let j = 0; j < grilla[i].length; j++) {
			if (
				grilla[i + 1] &&
				grilla[i + 2] &&
				grilla[i][j] === grilla[i + 1][j] &&
				grilla[i][j] === grilla[i + 2][j]
			) {
				matchVertical = matchVertical.concat([[i, j], [i + 1, j], [i + 2, j]]);
			}
		}
	}
	return matchVertical;
};

const matchesHorizontales = () => {
	let matchHorizontal = [];

	for (let i = 0; i < grilla.length; i++) {
		for (let j = 0; j < grilla[i].length; j++) {
			if (grilla[i][j] === grilla[i][j + 1] && grilla[i][j] === grilla[i][j + 2]) {
				matchHorizontal = matchHorizontal.concat([[i, j], [i, j + 1], [i, j + 2]]);
			}
		}
	}
	return matchHorizontal;
};



// ---------REINICIAR EL JUEGO

botonReiniciarJuego.onclick = () => {
	revisarDificultadElegida();
	dialogoNuevoJuego.classList.remove('hidden')
	clicksMosaicos(mosaicos);
	actualizarPuntaje();
	cerrarModal()
	clearTimeout(temporizador)
	tiempoRestante = 30
	cuentaRegresiva();
};

//Se revisa la dificultad elegida después de que se acaba el tiempo y se reinicia el juego
const revisarDificultadElegida = () => {
	if (nivelDificultad === 'facil') {
		grillaFacil();
	} else if (nivelDificultad === 'normal') {
		grillaNormal();
	} else if (nivelDificultad === 'dificil') {
		grillaDificil();
	}
};



//eliminar el match seleccionado
const vaciarGrillaHTML = () => {
	grillaHTML.textContent = '';
};


//función para añadir el puntaje
const actualizarPuntaje = () => {
	puntos = 0;
	contadorPuntos.textContent = `${puntos}`;
}


const terminarJuego = () => {
	dialogoNuevoJuego.classList.add('hidden');
	abrirModal();
	dialogoJuegoTerminado.classList.remove('hidden');
	puntajeFinalObtenido.textContent = `${puntos}`;
};
