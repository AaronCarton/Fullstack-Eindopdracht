<template>
  <div
    @click="onClick(topping)"
    :class="`mb-1 flex ${
      topping.stock <= 0 && type === 'add' ? 'cursor-not-allowed' : 'cursor-pointer'
    } items-center justify-between rounded-lg bg-neutral-200 px-4 py-4`"
  >
    <div class="flex content-center items-center gap-3">
      <img :src="`/assets/toppings/${topping.name}.png`" alt="" class="h-6 w-6" />
      <a class="font-semibold">{{ topping.name }}</a>
      <template v-if="type === 'remove' && topping.default === false">
        <a class="opacity-50">+{{ topping.price }}</a>
      </template>
      <template v-if="type === 'add'">
        <a class="opacity-50">+{{ topping.price }}</a>
      </template>
      <template v-if="type === 'add' && topping.stock <= 5">
        <a class="mt-0.5 text-sm font-bold text-red-600">{{
          topping.stock <= 0 ? 'Out of stock' : `only ${topping.stock} left`
        }}</a>
      </template>
    </div>
    <div v-if="type === 'add'">
      <add class="h-6 w-6 fill-neutral-900" />
    </div>
    <div v-if="type === 'remove' && topping.default === false">
      <remove class="h-6 w-6 fill-neutral-900" />
    </div>
  </div>
</template>

<script lang="ts">
import Topping from '../../../interfaces/topping.interface'
import { Plus as add, X as remove } from 'lucide-vue-next'
export default {
  components: {
    add,
    remove,
  },

  props: {
    topping: {
      type: Object as () => Topping,
      required: true,
    },
    onClick: {
      type: Function,
      required: true,
    },
    type: {
      type: String as () => 'add' | 'remove',
      required: true,
    },
  },
}
</script>
