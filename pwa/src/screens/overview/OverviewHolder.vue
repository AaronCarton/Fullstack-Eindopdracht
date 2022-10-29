<template>
  <div class="bg-[url(/HomeBG.jpg)] sm:bg-cover">
    <div class="bg-opacity-65 min-h-screen bg-black py-6 px-12 sm:px-60">
      <div class="grid-rows-auto grid grid-cols-4 gap-6">
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
