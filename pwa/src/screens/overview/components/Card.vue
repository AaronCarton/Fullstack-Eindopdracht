<template>
  <div class="max-h-120 row-start-auto rounded-lg bg-white">
    <div class="h-52">
      <img
        :src="`/pizzas/${pizza.name}.jpg`"
        :alt="`image of ${pizza.name} pizza`"
        class="h-full w-full rounded-t-lg object-cover"
      />
    </div>
    <div class="flex flex-col p-3">
      <p class="mb-2 text-2xl font-semibold">{{ pizza.name }}</p>

      <p class="mb-6 max-h-12 overflow-hidden font-semibold text-neutral-600">
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
          @click="addToCart(pizza)"
          class="self-center rounded-lg bg-red-700 px-6 py-2 font-bold text-neutral-50"
        >
          Add
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'
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

    const addToCart = (pizza: Pizza) => {
      // TODO: code to add pizza to cart

      push(`customize/${pizza.id}`)
    }

    return { addToCart }
  },
}
</script>
