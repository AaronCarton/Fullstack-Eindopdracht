<template>
  <div class="h-full overflow-y-hidden bg-[url(/HomeBG.jpg)] sm:bg-auto">
    <div class="bg-opacity-65 min-h-screen bg-black py-6 px-12 sm:px-60">
      <div class="grid-rows-10 grid h-screen grid-cols-4 gap-6">
        <router-view class="h-[90vh]" />
        <Cart class="row-end-8 col-start-4 row-start-1" />
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
