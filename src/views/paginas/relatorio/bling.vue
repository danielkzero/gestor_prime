<template>
    <div class="text-center text-xs">
      <details class="dropdown ClickScreenToClose">
        <summary class="m-1 link link-primary">{{ tipo[tipo_select].texto }}</summary>
        <ul class="shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-64">
          <li v-for="(item, index) in tipo" :key="index">
            <a
              :class="tipo_select == index ? 'active' : ''"
              @click="tipo_select = index"
              >{{ item.texto }}</a>
          </li>
        </ul>
      </details>
      no período de
      <details class="dropdown ClickScreenToClose">
        <summary class="m-1 link link-primary">
          {{ formatData(periodo[periodo_select].data_inicial) }} à
          {{ formatData(periodo[periodo_select].data_final) }}
        </summary>
        <ul class="shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-64">
          <li v-for="(item, index) in periodo" :key="index">
            <a :class="periodo_select == index ? 'active' : ''" 
              @click="periodo_select = index">
              {{ formatData(item.data_inicial) }} à {{ formatData(item.data_final) }}
            </a>
          </li>
          <button
            class="btn btn-sm btn-secondary mt-2"
            onclick="my_modal_3.showModal()">
            <i class="bx bx-plus-circle"></i>Novo período
          </button>
        </ul>
      </details>
    </div>
    <dialog id="my_modal_3" class="modal">
      <div class="modal-box">
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 class="font-bold text-lg">Listas de períodos salvos</h3>
  
        <div v-for="(item, index) in periodo" :key="index" class=" stats w-full">
          <div class="stat">
            <div class="stat-figure">
              <div class="btn btn-sm btn-secondary" @click="deletePeriodo(index)"><i class="text-2xl bx bx-trash"></i></div>
            </div>
            <div class="stat-value text-2xl text-primary">
              <div 
                :class="periodo_select == index ? 'active' : ''"
                @click="periodo_select = index">{{ formatData(item.data_inicial) }} à {{ formatData(item.data_final) }}</div>
            </div>
          </div>
        </div>
  
        <div class=" stats w-full">
          <div class="stat">
            <div class="stat-figure">
              <div class="btn btn-sm btn-primary" @click="adicionar_periodo_lista()"><i class="text-2xl bx bx-plus"></i></div>
            </div>
            <div class="stat-value text-2xl text-primary">
              <input type="date" v-model="tdata_inicial" class="input input-sm input-bordered w-40" /> à 
              <input type="date" v-model="tdata_final" class="input input-sm input-bordered w-40" />
            </div>
          </div>
        </div>
        
      </div>
    </dialog>
    
    <div class="card bg-base-100 border-base-300 rounded-box mt-3">
        <div class="p-3">
          <button class="btn btn-success btn-sm">
            <download-excel :data="dados">
             Download Excel  <i class='bx bxs-file-export'></i>
            </download-excel>
          </button>
        </div>
        <DataTable :loading="loadData" class="table table-sm" :value="dados" :paginator="true" :rows="50" :rowsPerPageOptions="[10, 50, 100]">
          <Column field="data" style="width: 100px; min-width: 100px" sortable header="#Cód.Loja">
                <template #body="{ data }">
                    <div class="font-bold">{{ data.numeroPedidoLoja }}</div>
                </template>
            </Column>
            <Column field="numero_bling" style="width: 100px; min-width: 100px" sortable header="#Cód."></Column>
            <Column field="chaveAcesso" style="width: 100px; min-width: 100px" sortable header="Chave de acesso"></Column>        
            <Column field="data" style="width: 100px; min-width: 100px" sortable header="Cadastro">
                <template #body="{ data }">
                    <div class="font-bold">{{ formatData((data).cadastro) }}</div>
                </template>
            </Column>
            <Column field="dataEmissao" style="width: 100px; min-width: 100px" sortable header="Emissão">
                <template #body="{ data }">
                    <div class="font-bold">{{ formatData((data).dataEmissao) }}</div>
                </template>
            </Column>
            <Column field="totalprodutos" style="width: 100px; min-width: 100px" sortable header="Vl.">
                <template #body="{ data }">
                    <div>{{ formatMoeda((data).totalprodutos) }}</div>
                </template>
            </Column>
            <Column field="valorNota" style="width: 100px; min-width: 100px" sortable header="Vl.Nota">
                <template #body="{ data }">
                    <div>{{ formatMoeda((data).valorNota) }}</div>
                </template>
            </Column>
            <Column field="desconto" style="width: 100px; min-width: 100px" sortable header="Desconto">
                <template #body="{ data }">
                    <div>{{ formatMoeda((data).desconto) }}</div>
                </template>
            </Column>
            <Column field="valorfrete" style="width: 100px; min-width: 100px" sortable header="Frete">
                <template #body="{ data }">
                    <div>{{ formatMoeda((data).valorfrete) }}</div>
                </template>
            </Column>
            <ColumnGroup type="footer">
                <Row>
                    <Column footer="TOTAIS:" :colspan="4" footerStyle="text-align:right" />
                    <Column :footer="sumtotalprodutos" />
                    <Column :footer="sumvalorNota" />
                    <Column :footer="sumdesconto" />
                    <Column :footer="sumvalorfrete" />
                </Row>
            </ColumnGroup>
        </DataTable>
    </div>
