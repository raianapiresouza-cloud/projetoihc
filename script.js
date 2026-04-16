let faseAtual = 0;
let tempo = 60;
let jogoIniciado = false;
let timer = null;

const fases = document.querySelectorAll('.fase');

// INICIAR JOGO
function iniciarJogo(){
  jogoIniciado = true;

  document.getElementById('inicio').style.display = 'none';
  fases[0].classList.add('ativa');

  document.getElementById('musica').play();

  iniciarTempo(); // só começa aqui
}

// CONTADOR DE TEMPO
function iniciarTempo(){
  timer = setInterval(()=>{
    if(!jogoIniciado) return;

    tempo--;
    document.getElementById('tempo').innerText = tempo;

    if(tempo <= 0){
      fimDeJogo();
    }
  },1000);
}

// VERIFICAR FASE
document.querySelectorAll('input').forEach(input=>{
  input.addEventListener('change', verificarFase);
});

function verificarFase(){
  if(!jogoIniciado) return;

  const faseInputs = fases[faseAtual].querySelectorAll('input');

  let todos = true;

  faseInputs.forEach(i=>{
    if(!i.checked) todos = false;
  });

  if(todos){
    fases[faseAtual].classList.remove('ativa');
    faseAtual++;

    if(faseAtual < fases.length){
      fases[faseAtual].classList.add('ativa');
    }else{
      alert("🏆 Você venceu!");
      voltarInicio();
    }
  }
}

// FIM DO JOGO
function fimDeJogo(){
  alert("⏰ Tempo acabou!");
  voltarInicio();
}

// RESET COMPLETO
function voltarInicio(){
  clearInterval(timer);

  faseAtual = 0;
  tempo = 60;
  jogoIniciado = false;

  document.getElementById('tempo').innerText = 60;

  fases.forEach(f => f.classList.remove('ativa'));

  document.querySelectorAll('input').forEach(i => i.checked = false);

  document.getElementById('inicio').style.display = 'flex';
}
