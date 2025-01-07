// Variáveis globais para armazenar altura e largura do palco do jogo
var altura = 0;
var largura = 0;
var vidas = 1;
// Função que ajusta o tamanho do palco do jogo com base no tamanho da janela
function ajustaTamanhoPalcoJogo() {
  altura = window.innerHeight; // Captura a altura da janela
  largura = window.innerWidth; // Captura a largura da janela
  console.log(largura, altura); // Exibe as dimensões no console
}

// Chama a função para ajustar o tamanho do palco do jogo quando a página é carregada
ajustaTamanhoPalcoJogo();

// Função que cria um mosquito em uma posição aleatória
function posicaoRandom() {
  //remover o mosquito anterior (caso exista)
  if (document.getElementById("mosquito")) {
    document.getElementById("mosquito").remove();

    
    if (vidas > 3) {
      window.location.href='fim_de_jogo.html'
    } else {
      document.getElementById("v" + vidas).src = "imagens/coracao_vazio.png";
      vidas++;
    }
  }

  var posicaoX = Math.floor(Math.random() * largura) - 90; // Calcula uma posição X aleatória
  var posicaoY = Math.floor(Math.random() * altura) - 90; // Calcula uma posição Y aleatória

  // Garante que as posições X e Y não sejam negativas
  posicaoX = posicaoX < 0 ? 0 : posicaoX;
  posicaoY = posicaoY < 0 ? 0 : posicaoY;

  console.log(posicaoX, posicaoY); // Exibe as posições no console

  // Criação do elemento HTML para o mosquito
  var mosquito = document.createElement("img");
  mosquito.src = "imagens/mosca.png"; // Define a imagem do mosquito
  mosquito.className = tamanhoAleatorio() + " " + ladoAleatorio(); // Define a classe do mosquito com tamanho e lado aleatórios
  mosquito.style.left = posicaoX + "px"; // Define a posição X do mosquito
  mosquito.style.top = posicaoY + "px"; // Define a posição Y do mosquito
  mosquito.style.position = "absolute"; // Define a posição absoluta para o mosquito
  mosquito.id = "mosquito";
  mosquito.onclick = function () {
    this.remove(); //remover o mosquito com o click
  };

  // Adiciona o elemento mosquito ao corpo do documento
  document.body.appendChild(mosquito);
}

// Chama a função para criar um mosquito em uma posição aleatória
posicaoRandom();

// Função que retorna uma classe aleatória para o tamanho do mosquito
function tamanhoAleatorio() {
  var classe = Math.floor(Math.random() * 3); // Gera um número aleatório entre 0 e 2
  switch (classe) {
    case 0:
      return "mosquito1"; // Retorna a classe mosquito1
    case 1:
      return "mosquito2"; // Retorna a classe mosquito2
    case 2:
      return "mosquito3"; // Retorna a classe mosquito3
  }
}

// Função que retorna uma classe aleatória para o lado do mosquito
function ladoAleatorio() {
  var lado = Math.floor(Math.random() * 2); // Gera um número aleatório entre 0 e 1
  switch (lado) {
    case 0:
      return "ladoA"; // Retorna a classe ladoA
    case 1:
      return "ladoB"; // Retorna a classe ladoB
  }
}
