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
                    zoom: {
                        enabled: false
                    },
                },
                plotOptions: {
                    bar: {
                        borderRadius: 10,
                        borderRadiusApplication: 'end',
                        colors: {
                            ranges: []
                        }
                    }
                },
                title: {
                    text: 'Vendas diárias + previsão',
                    align: 'left',
                    offsetY: 10,
                    offsetX: 0
                },
                markers: {
                    size: 5,
                    strokeWidth: 0,
                    hover: {
                        size: 7
                    }
                },
                dataLabels: {
                    enabled: false,
                },
                series: [
                    {
                        name: 'Venda',
                        data: []
                    }
                ],
                xaxis: {
                    categories: []
                },
                tooltip: {
                    y: {
                        formatter: function (val: any) {
                            return "R$ " + val.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
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
                const response = await axios.get(`/api/representantes/vendadiaria/${this.codigo}`);
                const data = response.data;

                const xcategories = data.map((item: any) => String(item.dia));
                const totals = data.map((item: any) => parseFloat(item.total));

                const forecast = this.calculateForecast(totals, 3);

                if (forecast != null) {
                    totals.push(parseFloat(forecast.toFixed(2)));
                }

                xcategories.push(['Previsão', 'próxima venda']);

                this.updateChartOptions(totals, xcategories);
            } catch (error) {
                console.error('Erro ao obter dados da API:', error);
            }
        },
        updateChartOptions(totals: any, xcategories: any) {
            //const colors = Array(totals.length - 1).fill('#00E396');
            //console.log(colors);
            this.chartOptions = {
                ...this.chartOptions,
                series: [{ name: 'Venda', data: totals }],
                xaxis: { categories: xcategories }
            };

        },
        calculateForecast(data: any, period: any) {
            if (data.length < period) {
                return null;
            }
            const sum = data.slice(-period).reduce((a: any, b: any) => a + b, 0);
            return (sum / period);
        }
    }
};
</script>
