<template>
    <div class="margin-3">  
        <progress :class="cancelado ? 'progress-secondary' : 'progress-success'" class="progress steps absolute z-0 mt-4" :value="percentual" max="100"></progress>
        <div class="flex items-center gap-3 w-100 justify-between">
            <div tabindex="0" class="avatar placeholder relative flex" v-for="item in items">
                <div :class="(item.time == (percentual - 1) && cancelado) ? 'animate-ping bg-secondary text-base-100' : (item.time < percentual && cancelado) ? 'bg-secondary text-base-100' : item.time == percentual - 1 ? 'animate-ping bg-success text-base-100' : item.time < percentual ? item.ativo : item.inativo" class="w-10 rounded-full justify-center absolute z-0">
                    <span class="text-xl"><i :class="(item.time == (percentual - 1) && cancelado) ? 'bx bx-x' : item.icon" ></i></span>
                </div>
                <div :class="(item.time <= percentual  && cancelado) ? 'bg-secondary text-base-100' : item.time <= percentual ? item.ativo : item.inativo" class="w-10 rounded-full justify-center">
                    <span class="text-xl"><i :class="(item.time <= percentual && cancelado) ? 'bx bx-x' : item.icon" ></i></span>                    
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import axios from 'axios';
export default {
    data() {
        return {
            percentual: 0,
            percentualStop: 0,
            items: [
                {
                    icon: 'bx bx-download',
                    time: 0,
                    ativo: ['bg-success text-base-100'],
                    inativo: ['text-base bg-base-100 border border-base-200'],
                    texto: 'recebido',
                },
                {
                    icon: 'bx bx-check-square',
                    time: 17,
                    ativo: ['bg-success text-base-100'],
                    inativo: ['text-base bg-base-100 border border-base-200'],
                    texto: 'conferido',
                },
                {
                    icon: 'bx bx-coin',
                    time: 33,
                    ativo: ['bg-success text-base-100'],
                    inativo: ['text-base bg-base-100 border border-base-200'],
                    texto: 'liberado',
                },
                {
                    icon: 'bx bx-package',
                    time: 50,
                    ativo: ['bg-success text-base-100'],
                    inativo: ['text-base bg-base-100 border border-base-200'],
                    texto: 'separado',
                },
                {
                    icon: 'bx bx-receipt',
                    time: 66,
                    ativo: ['bg-success text-base-100'],
                    inativo: ['text-base bg-base-100 border border-base-200'],
                    texto: 'faturado',
                },
                {
                    icon: 'bx bxs-truck',
                    time: 83,
                    ativo: ['bg-success text-base-100'],
                    inativo: ['text-base bg-base-100 border border-base-200'],
                    texto: 'carregado',
                },
                {
                    icon: 'bx bx-check',
                    time: 100,
                    ativo: ['bg-success text-base-100'],
                    inativo: ['text-base bg-base-100 border border-base-200'],
                    texto: 'entregue',
                }
            ],
            progresso: {} as Object,
            cancelado: false,
        }
    },
    props: {
        id_pedido: String
    },
    methods: {
        async getProgresso(id: string) {
            let response = await axios.get(`/api/pedidos/progresso/${id}`);
            const data = response.data;
            this.progresso = data;
            this.getPercentualProgresso(data[0]);
        },
        getPercentualProgresso(item: any) {
            
            if (item.AmigavelDataCarregamento != null && item.DataCancelPedido == null && item.AmigavelDataEntrega == null) {
                console.log('Lançar data de carregamento');
            }
            if(item.DataCancelPedido != null) {
                this.cancelado = true;
            }
            if(item.AmigavelDataEntrega != null) {
                this.percentualStop += 16.66666666667;
            }
            if(item.AmigavelDataCarregamento != null) {
                this.percentualStop += 16.66666666667;
            }
            if(item.AmigavelEmissaoNota != null) {                            
                this.percentualStop += 16.66666666667;
            }
            if(item.AmigavelDataSeparacao != null) {
                this.percentualStop += 16.66666666667;
            }
            if(item.AmigavelDataCredito != null) {
                this.percentualStop += 16.66666666667;
            }
            if(item.AmigavelDataConferente != null) {
                this.percentualStop += 16.66666666667;
            }
            if(item.AmigavelDataEmissao != null) {
                this.percentualStop += 0;
            }
            this.percentualStop = parseInt(String(this.percentualStop));
        }
    },
    mounted() {
        if (this.id_pedido != undefined) {
            this.getProgresso(this.id_pedido);
        }
        let vm = this;
        const intervalo = setInterval(function () {            
            if (vm.percentual >= vm.percentualStop) {
                clearInterval(intervalo);
            }
            vm.percentual += 1;
        }, 25);
    }
}
</script>
<style scope>
.margin-3{
    margin: 0.75rem;
}
.steps {
    width: calc(100% - (0.75rem * 2) - (40px));
    margin-left: 20px;
}
</style>