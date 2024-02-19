<template>
  <infodisponibilidade class="mb-4" />
  <div role="tablist" class="tabs tabs-lifted">
    <input type="radio" name="my_tabs_2" role="tab" class="tab" aria-label="Disponível" checked />
    <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box">
      <TabelaSeparacao :dados="disponivel" />
    </div>

    <input type="radio" name="my_tabs_2" role="tab" class="tab" aria-label="Faturando" />
    <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box">
      <TabelaSeparacao :dados="faturando" />
    </div>

    <input type="radio" name="my_tabs_2" role="tab" class="tab" aria-label="Faltando" />
    <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box">
      <TabelaSeparacao :dados="faltando" />
    </div>

    <input type="radio" name="my_tabs_2" role="tab" class="tab" aria-label="Separando" />
    <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box">
      <TabelaSeparacao :dados="separando" />
    </div>
  </div>
</template>

<script lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import infodisponibilidade from "../../../components/cards/infodisponibilidade.vue";
import TabelaSeparacao  from '../../../components/tabela/TabelaSeparacao.vue';
import axios from 'axios';
import { inject } from 'vue';
export default {
  components: {
    infodisponibilidade,
    DataTable,
    Column,
    TabelaSeparacao 
  },
  data() {
    return {
      disponivel: [] as any,
      faturando: [] as any,
      faltando: [] as any,
      separando: [] as any,
      loadData: false,
      apiGestor: inject<string>('apiGestor'),
    };
  },
  methods: {
    async totais() {
      try {
        this.loadData = true;
        const authorization = {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        };
        
        let response = await axios.get(this.apiGestor+`/separacao/disponivel`, {
          headers: authorization
        });        
        this.disponivel = response.data;


        response = await axios.get(this.apiGestor+`/separacao/faturando`, {
          headers: authorization
        });        
        this.faturando = response.data;


        response = await axios.get(this.apiGestor+`/separacao/faltando`, {
          headers: authorization
        });        
        this.faltando = response.data;


        response = await axios.get(this.apiGestor+`/separacao/separando`, {
          headers: authorization
        });        
        this.separando = response.data;


      } catch (error) {
        console.error("Erro ao obter dados:", error);
      } finally {
        this.loadData = false;
      }
    },
  },
  mounted() {
    this.totais();
  },
};
</script>