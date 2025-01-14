class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
      this.ano = ano;
      this.mes = mes;
      this.dia = dia;
      this.tipo = tipo;
      this.descricao = descricao;
      this.valor = valor;
    }
  }
  
  function cadastrarDespesas() {
    let ano = document.getElementById("ano").value;
    let mes = document.getElementById("mes").value;
    let dia = document.getElementById("dia").value;
    let tipo = document.getElementById("tipo").value;
    let descricao = document.getElementById("descricao").value;
    let valor = document.getElementById("valor").value;
  
    // Verificar se todos os campos estão preenchidos
    if (ano === '' || mes === '' || dia === '' || tipo === '' || descricao === '' || valor === '') {
      alert('Por favor, preencha todos os campos.');
      return;
    }
  
    let despesa = new Despesa(
      ano,
      mes,
      dia,
      tipo,
      descricao,
      valor
    );
  
    console.log(despesa);
    gravar(despesa);
  }
  
  function gravar(d) {
    let despesas = JSON.parse(localStorage.getItem("despesas") || "[]");
    despesas.push(d);
    localStorage.setItem("despesas", JSON.stringify(despesas));
  }
  