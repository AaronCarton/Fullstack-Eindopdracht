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
const { Role, user: dbUser } = useUser()

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
        path: 'order/:id',
        component: () => import('../screens/order/index.vue'),
        meta: {
          needsAuthentication: true,
        },
      },

      {
        name: 'delivery',
        path: 'delivery',
        redirect: { path: 'overview', query: { type: 'delivery' } },
      },
      {
        name: 'takeaway',
        path: 'takeaway',
        redirect: { path: 'overview', query: { type: 'takeaway' } },
      },
      {
        path: '/overview',
        component: () => import('../screens/overview/OverviewHolder.vue'),
        children: [
          {
            path: '',
            component: () => import('../screens/overview/pages/Overview.vue'),
            meta: {
              enterClass: 'animate__animated animate__fadeInDown animate__fast',
              leaveClass: 'animate__animated animate__fadeOutDown animate__fast',
            },
          },
          {
            name: 'customize',
            path: 'customize/:id',
            component: () => import('../screens/overview/pages/Customize.vue'),
            meta: {
              enterClass: 'animate__animated animate__fadeInUp animate__fast',
              leaveClass: 'animate__animated animate__fadeOutUp animate__fast',
            },
          },
          {
            path: 'payment',
            component: () => import('../screens/payment/index.vue'),
          },
        ],
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
            path: 'driver/deliver-order',
            component: () => import('../screens/account/driver/DeliverOrder.vue'),
            meta: { needsDriver: true },
          },
          {
            path: 'admin/manage-users',
            component: () => import('../screens/account/admin/ManageUsers.vue'),
            meta: { needsAdmin: true },
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
  if (to.meta.needsAuthentication && !user.value)
    return { path: '/auth/login', query: { redirect: to.fullPath } }
  if (to.meta.cantAuthenticate && user.value) return '/'
  if (to.meta.needsAdmin && dbUser.value?.role !== Role.ADMIN) return to.fullPath
  if (
    to.meta.needsDriver &&
    dbUser.value?.role !== Role.DRIVER &&
    dbUser.value?.role !== Role.ADMIN
  )
    return to.fullPath
})

export default router
