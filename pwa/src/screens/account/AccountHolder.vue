<template>
  <div class="flex min-h-screen place-items-center bg-slate-200">
    <div class="container mx-auto w-full">
      <div class="flex divide-x-2 rounded-lg bg-slate-100 shadow-md">
        <div class="mr-8 flex w-80 flex-col space-y-5 p-5">
          <router-link to="/account/details" class="mx-2" active-class="font-bold">
            Persoonlijke Informatie
          </router-link>
          <router-link to="/account/order-history" class="mx-2" active-class="font-bold">
            Vorige bestellingen
          </router-link>
          <div class="flex flex-col space-y-5" v-if="isAdmin">
            <router-link
              to="/account/admin/manage-users"
              class="mx-2"
              active-class="font-bold"
            >
              Gebruikers instellen
            </router-link>
            <router-link
              to="/account/admin/manage-pizzas"
              class="mx-2"
              active-class="font-bold"
            >
              Pizzas instellen
            </router-link>
            <router-link
              to="/account/admin/manage-toppings"
              class="mx-2"
              active-class="font-bold"
            >
              Toppings instellen
            </router-link>
          </div>
        </div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import useUser from '../../composables/useUser'
export default {
  setup() {
    const { user, Role } = useUser()

    return {
      isAdmin: user.value?.role === Role.ADMIN,
    }
  },
}
</script>
