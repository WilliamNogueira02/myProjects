const peso = document.getElementById("peso");
const altura = document.getElementById("altura");
const resultado = document.getElementById("resultado");
const formulario = document.getElementById("formulario-imc");
const titulo = document.getElementById("meuTitulo");

// Evento de envio do formulário
formulario.addEventListener("submit", (e) => {
  e.preventDefault(); // Impede o recarregamento da página

  // Converte valores e troca vírgula por ponto (caso o usuário use vírgula)
  const pesoValor = parseFloat(peso.value.replace(",", "."));
  const alturaValor = parseFloat(altura.value.replace(",", ".")) / 100;

  // Validação básica
  if (isNaN(pesoValor) || isNaN(alturaValor) || pesoValor <= 0 || alturaValor <= 0) {
    alert("Por favor, preencha todos os campos com valores válidos!");
    return;
  }

  // Cálculo do IMC
  const imc = pesoValor / (alturaValor * alturaValor);
  const imcFormatado = imc.toFixed(2);

  // Definição da classificação e cor
  let classificacao = "";
  let cor = "";

  if (imc < 18.5) {
    classificacao = "Abaixo do peso";
    cor = "lightgreen";
  } else if (imc < 24.9) {
    classificacao = "Peso normal";
    cor = "green";
  } else if (imc < 29.9) {
    classificacao = "Sobrepeso";
    cor = "orange";
  } else if (imc < 34.9) {
    classificacao = "Obesidade grau I";
    cor = "red";
  } else if (imc < 39.9) {
    classificacao = "Obesidade grau II";
    cor = "darkred";
  } else {
    classificacao = "Obesidade grau III";
    cor = "maroon";
  }

  // Aplica a cor ao título e ao número do IMC
  titulo.style.color = cor;
  resultado.innerHTML = `
    Seu IMC é <strong><span style="color:${cor};">${imcFormatado}</span></strong> 
    (${classificacao})
  `;
});
