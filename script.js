import Pesquisa from './src/models/Pesquisa.js';
import gerarRelatorioPNG from './src/relatorio.js';

const dados = [10, 15, 14, 20, 18, 25, 15, 10, 17, 19, 18, 25, 30, 32, 15];
const pesquisa = new Pesquisa(dados);

console.log("Número de dados:", pesquisa.numDados);
console.log("Dados ordenados:", pesquisa.dadosOrdenados);
console.log("Amplitude:", pesquisa.amplitude);
console.log("Número de classes:", pesquisa.numeroClasses);
console.log("H:", pesquisa.h);
console.table(pesquisa.tabelaDados);
console.log("Média:", pesquisa.media);
console.log("Média Simples:", pesquisa.mediaSimples);
console.log("Moda:", pesquisa.moda);
console.log("Moda Simples:", pesquisa.modaSimples);
console.log("Mediana:", pesquisa.mediana);
console.log("Mediana Simples:", pesquisa.mediaSimples);
console.log("Variância (Populacional):", pesquisa.varianciaPopulacao);
console.log("Variância (Amostra):", pesquisa.varianciaAmostra);
console.log("Desvio Padrão (Populacional):", pesquisa.desvioPadraoPop);
console.log("Desvio Padrão (Amostra):", pesquisa.desvioPadraoAms);

await gerarRelatorioPNG(pesquisa, 'relatorio.png', 'Satisfação dos Alunos com o Ensino Remoto');

