<template>
  <div class="h-fulln overflow-y-hidden bg-[url(/HomeBG.jpg)] sm:bg-auto">
    <div class="bg-opacity-65 max-h-screen bg-black py-6 px-12 sm:px-60">
      <div class="grid-rows-12 grid max-h-screen grid-cols-4 gap-6">
        <router-view />
        <Cart />
      </div>
    </div>
  </div>
</template>

<script>
import Cart from '../../components/generic/Cart.vue'
export default {
  components: {
    Cart,
  },
}
</script>

<style></style>
