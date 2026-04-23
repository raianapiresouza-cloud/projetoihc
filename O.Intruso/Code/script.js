let faseAtual = 0;
const fases = document.querySelectorAll(".fase");
let objetosRestantes = 0;

document.getElementById("btnIniciar").addEventListener("click", () => {
  document.getElementById("inicio").style.display = "none";
  fases[0].classList.add("ativa");
  iniciarFase();
});

document.querySelectorAll(".obj").forEach((obj) => {
  obj.addEventListener("click", function () {
    this.style.display = "none";
    objetosRestantes--;

    if (objetosRestantes === 0) {
      proximaFase();
    }
  });
});

function iniciarFase() {
  objetosRestantes = fases[faseAtual].querySelectorAll(".obj").length;
}

function proximaFase() {
  fases[faseAtual].classList.remove("ativa");
  faseAtual++;

  if (faseAtual < fases.length) {
    fases[faseAtual].classList.add("ativa");
    iniciarFase();
  } else {
    document.getElementById("final").style.display = "flex";
  }
}

document.getElementById("btnVoltar").addEventListener("click", () => {
  location.reload();
});
