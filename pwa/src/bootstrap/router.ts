import {
  createRouter,
  createWebHistory,
  RouteLocationNormalized,
  Router,
  RouteRecordRaw,
} from 'vue-router'
import useAuthentication from '../composables/useAuthentication'

const { user } = useAuthentication()

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../components/holders/AppHolder.vue'),
    children: [
      {
        path: '', // Eigenlijk zal de / altijd hiernaar resolven
        component: () => import('../screens/Home.vue'),
      },

      {
        path: 'order',
        component: () => import('../screens/order/index.vue'),
        meta: {
          needsAuthentication: true,
        },
      },

      {
        path: 'leveren',
        component: () => import('../screens/overview/Leveren.vue'),
        meta: {
          needsAuthentication: true,
        },
      },
      {
        path: 'afhalen',
        component: () => import('../screens/overview/Afhalen.vue'),
        meta: {
          needsAuthentication: true,
        },
      },

      {
        path: 'owner',
        component: () => import('../screens/owner/index.vue'),
        meta: {
          needsAuthentication: true,
        },
      },

      {
        path: 'payment',
        component: () => import('../screens/payment/index.vue'),
        meta: {
          needsAuthentication: true,
        },
      },

      {
        path: 'account',
        component: () => import('../screens/Account.vue'),
        meta: {
          needsAuthentication: true,
        },
      },
    ],
  },

  {
    path: '/auth',
    redirect: '/auth/login',
    component: () => import('../components/holders/AuthHolder.vue'),
    children: [
      {
        path: 'login',
        component: () => import('../components/auth/Login.vue'),
        meta: {
          cantAuthenticate: true,
        },
      },

      {
        path: 'register',
        component: () => import('../components/auth/Register.vue'),
        meta: {
          cantAuthenticate: true,
        },
      },

      {
        path: 'forgot-password',
        component: () => import('../components/auth/ForgotPassword.vue'),
      },
    ],
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'ClientError',
    component: () => import('../screens/generic/ClientError.vue'),
  },
]

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized) => {
  if (to.meta.needsAuthentication && !user.value) return '/auth/login'
  if (to.meta.cantAuthenticate && user.value) return '/'
})

export default router
