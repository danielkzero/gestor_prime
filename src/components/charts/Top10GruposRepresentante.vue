<template>
    <div class="stat p-0">
        <div class="stat-value">
            <apexchart height="500" :options="sparklines.options" :series="sparklines.series" />
        </div>
    </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';
import ApexCharts from 'vue3-apexcharts';

interface SparklineSeries {
    name: String,
    data: number[];
}

interface SparklineOptions {
    chart: {
        height: number;
        type: string;
        zoom: {
            enabled: boolean;
        };
    };
    plotOptions: {
        bar: {
            distributed: boolean;
            borderRadius: number;
            borderRadiusApplication: string;
            horizontal: boolean;
        };
    };
    dataLabels: {
        enabled: boolean;
    };
    xaxis: {
        categories: string[];
    };
}

interface SparklineData {
    options: SparklineOptions;
    series: SparklineSeries[];
}


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
                type: 'bar',
                zoom: {
                    enabled: false
                },
            },
            legend: {
                show: false
            },
            plotOptions: {
                bar: {
                    distributed: true,
                    borderRadius: 4,
                    borderRadiusApplication: 'end',
                    horizontal: true,
                }
            },
            dataLabels: {
                enabled: false,
            },
            xaxis: {
                categories: [],
            },
            tooltip: {
                y: {
                    formatter: function (val: number) {
                        return `R$ ${val.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
                    }
                }
            },
            title: {
                text: 'Top 10 Grupos',
                align: 'left',
                offsetY: 25,
                offsetX: 20
            },
        });

        return {
            sparklines: {
                options: createSparklineOptions(),
                series: [],
                categories: []
            } as SparklineData,
        };
    },
    methods: {
        async evolucaoDetalhada() {
            const response = await axios.get(`/api/representantes/rankinggrupo/${this.codigo}`);
            const data = response.data;

            this.sparklines.series =
                [
                    {
                        name: 'Valor',
                        data: data.map((row: any) => row.total || 0)
                    }
                ];

            this.sparklines.options =
            {
                xaxis: {
                    categories: data.map((row: any) => row.NmGrupo),
                }
            } as never;
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
