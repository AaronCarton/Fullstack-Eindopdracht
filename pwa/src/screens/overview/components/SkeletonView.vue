<template>
  <div class="col-span-1 row-span-5 row-start-auto flex aspect-square flex-col rounded-lg bg-white">
    <div class="relative h-40">
      <div
        class="h-full w-full animate-pulse rounded-t-lg bg-neutral-300 object-cover object-top"
      ></div>
    </div>
    <div class="flex grow flex-col p-3">
      <div class="mb-2 h-8 w-full animate-pulse bg-neutral-300"></div>
      <div class="mb-6 h-4 w-full animate-pulse bg-neutral-300"></div>

      <div class="h-8 w-full animate-pulse bg-neutral-300"></div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  setup() {
    return {}
  },
}
</script>

<style>
@keyframes pulse {
  50% {
    opacity: 0.75;
  }
}
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
