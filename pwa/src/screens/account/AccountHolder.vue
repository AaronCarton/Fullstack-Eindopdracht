<template>
  <div class="main-bg flex min-h-screen place-items-center">
    <div class="bg-opacity-65 absolute z-0 min-h-screen w-full bg-black" />
    <div class="container z-10 mx-auto w-full">
      <div class="divide-x-3 flex h-[30rem] divide-neutral-300 rounded-xl bg-neutral-200 shadow-md">
        <div class="flex w-80 flex-col">
          <div class="absolute top-0 left-0 h-10 w-10">
            <button
              @click="closeAccountHolder"
              class="flex h-full w-full items-center justify-center rounded-br-lg bg-red-700 hover:bg-red-600"
            >
              <Back class="h-7 w-7 stroke-white" />
            </button>
          </div>
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
            <p class="align-middle">{{ $t('account.previousOrders') }}</p>
          </router-link>
          <template v-if="isDriver || isAdmin">
            <router-link
              to="/account/driver/deliver-order"
              class="flex content-center items-center rounded-tl-xl border-b-2 border-neutral-300 py-4 px-10 align-middle font-medium hover:bg-neutral-300"
              active-class="bg-neutral-300"
            >
              <Bike class="mr-2 h-6 w-6" />
              <p class="align-middle">{{ $t('account.deliverOrder') }}</p>
            </router-link>
          </template>
          <template v-if="isAdmin">
            <router-link
              to="/account/admin/manage-reviews"
              class="flex content-center items-center rounded-tl-xl border-b-2 border-neutral-300 py-4 px-10 align-middle font-medium hover:bg-neutral-300"
              active-class="bg-neutral-300"
            >
              <Star class="mr-2 h-6 w-6" />
              <p class="align-middle">{{ $t('account.reviews') }}</p>
            </router-link>
            <router-link
              to="/account/admin/manage-users"
              class="flex content-center items-center rounded-tl-xl border-b-2 border-neutral-300 py-4 px-10 align-middle font-medium hover:bg-neutral-300"
              active-class="bg-neutral-300"
            >
              <Settings class="mr-2 h-6 w-6" />
              <p class="align-middle">{{ $t('account.manageUsers') }}</p>
            </router-link>
            <router-link
              to="/account/admin/manage-pizzas"
              class="flex content-center items-center rounded-tl-xl border-b-2 border-neutral-300 py-4 px-10 align-middle font-medium hover:bg-neutral-300"
              active-class="bg-neutral-300"
            >
              <Settings class="mr-2 h-6 w-6" />
              <p class="align-middle">{{ $t('account.managePizzas') }}</p>
            </router-link>
            <router-link
              to="/account/admin/manage-toppings"
              class="flex content-center items-center rounded-tl-xl border-b-2 border-neutral-300 py-4 px-10 align-middle font-medium hover:bg-neutral-300"
              active-class="bg-neutral-300"
            >
              <Settings class="mr-2 h-6 w-6" />
              <p class="align-middle">{{ $t('account.manageToppings') }}</p>
            </router-link>
          </template>
          <div
            @click="handleLogout()"
            class="mt-auto flex cursor-pointer content-center items-center justify-center rounded-bl-xl border-t-2 border-neutral-300 py-4 px-10 align-middle font-medium hover:bg-neutral-300"
            data-cy="logout"
          >
            <LogOut class="mr-auto h-6 w-6 text-red-700" />
            <p class="mx-auto align-middle text-red-700">Logout</p>
          </div>
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
import { Star, User, History, Settings, Bike, ArrowLeft as Back, LogOut } from 'lucide-vue-next'
import useAuthentication from '../../composables/useAuthentication'
import { useRouter } from 'vue-router'
export default {
  components: {
    Back,
    Star,
    Bike,
    User,
    History,
    Settings,
    LogOut,
  },
  setup() {
    const router = useRouter()
    const { user, Role } = useUser()
    const { logout } = useAuthentication()

    const handleLogout = () => {
      logout()
      router.push('/')
    }

    const closeAccountHolder = () => {
      router.push('/')
    }

    return {
      handleLogout,
      isAdmin: user.value?.role === Role.ADMIN,
      isDriver: user.value?.role === Role.DRIVER,
      closeAccountHolder,
    }
  },
}
</script>
