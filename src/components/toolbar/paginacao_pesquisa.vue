<template>
    <div class="rounded-box py-2 w-full mb-3 bg-base">
        <div class="grid grid-cols-6 gap-4">
            <div class="col-span-6 md:col-span-3">
                <div class="join">
                    <a @click="MeTanterior" 
                        class="join-item btn" 
                        :class="loadData ? 'btn-neutral' : ((anterior ?? -10) >= 0 ? 'btn-primary' : 'btn-ghost')"
                        :style="loadData ? 'cursor: not-allowed;' : ((anterior ?? -10) >= 0 ? '' : 'cursor: not-allowed;')">
                        <i class="bx bx-chevron-left"></i> Anterior 
                    </a>
                    <a @click="MeTproxima" 
                        class="join-item btn"
                        :class="loadData ? 'btn-neutral' : (proxima_ok ? 'btn-primary' : 'btn-ghost')"
                        :style="loadData ? 'cursor: not-allowed;' : (proxima_ok ? '' : 'cursor: not-allowed;')">
                        Próxima <i class="bx bx-chevron-right"></i>
                    </a>
                </div>
                <a href="/pedidos/novo" class="join-item btn btn-primary ms-3">
                    Criar pedido 
                </a>
            </div>
            <div class="text-right col-span-6 md:col-span-3">
                <div class="join">
                    <div>
                        <input class="input input-bordered join-item max-w-full" @keydown.enter="MePesquisaPedido" v-model="key_pesquisa" placeholder="Pedido, cliente ou representante" />
                    </div>
                    <div class="indicator">
                        <button class="btn join-item btn-primary" @click="MePesquisaPedido"><i class="bx bx-search"></i></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
export default {
    data() {
        return {
            key_pesquisa: ''
        }
    },
    props: {
        proxima_ok: Number,
        anterior: Number,
        loadData: Boolean,
        
    },
    methods: {
        MeTanterior() {
            if (!this.loadData) {
                if ((this.anterior ?? -10) >= 0)
                this.$emit("tanterior");
            }
        },
        MeTproxima() {
            if (!this.loadData) {
                if (this.proxima_ok)
                this.$emit("tproxima");
            }
        },
        MePesquisaPedido() {           
            this.$emit("tpesquisapedido", this.key_pesquisa);
        }
    },
    emits: {
        tanterior: null,
        tproxima: null,
        tpesquisapedido: null
    }
}
</script>