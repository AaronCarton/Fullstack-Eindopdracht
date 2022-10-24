import {
  createRouter,
  createWebHistory,
  RouteLocationNormalized,
  Router,
  RouteRecordRaw,
} from 'vue-router'
import useAuthentication from '../composables/useAuthentication'
import useUser from '../composables/useUser'

const { user } = useAuthentication()
const { loadUser, Role } = useUser()

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
      },

      {
        path: 'leveren',
        component: () => import('../screens/overview/Leveren.vue'),
      },
      {
        path: 'afhalen',
        component: () => import('../screens/overview/Afhalen.vue'),
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
        redirect: '/account/details',
        component: () => import('../screens/account/AccountHolder.vue'),
        children: [
          {
            path: 'details',
            component: () => import('../screens/account/AccountInfo.vue'),
          },
          {
            path: 'order-history',
            component: () => import('../screens/account/OrderHistory.vue'),
          },
          {
            path: 'admin/manage-pizzas',
            component: () => import('../screens/account/admin/ManagePizzas.vue'),
            meta: { needsAdmin: true },
          },
          {
            path: 'admin/manage-toppings',
            component: () => import('../screens/account/admin/ManageToppings.vue'),
            meta: { needsAdmin: true },
          },
        ],
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

router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
  if (to.meta.needsAuthentication && !user.value) return '/auth/login'
  if (to.meta.cantAuthenticate && user.value) return '/'
  if (to.meta.needsAdmin) {
    // load db user for admin check
    const user = await loadUser()
    if (user.value?.role !== Role.ADMIN) return '/'
  }
})

export default router
