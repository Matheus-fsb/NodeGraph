
# NodeGraph

**NodeGraph** é um sistema Node.js desenvolvido para gerar **relatórios gráficos estatísticos** com base em dados de pesquisas. Ele processa dados agrupados em classes, calcula estatísticas como média e variância, e gera uma imagem (PNG) contendo um gráfico e os dados analisados.

---

## 📦 Funcionalidades

- Geração de **relatórios visuais** com gráfico e dados estatísticos.
- Cálculo de:
  - Média
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

Você pode criar instâncias da classe `Pesquisa`, passando os dados da sua pesquisa (frequência, ponto médio, etc.) e depois gerar o gráfico:

```javascript
const Pesquisa = require('./models/Pesquisa');

// Exemplo de dados
const dados = [
  { xi: '0 |-- 10', fi: 5 },
  { xi: '10 |-- 20', fi: 8 },
  { xi: '20 |-- 30', fi: 7 }
];

const pesquisa = new Pesquisa('Título da Pesquisa', dados);
pesquisa.processar(); // calcula médias, etc.

const gerarRelatorio = require('./relatorio');
gerarRelatorio(pesquisa);
```

O relatório será salvo como imagem `.png` com título, gráfico e os dados.

---

## 🖼 Exemplo de Saída

A imagem gerada pelo sistema conterá:

- Um gráfico de barras ou linhas (Chart.js)
- Uma tabela de dados com fi, xi, ponto médio, frequência relativa, etc.
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
- Análises adicionais como moda, mediana, desvio padrão
- API REST para consumo externo

---

## 👨‍💻 Autor

**Seu Nome**  
Desenvolvedor fullstack júnior | JavaScript | Java  
[LinkedIn](https://linkedin.com/in/seu-perfil)

---

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
