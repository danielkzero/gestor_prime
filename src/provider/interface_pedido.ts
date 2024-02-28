export interface PedidoGestor {
    id_empresa: number,
    codigo_cliente: string,

    codigo_vendedor: string,
    vendedor: string,
    codigo_televenda: string,    
    televenda: string,

    codigo_prazo: string,
    numero_pedido: number,
    data_emissao: string,
    data_entrega: string,
    tipo_pedido: string,
    tipo_pedido_nome: string,
    nome_cliente: string,
    pedido_emissao: string,
    nivel: string,
    
    prazo: string,
    caracteristica: string,
    forma_pagamento: string,
    codigo_forma_pagamento: string,
    percentual_especial: number,
    obs_pedido: string,
    obs_nota: string,
    desconto_maximo: number,
    desconto_suframa: number,
    desconto_adicional: number,
    status: string,
    autor_lancamento: string,
    item: Array<ItensPedidoGestor>
}

export interface ItensPedidoGestor {
    codigo: string,
    qtd: string,
    descricao: string,
    emb: number,
    unidade: string,
    bruto: number,
    percentual: string,
    liquido: number,
    total_imposto: number,
    icms_destino: number,
    total_liquido: number,
    comissao: number,
    peso: number,
    cubagem: number,
    volume: number
}