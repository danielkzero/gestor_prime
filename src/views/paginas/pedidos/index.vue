<template>
    <!-- paginação e pesquisa de pedidos -->
    <paginacao_pesquisa 
        :anterior="anterior" 
        :proxima_ok="proxima_ok" 
        @tanterior="tanterior" 
        @tproxima="tproxima" 
        :loadData="loadData" 
        @tpesquisapedido="tpesquisapedido"
    />

    <!-- filtragem de pedidos -->
    <filtro_pedido 
        v-model:tipo_pedido_select="tipo_pedido_select"
        @update:tipo_pedido_select="updateTipoPedidoSelect"

        v-model:periodo_select="periodo_select"
        @update:periodo_select="updatePeriodoSelect"

        v-model:empresa_select="empresa_select"
        @update:empresa_select="updateTipoEmpresaSelect"

        :tipo_pedido="providerTipoPedido" 

        :periodo="periodo" 

        :empresa="empresa" 
        @adicionar_periodo_lista="adicionar_periodo_lista" 
        @recarregar="recarregar"
        @deletePeriodo="deletePeriodo"
        
    />

    <!-- lista de pedidos -->
    <div>
        <div class="stats shadow w-full mb-3" v-for="(item, index) in dados" :key="index">
            <div class="stat p-3">
                <div class="stat-title border-b border-b-base-300 pb-1">
                    <a :href="'pedidos/'+item.Id" class="link text-success">#{{ item.Id }}</a> emitido por
                    <a href="#" class="link text-success"
                        style="text-transform: capitalize;">{{ item.AutorLancamento }}</a>
                    <div style="float: right;">
                        <div class="badge " :class="status(item.Status)?.cssVar ?? ''" >
                            {{ status(item.Status)?.texto ?? '' }}
                        </div>
                    </div>
                </div>
                <div class="stat-desc text-success pt-2">
                    <i class="bx bxs-store-alt"></i>
                    <a :href="'#/cliente/' + item.CodigoCliente" class="link">#{{ item.CodigoCliente }}</a> •
                    {{ item.Cliente }}
                </div>
                <div class="stat-value text-2xl">{{ formatMoeda(item.TotalPedido) }}</div>
            </div>
        </div>
    </div>

    <!-- paginação e pesquisa de pedidos -->
    <paginacao_pesquisa 
        :anterior="anterior" 
        :proxima_ok="proxima_ok" 
        @tanterior="tanterior" 
        @tproxima="tproxima" 
        :loadData="loadData" 
    />
