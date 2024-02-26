<template>
    <div class="pagina_impressao" style="font-size: 0.9em">
        <div class="page-title">
            <div class="row border-bottom">
                <div class="col-auto">{{ Pedido.numeroPedido }}</div>
                <div class="col-auto">{{ Pedido.dataEmissao }}</div>
                <div class="col-auto text-uppercase">{{ Pedido.tipoPedido }}</div>
                <div class="col text-end">{{ Pedido.dataImpressao }}</div>
            </div>
            <div class="row">
                <div class="col text-center text-uppercase">dados do cliente</div>
            </div>
            <div class="row text-uppercase">
                <div class="col-auto text-nowrap">
                    {{ Pedido.cliente }}
                </div>
                <div class="col-auto">{{ Pedido.cnpj }}</div>
                <div class="col-auto">{{ Pedido.ie }}</div>
                <div class="col-auto">{{ Pedido.im }}</div>
            </div>
            <div class="row text-uppercase">
                <div class="col text-nowrap">
                    {{ Pedido.end }}
                </div>
            </div>
            <div class="row text-uppercase">
                <div class="col-auto">
                    {{ Pedido.bairro }}
                </div>
                <div class="col-auto">
                    {{ Pedido.cidade }}
                </div>
                <div class="col-auto">
                    {{ Pedido.tel }}
                </div>
            </div>
            <div class="row text-uppercase">
                <div class="col-auto">
                    {{ Pedido.nivel }}
                </div>
                <div class="col-auto">
                    {{ Pedido.vendedor }}
                </div>
                <div class="col-auto">
                    {{ Pedido.televendas }}
                </div>
                <div class="float-end col-auto text-end">
                    desconto máximo: {{ Pedido.descontoMaximo }}
                </div>
            </div>
        </div>

        <div class="row text-uppercase">
            <div class="col">
                <table style="width:100%; font-size: 0.8em;">
                    <thead class="border-1">
                        <tr>
                            <th class="text-center tcodigo p-1">#</th>
                            <th class="text-center tqtd p-1">qtd.</th>
                            <th class="text-start tdescricao p-1">descriÃ§Ã£o</th>
                            <th class="text-center temb p-1">emb.</th>
                            <th class="text-center tunidade p-1">un.</th>
                            <th class="text-end tbruto p-1">bruto</th>
                            <th class="text-end tpercentual p-1">%</th>
                            <th class="text-end tliquido p-1">liquido</th>
                            <th class="text-end ttotal_imposto p-1">imposto</th>
                            <th class="text-end ttotal_liquido p-1">sub.total</th>
                        </tr>
                    </thead>
                    <tbody class="itens">
                        <tr  class="border-bottom" v-for="item in Pedido.item">
                            <td class="text-center codigo p-1">{ item.codigo }</td>
                            <td class="text-center qtd p-1">{ item.qtd }</td>
                            <td class="text-start descricao p-1">{ item.descricao }</td>
                            <td class="text-center emb p-1">{ item.emb }</td>
                            <td class="text-center unidade p-1">{ item.unidade }</td>
                            <td class="text-end bruto p-1">{ item.bruto }</td>
                            <td class="percentual p-1" :class="item.display == '-'? 'text-center' : 'text-end'">{ item.display }</td>
                            <td class="text-end liquido p-1">{ ConverterParaMoeda(item.liquido) }</td>
                            <td class="text-end total_imposto p-1">{ (item.displayImposto == true ? ConverterParaMoeda(item.total_imposto) : ConverterParaMoeda(0)) }</td>
                            <td class="text-end total_liquido p-1">{ ConverterParaMoeda(item.total_liquido) }</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="border border-dark p-1 text-uppercase" style="font-size: 0.8em;">
            <div class="row">
                <div class="col-8">
                    <div class="row">
                        <div class="col-auto">
                            { Pedido.prazo }
                        </div>
                        <div class="col-auto">
                            { Pedido.caracteristica }
                        </div>
                        <div class="col-auto">
                            { Pedido.forma_pagamento }
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-auto">
                            { Pedido.total_peso }
                        </div>
                        <div class="col-auto">
                            { Pedido.total_cubagem }
                        </div>
                        <div class="col-auto">
                            { Pedido.total_volume }
                        </div>
                        <div class="col-auto">
                            { Pedido.percentual_especial }
                        </div>
                    </div>
                </div>

                <div class="col-4">
                    <div class="row">
                        <div class="col d-flex justify-content-between">
                            <span class="w-px-100">Subtotal:</span>
                            <span class="fw-semibold">{ Pedido.vl_pedido }</span>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col d-flex justify-content-between">
                            <span class="w-px-100">Imposto:</span>
                            <span class="fw-semibold">{ Pedido.vl_imposto }</span>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col d-flex justify-content-between">
                            <span class="w-px-100">Suframa:</span>
                            <span class="fw-semibold">{ ConverterParaMoeda(Pedido.vldesconto_suframa) }</span>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col d-flex justify-content-between">
                            <span class="w-px-100">Adicional:</span>
                            <span class="fw-semibold">{ ConverterParaMoeda(Pedido.vldesconto_adicional) }</span>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col d-flex justify-content-between border-top border-dark">
                            <span class="w-px-100">Total:</span>
                            <span class="fw-semibold">{ Pedido.vltotal }</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { PedidoGestor } from "../../provider/interface_pedido.ts";

export default {
    name: "PedidoImpressao",
    props: {
        Pedido: {
            type: Array as() => PedidoGestor[],
            required: true,
        },
    },
};
</script>
