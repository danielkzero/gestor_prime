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
        path: '/pedidos/:id',
        name: 'Pedido',
        component: () => import('../views/paginas/pedidos/Pedido.vue')
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
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory('/home/'),
  routes,
  linkExactActiveClass: 'active'
})

export default router
