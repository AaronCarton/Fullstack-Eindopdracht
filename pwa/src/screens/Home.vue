<template>
  <!--Background image + overlay-->
  <div :class="`main-bg sm:bg-cover`">
    <div class="bg-opacity-65 min-h-screen bg-black">
      <!--Link to account page-->
      <RouterLink
        class="group absolute right-1 m-5 flex items-center gap-4"
        to="/account"
        data-cy="account"
      >
        <p
          v-if="user"
          class="duration-250 font-semibold text-neutral-50 opacity-80 transition-all ease-out group-hover:opacity-100"
          data-cy="account-name"
        >
          {{ user?.displayName }}
        </p>
        <p
          v-else
          class="duration-250 font-semibold text-neutral-50 opacity-80 transition-all ease-out group-hover:opacity-100"
          data-cy="login-button"
        >
          Login
        </p>
        <User
          class="duration-250 h-8 w-8 rounded-full border-2 stroke-neutral-50 transition-all ease-out group-hover:bg-neutral-50 group-hover:stroke-neutral-900"
        />
      </RouterLink>
      <!-- Languages icon where if you click on it, it'll show a list of useable locales -->
      <Languages @click="switchLanguage()" class="absolute left-1 m-5 cursor-pointer text-white" />

      <!--Sets items centered-->
      <div class="flex min-h-screen items-center justify-center">
        <div class="flex w-full max-w-3xl flex-col items-center gap-6 px-6">
          <!--Title-->
          <h2 class="font-title mb-24 text-center text-8xl text-white">Pizza Time</h2>
          <!--Button to afhalen page-->
          <RouterLink
            to="/takeaway"
            class="duration-250 rounded-2 mx-8 w-[65%] border-2 border-slate-50 py-2 px-2 text-center text-2xl font-extrabold text-slate-50 transition-all ease-out hover:bg-slate-50 hover:text-black"
            data-cy="takeaway-button"
          >
            {{ $t('home.takeaway') }}
          </RouterLink>
          <!--Devider with text in the middle-->
          <div class="px-50 w-full">
            <fieldset class="border-t-2 border-slate-200">
              <legend class="mx-auto px-4 text-2xl font-bold italic text-slate-100">OR</legend>
            </fieldset>
          </div>
          <!--Button to leveren page-->
          <RouterLink
            to="/delivery"
            class="duration-250 rounded-2 mx-8 w-[65%] border-2 border-slate-50 py-2 px-2 text-center text-2xl font-extrabold text-slate-50 transition-all ease-out hover:bg-slate-50 hover:text-black"
            data-cy="delivery-button"
          >
            {{ $t('home.delivery') }}
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import useAuthentication from '../composables/useAuthentication'
import { User, Languages } from 'lucide-vue-next'
import usei18n from '../composables/usei18n'
import { useToast } from 'vue-toastification'
// add
export default {
  components: {
    User,
    Languages,
  },
  setup() {
    const toast = useToast()
    const { user } = useAuthentication()
    const { i18n, loadLocale, t } = usei18n()

    const switchLanguage = async () => {
      if (i18n.global.locale === 'en') {
        await loadLocale('nl')
      } else {
        await loadLocale('en')
      }
      localStorage.setItem('locale', i18n.global.locale)
      toast.info(t('languageChanged'))
    }

    return {
      user,
      i18n,

      switchLanguage,
    }
  },
}
</script>
