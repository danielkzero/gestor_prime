<template>
    <Card class="rounded rounded-xl bg-base-100 p-4 shadow-1 border mt-4">
        <template #content>
            <apexchart type="treemap" height="500" :options="chartOptions" :series="chartSeries" />
        </template>
    </Card>
</template>
<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';
import ApexCharts from 'vue3-apexcharts';

interface DataItem {
    uf: string;
    total: number;
}

export default defineComponent({
    components: {
        apexchart: ApexCharts
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
                    type: 'treemap'
                },
                title: {
                    text: 'Estados últimos 30 dias'
                },
                legend: {
                    show: true
                },
                plotOptions: {
                    treemap: {
                        distributed: true,
                        enableShades: false
                    }
                },
                tooltip: {
                    y: {
                        formatter: function (val: number) {
                            return `R$ ${val.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
                        }
                    }
                },
            },
            chartSeries: [
                {
                    data: []
                }
            ]
        };
    },
    methods: {
        async fetchData() {
            const response = await axios.get(`/api/representantes/rankinguf/${this.codigo}`);
            const data: DataItem[] = response.data;

            // Transformar dados para o formato necessário pelo ApexCharts com cores aleatórias
            const seriesData = data.map((item: DataItem) => ({
                x: item.uf,
                y: item.total
            }));

            this.chartSeries[0].data = seriesData as never[];
        },
        getRandomColor(): string {
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }
    },
    async mounted() {
        await this.fetchData();
    }
});
</script>