
# NodeGraph v1.1

**NodeGraph** é um sistema Node.js desenvolvido para gerar **relatórios gráficos estatísticos** com base em dados de pesquisas. Ele processa dados agrupados em classes, calcula estatísticas como média e variância, e gera uma imagem (PNG) contendo um gráfico e os dados analisados.

---

## 📦 Funcionalidades

- Geração de **relatórios visuais** com gráfico e dados estatísticos.
- Cálculo de:
  - Média, Moda e Mediana (simples e por dados agrupados)
  - Variância populacional e amostral
  - Frequência relativa
- Exportação de imagem `.png` contendo o gráfico e tabela de dados.
- Adição de título personalizado com o nome da pesquisa.

---

## 🛠 Tecnologias Utilizadas

- **Node.js**: ambiente de execução
- **JavaScript**: linguagem principal
- **Chart.js**: renderização de gráficos
- **Canvas** (`node-canvas`): para exportar gráficos como imagem
- **fs/promises**: para manipulação de arquivos
- **node-addon-api**, **prebuild-install** (dependências de baixo nível para canvas)

---

## 📁 Estrutura de Diretórios

```
resumo-grafico-estatistico/
│
├── node_modules/             # Dependências do projeto
├── src/
│   ├── relatorio.js          # Geração do gráfico e exportação do relatório
│   └── models/
│       └── Pesquisa.js       # Modelagem de dados e cálculo estatístico
├── package.json              # Dependências e scripts do projeto
└── README.md                 # Documentação (você está aqui)
```

---

## ▶️ Como Executar

### 1. Clone o projeto
```bash
git clone https://github.com/seu-usuario/nodegraph.git
cd nodegraph
```

### 2. Instale as dependências
```bash
npm install
```

> Certifique-se de que você tenha o Node.js (versão >= 16) e o npm instalados.

### 3. Execute o sistema
O sistema pode ser iniciado por um script principal (você pode definir no `package.json` se desejar).

Ou, por exemplo, execute diretamente:

```bash
node src/relatorio.js
```

---

## 🧠 Como Usar

Você pode criar instâncias da classe `Pesquisa`, passando os dados da sua pesquisa e depois gerar o gráfico:

```javascript
// Assumindo que o arquivo de entrada esteja no root do projeto
import Pesquisa from './src/models/Pesquisa.js';
import gerarRelatorioPNG from './src/relatorio.js';

const dados = [10, 15, 14, 20, 18, 25, 15, 10, 17, 19, 18, 25, 30, 32, 15]; //exemplo
const pesquisa = new Pesquisa(dados);

await gerarRelatorioPNG(pesquisa, 'nomeDoArquivo.png', 'Nome da Pesquisa');
```

O relatório será salvo como imagem `.png` com título, gráfico e os dados.

---

## 🖼 Exemplo de Saída

Os dados podem ser tirados dos getters do modelo `Pesquisa.js`. Para listar tais dados no console é só copiar e colar esse script no arquivo de entrada:

```javascript
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
```

A imagem gerada pelo sistema conterá:

- Um gráfico de barras ou linhas (Chart.js)
- Exibição dos dados
- Título com o nome da pesquisa

---

## ✅ Requisitos

- Node.js 16+
- npm
- Biblioteca `canvas` (instalada automaticamente via `npm install`, mas pode requerer dependências nativas em sistemas Linux, como `libcairo2-dev`, `libpango1.0-dev`, etc.)

---

## 📌 Melhorias Futuras

- Interface web para entrada de dados
- Exportação para PDF
- API REST para consumo externo

---

## 👨‍💻 Autor

Matheus Barros
Desenvolvedor fullstack júnior | JavaScript

---

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
