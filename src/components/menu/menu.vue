<template>
    <ul class="menu bg-base-100 min-h-full w-56" id="menu">
        <logoGestor :G="fillG" :ESTOR="fillESTOR" class="p-4" />
        <li>
            <router-link to="/principal" active-class="active-menu"><i class="bx bx-home"></i>Início</router-link>
        </li>
        <li>
            <details>
                <summary><i class="bx bx-basket"></i>Pedidos</summary>
                <ul>
                    <li><router-link 
                        to="/pedidos" 
                        :class="{ 'active': isActiveRoute('/pedidos') }"
                        :aria-current="!isActiveRoute('/pedidos') || 'page'">Meus pedidos</router-link></li>
                    <li>
                        <details>
                            <summary><i class="bx bx-chart"></i>Relatórios</summary>
                            <ul>
                                <li><router-link 
                                    to="/relatorio/bling" 
                                    :class="{ 'active': isActiveRoute('/relatorio/bling') }"
                                    :aria-current="!isActiveRoute('/relatorio/bling') || 'page'">Bling</router-link></li>
                                <li><router-link 
                                    to="/relatorio/proporcao" 
                                    :class="{ 'active': isActiveRoute('/relatorio/proporcao') }"
                                    :aria-current="!isActiveRoute('/relatorio/proporcao') || 'page'">Proporção</router-link></li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </details>
        </li>
        <li>
            <details>
                <summary><i class="bx bx-show"></i>Monitoramento</summary>
                <ul>
                    <li>
                        <router-link 
                        to="/monitoramento/equipamentos" 
                        :class="{ 'active': isActiveRoute('/monitoramento/equipamentos') }"
                        :aria-current="!isActiveRoute('/monitoramento/equipamentos') || 'page'">Equipamentos</router-link>                            
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
    },
    methods: {
    isActiveRoute(route: any) {
      return this.$route.path.startsWith(route);
    }
  }
}
</script>