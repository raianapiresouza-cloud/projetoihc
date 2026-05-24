let faseAtual = 0;
const fases = document.querySelectorAll(".fase");
let objetosRestantes = 0;

// =============================================
// ÁUDIO
// =============================================
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Som "plim" ao acertar objeto
function tocarPlim() {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.type = "sine";
  osc.frequency.setValueAtTime(880, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.1);
  gain.gain.setValueAtTime(0.4, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);
  osc.start(audioCtx.currentTime);
  osc.stop(audioCtx.currentTime + 0.4);
}

// "Tcharãn" de fase completa / parabéns
function tocarTcharan() {
  const notas = [
    { freq: 523.25, start: 0, dur: 0.15 },
    { freq: 659.25, start: 0.12, dur: 0.15 },
    { freq: 783.99, start: 0.24, dur: 0.15 },
    { freq: 1046.5, start: 0.36, dur: 0.6 },
    { freq: 880, start: 0.38, dur: 0.55 },
    { freq: 659.25, start: 0.4, dur: 0.5 },
  ];

  notas.forEach(({ freq, start, dur }) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime + start);

    gain.gain.setValueAtTime(0, audioCtx.currentTime + start);
    gain.gain.linearRampToValueAtTime(
      0.25,
      audioCtx.currentTime + start + 0.03,
    );
    gain.gain.exponentialRampToValueAtTime(
      0.001,
      audioCtx.currentTime + start + dur,
    );

    osc.start(audioCtx.currentTime + start);
    osc.stop(audioCtx.currentTime + start + dur + 0.05);
  });
}

// Musiquinha de fundo em loop
let musicaRodando = false;

function iniciarMusica() {
  if (musicaRodando) return;
  musicaRodando = true;

  const notas = [
    [523, 0.25],
    [587, 0.25],
    [659, 0.25],
    [698, 0.25],
    [784, 0.5],
    [698, 0.25],
    [659, 0.25],
    [587, 0.5],
    [523, 0.25],
    [659, 0.25],
    [784, 0.25],
    [698, 0.25],
    [659, 0.5],
    [587, 0.25],
    [523, 0.5],
    [523, 0.5],
  ];

  const duracaoTotal = notas.reduce((acc, n) => acc + n[1], 0);

  function tocarLoop(startTime) {
    let t = startTime;
    notas.forEach(([freq, dur]) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.12, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur - 0.02);
      osc.start(t);
      osc.stop(t + dur);
      t += dur;
    });
    setTimeout(
      () => tocarLoop(audioCtx.currentTime + 0.05),
      (duracaoTotal - 0.1) * 1000,
    );
  }

  tocarLoop(audioCtx.currentTime);
}

// =============================================
// ESTRELINHAS
// =============================================
const coresEstrela = [
  "rgb(255, 215, 0)",
  "rgb(255, 107, 107)",
  "rgb(107, 255, 158)",
  "rgb(107, 212, 255)",
  "rgb(255, 158, 107)",
  "rgb(233, 107, 255)",
];

function criarEstrelas(x, y) {
  const container = document.getElementById("game-container");
  const rect = container.getBoundingClientRect();
  const px = x - rect.left;
  const py = y - rect.top;

  for (let i = 0; i < 10; i++) {
    const estrela = document.createElement("div");
    estrela.classList.add("estrela");
    const angulo = (360 / 10) * i + Math.random() * 20;
    const distancia = 40 + Math.random() * 40;
    const rad = (angulo * Math.PI) / 180;
    estrela.style.left = px + "px";
    estrela.style.top = py + "px";
    estrela.style.backgroundColor = coresEstrela[i % coresEstrela.length];
    estrela.style.setProperty("--dx", Math.cos(rad) * distancia + "px");
    estrela.style.setProperty("--dy", Math.sin(rad) * distancia + "px");
    container.appendChild(estrela);
    estrela.addEventListener("animationend", () => estrela.remove());
  }
}

// =============================================
// CONFETES (tela final)
// =============================================
const coresConfete = [
  "rgb(255, 215, 0)",
  "rgb(255, 107, 107)",
  "rgb(107, 255, 158)",
  "rgb(107, 212, 255)",
  "rgb(255, 158, 107)",
  "rgb(233, 107, 255)",
  "rgb(255, 255, 255)",
  "rgb(255, 153, 170)",
];

function lancarConfetes() {
  const container = document.getElementById("game-container");
  for (let i = 0; i < 80; i++) {
    const c = document.createElement("div");
    c.classList.add("confete");
    c.style.left = Math.random() * 100 + "%";
    c.style.backgroundColor =
      coresConfete[Math.floor(Math.random() * coresConfete.length)];
    c.style.setProperty("--dur", 1.5 + Math.random() * 2 + "s");
    c.style.setProperty("--delay", Math.random() * 1.2 + "s");
    container.appendChild(c);
    c.addEventListener("animationend", () => c.remove());
  }
}

// =============================================
// MODAL DE INSTRUÇÕES
// =============================================
document.getElementById("btnComoJogar").addEventListener("click", () => {
  document.getElementById("modalInstrucoes").classList.add("aberto");
});
document.getElementById("btnFecharInstrucoes").addEventListener("click", () => {
  document.getElementById("modalInstrucoes").classList.remove("aberto");
});

// =============================================
// INICIAR JOGO
// =============================================
document.getElementById("btnIniciar").addEventListener("click", () => {
  if (audioCtx.state === "suspended") audioCtx.resume();
  iniciarMusica();
  document.getElementById("inicio").style.display = "none";
  fases[0].classList.add("ativa");
  iniciarFase();
});

// =============================================
// CLIQUE NOS OBJETOS
// =============================================
document.querySelectorAll(".obj").forEach((obj) => {
  obj.addEventListener("click", function (e) {
    if (this.classList.contains("clicado")) return;
    tocarPlim();
    criarEstrelas(e.clientX, e.clientY);
    this.classList.add("clicado");
    this.style.display = "none";
    objetosRestantes--;
    if (objetosRestantes === 0) revelarBotaoAvancar();
  });
});

// =============================================
// BOTÃO DE AVANÇAR
// =============================================
function revelarBotaoAvancar() {
  const botao = fases[faseAtual].querySelector(".btnAvancar");
  botao.classList.remove("oculto");
  botao.classList.add("visivel");
}

document.querySelectorAll(".btnAvancar").forEach((botao) => {
  botao.addEventListener("click", () => proximaFase());
});

// =============================================
// LÓGICA DE FASES
// =============================================
function iniciarFase() {
  objetosRestantes = fases[faseAtual].querySelectorAll(".obj").length;
  const botao = fases[faseAtual].querySelector(".btnAvancar");
  botao.classList.remove("visivel");
  botao.classList.add("oculto");
}

function proximaFase() {
  // Toca o tcharãn ao completar cada fase
  tocarTcharan();

  fases[faseAtual].classList.remove("ativa");
  faseAtual++;

  if (faseAtual < fases.length) {
    fases[faseAtual].classList.add("ativa");
    iniciarFase();
  } else {
    // Tela final
    const tela = document.getElementById("final");
    tela.style.display = "flex";

    // Animação do título Parabéns
    const titulo = document.getElementById("parabens");
    titulo.classList.add("parabens-animado");

    // Confetes
    lancarConfetes();

    // Toca tcharãn mais elaborado na tela final
    setTimeout(() => tocarTcharan(), 300);
    setTimeout(() => tocarTcharan(), 800);
  }
}

// =============================================
// JOGAR NOVAMENTE
// =============================================
document.getElementById("btnVoltar").addEventListener("click", () => {
  location.reload();
});
