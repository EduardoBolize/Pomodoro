let minutosEl = document.querySelector('#minutos')
let pomodorosEl = document.querySelector('#pomodoros')
let botaoEl = document.querySelector('#envia')

const TEMPO_INICIAL = 25 * 60 * 1000;
const TEMPO_DESCANSO = 5 * 60 * 1000;

let pomodoros = 0;
let milisegundosAtuais = TEMPO_INICIAL;
let intervalos = [];
let descansos = 0;

let isPausado = false;

function limparIntervalos() {
  const limparIntervalo = (intervalo) => clearInterval(intervalo)
  intervalos.forEach(limparIntervalo);
}

function extrairTempos(tempo){
  const minutos = Math.floor((tempo / 1000) / 60);
  const segundos = Math.floor((tempo / 1000) % 60);
  const milisegundos = tempo % 1000;
  
  return [minutos, segundos, milisegundos];
}

function atualizarPomodoros() {
  pomodoros++
  pomodorosEl.innerHTML = `Pomodoros: ${pomodoros}`;
  limparIntervalos();
}

function atualizarDescansos() {
  descansos++
  limparIntervalos();
}

function timer() {
  const novoTempo = milisegundosAtuais--;
  let tempos = extrairTempos(novoTempo);
  minutosEl.innerHTML = `${String(tempos[0]).padStart(2, '0')}:${String(tempos[1]).padStart(2, '0')} ${String(tempos[2]).padStart(3,'0')}`;

  if (novoTempo == 0) {

    let tempoTimer;

    if (pomodoros > descansos) {
      tempoTimer = TEMPO_INICIAL;
      console.log('chegou ali')
      atualizarDescansos()
    } else if(pomodoros === 0) {
      tempoTimer = TEMPO_DESCANSO;
      console.log('chegou aqui')
      atualizarPomodoros()
    } else {
      tempoTimer = TEMPO_DESCANSO;
      atualizarPomodoros();
      console.log('chegou acolá')
    }

    milisegundosAtuais = tempoTimer;

    tempos = extrairTempos(tempoTimer);

    minutosEl.innerHTML = `${String(tempos[0]).padStart(2, '0')}:${String(tempos[1]).padStart(2, '0')} ${String(tempos[2]).padStart(3,'0')}`;
  } 
}

function startTimer(evento, contadorRecursao) {
  if(evento) evento.preventDefault()
 
  const isTempoInicial = milisegundosAtuais == TEMPO_INICIAL || milisegundosAtuais == TEMPO_DESCANSO;

  if(!isTempoInicial && !isPausado){
    limparIntervalos()
    isPausado = true
    return;
  }

  isPausado = false;
  
  intervalo = setInterval(timer, 10)
  intervalos.push(intervalo);
  
  if (contadorRecursao > 0) {
      startTimer(undefined, contadorRecursao - 1);
  }
}

