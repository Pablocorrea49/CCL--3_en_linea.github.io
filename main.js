const celdas = document.querySelectorAll('.btn');
const mensaje = document.getElementById('mensaje');
const usuario1 = document.getElementById('circulo');
const usuario2 = document.getElementById('cruz');
const newJuego = document.getElementById('nuevoJuego');

let turno = 0;
let piezza = '';
let tablero = ['','','','','','','','',''];
let circulo = 0;
let cruz = 0;


function score(piezza){
    if(piezza == 'X'){
        cruz++;
        usuario2.innerHTML = cruz;
    }
    else{
        circulo++;
        usuario1.innerHTML = circulo;
    }
    console.log(cruz);
}


function obtnerPieza(){
    return turno % 2 == 0 ? '0' : 'X';
}

function verificoGanador(){
    if (tablero[0] == tablero[1] && tablero[0] == tablero[2] && tablero[0] != '') return true;
    if (tablero[3] == tablero[4] && tablero[3] == tablero[5] && tablero[3] != '') return true;
    if (tablero[6] == tablero[7] && tablero[6] == tablero[8] && tablero[6] != '') return true;
    if (tablero[0] == tablero[3] && tablero[0] == tablero[6] && tablero[0] != '') return true;
    if (tablero[1] == tablero[4] && tablero[1] == tablero[7] && tablero[1] != '') return true;
    if (tablero[2] == tablero[5] && tablero[2] == tablero[8] && tablero[2] != '') return true;
    if (tablero[0] == tablero[4] && tablero[0] == tablero[8] && tablero[0] != '') return true;
    if (tablero[2] == tablero[4] && tablero[2] == tablero[6] && tablero[2] != '') return true;
    return false;
}

function resetear(){
    for(let i = 0; i < tablero.length; i++){
        tablero[i] = '';
        celdas[i].innerHTML = ''
    }
    mensaje.innerHTML = '';
    turno = 0;
    celdas.forEach(celda => celda.disabled = false);
}

function bloquearCeldas(){
    celdas.forEach(celda => celda.disabled = true);
}

const celdaSeleccionada = (e, posicion) => {
    let celda = e.target;
    if (celda.innerHTML === ''){
        piezza = obtnerPieza();
        celda.innerHTML = piezza;
        turno++;
        tablero[posicion] = piezza;
        if(verificoGanador()){
            mensaje.innerHTML = `Ganaron las piezzas ${piezza}`;
            score(piezza);
            bloquearCeldas();

        }
        if(turno === 9){
            mensaje.innerHTML = `Empate`;
        }

    }
}

newJuego.addEventListener('click', resetear);

celdas.forEach((celda, posicion) => celda.addEventListener('click', (e) => celdaSeleccionada(e, posicion)));