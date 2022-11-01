<template>
  <div class="hidden flex-col justify-between rounded-lg bg-neutral-50 p-3 sm:flex">
    <div class="">
      <h2 class="text-2xl font-semibold">Order</h2>
      <div class="flex w-full items-center justify-between p-4">
        <p class="text-xl">1x</p>
        <h2 class="justify-self-start text-xl font-bold">Margherita</h2>
        <p class="self-end justify-self-end text-xl">€16.99</p>
      </div>
    </div>
    <div class="flex flex-col justify-end">
      <div class="mb-3 flex w-full justify-between rounded-lg bg-neutral-200 p-3">
        <p class="text-xl font-bold">Total price</p>
        <p class="text-xl">€16.99</p>
      </div>
      <button class="w-full rounded-lg bg-red-700 px-6 py-2 font-bold text-neutral-50">
        Checkout
      </button>
    </div>
  </div>
</template>

<script>
export default {}
</script>
