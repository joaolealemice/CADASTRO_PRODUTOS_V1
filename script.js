//
// FASE 1: MODELAGEM DOS DADOS
//

class Produto {

    // Atributos privados
    #preco;
    #quantidade;

    constructor(nome, preco, quantidade) {

        // Validação do nome
        if (!nome || nome.trim() === "") {
            throw new Error("O nome do produto não pode estar em branco.");
        }

        // Conversão do preço
        const precoConvertido = parseFloat(preco);

        // Conversão da quantidade
        const quantidadeConvertida = parseInt(quantidade);

        // Validação do preço
        if (isNaN(precoConvertido) || precoConvertido <= 0) {
            throw new Error("O preço deve ser maior que zero.");
        }

        // Validação da quantidade
        if (isNaN(quantidadeConvertida) || quantidadeConvertida <= 0) {
            throw new Error("A quantidade deve ser maior que zero.");
        }

        // Armazena os dados
        this.nome = nome.trim();
        this.#preco = precoConvertido;
        this.#quantidade = quantidadeConvertida;
    }

    // Getter do preço
    get preco() {
        return this.#preco;
    }

    // Getter da quantidade
    get quantidade() {
        return this.#quantidade;
    }

    // Calcula o subtotal
    calcularSubtotal() {
        return this.#preco * this.#quantidade;
    }
}


//
// FASE 2: GERENCIAMENTO DE ESTADO
//

const listaDeProdutos = [];


//
// FASE 3: CADASTRO DO PRODUTO
//

const formProduto = document.getElementById("produto-form");

formProduto.addEventListener("submit", function (event) {

    event.preventDefault();

    // Captura os valores dos inputs
    const nomeInput = document.getElementById("nome").value;
    const precoInput = document.getElementById("preco").value;
    const quantidadeInput = document.getElementById("quantidade").value;

    try {

        // Cria um novo produto
        const novoProduto = new Produto(
            nomeInput,
            precoInput,
            quantidadeInput
        );

        // Adiciona ao array
        listaDeProdutos.push(novoProduto);

        // Atualiza a tabela
        renderizarTabela();

        // Atualiza o total
        atualizarTotalEstoque();

        // Limpa o formulário
        formProduto.reset();

    } catch (erro) {

        // Mostra o erro sem travar a aplicação
        alert(erro.message);
    }
});


//
// FASE 4: RENDERIZAÇÃO DA TABELA
//

function renderizarTabela() {

    const tabelaBody = document.querySelector(
        "#tabela-produtos tbody"
    );

    // Limpa a tabela
    tabelaBody.innerHTML = "";

    // Percorre os produtos
    listaDeProdutos.forEach((produto, index) => {

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${produto.nome}</td>

            <td>
                ${produto.preco.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                })}
            </td>

            <td>${produto.quantidade}</td>

            <td>
                ${produto.calcularSubtotal().toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                })}
            </td>

            <td>
                <button
                    class="btn-remover"
                    onclick="removerProduto(${index})"
                >
                    Remover
                </button>
            </td>
        `;

        tabelaBody.appendChild(linha);
    });
}


//
// DESAFIO 2: TOTAL DO ESTOQUE
//

function atualizarTotalEstoque() {

    // Soma todos os subtotais
    const total = listaDeProdutos.reduce(
        (acumulador, produto) => {
            return acumulador + produto.calcularSubtotal();
        },
        0
    );

    // Seleciona o elemento do total
    const elementoTotal = document.getElementById("total-estoque");

    // Formata como moeda brasileira
    elementoTotal.textContent =
        `Total em Estoque: ${total.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })}`;
}


//
// DESAFIO 3: REMOVER PRODUTO
//

function removerProduto(index) {

    // Remove o produto pelo índice
    listaDeProdutos.splice(index, 1);

    // Atualiza a tabela
    renderizarTabela();

    // Atualiza o total
    atualizarTotalEstoque();
}


//
// DESAFIO 3: LIMPAR TODOS OS PRODUTOS
//

const botaoLimpar = document.getElementById("limpar-tabela");

botaoLimpar.addEventListener("click", function () {

    // Esvazia o array
    listaDeProdutos.length = 0;

    // Atualiza a tabela
    renderizarTabela();

    // Atualiza o total
    atualizarTotalEstoque();
});