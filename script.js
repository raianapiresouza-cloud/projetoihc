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
    if (this.classList.contains("clicado")) return;
    this.classList.add("clicado");
    this.style.display = "none";
    objetosRestantes--;
  });
});
function iniciarFase() {
  objetosRestantes = fases[faseAtual].querySelectorAll(".obj").length;
}

document.querySelectorAll(".btnAvancar").forEach((botao) => {
  botao.addEventListener("click", () => {
    if (objetosRestantes === 0) {
      proximaFase();
    } else {
      const aviso = document.getElementById("mensagemAviso");
      aviso.textContent = "Você ainda não encontrou todos os Intrusos!";
      aviso.classList.add("mostrar");
      setTimeout(() => {
        aviso.classList.remove("mostrar");
      }, 2500);
    }
  });
});
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
