import { App as VueApp, createApp } from 'vue'

import '@unocss/reset/tailwind.css'
import 'uno.css'

import App from './App.vue'

import router from './bootstrap/router'
import useAuthentication from './composables/useAuthentication'
import useUser from './composables/useUser'

const app: VueApp = createApp(App)

const { restoreUser } = useAuthentication()
const { loadUser } = useUser()

;(async function () {
  await restoreUser().then(async (fUser) => {
    if (fUser)
      await loadUser().then(async (user) => {
        console.log('Firebase token', await fUser?.value?.getIdToken())
        console.log('User', user.value)
      })
  })

  app.use(router)
  app.mount('#app')
})()
