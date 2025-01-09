// Composables
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Apresentacao',
    component: () => import('../views/apresentacao/index.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/index.vue'),
  },
  {
    path: '/esqueci_minha_senha',
    name: 'EsqueciMinhaSenha',
    component: () => import('../views/login/esqueci_minha_senha.vue'),
  },
  {
    path: '/saiba_mais',
    name: 'SaibaMais',
    component: () => import('../views/saiba_mais/index.vue'),
  },
  {
    path: '/inicio',
    name: 'Inicio',
    redirect: '/principal',
    component: () => import('../views/layout/principal/index.vue'),
    children: [
      {
        path: '/principal',
        name: 'Principal',
        component: () => import('../views/paginas/principal/index.vue')
      },
      {
        path: '/pedidos',
        name: 'Pedidos',
        component: () => import('../views/paginas/pedidos/index.vue')
      },
      {
        path: '/terceirizado',
        name: 'Terceirizado',
        component: () => import('../views/paginas/programacao/terceirizado.vue')
      },
      {
        path: '/cadastro_terceirizado',
        name: 'Cadastro_terceirizado',
        component: () => import('../views/paginas/programacao/cadastro_terceirizado.vue')
      },
      {
        path: '/pedidos/:id',
        name: 'Pedido',
        component: () => import('../views/paginas/pedidos/Pedido.vue')
      },
      {
        path: '/pedidos/novo',
        name: 'PedidoNovo',
        component: () => import('../views/paginas/teste/index.vue')
      },
      {
        path: '/relatorio/proporcao',
        name: 'Relatorios',
        component: () => import('../views/paginas/relatorio/proporcao.vue')
      },
      {
        path: '/relatorio/bling',
        name: 'RelatoriosProporcao',
        component: () => import('../views/paginas/relatorio/bling.vue')
      },
      {
        path: '/monitoramento/equipamentos',
        name: 'MonitoramentoEquipamento',
        component: () => import('../views/paginas/monitoramento/equipamentos.vue')
      },
      {
        path: '/comercial/relatorio/supervisores',
        name: 'ComercialRelatorioSupervisores',
        component: () => import('../views/paginas/monitoramento/equipamentos.vue')
      },
      {
        path: '/comercial/relatorio/representantes/:id',
        name: 'ComercialRelatorioRepresentantes',
        component: () => import('../views/paginas/relatorio/desempenhoRepresentante.vue')
      },
      {
        path: '/comercial/relatorio/clientes',
        name: 'ComercialRelatorioClientes',
        component: () => import('../views/paginas/monitoramento/equipamentos.vue')
      },
      {
        path: '/comercial/relatorio/grupos',
        name: 'ComercialRelatorioGrupos',
        component: () => import('../views/paginas/monitoramento/equipamentos.vue')
      },
      {
        path: '/comercial/relatorio/familias',
        name: 'ComercialRelatorioFamilias',
        component: () => import('../views/paginas/monitoramento/equipamentos.vue')
      },
      {
        path: '/comercial/relatorio/produtos',
        name: 'ComercialRelatorioProdutos',
        component: () => import('../views/paginas/monitoramento/equipamentos.vue')
      },
      {
        path: '/comercial/relatorio/moldes',
        name: 'ComercialRelatorioMoldes',
        component: () => import('../views/paginas/monitoramento/equipamentos.vue')
      },
      {
        path: '/comercial/relatorio/metas',
        name: 'ComercialRelatorioMetas',
        component: () => import('../views/paginas/monitoramento/equipamentos.vue')
      },
      {
        path: '/comercial/relatorio/mapas',
        name: 'ComercialRelatorioMapas',
        component: () => import('../views/paginas/monitoramento/equipamentos.vue')
      },
    ]
  }
];

const router = createRouter({
  history: createWebHistory('/home/'),
  routes,
  linkExactActiveClass: 'active'
})

export default router
