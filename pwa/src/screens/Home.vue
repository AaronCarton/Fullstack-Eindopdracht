<template>
  <!--Background image + overlay-->
  <div class="bg-[url(../HomeBG.jpg)] sm:bg-cover">
    <div class="min-h-screen bg-black bg-opacity-65">
      <!--Link to account page-->
      <RouterLink
        class="group right-1 absolute flex m-2 gap-4 items-center"
        to="/account"
      >
        <p
          v-if="user"
          class="text-neutral-50 ease-out transition-all duration-250 opacity-80 font-semibold group-hover:opacity-100"
        >
          {{ user?.displayName }}
        </p>
        <p
          v-else
          class="text-neutral-50 ease-out transition-all duration-250 opacity-80 font-semibold group-hover:opacity-100"
        >
          Login
        </p>
        <User
          class="w-8 h-8 stroke-neutral-50 ease-out transition-all duration-250 border-2 rounded-full group-hover:bg-neutral-50 group-hover:stroke-neutral-900"
        />
      </RouterLink>
      <!--Sets items centered-->
      <div class="flex items-center justify-center min-h-screen">
        <div class="w-full max-w-3xl px-6 flex flex-col items-center gap-6">
          <!--Title-->
          <h2 class="text-8xl text-white font-title text-center mb-24">Pizza Time</h2>
          <!--Button to afhalen page-->
          <RouterLink
            to="/afhalen"
            class="ease-out transition-all font-extrabold duration-250 text-center border-2 rounded-2 w-[65%] text-2xl text-slate-50 border-slate-50 mx-8 py-2 px-2 hover:text-black hover:bg-slate-50"
          >
            AFHALEN
          </RouterLink>
          <!--Devider with text in the middle-->
          <div class="w-full px-50">
            <fieldset class="border-t-2 border-slate-200">
              <legend class="mx-auto px-4 text-slate-100 text-2xl font-bold italic">
                OF
              </legend>
            </fieldset>
          </div>
          <!--Button to leveren page-->
          <RouterLink
            to="/leveren"
            class="ease-out transition-all duration-250 text-center border-2 rounded-2 w-[65%] font-extrabold text-2xl text-slate-50 border-slate-50 mx-8 py-2 px-2 hover:text-black hover:bg-slate-50"
          >
            LEVEREN
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import useAuthentication from '../composables/useAuthentication'
import { User } from 'lucide-vue-next'
// add
export default {
  components: {
    User,
  },
  setup() {
    const { user } = useAuthentication()
    const getToken = async () => {
      console.log(await user.value?.getIdToken())
    }

    getToken()
    return {
      user,
    }
  },
}
</script>
