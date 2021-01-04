//função para calculo da vazao de condensado

function  condensado(q1, q2, exportacaoReduc){
  let vaporCaldeira11 = 0.0032*q1 + 50.42
  let vaporCaldeira12 = 0.0034*q2 + 51.289

  let vaporTotal = vaporCaldeira11 + vaporCaldeira12
  let condensado = vaporTotal - exportacaoReduc/3.6

  return condensado
}

//função para calculo da vazao de condensado
function  condensadoByPass(q1, q2, exportacaoReduc){
  let vaporCaldeira11 = 0.0034*q1 + 47.156
  let vaporCaldeira12 = 0.0035*q2 + 49.8

  let vaporTotal = vaporCaldeira11 + vaporCaldeira12
  let condensado = vaporTotal - exportacaoReduc/3.6

  return condensado
}

//função para calculo da geração da TV18
function calculaGeracao(condensado){
  let geracao = 0.0082*condensado**2 -0.1614*condensado+52.392
  return geracao
}


 //função para calculo da geração da TV18 em modo bypass
function calculaGeracaoByPass(condensado){
  let geracao = 1.2227*condensado - 10.265
  return geracao
}


//funcao calcula exportacao Reduc
function exportacaoExtracao(q1, q2, cargaTV18){
  let exportacaoExtracao = 3.6*(0.0032*q1 + 0.0034*q2 +101.71 - (cargaTV18+15.484)/1.3676)
  return exportacaoExtracao
}


 //funcao calcula exportacao Reduc Modo ByPass
function exportacaoBypass(q1, q2, cargaTV18){
  let exportacao = 3.6*(0.004157*q1 + 0.00428*q2 + 108.28 - cargaTV18)/1.2227    
  return exportacao  
}


//opções de estimar geracao ou vazao

const botaoEstimarGeracao = document.querySelector('#estimarGeracao')
const botaoEstimarVazao = document.querySelector('#estimarVazao')
const inputGeracao = document.querySelector('#geracao')
const inputVazao = document.querySelector('#vazaoVapor')

var q1 = document.querySelector('#queima11')
var q2 = document.querySelector('#queima12')
var reduc = document.querySelector('#vazaoVapor')
var carga = document.querySelector('#geracao')

//Função Onclick do botão "Geração"
botaoEstimarGeracao.onclick = function(){

inputGeracao.setAttribute("disabled", "disabled")
inputGeracao.style.backgroundColor ="#e9e9e9"
inputVazao.removeAttribute('disabled')
q1.removeAttribute('disabled')
q2.removeAttribute('disabled')
q1.focus()

inputVazao.style.backgroundColor ="#fff"

}



////Função Onclick do botão "Vazao"
botaoEstimarVazao.onclick = function(){
  
  inputVazao.setAttribute("disabled", "disabled")
  inputVazao.style.backgroundColor ="#e9e9e9"
  inputGeracao.removeAttribute('disabled')
  inputGeracao.style.backgroundColor ="#fff"
  q1.removeAttribute('disabled')
  q2.removeAttribute('disabled')
  q1.focus()
}

 


//Estimar a geração com o botão calcular Geração
const modo = document.getElementsByName("modo")

const botaoCalculaGeracao = document.querySelector('#calculaGeracao')

botaoCalculaGeracao.onclick = function (){


    if(modo[0].checked){
    const vazaoCondensado = condensado(parseFloat(q1.value), parseFloat(q2.value), parseFloat(reduc.value))
    const geracaoEstimada = calculaGeracao(vazaoCondensado)
    const resultado = document.querySelector(".result")

    resultado.innerHTML = `Cargar estimada na TV18: ${geracaoEstimada.toFixed(1)} MW`

    //Estimar geração em modo bypass

    }else if (modo[1].checked==true){
        
    const vazaoCondensado = condensadoByPass(parseFloat(q1.value), parseFloat(q2.value), parseFloat(reduc.value))
    const geracaoEstimada = calculaGeracaoByPass(vazaoCondensado)
    const resultado = document.querySelector(".result")

    resultado.innerHTML = `Cargar estimada na TV18: ${geracaoEstimada.toFixed(1)} MW`
    }
    

}






//Estimar a Exportação de vapor com o botao calcular Vazao
const botaoCalculaVazao = document.querySelector('#calculaVazao')

botaoCalculaVazao.onclick = function (){

  
    if(modo[0].checked){
    const resultado = document.querySelector(".result")
    const vazaoEstimada =  exportacaoExtracao(parseFloat(q1.value), parseFloat(q2.value), parseFloat(carga.value)) 
    resultado.innerHTML = `Vazão de exportação: ${vazaoEstimada.toFixed(1)} ton/h`

    //Estimar geração em modo bypass

    }else if (modo[1].checked==true){
        
    const resultado = document.querySelector(".result")
    const vazaoEstimada =  exportacaoBypass(parseFloat(q1.value), parseFloat(q2.value), parseFloat(carga.value))

    resultado.innerHTML = `Vazão de exportação: ${vazaoEstimada.toFixed(1)} ton/h`
    }
    

}


