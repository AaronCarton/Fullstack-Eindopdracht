import { App as VueApp, createApp } from 'vue'

import 'vue-toastification/dist/index.css'
import '@unocss/reset/tailwind.css'
import 'uno.css'
import 'animate.css'

import App from './App.vue'

import router from './bootstrap/router'
import useAuthentication from './composables/useAuthentication'
import useUser from './composables/useUser'

import Toast, { PluginOptions } from 'vue-toastification'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import useCart from './composables/useCart'

const app: VueApp = createApp(App)

const { restoreUser } = useAuthentication()
const { loadUser } = useUser()
const { loadToppings } = useCart()

;(async function () {
  await restoreUser().then(async (fUser) => {
    if (fUser)
      await loadUser().then(async (user) => {
        console.log('Firebase token', await fUser?.value?.getIdToken())
        console.log('User', user.value)
      })
  })
  await loadToppings()

  app.use(router)
  app.use(autoAnimatePlugin)
  app.use(Toast, { hideProgressBar: true, timeout: 3500 } as PluginOptions)
  app.mount('#app')
})()
