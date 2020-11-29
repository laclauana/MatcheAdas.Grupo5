const grillaHTML = document.querySelector("#grilla")
const dialogoNuevoJuego = document.querySelector(".dialogo.nuevo-juego")
const botonNuevoJuego = document.querySelector("#boton-nuevo-juego")
const botonReiniciarJuego = document.querySelector("#boton-reiniciar-juego")
const botonBuscarMatch = document.querySelector("#boton-buscar-match")
const botonModoFacil = document.querySelector("#boton-modo-facil")
const botonModoNormal = document.querySelector("#boton-modo-normal")
const botonModoDificil = document.querySelector("#boton-modo-dificil")
const mosaicos = document.getElementsByClassName('mosaico')
<<<<<<< HEAD
const items = ['🐺', '🦊', '🦝 ', '🐻 ', '🐨 ', '🐦','🍄','🌲','🍁',]
console.log(items)

=======
const items = ['🍉', '🥝', '🍌', '🍇', '🍋', '🥥']
>>>>>>> f0fd8bf16da2c5d2eed57f2d7a24b791ea3b869d

//Comportamiento general de modales
const abrirModal = (elemento) => {
    elemento.classList.remove('hiden')
    overlay.classList.remove('hidden')
}

const cerrarModal = (elemento) => {
    elemento.classList.add('hiden')
    overlay.classList.add('hiden')

}

<<<<<<< HEAD
//Pedir al usuario que elija la dificultad de la partida

// let dificultad = ''
// botonModoFacil.onclick = () => {
//     dificultad = 9
//     return generarGrilla(9, 9)
// }

// botonModoNormal.onclick = () => {
//     dificultad = 8
//     return generarGrilla(8, 8)
// }

// botonModoDificil.onclick = () => {
//     dificultad = 7
//     return generarGrilla(7, 7)
// }
=======

//Pedir al usuario que elija la dificultad de la partida
let nivelDificultad = '' //Almaceno niveles de dificultad para reutilizar luego

botonModoFacil.onclick = () => {
    grillaFacil()
    cuentaRegresiva()
    nivelDificultad = 'facil' 
}

botonModoNormal.onclick = () => {
    grillaNormal()
    cuentaRegresiva()
    nivelDificultad = 'normal'
}

botonModoDificil.onclick = () => {
    grillaDificil()
    cuentaRegresiva()
    nivelDificultad = 'dificil'
}

//Empezar cuenta regresiva al crear un juego nuevo --------FUNCIONA JS, FALTA EL MAQUETADO DEL TIMER PARA PODER CONECTARLOS----
let tiempoRestante = 30

const cuentaRegresiva = () => {
    tiempoRestante--
    if (tiempoRestante > 0) {
        setTimeout(cuentaRegresiva, 1000)
    }
    console.log(tiempoRestante)
}
>>>>>>> f0fd8bf16da2c5d2eed57f2d7a24b791ea3b869d

// Crear una grilla en JS y en HTML con items aleatorios 
// Si hay matches, volver a generar una grilla

const grillaFacil = () => {
    do {
    vaciarGrillaHTML()
    generarGrilla(9, 9)
    generarGrillaEnHTML(9, 9, items)
    } while(hayMatchInicial())
}

const grillaNormal = () => {
    do {
    vaciarGrillaHTML()
    generarGrilla(8, 8)
    generarGrillaEnHTML(8, 8, items)
    } while(hayMatchInicial())
}

const grillaDificil = () => {
    do {
    vaciarGrillaHTML()
    generarGrilla(7, 7)
    generarGrillaEnHTML(7, 7, items)
    } while(hayMatchInicial())
}


const obtenerNumeroAlAzar = items => {
    return Math.floor((Math.random() * items.length))
}

const obtenerItemAlAzar = items => {
    return items[obtenerNumeroAlAzar(items)]
}

let grilla = []
const generarGrilla = (filas, columnas) => {

    grilla = []
    for (let i = 0; i < filas; i++) {
        grilla[i] = []
        for (let j = 0; j < columnas; j++) {
            grilla[i][j] = obtenerItemAlAzar(items)
        }
    }
    return grilla
}
console.log(generarGrilla)


const generarMosaicos = (x, y, array) => {
    const tamanio = 50

    const mosaico = document.createElement('div')
    mosaico.classList.add('mosaico')
    mosaico.dataset.x = x
    mosaico.dataset.y = y
    mosaico.innerHTML = array[x][y]
    mosaico.style.top = `${x * tamanio}px`
    mosaico.style.left = `${y * tamanio}px`
    return mosaico
}

const generarGrillaEnHTML = (filas, columnas, items) => {
    const anchoDeGrilla = 50 * columnas
    grillaHTML.style.width = `${anchoDeGrilla}px`
    const listadeItems = grilla;
    for (let i = 0; i < listadeItems.length; i++) {
        for (let j = 0; j < listadeItems[i].length; j++) {
            grillaHTML.appendChild(generarMosaicos(i, j, listadeItems))
        }
    }
}

generarGrilla()
generarGrillaEnHTML()

// Chequeamos si hay matches al inicio
const hayMatchVertical = () => {
    for (let i = 0; i < grilla.length; i++) {
        for (let j = 0; j < grilla[i].length; j++) {
            if (grilla[i + 1] && grilla[i + 2] && grilla[i][j] === grilla[i + 1][j] && grilla[i][j] === grilla[i + 2][j]) {
                return true
            }
        }
    }
    return false
}

const hayMatchHorizontal = () => {
    for (let i = 0; i < grilla.length; i++) {
        for (let j = 0; j < grilla[i].length; j++) {
            if (grilla[i][j] === grilla[i][j + 1] && grilla[i][j] === grilla[i][j + 2]) {
                return true
            }
        }
    }
    return false
}

const hayMatchInicial = () => {
    if (hayMatchVertical() || hayMatchHorizontal()) {
        return true
    }
    else {
        return false
    }
}


// //--------------FALTA HACER----------------
// //Opciones nuevo juego

botonNuevoJuego.onclick = () => {
    console.log(dialogoNuevoJuego)
}
// //-----------------------------------------

const vaciarGrillaHTML = () => {
    grillaHTML.textContent = ''
}

botonReiniciarJuego.onclick = () => {
    //grillaHTML.textContent = ''
    revisarDificultadElegida()
}

const revisarDificultadElegida = () => {
    if (nivelDificultad === 'facil') {
        grillaFacil()
    }
    else if (nivelDificultad === 'normal') {
        grillaNormal()
    }
    else if (nivelDificultad === 'dificil') {
        grillaDificil()
    }
}




// Si no hay bloques, 
// el usuario hace click en un mosaico
// el usuario hace click en otro mosaico
// chequeamos si moviendo los mosaicos de lugar hay matches
// si no hay, volvemos elementos a la posicion original
// si hay, mantenemos los elementos en la nueva posicion
// 

//Seleccionar mosaico al hacer click en el
const primerMosaicoSeleccionado = ''
for (let mosaico of mosaicos) {
    mosaico.onclick = () => {
        mosaico.classList.add('seleccionado')
        const primerMosaicoSeleccionado = mosaico
        console.log(primerMosaicoSeleccionado)
    }
}


// desaparecen las frutas
// elimino los elementos tanto en HTML como en JS 

// primera version: rellenar con elementos al azar

// segunda version: hacer que los elementos "caigan"
// mientras haya items con posiciones vacias por debajo, 
// obtener la cantidad de posciones vacias que tiene debajo
// bajar el item esas pisiciones
// rellenar posiciones restantes (las de mas arriba) con elementos al azar




