export interface RegraPedido {
    id: number,
    pedido_cliente: string,
    pedido_dias_sem_efetuar_compra: string,
    pedido_emissao: string,
    pedido_status: string,
    pedido_percentual_pedido: number,
    pedido_representante: string,
    pedido_segmento_representante: number,
    pedido_supervisor: string,
    pedido_segmento_supervisor: [],
    pedido_nivel: string,
    pedido_cidade: string,
    pedido_estado: string,
    pedido_prazo_do_pedido: string,
    item: RegraPedidoItem[]
}

export interface RegraPedidoItem {
    pedido_empresa: number,
    produtos: string,
    produto_dias_sem_efetuar_compra: number,
    quantidade: string,
    unitario_bruto: number,
    bruto: number,
    total_bruto: number,
    unitario_liquido: number,
    liquido: number,
    total_liquido: number,
    peso_unitario: number,
    cubagem_unitaria: number,
    aliquota_repasse: number,
    volume: number,
    grupos: string,
    grupo_dias_sem_efetuar_compra: number,
    familias: string,
    familia_dias_sem_efetuar_compra: number
}
