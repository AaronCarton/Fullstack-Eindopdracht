<template>
  <div class="flex flex-col rounded-lg bg-white">
    <div class="relative h-40">
      <img
        :src="`/assets/pizzas/${pizza.name}.jpg`"
        class="h-full w-full rounded-t-lg object-cover object-top"
      />
    </div>
    <div class="flex grow flex-col p-3">
      <p class="mb-2 text-xl font-semibold">{{ pizza.name }}</p>
      <div class="mt-auto flex items-center justify-between">
        <button
          class="self-center rounded-lg bg-red-700 px-4 py-1 font-bold text-neutral-50 disabled:opacity-50"
        >
          Edit
        </button>
        <button
          class="self-center rounded-lg bg-red-700 p-2 font-bold text-neutral-50 disabled:opacity-50"
        >
          <Trash class="h-5 w-5" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Trash } from 'lucide-vue-next'

import Pizza from '../../../../interfaces/pizza.interface'

export default {
  props: {
    pizza: {
      type: Object as () => Pizza,
      required: true,
    },
  },
  components: {
    Trash,
  },
  setup() {
    return {}
  },
}
</script>
