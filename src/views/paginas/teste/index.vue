<template>
    <div></div>
</template>

<script lang="ts">
/**
 * Criar o código do pedido e redireciona para ele.
 * O pedido fica automaticamente criado como orçamento.
 * Ele pode ser mudado para aguardando no cabeçalho do mesmo.
 */
import axios from 'axios';
import router from '../../../router';
import { inject } from 'vue';
export default {
    data() {
        return {
            apiGestor: inject<string>('apiGestor'),
        };
    },
    methods: {
        async criarPedidoNovo() {
            const response = await axios.post(this.apiGestor+'/pedidos/novo');
            console.log(response);
            if (response.status == 200) {
                if (response.data.numero_pedido != '' && response.data.mensagem == 'OK') {
                    router.push({ name: 'Pedido', params: { id: response.data.numero_pedido } });
                }
            }else{
                alert('Algo deu errado!');
            }
        }
    },
    mounted() {
        this.criarPedidoNovo();
    }
}
</script>