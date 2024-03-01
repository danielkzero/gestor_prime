<template>
    <div class="drawer lg:drawer-open">
        <input id="my-drawer" type="checkbox" class="drawer-toggle" />

        <div class="drawer-content bg-base-200 p-4">
            <navbarGestor @theme-updated="handleThemeUpdate" class="mb-3" />             
            <router-view></router-view>
            <footerGestor />
        </div>

        <div class="drawer-side z-30">
            <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay">
            </label>
            <ul class="menu bg-base-100 min-h-full w-56" id="menu">
                <logoGestor :G="fillG" :ESTOR="fillESTOR" class="p-4" />
                <li>
                    <router-link to="/principal" active-class="active"><i class="bx bx-home"></i>Início</router-link>
                </li>
                <li>
                    <details>
                        <summary><i class="bx bx-basket"></i>Pedidos</summary>
                        <ul>
                            <li><router-link to="/pedidos" active-class="active">Meus pedidos</router-link></li>
                            <li>
                                <details>
                                    <summary><i class="bx bx-chart"></i>Relatórios</summary>
                                    <ul>
                                        <li><router-link to="/relatorio/bling" active-class="active">Bling</router-link></li>
                                        <li><router-link to="/relatorio/proporcao" active-class="active">Proporção</router-link></li>
                                    </ul>
                                </details>
                            </li>
                        </ul>
                    </details>
                </li>
            </ul>
        </div>
    </div>
</template>
<script lang="ts">
import logoGestor from '../../../components/logo/index.vue';
import footerGestor from '../../../components/footer/index.vue';
import navbarGestor from '../../../components/navbar/index.vue';

export default {
    name: 'principal',
    components: { 
        logoGestor, 
        footerGestor, 
        navbarGestor
    },
    data() { 
        return { 
            fillG: 'rgb(255,157,0)', 
            fillESTOR: 'rgb(0,0,0)',
            themeChecked: true,
        }
    },
    methods: {
        handleThemeUpdate(data: any) {
            this.fillG = data.fillG; 
            this.fillESTOR = data.fillESTOR;
        }
    },
    mounted() {
        const themeCheckedFromLocalStorage = localStorage.getItem('themecontroller');
        this.themeChecked = themeCheckedFromLocalStorage == 'true' ? true : false;
        this.fillESTOR = (this.themeChecked == false ? 'rgb(0,0,0)' : 'rgb(159, 185, 197)');

        const elementosAtivos1 = document.querySelectorAll('#menu .active');
        elementosAtivos1.forEach(elemento => {
            const details = elemento.closest('details');
            if (details) {
                const elementoAnterior = details?.parentElement?.previousElementSibling;
                if (elementoAnterior) {
                    const activeInsidePreviousElement = elementoAnterior.querySelector('a');
                    if (activeInsidePreviousElement) {
                        activeInsidePreviousElement.classList.add('active-pai');
                    }
                }
                details.setAttribute('open', 'open');
            }
        });
        
        const elementosAtivos = document.querySelectorAll('#menu .active, #menu .active-pai');
        elementosAtivos.forEach(elemento => {            
            const details = elemento.closest('details');
            if (details) {
                details.setAttribute('open', 'open');
                
            }
        });
    }
}
</script>