<template>
    <div>        
        <DesempenhoRepresentanteChart :codigo="id" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DesempenhoRepresentanteChart from '../../../components/charts/DesempenhoRepresentante.vue';
export default defineComponent({
    name: 'App',
    components: {
        DesempenhoRepresentanteChart
    },
    data() {
        return {
            codigo_representante: '',
            id: this.$route.params.id as string,
        };
    },
});
</script>