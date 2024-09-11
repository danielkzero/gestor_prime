<template>
        <div class="stat pe-0">
            <div class="stat-figure">
                
            </div>
            <div class="stat-title">{{ titulo }}</div>
            <div class="stat-value" :class="cor">
                {{ quantidade }}
                <apexchart height="100" type="line" :options="sparklines.options" :series="series" />
            </div>
            <div class="stat-desc" v-html="subtitulo"></div>
        </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ApexCharts from 'vue3-apexcharts';


export default defineComponent({
    components: {
        apexchart: ApexCharts
    },
    props: {        
        series: {
            type: Array,
            default: []
        },
        cor: {
            type: String,
            default: 'text-primary'
        },
        titulo:  {
            type: String,
            default: 'Vendas'
        },
        quantidade:  {
            type: Number,
            default: 0
        },
        subtitulo:  {
            type: String,
            default: 'Este mês'
        },
    },
    data() {

        const createSparklineOptions = () => ({
            chart: {
                foreColor: '#ccc',
                type: 'line',
                sparkline: {
                    enabled: true
                },
            },
            series: [],
            stroke: {
                curve: 'smooth'
            },
            markers: {
                size: 0
            },
            colors: ['#ff9d00'],
            xaxis: {
                crosshairs: {
                    width: 1
                },
            },
            tooltip: {
                x: {
                    show: false
                },
                y: {
                    title: {
                        formatter: function formatter() {
                            return '';
                        }
                    }
                }
            }
        });

        return {
            sparklines: 
            {
                options: createSparklineOptions(),
            },
        };
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
