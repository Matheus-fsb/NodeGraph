class Pesquisa {
    #numDados;
    #dadosOrdenados;
    #numeroClasses;
    #amplitude;
    #h;
    #tabelaDados;
    #media;
    #moda;
    #mediana;
    #mediaSimples;
    #modaSimples;
    #medianaSimples;
    #varianciaPop;
    #varianciaAms;

    constructor(dados) {
        this.dados = dados;

        this.#dadosOrdenados = [];
        this.#tabelaDados = [];

        this.calcularNumDados();
        this.ordenarDados();
        this.calcularAmplitude();
        this.calcularNumeroClasses();
        this.calcularH();
        this.gerarTabela();
        this.calcularMedia();
        this.calcularModa();
        this.calcularMediana();
        this.calcularMediaSimples();
        this.calcularModaSimples();
        this.calcularMedianaSimples();
        this.calcularVarianciaPopulacao();
        this.calcularVarianciaAmostra();
    }

    ordenarDados() {
        this.#dadosOrdenados = [...this.dados].sort((a, b) => a - b);
    }

    calcularNumDados() {
        this.#numDados = this.dados.length;
    }

    calcularAmplitude() {
        this.#amplitude = this.#dadosOrdenados[this.#dadosOrdenados.length - 1] - this.#dadosOrdenados[0];
    }

    calcularNumeroClasses() {
        this.#numeroClasses = Math.ceil(Math.log10(this.#numDados) * 3.3 + 1);
    }

    calcularH() {
        this.#h = Math.ceil(this.#amplitude / this.#numeroClasses);
    }

    calcularMedia() {
        let media = 0;
        let dadosOrdenados = this.#dadosOrdenados.slice();
        let tabela = this.#tabelaDados.slice();

        tabela.forEach(element => {
            media += element.pm * element.fi
        });

        media = media / this.#numDados;
        this.#media = media
    }

    calcularMediaSimples() {
        const soma = this.dados.reduce((acc, val) => acc + val, 0);
        this.#mediaSimples = soma / this.#numDados;
    }

    calcularModa() {
        let modaIndex = 0;
        let maiorFi = 0;

        this.#tabelaDados.forEach((linha, index) => {
            if (linha.fi > maiorFi) {
                maiorFi = linha.fi;
                modaIndex = index;
            }
        });

        const L = parseFloat(this.#tabelaDados[modaIndex].intervalo.match(/\d+/)[0]);
        const fi = this.#tabelaDados[modaIndex].fi;
        const fiAnterior = modaIndex > 0 ? this.#tabelaDados[modaIndex - 1].fi : 0;
        const fiPosterior = modaIndex < this.#tabelaDados.length - 1 ? this.#tabelaDados[modaIndex + 1].fi : 0;
        const h = this.#h;

        const moda = L + ((fi - fiAnterior) / ((2 * fi) - fiAnterior - fiPosterior)) * h;
        this.#moda = +moda.toFixed(2);
    }

    calcularModaSimples() {
        const freq = {};
        this.dados.forEach(valor => {
            freq[valor] = (freq[valor] || 0) + 1;
        });

        let maxFreq = 0;
        let moda = [];

        for (const valor in freq) {
            if (freq[valor] > maxFreq) {
                moda = [Number(valor)];
                maxFreq = freq[valor];
            } else if (freq[valor] === maxFreq) {
                moda.push(Number(valor));
            }
        }

        this.#modaSimples = moda.length === this.#numDados ? null : moda;
    }

    calcularMediana() {
        const n = this.#numDados;
        const metade = n / 2;
        let medianaClasseIndex = 0;

        for (let i = 0; i < this.#tabelaDados.length; i++) {
            if (this.#tabelaDados[i].Fi >= metade) {
                medianaClasseIndex = i;
                break;
            }
        }

        const classe = this.#tabelaDados[medianaClasseIndex];
        const L = parseFloat(classe.intervalo.match(/\d+/)[0]);
        const F = medianaClasseIndex > 0 ? this.#tabelaDados[medianaClasseIndex - 1].Fi : 0;
        const fi = classe.fi;
        const h = this.#h;

        const mediana = L + ((metade - F) / fi) * h;
        this.#mediana = +mediana.toFixed(2);
    }

    calcularMedianaSimples() {
        const ordenado = [...this.#dadosOrdenados];
        const meio = Math.floor(ordenado.length / 2);

        if (ordenado.length % 2 === 0) {
            this.#medianaSimples = (ordenado[meio - 1] + ordenado[meio]) / 2;
        } else {
            this.#medianaSimples = ordenado[meio];
        }
    }

    calcularVarianciaPopulacao() {
        let variancia = 0;

        this.#tabelaDados.forEach((element) => {
            variancia += (element.fi * (element.pm - this.#media)) ** 2;
        })

        variancia = variancia / this.#numDados;

        this.#varianciaPop = variancia;
    }

    calcularVarianciaAmostra() {
        let variancia = 0;

        this.#tabelaDados.forEach((element) => {
            variancia += (element.fi * (element.pm - this.#media)) ** 2;
        })

        variancia = (variancia / this.#numDados) - 1;

        this.#varianciaAms = variancia;
    }

    get numDados() {
        return this.#numDados;
    }

    get dadosOrdenados() {
        return this.#dadosOrdenados;
    }

    get numeroClasses() {
        return this.#numeroClasses;
    }

    get amplitude() {
        return this.#amplitude;
    }

    get h() {
        return this.#h;
    }

    get tabelaDados() {
        return this.#tabelaDados;
    }

    get media() {
        return this.#media;
    }

    get moda() {
        return this.#moda;
    }

    get mediana() {
        return this.#mediana;
    }

    get mediaSimples() {
        return this.#mediaSimples;
    }

    get modaSimples() {
        return this.#modaSimples;
    }

    get medianaSimples() {
        return this.#medianaSimples;
    }

    get varianciaPopulacao() {
        return this.#varianciaPop;
    }

    get varianciaAmostra() {
        return this.#varianciaAms;
    }

    get desvioPadraoPop() {
        return Math.sqrt(this.#varianciaPop);
    }

    get desvioPadraoAms() {
        return Math.sqrt(this.#varianciaAms);
    }

    gerarTabela() {
        const dados = this.#dadosOrdenados;
        const tabela = [];

        const min = dados[0];
        const h = this.#h;

        let limiteInferior = min;
        let Fi = 0;
        let Fr = 0;

        let pm = 0;

        for (let i = 0; i < this.#numeroClasses; i++) {
            const limiteSuperior = limiteInferior + h;

            // Frequência absoluta (fi)
            const fi = dados.filter(d => d >= limiteInferior && d < limiteSuperior).length;

            Fi += fi; // Frequência acumulada
            const fr = +(fi / this.#numDados) * 100; // Frequência relativa (%)
            Fr += fr; // Frequência relativa acumulada

            pm = (limiteSuperior + limiteInferior) / 2;
            tabela.push({
                intervalo: `[${limiteInferior} - ${limiteSuperior}[`,
                fi: fi,
                Fi: Fi,
                fr: +fr.toFixed(2),
                Fr: +Fr.toFixed(2),
                pm: pm
            });

            limiteInferior = limiteSuperior;
        }

        this.#tabelaDados = tabela;
    }


}

export default Pesquisa;