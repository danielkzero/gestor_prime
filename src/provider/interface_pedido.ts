export interface PedidoGestor {
    numero_pedido: number,
    id_empresa: number,
    data_emissao: string,
    data_entrega: string,

    //informações das pessoas vinculadas ao pedido
    codigo_cliente: string,
    cliente: string,
    codigo_vendedor: string,
    vendedor: string,
    codigo_televenda: string,    
    televenda: string,
    codigo_supervisor: string,
    supervisor: string,

    codigo_prazo: string,
    prazo: string,
    
    tipo_pedido: string,
    tipo_pedido_nome: string,
    nome_cliente: string,
    pedido_emissao: string,
    nivel: string,
    
    
    caracteristica: string,
    codigo_forma_pagamento: string,
    forma_pagamento: string,
    

    obs_pedido: string,
    obs_nota: string,

    percentual_especial: number, //percentual do pedido
    desconto_maximo: number, //desconto no pedido
    desconto_suframa: number, //desconto do suframa
    desconto_adicional: number, //desconto display

    status: string,
    autor_lancamento: string,
    item: Array<ItensPedidoGestor>,

    codigo_ibge_cidade: string, 
    codigo_ibge_uf: string, 
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
    volume: number,
    grupo: string,
    familia: string
}