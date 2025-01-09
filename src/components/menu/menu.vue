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
        <li>
            <details>
                <summary><i class='bx bxs-user'></i>Comercial</summary>
                <ul>
                    <li>
                        <details>
                            <summary><i class="bx bx-chart"></i>Relatórios</summary>
                            <ul>
                                <li>
                                    <router-link 
                                    to="/comercial/relatorio/supervisores" 
                                    :class="{ 'active': isActiveRoute('/comercial/relatorio/supervisores') }"
                                    :aria-current="!isActiveRoute('/comercial/relatorio/supervisores') || 'page'">Supervisores</router-link>
                                </li>
                                <li>
                                    <router-link 
                                    to="/comercial/relatorio/representantes/111" 
                                    :class="{ 'active': isActiveRoute('/comercial/relatorio/representantes') }"
                                    :aria-current="!isActiveRoute('/comercial/relatorio/representantes') || 'page'">Representantes</router-link>
                                </li>
                                <li>
                                    <router-link 
                                    to="/comercial/relatorio/clientes" 
                                    :class="{ 'active': isActiveRoute('/comercial/relatorio/clientes') }"
                                    :aria-current="!isActiveRoute('/comercial/relatorio/clientes') || 'page'">Clientes</router-link>
                                </li>
                                <li>
                                    <router-link 
                                    to="/comercial/relatorio/grupos" 
                                    :class="{ 'active': isActiveRoute('/comercial/relatorio/grupos') }"
                                    :aria-current="!isActiveRoute('/comercial/relatorio/grupos') || 'page'">Grupos</router-link>
                                </li>
                                <li>
                                    <router-link 
                                    to="/comercial/relatorio/familias" 
                                    :class="{ 'active': isActiveRoute('/comercial/relatorio/familias') }"
                                    :aria-current="!isActiveRoute('/comercial/relatorio/familias') || 'page'">Familias</router-link>
                                </li>
                                <li>
                                    <router-link 
                                    to="/comercial/relatorio/produtos" 
                                    :class="{ 'active': isActiveRoute('/comercial/relatorio/produtos') }"
                                    :aria-current="!isActiveRoute('/comercial/relatorio/produtos') || 'page'">Produtos</router-link>
                                </li>
                                <li>
                                    <router-link 
                                    to="/comercial/relatorio/moldes" 
                                    :class="{ 'active': isActiveRoute('/comercial/relatorio/moldes') }"
                                    :aria-current="!isActiveRoute('/comercial/relatorio/moldes') || 'page'">Moldes</router-link>
                                </li>
                                <li>
                                    <router-link 
                                    to="/comercial/relatorio/metas" 
                                    :class="{ 'active': isActiveRoute('/comercial/relatorio/metas') }"
                                    :aria-current="!isActiveRoute('/comercial/relatorio/metas') || 'page'">Metas</router-link>
                                </li>
                                <li>
                                    <router-link 
                                    to="/comercial/relatorio/mapas" 
                                    :class="{ 'active': isActiveRoute('/comercial/relatorio/mapas') }"
                                    :aria-current="!isActiveRoute('/comercial/relatorio/mapas') || 'page'">Mapas</router-link>
                                </li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </details>
        </li>
        <li>
            <details>
                <summary><i class="bx bxs-factory"></i>PCP</summary>
                <ul>
                    <li>
                        <router-link 
                        to="/cadastro_terceirizado" 
                        :class="{ 'active': isActiveRoute('/cadastro_terceirizado') }"
                        :aria-current="!isActiveRoute('/cadastro_terceirizado') || 'page'">Cadastro de terceirizado</router-link>
                    </li>
                    <li>
                        <router-link 
                        to="/terceirizado" 
                        :class="{ 'active': isActiveRoute('/terceirizado') }"
                        :aria-current="!isActiveRoute('/terceirizado') || 'page'">Terceirizado</router-link>
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