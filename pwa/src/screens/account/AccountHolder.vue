<template>
  <div class="flex min-h-screen place-items-center bg-[url(/HomeBG.jpg)]">
    <div class="bg-opacity-65 absolute z-0 min-h-screen w-full bg-black" />
    <div class="container z-10 mx-auto w-full">
      <div class="divide-x-3 flex h-[30rem] divide-neutral-300 rounded-xl bg-neutral-200 shadow-md">
        <div class="flex w-80 flex-col">
          <router-link
            to="/account/details"
            class="flex content-center items-center rounded-tl-xl border-b-2 border-neutral-300 py-4 px-10 align-middle font-medium hover:bg-neutral-300"
            active-class="bg-neutral-300"
          >
            <User class="mr-2 h-6 w-6" />
            <p class="align-middle">Account Details</p>
          </router-link>
          <router-link
            to="/account/order-history"
            class="flex content-center items-center rounded-tl-xl border-b-2 border-neutral-300 py-4 px-10 align-middle font-medium hover:bg-neutral-300"
            active-class="bg-neutral-300"
          >
            <History class="mr-2 h-6 w-6" />
            <p class="align-middle">Previous Orders</p>
          </router-link>
          <template v-if="isAdmin">
            <router-link
              to="/account/admin/manage-users"
              class="flex content-center items-center rounded-tl-xl border-b-2 border-neutral-300 py-4 px-10 align-middle font-medium hover:bg-neutral-300"
              active-class="bg-neutral-300"
            >
              <Settings class="mr-2 h-6 w-6" />
              <p class="align-middle">Manage Users</p>
            </router-link>
            <router-link
              to="/account/admin/manage-pizzas"
              class="flex content-center items-center rounded-tl-xl border-b-2 border-neutral-300 py-4 px-10 align-middle font-medium hover:bg-neutral-300"
              active-class="bg-neutral-300"
            >
              <Settings class="mr-2 h-6 w-6" />
              <p class="align-middle">Manage Pizzas</p>
            </router-link>
            <router-link
              to="/account/admin/manage-toppings"
              class="flex content-center items-center rounded-tl-xl border-b-2 border-neutral-300 py-4 px-10 align-middle font-medium hover:bg-neutral-300"
              active-class="bg-neutral-300"
            >
              <Settings class="mr-2 h-6 w-6" />
              <p class="align-middle">Manage Toppings</p>
            </router-link>
          </template>
        </div>
        <div class="w-full">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import useUser from '../../composables/useUser'
import { User, History, Settings } from 'lucide-vue-next'
export default {
  components: {
    User,
    History,
    Settings,
  },
  setup() {
    const { user, Role } = useUser()

    return {
      isAdmin: user.value?.role === Role.ADMIN,
    }
  },
}
</script>
