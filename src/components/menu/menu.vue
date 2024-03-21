<template>
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
</template>
<script lang="ts">
import logoGestor from '../logo/index.vue';
export default {
    components: { 
        logoGestor
    },
     
    props: { 
        fillG: String, 
        fillESTOR: String,
        themeChecked: Boolean,
    }
}
</script>