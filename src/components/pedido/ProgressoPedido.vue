<template>
    <div class="margin-3">  
        <progress class="progress progress-success steps absolute z-0 mt-4" :value="percentual" max="100"></progress>
        <div class="flex items-center gap-3 w-100 justify-between">
            <div tabindex="0" class="avatar placeholder relative flex" v-for="item in items">
                <div :class="item.time == percentual ? 'animate-ping bg-success text-base-100' : item.time < percentual ? item.ativo : item.inativo" class="w-10 rounded-full justify-center absolute z-0">
                    <span class="text-xl"><i :class="item.icon" ></i></span>
                </div>
                <div :class="item.time <= percentual ? item.ativo : item.inativo" class="w-10 rounded-full justify-center">
                    <span class="text-xl"><i :class="item.icon" ></i></span>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    data() {
        return {
            percentual: 0,
            percentualStop: 100,
            items: [
                {
                    icon: 'bx bx-download',
                    time: 0,
                    ativo: ['bg-success text-base-100'],
                    inativo: ['text-base bg-base-100 border border-base-200'],
                    texto: 'recebido',
                },
                {
                    icon: 'bx bx-check-square',
                    time: 17,
                    ativo: ['bg-success text-base-100'],
                    inativo: ['text-base bg-base-100 border border-base-200'],
                    texto: 'conferido',
                },
                {
                    icon: 'bx bx-coin',
                    time: 33,
                    ativo: ['bg-success text-base-100'],
                    inativo: ['text-base bg-base-100 border border-base-200'],
                    texto: 'liberado',
                },
                {
                    icon: 'bx bx-package',
                    time: 50,
                    ativo: ['bg-success text-base-100'],
                    inativo: ['text-base bg-base-100 border border-base-200'],
                    texto: 'separado',
                },
                {
                    icon: 'bx bx-receipt',
                    time: 66,
                    ativo: ['bg-success text-base-100'],
                    inativo: ['text-base bg-base-100 border border-base-200'],
                    texto: 'faturado',
                },
                {
                    icon: 'bx bxs-truck',
                    time: 83,
                    ativo: ['bg-success text-base-100'],
                    inativo: ['text-base bg-base-100 border border-base-200'],
                    texto: 'carregado',
                },
                {
                    icon: 'bx bx-check',
                    time: 100,
                    ativo: ['bg-success text-base-100'],
                    inativo: ['text-base bg-base-100 border border-base-200'],
                    texto: 'entregue',
                }
            ]
        }
    },
    mounted() {
        let vm = this;
        const intervalo = setInterval(function () {
            vm.percentual += 1;
            if (vm.percentual >= vm.percentualStop) {
                clearInterval(intervalo);
            }
        }, 25);
    }
}
</script>
<style scope>
.margin-3{
    margin: 0.75rem;
}
.steps {
    width: calc(100% - (0.75rem * 2) - (40px));
    margin-left: 20px;
}
</style>