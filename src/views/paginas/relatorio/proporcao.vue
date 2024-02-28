<template>
  <div class="text-center text-xs">
    Proporção
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
        {{ periodo[periodo_select].data_inicial }} à
        {{ periodo[periodo_select].data_final }}
      </summary>
      <ul class="shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-64">
        <li v-for="(item, index) in periodo" :key="index">
          <a
            :class="periodo_select == index ? 'active' : ''"
            @click="periodo_select = index"
            >{{ item.data_inicial }} à {{ item.data_final }}</a
          >
        </li>
        <button
          class="btn btn-sm btn-secondary mt-2"
          onclick="my_modal_3.showModal()">
          <i class="bx bx-plus-circle"></i>Novo período
        </button>
      </ul>
    </details>
    na empresa
    <details class="dropdown ClickScreenToClose">
      <summary class="m-1 link link-primary">
        {{ empresa[empresa_select].texto }}
      </summary>
      <ul
        class="shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-64"
      >
        <li v-for="(item, index) in empresa" :key="index">
          <a
            :class="empresa_select == index ? 'active' : ''"
            @click="empresa_select = index"
            >{{ item.texto }}</a
          >
        </li>
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
              @click="periodo_select = index">{{ item.data_inicial }} à {{ item.data_final }}</div>
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
  <div class="center-chart">
    <apexchart
      width="100%"
      height="500"
      type="treemap"
      :options="chartOptions"
      :series="series"
      class="p-0 m-0"
    >
    </apexchart>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { inject } from "vue";
import moment from "moment";
// HACK: No typescript declaration file available: https://github.com/apexcharts/vue3-apexcharts/issues/2
// eslint-disable-next-line
// @ts-ignore
import VueApexCharts from 'vue3-apexcharts';

export default {
  components: {
    apexchart: VueApexCharts,
  },
  name: "Apex charts",
  data() {
    return {
      apiGestor: inject<string>("apiGestor"),
      tdata_inicial: new Date(),
      tdata_final: new Date(),
      chartOptions: {},
      series: [] as any[],
      tipo: [
        {
          texto: "da quantidade total vendida",
          caminho_api: "/relatorio/pedido/treemap_proporcao",
        },
        {
          texto: "do valor total vendido",
          caminho_api: "/relatorio/pedido/treemap_proporcao_valor",
        },
      ],
      tipo_select: 0,
      periodo: [
        {
          data_inicial: moment(new Date(), 'YYYY-MM-DD').format('DD/MM/YYYY'),
          data_final: moment(new Date(), 'YYYY-MM-DD').format('DD/MM/YYYY'),
        },
      ],
      periodo_select: 0,
      empresa: [
        {
          texto: "VALEPLAST",
          id: "1",
        },
        {
          texto: "GLOBALPLASTIC",
          id: "2",
        },
      ],
      empresa_select: 0,
      loadData: false,
    };
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
          data_inicial: moment(this.tdata_inicial, 'YYYY-MM-DD').format('DD/MM/YYYY'),
          data_final: moment(this.tdata_final, 'YYYY-MM-DD').format('DD/MM/YYYY')
        }
      );
    },
    percentualParaHex(percentual: number) {
      const valorHex = percentual.toString(16);
      return valorHex.length === 1 ? "0" + valorHex : valorHex;
    },
    async recarregar() {
      this.totais(
        this.tipo[this.tipo_select].caminho_api,
        moment(
          this.periodo[this.periodo_select].data_inicial,
          "DD/MM/YYYY"
        ).format("YYYY-MM-DD"),
        moment(
          this.periodo[this.periodo_select].data_final,
          "DD/MM/YYYY"
        ).format("YYYY-MM-DD"),
        this.empresa[this.empresa_select].id
      );
    },
    async totais(
      caminho: string,
      data_inicial: string,
      data_final: string,
      id_empresa: string
    ) {
      try {
        this.loadData = true;
        const authorization = {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        };

        let response = await axios.get(
          this.apiGestor +
            `${caminho}?data_inicial=${data_inicial}&data_final=${data_final}&IdEmpresa=${id_empresa}`,
          {
            headers: authorization,
          }
        );

        let arrayColors = [] as any[];

        const maxPercentual = Math.max(
          ...response.data.map((item: any) => item["Percentual"])
        );
        const minPercentual = Math.min(
          ...response.data.map((item: any) => item["Percentual"])
        );

        const arrayModificado = response.data.map((item: any) => {
          const percentual = item["Percentual"];
          const vermelho = Math.round(
            ((percentual - minPercentual) / (maxPercentual - minPercentual)) *
              200
          );
          const azul = 200 - vermelho;
          const color = `#${this.percentualParaHex(
            azul
          )}${this.percentualParaHex(50)}${this.percentualParaHex(vermelho)}`;
          arrayColors.push(color);
          return {
            x: item["Descricao"],
            y: percentual,
          };
        });

        this.chartOptions = {
          toolbar: {
            show: false,
          },
          legend: {
            show: false,
          },
          chart: {
            type: "treemap",
            toolbar: {
              show: false,
            },
          },
          title: {
            text: "",
            align: "center",
          },
          colors: arrayColors,
          plotOptions: {
            treemap: {
              distributed: true,
              enableShades: false,
            },
          },
        };

        this.series = [
          {
            name: "Grupos",
            data: arrayModificado,
          },
        ];
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
</script>
