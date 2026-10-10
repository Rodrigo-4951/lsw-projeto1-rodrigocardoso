// ===== 1. DADOS =====
const nomeLoja = "Calçados do Rei"
const produtos = [{nome:"Sapato", categoria:"Dia a dia", preço: 100.00, quantidade:10, vendidos:0},
{nome:"Tenis", categoria:"Dia a dia", preço: 120.00, quantidade:10, vendidos:0},
{nome:"Sandalia", categoria:"Conforto", preço: 75.00, quantidade:10, vendidos:0},
{nome:"Crocs", categoria:"Conforto", preço: 80.00, quantidade:3, vendidos:0},
{nome:"Sapatenis", categoria:"Dia a dia", preço: 125.00, quantidade:10, vendidos:0},
{nome:"Salto-alto", categoria:"Dia a dia", preço: 115.00, quantidade:4, vendidos:0}]

// ===== 2. FUNÇÕES =====

//tarefa 2
function listarProdutos(produtos=[]){
for(let i=0;i<produtos.length;i++){
   console.log(`${i+1}. nome: ${produtos[i].nome} | categoria: ${produtos[i].categoria} | preço: ${produtos[i].preço} | quantidade: ${produtos[i].quantidade} | vendidos: ${produtos[i].vendidos} |`) 
}
}

//tarefa 3
function cadastrarProduto(produtos=[], nome, categoria, preço, quantidade){
    produtos.push({nome:formatarNome(nome),
        categoria:categoria,
        preço:preço,
        quantidade:quantidade,
        vendidos:0});
    return produtos.length;
}

// tarefa 4
function calcularValorEstoque(produtos=[]){
  let soma = 0
  for(let i=0;i<produtos.length;i++){
    soma += produtos[i].preço * produtos[i].quantidade;
  }
  return soma;
}

// tarefa 5
function buscarProduto(produtos=[], termo){
    let busca = termo.toLowerCase();
    for(i=0;i<produtos.length;i++){
        if(busca === produtos[i].nome.toLowerCase()){
            return produtos[i]
        } 
    }
    return null
}

// tarefa 6
function produtosEmFalta(produtos=[], minimo){
    let falta=[];
    let contador = 0
    for(let i=0;i<produtos.length;i++){
        if(produtos[i].quantidade < minimo){
            falta[contador]={nome:produtos[i].nome,quantidade:produtos[i].quantidade}
            contador ++
        }
    }
    return falta;
}

// tarefa 7
function aplicarDesconto(produtos=[],categoria,percentual){
    let contador = 0;
    for(i=0;i<produtos.length;i++){
        if(produtos[i].categoria === categoria){
            let preço = produtos[i].preço;
            produtos[i].preço = preço - (preço * percentual / 100);
            contador ++
        }
    }   
    return contador;
}

//tarefa 8

function registrarVenda(produtos, item, quantidade) {
    let produto = buscarProduto(produtos, item);

    if (produto === null || quantidade <= 0 || produto.quantidade < quantidade) {
        return false;
    }

    produto.quantidade -= quantidade;
    produto.vendidos += quantidade;

    return true;
}

//tarefa 9
function formatarNome(texto){
    texto = texto.toLowerCase();
    texto = texto.trim();
    let tam = texto.length;
    return `${texto[0].toUpperCase()}${texto.slice(1, tam)}`
}

//tarefa 10
function converterParaJSON(produtos=[]){
    return JSON.stringify(produtos);
}

function lerJSON(produtos){
    return JSON.parse(produtos);
}

//tarefa 11

function gerarRelatorio(nomeLoja, produtos){
    let falta = produtosEmFalta(produtos,5)
    console.log(nomeLoja.toUpperCase());
    console.log(`Produtos cadastrados ${produtos.length}`);
    console.log(`Valor total do estoque: $ ${calcularValorEstoque(produtos)}`);
    console.log(`Produtos com pouco estoque: ${falta.length}`)
    for(i=0;i<falta.length;i++){
        console.log(`-${falta[i].nome} (${falta[i].quantidade} unidades.)`)
    }
}



console.log("TAREFA 2: Listar")
console.log(listarProdutos(produtos))

console.log("TAREFA 3: Cadastrar")
console.log(`Produto cadastrado! a loja tem agora ${cadastrarProduto(produtos,"chinelo","Conforto",20,25)} produtos`)

console.log("TAREFA 4: Calcular")
console.log(`Valor do estoque: $ ${calcularValorEstoque(produtos)}`)

console.log("TAREFA 5: Buscar")
let busca=buscarProduto(produtos,"SandaliA")
console.log(`Produto encontrado: ${busca.nome} - $${busca.preço} `)

console.log("TAREFA 6: Falta")
console.log(`Produtos com menos de 5 unidades: ${falta=produtosEmFalta(produtos, 5).length}`)

console.log("TAREFA 7: Desconto")
console.log(`${aplicarDesconto(produtos,"Conforto",25)} produtos receberam desconto`)
console.log(`Novo preço de ${produtos[2].nome}: $${produtos[2].preço}`)


console.log("TAREFA 8: Vender")
if(registrarVenda(produtos,"TENIS",3)){
    let produto = buscarProduto(produtos,"Tenis");
    console.log(`Venda realizada! Tenis:${produto.quantidade} unidades em estoque, ${produto.vendidos} vendidos`)
}
    else{
        console.log("venda nao realizada: estoque insuficiente ou produto inexistente")
    }

if(registrarVenda(produtos,"sapatilha",3)){
    let produto = buscarProduto(produtos,"Tenis");
    console.log(`Venda realizada! Tenis:${produtos[1].quantidade} unidades em estoque, ${produtos[1].vendidos} vendidos`)
}
    else{
        console.log("venda nao realizada: estoque insuficiente ou produto inexistente")
    }

console.log("TAREFA 9: Formatar")
console.log(formatarNome("     bORRACHA BRANCA    "))

console.log("TAREFA 10: JSON")
let texto = converterParaJSON(produtos);
console.log(typeof(texto))
let recuperados = lerJSON(texto)
console.log(`Itens recuperados: ${recuperados.length} | primeiro: ${recuperados[0].nome}`)

console.log("TAREFA 11: Relatorio")
console.log(gerarRelatorio(nomeLoja, produtos));