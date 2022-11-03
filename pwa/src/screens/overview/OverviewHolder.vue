<template>
  <div class="h-full overflow-y-hidden bg-[url(/HomeBG.jpg)] sm:bg-auto">
    <div class="bg-opacity-65 min-h-screen bg-black py-6 sm:px-48 md:px-60">
      <div class="grid-rows-10 grid h-screen grid-cols-4 gap-6">
        <!-- ? :key="$route.fullPath" forces rerender, even when only the param of a path changes -->
        <!-- ? like switching between cart items -->
        <router-view class="h-[90vh]" :key="$route.fullPath" />
        <Cart class="row-end-8 col-start-4 row-start-1" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Cart from '../../components/generic/Cart.vue'
export default {
  components: {
    Cart,
  },
}
</script>

<style></style>
