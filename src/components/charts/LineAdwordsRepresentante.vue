<template>
    <div class="stats shadow w-full mt-4">
        <div class="stat p-0">
            <div class="stat-value">
                <apexchart height="500" type="line" :options="sparklines.options" :series="sparklines.series" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';
import ApexCharts from 'vue3-apexcharts';


export default defineComponent({
    components: {
        apexchart: ApexCharts
    },
    props: {
        codigo: {
            type: String,
        },
    },
    data() {
        
        const createSparklineOptions = () => ({
            chart: {
                height: 328,
                type: 'line',
                zoom: {
                    enabled: false
                },
                dropShadow: {
                    enabled: true,
                    top: 4,
                    left: 2,
                    blur: 1,
                    opacity: 0.1,
                }
            },
            stroke: {
                curve: 'smooth',
                width: 3
            },
            title: {
                text: 'Venda anual',
                align: 'left',
                offsetY: 25,
                offsetX: 20
            },
            subtitle: {
                text: 'Evolução detalhada',
                offsetY: 55,
                offsetX: 20
            },
            markers: {
                size: 5,
                strokeWidth: 0,
                hover: {
                    size: 7
                }
            },
            grid: {
                show: true,
                padding: {
                    bottom: 0
                }
            },
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            xaxis: {
                tooltip: {
                    enabled: false
                }
            },
            legend: {
                position: 'top',
                horizontalAlign: 'right',
                offsetY: -20
            },
            tooltip: {
                    y: {
                        formatter: function (val: number) {
                            return `R$ ${val.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
                        }
                    }
                }
        });

        return {
            sparklines:
            {
                options: createSparklineOptions(),
                series: [],
            },
        };
    },
    methods: {
        async evolucaoDetalhada() {
            const response = await axios.get(`/api/representantes/desempenho/${this.codigo}`);
            const data = response.data;

            const series = data.map((row: any) => {
                return {
                    name: row.ANO,
                    data: [
                        row.JAN || 0,
                        row.FEV || 0,
                        row.MAR || 0,
                        row.ABR || 0,
                        row.MAI || 0,
                        row.JUN || 0,
                        row.JUL || 0,
                        row.AGO || 0,
                        row.SET || 0,
                        row.OUT || 0,
                        row.NOV || 0,
                        row.DEZ || 0
                    ]
                };
            });

            this.sparklines.series = series;
        }
    },
    async mounted() {
        await this.evolucaoDetalhada();
    }
});
</script>

<style scoped>
.stats {
    display: flex;
    justify-content: space-between;
}

.stat {
    flex: 1;
    margin-right: 10px;
}

.stat-figure {
    height: 100px;
}
</style>
