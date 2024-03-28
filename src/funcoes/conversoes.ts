import moment from "moment";

export function NumeroGameficado(num: number) {
    if (num > 999 && num < 1000000) {
        return (num / 1000).toFixed(1).replace(".", ",") + "K";
    } else if (num > 1000000) {
        return (num / 1000000).toFixed(1).replace(".", ",") + "M";
    } else if (num > 1000000000) {
        return (num / 1000000000).toFixed(1).replace(".", ",") + "B";
    } else if (num > 1000000000000) {
        return (num / 1000000000000).toFixed(1).replace(".", ",") + "T";
    } else if (num < 900) {
        return num;
    }
};
export function MoedaFormatada(valor: string) {
    return parseFloat(valor).toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
    });
};

export function NumeroFormatado(numero: string, qtd_decimais: number) {
    return parseFloat(numero).toLocaleString("pt-br", {
        maximumSignificantDigits: qtd_decimais,
    });
};

export function DataFormatada(date: string) {
    return moment(date).format("DD/MM/YYYY");
};

export function DataHoraFormatada(date: string) {
    return moment(date).format("DD/MM/YYYY HH:mm:ss");
};

export function HoraFormatada(date: string) {
    return moment(date).format("HH:mm");
};

export function DataHoraFormatadaAmigavel(date: string) {
    const dataAtual = moment();
    const dataFornecida = moment(date);
    const diferencaDias = dataAtual.diff(dataFornecida, 'days');
    const diferencaMeses = dataAtual.diff(dataFornecida, 'months');
    let mensagem = '';
    if (diferencaDias < 30) {
        mensagem = (diferencaDias == 0 ? `Hoje` : (diferencaDias == 1 ? `Ontem` : `Há ${diferencaDias} dias`));
    } else {
        const meses = Math.floor(diferencaMeses);
        const diasRestantes = diferencaDias % 30;

        if (diasRestantes === 0) {
            mensagem = `Há ${meses} mês(es)`;
        } else if (meses === 1) {
            mensagem = `Há 1 mês e ${diasRestantes} dias`;
        } else {
            mensagem = `Há ${meses} meses e ${diasRestantes} dias`;
        }
    }
    return mensagem;
}