<template>
  <div class="row-span-5 row-start-auto rounded-lg bg-white">
    <div class="h-40">
      <img
        :src="`/pizzas/${pizza.name}.jpg`"
        :alt="`image of ${pizza.name} pizza`"
        class="h-full w-full rounded-t-lg object-cover"
      />
    </div>
    <div class="flex flex-col p-3">
      <p class="mb-2 text-2xl font-semibold">{{ pizza.name }}</p>

      <p class="mb-6 h-10 overflow-hidden text-sm font-semibold text-neutral-400">
        {{
          pizza.toppings
            .map((t) => t.name)
            .toString()
            .split(',')
            .join(', ')
        }}
      </p>
      <div class="flex items-center justify-between">
        <p class="text-xl font-semibold">€{{ pizza.totalPrice }}</p>
        <button
          @click="addItem(pizza)"
          class="self-center rounded-lg bg-red-700 px-6 py-2 font-bold text-neutral-50"
        >
          Add
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useRoute, useRouter } from 'vue-router'
import useCart from '../../../composables/useCart'
import Pizza from '../../../interfaces/pizza.interface'

export default {
  props: {
    pizza: {
      type: Object as () => Pizza,
      required: true,
    },
  },
  setup() {
    const { push } = useRouter()
    const { query } = useRoute()
    const { cart, addToCart } = useCart()

    const addItem = (pizza: Pizza) => {
      // TODO: update cart to localstorage
      const item = addToCart(pizza)
      push({
        name: 'customize',
        params: { id: pizza.id },
        query: { item: item.id, ...query },
      })
    }

    return { addItem }
  },
}
</script>
