class Despesa {
  constructor(ano, mes, dia, tipo, descricao, valor) {
    // Inicializa os atributos de uma despesa
    this.ano = ano;
    this.mes = mes;
    this.dia = dia;
    this.tipo = tipo;
    this.descricao = descricao;
    this.valor = valor;
  }

  validarDados() {
    // Valida os dados da despesa para garantir que nenhum campo esteja vazio
    for (let i in this) {
      if (this[i] == undefined || this[i] == "" || this[i] == null) {
        return false; // Retorna falso se algum dado estiver inválido
      }
    }
    return true; // Retorna verdadeiro se todos os dados forem válidos
  }
}

class Bd {
  constructor() {
    // Verifica se o ID já existe no localStorage; caso contrário, inicializa com 0
    let id = localStorage.getItem("id");

    if (id === null) {
      localStorage.setItem("id", 0);
    }
  }

  getProximoId() {
    // Retorna o próximo ID disponível
    let proximoId = localStorage.getItem("id");
    return parseInt(proximoId) + 1;
  }

  gravar(d) {
    // Grava uma despesa no localStorage
    let id = this.getProximoId();

    localStorage.setItem(id, JSON.stringify(d)); // Armazena a despesa como string JSON

    localStorage.setItem("id", id); // Atualiza o último ID utilizado
  }

  recuperarTodosRegistros() {
    // Recupera todas as despesas armazenadas no localStorage
    let despesas = Array();

    let id = localStorage.getItem("id");

    // Percorre os IDs e recupera os registros
    for (let i = 1; i <= id; i++) {
      let despesa = JSON.parse(localStorage.getItem(i)); // Converte a string JSON em objeto

      if (despesa === null) {
        continue; // Pula os registros inexistentes (removidos)
      }

      despesa.id = i; // Adiciona o ID ao objeto despesa

      despesas.push(despesa); // Adiciona a despesa ao array
    }

    return despesas; // Retorna o array de despesas
  }

  pesquisar(despesa) {
    // Pesquisa despesas com base nos critérios fornecidos
    let despesasFiltradas = Array();

    despesasFiltradas = this.recuperarTodosRegistros(); // Obtém todas as despesas

    // Filtros por campos
    if (despesa.ano != "") {
      despesasFiltradas = despesasFiltradas.filter((d) => d.ano == despesa.ano);
    }
    if (despesa.mes != "") {
      despesasFiltradas = despesasFiltradas.filter((d) => d.mes == despesa.mes);
    }
    if (despesa.dia != "") {
      despesasFiltradas = despesasFiltradas.filter((d) => d.dia == despesa.dia);
    }
    if (despesa.tipo != "") {
      despesasFiltradas = despesasFiltradas.filter(
        (d) => d.tipo == despesa.tipo
      );
    }
    if (despesa.descricao != "") {
      despesasFiltradas = despesasFiltradas.filter(
        (d) => d.descricao == despesa.descricao
      );
    }
    if (despesa.valor != "") {
      despesasFiltradas = despesasFiltradas.filter(
        (d) => d.valor == despesa.valor
      );
    }

    return despesasFiltradas; // Retorna as despesas que correspondem aos critérios
  }

  remover(id) {
    // Remove uma despesa do localStorage com base no ID
    localStorage.removeItem(id);
  }
}

let bd = new Bd(); // Instancia a classe Bd para gerenciar o localStorage

