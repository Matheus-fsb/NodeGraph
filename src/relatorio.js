import { ChartJSNodeCanvas } from 'chartjs-node-canvas';
import fs from 'fs';
import { createCanvas, loadImage } from 'canvas';

const largura = 800;
const alturaGrafico = 600;
const alturaTitulo = 60;
const alturaEstatisticas = 200;
const padding = 30;
const alturaTotal = alturaTitulo + alturaGrafico + alturaEstatisticas;

const chartJSNodeCanvas = new ChartJSNodeCanvas({
    width: largura,
    height: alturaGrafico,
    backgroundColour: 'white'
});

async function gerarRelatorioPNG(pesquisa, nomeArquivo = 'relatorio.png', tituloPesquisa = 'Pesquisa Sem Título') {
    const tabela = pesquisa.tabelaDados;
    const labels = tabela.map(l => l.pm.toFixed(2));
    const dados = tabela.map(l => l.fi);

    const config = {
        type: 'bar',
        data: {
            labels,
            datasets: [{
                label: 'Frequência (fi)',
                data: dados,
                backgroundColor: 'rgba(54, 162, 235, 0.7)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2,
                borderRadius: 6
            }]
        },
        options: {
            plugins: {
                title: {
                    display: false // desativa o título dentro do gráfico
                },
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Ponto Médio (pm)'
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Frequência Absoluta (fi)'
                    }
                }
            }
        }
    };

    const imagemGrafico = await chartJSNodeCanvas.renderToBuffer(config);

    const canvasFinal = createCanvas(largura + padding * 2, alturaTotal);
    const ctx = canvasFinal.getContext('2d');

    // Fundo branco
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvasFinal.width, canvasFinal.height);

    // Título
    ctx.fillStyle = '#000';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`Dados da Pesquisa: "${tituloPesquisa}"`, canvasFinal.width / 2, padding + 20);

    // Inserir gráfico
    const grafico = await loadImage(imagemGrafico);
    ctx.drawImage(grafico, padding, padding + alturaTitulo);

    // Inserir estatísticas
    ctx.fillStyle = '#000';
    ctx.font = '16px Arial';
    ctx.textAlign = 'start';

    let offsetY = padding + alturaTitulo + alturaGrafico + 30;

    const dadosTextuais = [
        `Média: ${pesquisa.media.toFixed(2)}`,
        `Mediana: ${pesquisa.mediana.toFixed(2)}`,
        `Moda: ${pesquisa.moda.toFixed(2)}`,
        `Média Simples: ${pesquisa.mediaSimples.toFixed(2)}`,
        `Mediana Simples: ${pesquisa.medianaSimples.toFixed(2)}`,
        `Moda Simples: ${pesquisa.modaSimples ? pesquisa.modaSimples.join(', ') : 'Sem moda'}`,
        `Desvio Padrão Populacional: ${pesquisa.desvioPadraoPop.toFixed(2)}`,
        `Desvio Padrão Amostral: ${pesquisa.desvioPadraoAms.toFixed(2)}`
    ];

    const metade = Math.ceil(dadosTextuais.length / 2);
    dadosTextuais.forEach((linha, i) => {
        const colX = i < metade ? padding : largura / 2 + padding;
        const linhaY = offsetY + ((i % metade) * 22);
        ctx.fillText(linha, colX, linhaY);
    });

    const bufferFinal = canvasFinal.toBuffer('image/png');
    fs.writeFileSync(nomeArquivo, bufferFinal);

    console.log(`📊 Relatório salvo como: ${nomeArquivo}`);
}

export default gerarRelatorioPNG;
