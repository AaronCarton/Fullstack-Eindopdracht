<template>
  <div class="h-screen w-screen overflow-y-auto bg-[url(/HomeBG.jpg)] sm:bg-auto">
    <div
      class="bg-opacity-65 mx-auto flex h-full w-screen items-center bg-black px-4 sm:px-10 md:px-10 lg:px-10 xl:px-36"
    >
      <div class="grid-rows-10 grid h-[90vh] w-full grid-cols-3 gap-8 xl:grid-cols-5">
        <!-- ? :key="$route.fullPath" forces rerender, even when only the param of a path changes -->
        <!-- ? like switching between cart items -->
        <transition
          name="slide-right"
          mode="out-in"
          :enter-active-class="route.meta.enterClass"
          :leave-active-class="route.meta.leaveClass"
        >
          <router-view
            v-slot="{ Component, route }"
            class="col-span-2 h-[90vh] lg:col-span-4"
            :key="$route.path"
          >
            <component :is="Component" />
          </router-view>
        </transition>
        <Cart class="row-end-8 col-start-5 row-start-1" />
        <CartButton />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useRoute } from 'vue-router'
import Cart from '../../components/generic/Cart.vue'
import CartButton from '../overview/components/CartButton.vue'

export default {
  components: {
    Cart,
    CartButton,
  },
  setup() {
    const route = useRoute()
    return {
      route,
    }
  },
}
</script>