function cadastrarDespesa() {
  // Obtém os valores dos campos do formulário
  let ano = document.getElementById("ano");
  let mes = document.getElementById("mes");
  let dia = document.getElementById("dia");
  let tipo = document.getElementById("tipo");
  let descricao = document.getElementById("descricao");
  let valor = document.getElementById("valor");

  // Cria um objeto Despesa com os valores obtidos
  let despesa = new Despesa(
    ano.value,
    mes.value,
    dia.value,
    tipo.value,
    descricao.value,
    valor.value
  );

  if (despesa.validarDados()) {
    // Se os dados forem válidos, grava a despesa no localStorage
    bd.gravar(despesa);

    // Exibe um modal de sucesso
    document.getElementById("modal_titulo").innerHTML =
      "Registro inserido com sucesso";
    document.getElementById("modal_titulo_div").className =
      "modal-header text-success";
    document.getElementById("modal_conteudo").innerHTML =
      "Despesa foi cadastrada com sucesso!";
    document.getElementById("modal_btn").innerHTML = "Voltar";
    document.getElementById("modal_btn").className = "btn btn-success";

    $("#modalRegistraDespesa").modal("show");

    // Limpa os campos do formulário
    ano.value = "";
    mes.value = "";
    dia.value = "";
    tipo.value = "";
    descricao.value = "";
    valor.value = "";
  } else {
    // Exibe um modal de erro se os dados forem inválidos
    document.getElementById("modal_titulo").innerHTML =
      "Erro na inclusão do registro";
    document.getElementById("modal_titulo_div").className =
      "modal-header text-danger";
    document.getElementById("modal_conteudo").innerHTML =
      "Erro na gravação, verifique se todos os campos foram preenchidos corretamente!";
    document.getElementById("modal_btn").innerHTML = "Voltar e corrigir";
    document.getElementById("modal_btn").className = "btn btn-danger";

    $("#modalRegistraDespesa").modal("show");
  }
}

function carregaListaDespesas(despesas = Array(), filtro = false) {
  // Carrega e exibe a lista de despesas na página
  if (despesas.length == 0 && filtro == false) {
    despesas = bd.recuperarTodosRegistros(); // Obtém todas as despesas se nenhum filtro for aplicado
  }

  let listaDespesas = document.getElementById("listaDespesas");
  listaDespesas.innerHTML = ""; // Limpa a lista antes de preenchê-la

  despesas.forEach(function (d) {
    let linha = listaDespesas.insertRow(); // Cria uma nova linha

    linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`; // Data

    switch (d.tipo) {
      // Ajusta o tipo para uma descrição mais amigável
      case "1":
        d.tipo = "Alimentação";
        break;
      case "2":
        d.tipo = "Educação";
        break;
      case "3":
        d.tipo = "Lazer";
        break;
      case "4":
        d.tipo = "Saúde";
        break;
      case "5":
        d.tipo = "Transporte";
        break;
    }
    linha.insertCell(1).innerHTML = d.tipo; // Tipo
    linha.insertCell(2).innerHTML = d.descricao; // Descrição
    linha.insertCell(3).innerHTML = d.valor; // Valor

    let btn = document.createElement("button"); // Botão de exclusão
    btn.className = "btn btn-danger";
    btn.innerHTML = '<i class="fas fa-times"></i>';
    btn.id = `id_despesa_${d.id}`;
    btn.onclick = function () {
      let id = this.id.replace("id_despesa_", "");
      bd.remover(id); // Remove a despesa

      // Exibe um modal de sucesso
      document.getElementById("modal_titulo").innerHTML = "Despesa excluída";
      document.getElementById("modal_titulo_div").className =
        "modal-header text-danger";
      document.getElementById("modal_conteudo").innerHTML =
        "Despesa excluída com sucesso!";
      document.getElementById("modal_btn").innerHTML = "Voltar";
      document.getElementById("modal_btn").className = "btn btn-danger";

      // Mostra o modal
      $("#modalRegistraDespesa").modal("show");

      // Aguarda o modal ser fechado para recarregar a página
      $("#modalRegistraDespesa").on("hidden.bs.modal", function () {
        location.reload();
      });
    };
    linha.insertCell(4).append(btn); // Adiciona o botão na linha
  });
}

function pesquisarDespesa() {
  // Obtém os valores dos filtros do formulário
  let ano = document.getElementById("ano").value;
  let mes = document.getElementById("mes").value;
  let dia = document.getElementById("dia").value;
  let tipo = document.getElementById("tipo").value;
  let descricao = document.getElementById("descricao").value;
  let valor = document.getElementById("valor").value;

  // Cria um objeto Despesa com os valores dos filtros
  let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor);

  // Obtém as despesas que atendem aos critérios de pesquisa
  let despesas = bd.pesquisar(despesa);

  carregaListaDespesas(despesas, true); // Exibe as despesas filtradas
}
