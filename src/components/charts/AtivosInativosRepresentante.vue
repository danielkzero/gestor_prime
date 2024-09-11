<template>
    <Card class="rounded rounded-xl bg-base-100 p-4 shadow-1 border mt-4">
        <template #content>
            <apexchart height="500" :options="chartOptions" :series="chartOptions.series" />
        </template>
    </Card>
</template>

<script lang="ts">
import VueApexCharts from "vue3-apexcharts";
import axios from 'axios';

export default {
    components: {
        apexchart: VueApexCharts,
    },
    props: {
        codigo: {
            type: String
        }
    },
    data() {
        return {
            chartOptions: {
                chart: {
                    height: 500,
                    type: 'bar',
                    stacked: true,
                    stackType: '100%', // Configuração para barras empilhadas em 100%
                    zoom: {
                        enabled: false
                    },
                },
                plotOptions: {
                    bar: {
                        borderRadius: 4,
                        horizontal: false,
                    }
                },
                dataLabels: {
                    enabled: true,
                    // @ts-ignore
                    formatter: (val: any, opts: any) => {
                        // @ts-ignore
                        const seriesIndex = opts.seriesIndex;
                        const dataIndex = opts.dataPointIndex;
                        const value = opts.w.config.series[seriesIndex].data[dataIndex];
                        return value; // Mostrar o valor real
                    }
                },
                title: {
                    text: 'Clientes ativo e inativos',
                    align: 'left',
                    offsetY: 10,
                    offsetX: 0
                },
                series: [
                    {
                        name: 'Ativos',
                        data: []
                    },
                    {
                        name: 'Inativos',
                        data: []
                    }
                ],
                xaxis: {
                    categories: []
                },
                tooltip: {
                    y: {
                        formatter: function (val: any) {
                            return val;
                        }
                    }
                },
                yaxis: {
                    labels: {
                        formatter: function (val: any) {
                            return val.toFixed(0) + "%";
                        }
                    }
                }
            }
        };
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        async fetchData() {
            try {
                const response = await axios.get(`/api/representantes/ativosinativos/${this.codigo}`);
                const data = response.data;

                const categories = data.map((item: any) => item.uf);
                const ativos = data.map((item: any) => parseInt(item.ativos));
                const inativos = data.map((item: any) => parseInt(item.inativos));

                this.updateChartOptions(ativos, inativos, categories);
            } catch (error) {
                console.error('Erro ao obter dados da API:', error);
            }
        },
        updateChartOptions(ativos: any, inativos: any, categories: any) {
            this.chartOptions = {
                ...this.chartOptions,
                series: [
                    { name: 'Ativos', data: ativos },
                    { name: 'Inativos', data: inativos }
                ],
                xaxis: { categories: categories }
            };
        }
    }
};
</script>