</template>
  
<script lang="ts">
import axios from "axios";
import { inject } from "vue";
import moment from "moment";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup";
  // HACK: No typescript declaration file available: https://github.com/apexcharts/vue3-apexcharts/issues/2
  // eslint-disable-next-line
  // @ts-ignore
  import VueApexCharts from 'vue3-apexcharts';
  
  export default {
    components: {
        DataTable,
        Column,
        ColumnGroup
    },
    name: "Apex charts",
    data() {
      return {
        apiGestor: inject<string>("apiGestor"),
        tdata_inicial: moment(new Date()).format("yyyy-MM-DD"),
        tdata_final: moment(new Date()).format("yyyy-MM-DD"),
        series: [] as any[],
        tipo: [
          {
            texto: "Pedidos carregados",
            caminho_api: "/relatorio_bling",
          }
        ],
        tipo_select: 0,
        periodo: [
          {
            data_inicial: moment(new Date()).format("yyyy-MM-DD"),
            data_final: moment(new Date()).format("yyyy-MM-DD"),
          },
        ],
        periodo_select: 0,
        loadData: false,
        dados: [] as any[]
      };
    },
    computed: {
        
        sumtotalprodutos() {
            let somatorio = this.dados.reduce(
                (somatorio: number, item) => somatorio + (item.totalprodutos * 1), 0
            );
            return this.formatMoeda(String(somatorio));
        },
        sumvalorNota() {
            let somatorio = this.dados.reduce(
                (somatorio: number, item) => somatorio + (item.valorNota * 1), 0
            );
            return this.formatMoeda(String(somatorio));
        },
        sumdesconto() {
            let somatorio = this.dados.reduce(
                (somatorio: number, item) => somatorio + (item.desconto * 1), 0
            );
            return this.formatMoeda(String(somatorio));
        },
        sumvalorfrete() {
            let somatorio = this.dados.reduce(
                (somatorio: number, item) => somatorio + (item.valorfrete * 1), 0
            );
            return this.formatMoeda(String(somatorio));
        },
    },
    watch: {
      periodo_select: function () {
        this.recarregar();
      },
      empresa_select: function () {
        this.recarregar();
      },
      tipo_select: function () {
        this.recarregar();
      },
    },
    methods: {
        formatData(Data: String) {
            return moment(Data.toString(), 'yyyy-MM-DD').format('DD/MM/yyyy');
        },
        formatMoeda(valor: string) {
            return parseFloat(valor).toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
            });
        },
        formatNumero(numero: string, qtd_decimais: number) {
            return parseFloat(numero).toLocaleString("pt-br", {
                style: 'decimal',
                maximumFractionDigits: qtd_decimais,
                minimumFractionDigits: qtd_decimais,
            });
        },
      deletePeriodo(index: any) {
        if (index == this.periodo_select) {
          alert("Erro ao deletar esse período!");
        }else {        
          this.periodo.splice(index, 1);
          if (this.periodo.length == 1) {
            this.periodo_select = 0;
          }
        }
      },
      async adicionar_periodo_lista () {
        this.periodo.push(
          {
            data_inicial: this.tdata_inicial,
            data_final: this.tdata_final
          }
        );
        localStorage.setItem("periodo", JSON.stringify(this.periodo));
      },
      percentualParaHex(percentual: number) {
        const valorHex = percentual.toString(16);
        return valorHex.length === 1 ? "0" + valorHex : valorHex;
      },
      async recarregar() {
        this.totais(
          this.tipo[this.tipo_select].caminho_api,
            this.periodo[this.periodo_select].data_inicial,
            this.periodo[this.periodo_select].data_final
        );
      },
      async totais(
        caminho: string,
        data_inicial: string,
        data_final: string
      ) {
        try {
          this.loadData = true;
          const authorization = {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          };
  
          let response = await axios.get(
            this.apiGestor +
              `${caminho}?data_inicial=${data_inicial}&data_final=${data_final}`,
            {
              headers: authorization,
            }
          );
          this.dados = response.data;
          console.log(response.data);
        } catch (error) {
          console.error("Erro ao obter dados:", error);
        } finally {
          this.loadData = false;
        }
      },
    },
    mounted() {
      this.recarregar();
    },
  };
  //.p-datatable-loading-overlay 
  //.p-component-overlay
</script>
  

<style>
.p-datatable .p-datatable-loading-overlay {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
}
.p-component-overlay {
    background-color: rgba(0, 0, 0, 0.4);
    transition-duration: 0.2s;
}
.p-component-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>