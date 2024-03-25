export interface manutencao {
    id: number,
    id_prioridade: number,    
    id_equipamento: string,
    tipo_equipamento: string, 
    nome_equipamento: string,
    descritivo: string,
    autor: string,
    cadastrado_em: Date,
    alterado_em: Date,
    lido: number,
    excluido: number,
    finalizado: number,
    parecer: [
        {
            id: number,
            id_equipamento_manutencao: number,
            parecer: string,
            url_avatar: string,
            autor: string,
            cadastrado_em: Date
        }
    ],
    anexo: [
        {
            id: number,
            id_equipamento_manutencao: number,
            url_anexo: string,
        }
    ],
    situacao: [
        {
            id: number,
            id_equipamento_manutencao: number,
            id_manutencao_situacao: number,
            nome: string,
            cadastrado_em: Date,
            alterado_em: Date
        }
    ]
}

