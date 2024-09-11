<template>
    <SparkLineRepresentante :codigo="codigo" />
    <PrevisaoVendaRepresentante :codigo="codigo" />
    <AtivosInativosRepresentante :codigo="codigo" />
    <LineAdwordsRepresentante :codigo="codigo" />
    <div class="flex flex-wrap gap-2 mt-4">
        <Card class="stats flex-1 border border-surface">
            <template #content>
                <div class="flex justify-between gap-8 me-2">
                <Top10GruposRepresentante :codigo="codigo" />
            </div>
            </template>
        </Card>
        <Card class="stats flex-1 border border-surface ms-2">
            <template #content>
                <div class="flex justify-between gap-8">
                <Top10FamiliasRepresentante :codigo="codigo" />
            </div>
            </template>
        </Card>
    </div>    
    <TreeMapRepresentante :codigo="codigo" />    
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import SparkLineRepresentante from './SparkLineRepresentante.vue';
import LineAdwordsRepresentante from './LineAdwordsRepresentante.vue';
import Top10GruposRepresentante from './Top10GruposRepresentante.vue';
import Top10FamiliasRepresentante from './Top10FamiliasRepresentante.vue';
import TreeMapRepresentante from './TreeMapRepresentante.vue';
import PrevisaoVendaRepresentante from './PrevisaoVendaRepresentante.vue';
import AtivosInativosRepresentante from './AtivosInativosRepresentante.vue';

export default defineComponent({
    name: 'DesempenhoRepresentanteChart',
    components: {
        SparkLineRepresentante,
        LineAdwordsRepresentante,
        Top10GruposRepresentante,
        Top10FamiliasRepresentante,
        TreeMapRepresentante,
        PrevisaoVendaRepresentante,
        AtivosInativosRepresentante
    },
    props: {
        codigo: {
            type: String,
        }
    },
});
</script>
