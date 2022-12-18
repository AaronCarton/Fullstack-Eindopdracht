import { App as VueApp, createApp } from 'vue'

import 'vue-toastification/dist/index.css'
import '@unocss/reset/tailwind.css'
import 'uno.css'
import 'animate.css'
import './main.css'
import '../public/assets/Favicon.svg'

import App from './App.vue'

import { createI18n } from 'vue-i18n'
import router from './bootstrap/router'
import useAuthentication from './composables/useAuthentication'
import useUser from './composables/useUser'

import Toast, { PluginOptions } from 'vue-toastification'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import useCart from './composables/useCart'
import usei18n from './composables/usei18n'

const app: VueApp = createApp(App)
const { i18n, loadLocale } = usei18n()

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
  await loadLocale()

  app.use(i18n)
  app.use(router)
  app.use(autoAnimatePlugin)
  app.use(Toast, { hideProgressBar: true, timeout: 3500 } as PluginOptions)
  app.mount('#app')
})()
