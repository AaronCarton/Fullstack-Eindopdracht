<template>
  <div class="grid w-full grid-cols-2 grid-rows-2 gap-3 rounded-lg bg-neutral-50 p-3">
    <!--Payment methodes-->
    <div class="col-span-1 bg-neutral-200"></div>
    <!--Order summary-->
    <div class="col-span-1 bg-neutral-200">
      <p>{{}}</p>
    </div>
  </div>
</template>
<script lang="ts">
import useCart from '../../composables/useCart'
export default {
  setup() {
    const { cart } = useCart()
    return { cart }
  },
}
</script>
