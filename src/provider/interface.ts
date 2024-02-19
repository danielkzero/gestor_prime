export interface TipoPedido {
    texto: string;
    status: string;
}

export interface Empresa {
    texto: string;
    id: string;
}

export interface Periodo {
    data_inicial: string;
    data_final: string;
}

export interface Status {
    status: string;
    texto: string;
    cssVar: string;
}

export interface Pedido {
    CodigoERPA: string,
    Id: number,
    CodigoCliente: string,
    Cliente: string,
    TotalPedido: string,
    Status: string,
    DataEmissao: string,
    NomeRepresentante: string,
    NomeSupervisor: string, 
    TipoForcaVenda: string, 
    IdEmpresa: number,
    AutorLancamento: string
}