</template>
<script lang="ts">
    import axios from "axios";
    import { inject } from "vue";
    import moment from "moment";
    import paginacao_pesquisa from '../../../components/toolbar/paginacao_pesquisa.vue';
    import filtro_pedido from '../../../components/toolbar/filtro_pedido.vue';
    import { providerTipoPedido } from '../../../provider/tipo_pedido.ts';
    import { providerStatusPedido } from '../../../provider/status_pedido.ts';
    import { providerEmpresa } from '../../../provider/empresa.ts';
    import { Periodo, Status, Pedido } from '../../../provider/interface.ts';
    export default {
        name: "Apex charts",
        components: { paginacao_pesquisa, filtro_pedido },
        data() {
            return {
                apiGestor: inject < string > ("apiGestor"),
                dados: [] as Pedido[],
                tdata_inicial: moment(new Date(),"DD/MM/YYYY").format("YYYY-MM-DD"),
                tdata_final: moment(new Date(),"DD/MM/YYYY").format("YYYY-MM-DD"),
                tipo_pedido_select: 0,
                statusPedido: providerStatusPedido,
                providerTipoPedido,
                periodo: [{
                    data_inicial: moment(new Date(), "YYYY-MM-DD").format("DD/MM/YYYY"),
                    data_final: moment(new Date(), "YYYY-MM-DD").format("DD/MM/YYYY"),
                }] as Periodo[],
                periodo_select: 0,
                empresa: providerEmpresa,
                empresa_select: 0,
                anterior:-10,
                proximo:10,
                por_pagina: 10,
                proxima_ok: 1,
                loadData: true,
                keyPesquisa: '',
                travar: 0
            };
        },
        
        methods: {
            updateTipoPedidoSelect() {},
            updateTipoEmpresaSelect() {},
            updatePeriodoSelect() {},
            deletePeriodo(index: any) {
                if (index == this.periodo_select) {
                    alert("Erro ao deletar esse período!");
                } else {
                    this.periodo.splice(index, 1);
                    if (this.periodo.length == 1) {
                        this.periodo_select = 0;
                    }
                }
            },
            async adicionar_periodo_lista(tdata_inicial: string, tdata_final: string) {
                this.periodo.push({
                    data_inicial: moment(tdata_inicial, "YYYY-MM-DD").format("DD/MM/YYYY"),
                    data_final: moment(tdata_final, "YYYY-MM-DD").format("DD/MM/YYYY"),
                });
            },
            status(Tstatus: string): Status | undefined {
                for (const item of this.statusPedido) {
                    if (item.status === Tstatus) {
                        return item as Status;
                    }
                }
                return undefined;
            },
            tproxima() {                
                this.filtrar(
                    moment(this.periodo[this.periodo_select].data_inicial,"DD/MM/YYYY").format("YYYY-MM-DD"),
                    moment(this.periodo[this.periodo_select].data_final,"DD/MM/YYYY").format("YYYY-MM-DD"), 
                    this.proximo,
                    this.providerTipoPedido[this.tipo_pedido_select].status,
                    this.empresa[this.empresa_select].id,
                    this.keyPesquisa
                ).then(() => {
                    if (this.travar == 0) {
                        if (this.proxima_ok == 0) {
                            this.travar = 1;
                        }                        
                        this.proximo += this.por_pagina;
                        this.anterior += this.por_pagina;
                    }
                });
            },
            tanterior() {                
                this.filtrar(
                    moment(this.periodo[this.periodo_select].data_inicial,"DD/MM/YYYY").format("YYYY-MM-DD"),
                    moment(this.periodo[this.periodo_select].data_final,"DD/MM/YYYY").format("YYYY-MM-DD"), 
                    this.anterior,
                    this.providerTipoPedido[this.tipo_pedido_select].status,
                    this.empresa[this.empresa_select].id,
                    this.keyPesquisa
                ).then(() => {
                    if (this.anterior >= -10) {
                        this.proximo -= this.por_pagina;
                        this.anterior -= this.por_pagina;
                        this.travar = 0;
                    }
                });                
            },
            async tpesquisapedido(key: string) {
                this.anterior = -10;
                this.proximo = 10;
                this.travar = 0;
                this.keyPesquisa = key;
                this.filtrar(
                    String(this.tdata_inicial), 
                    String(this.tdata_final), 
                    0 as number,
                    this.providerTipoPedido[this.tipo_pedido_select].status as string,
                    this.empresa[this.empresa_select].id as string,
                    this.keyPesquisa as string 
                );
            },
            async filtrar(data_inicial: string, data_final: string, pagina: number, status: string, empresa: string, key: string) {
                this.loadData = true;
                const authorization = {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                };
                let response = await axios.get(
                    this.apiGestor +
                    `/pedidos?data_inicial=${data_inicial}&data_final=${data_final}&pagina=${pagina}&status=${status}&empresa=${empresa}&key=${key}`, 
                    {
                        headers: authorization,
                    }
                );

                if (response.status == 200) {
                    this.dados = response.data;
                    if (response.data.length > 0) {
                        this.proxima_ok = 1;
                    }else{
                        this.proxima_ok = 0;
                    }
                }else{
                    this.proxima_ok = 0;                    
                }
                this.loadData = false;
            },
            recarregar(
                data_inicial: string, 
                data_final: string, 
                periodo_index: number, 
                empresa_index: number, 
                tipo_pedido_index: number,
                key: string
            ) {
                this.anterior = -10;
                this.proximo = 10;
                this.travar = 0;
                
                this.tdata_inicial = String(data_inicial);
                this.tdata_final = String(data_final);

                this.periodo_select = periodo_index;
                this.empresa_select = empresa_index;
                this.tipo_pedido_select = tipo_pedido_index;
                this.keyPesquisa = key == undefined ? '' : key;
                
                this.filtrar(
                    this.tdata_inicial, 
                    this.tdata_final, 
                    0,
                    this.providerTipoPedido[this.tipo_pedido_select].status,
                    this.empresa[this.empresa_select].id,
                    this.keyPesquisa
                );
            },
            numFormatter(num: number) {
                if (num > 999 && num < 1000000) {
                    return (num / 1000).toFixed(1).replace(".", ",") + "K";
                } else if (num > 1000000) {
                    return (num / 1000000).toFixed(1).replace(".", ",") + "M";
                } else if (num > 1000000000) {
                    return (num / 1000000000).toFixed(1).replace(".", ",") + "B";
                } else if (num > 1000000000000) {
                    return (num / 1000000000000).toFixed(1).replace(".", ",") + "T";
                } else if (num <= 999) {
                    return num;
                }
            },
            formatMoeda(valor: string) {
                return parseFloat(valor).toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                });
            },
            formatNumero(numero: string, qtd_decimais: number) {
                return parseFloat(numero).toLocaleString("pt-br", {
                    maximumSignificantDigits: qtd_decimais,
                });
            },
        },
        mounted() {
            this.recarregar(
                moment(this.periodo[this.periodo_select].data_inicial,"DD/MM/YYYY").format("YYYY-MM-DD"),
                moment(this.periodo[this.periodo_select].data_final,"DD/MM/YYYY").format("YYYY-MM-DD"), 
                0,
                0,
                0,
                this.keyPesquisa
            );
        },
    };
</script>