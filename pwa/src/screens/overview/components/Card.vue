<template>
  <div class="col-span-1 row-span-5 row-start-auto flex flex-col rounded-lg bg-white">
    <div class="relative h-40">
      <template v-if="outOfStock">
        <div
          class="absolute flex h-full w-full items-center justify-center rounded-t-lg bg-gray-800 bg-opacity-80"
        >
          <p class="text-2xl font-medium text-neutral-100">Out of Stock</p>
        </div>
      </template>
      <img
        :src="`/${isPizza(item) ? 'pizza' : item.category}s/${item.name}.jpg`"
        class="h-full w-full rounded-t-lg object-cover object-top"
      />
    </div>
    <div class="flex grow flex-col p-3">
      <p class="mb-2 text-2xl font-semibold">{{ item.name }}</p>

      <p class="mb-6 overflow-hidden text-sm font-semibold text-neutral-400">
        {{
          isPizza(item)
            ? item.toppings
                .map((t) => t.name)
                .toString()
                .split(',')
                .join(', ')
            : item.description
        }}
      </p>

      <div class="mt-auto flex items-center justify-between">
        <p class="text-xl font-semibold">
          €{{
            (isPizza(item)
              ? item.toppings.reduce((total, t) => total + t.price, item.basePrice)
              : item.price
            ).toFixed(2)
          }}
        </p>
        <button
          :disabled="outOfStock"
          @click="addItem(item)"
          class="self-center rounded-lg bg-red-700 px-6 py-2 font-bold text-neutral-50 disabled:opacity-50"
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
import ExtraItem from '../../../interfaces/extraItem.interface'
import Pizza, { isPizza } from '../../../interfaces/pizza.interface'

export default {
  props: {
    item: {
      type: Object as () => Pizza | ExtraItem,
      required: true,
    },
  },
  setup(props) {
    const { push } = useRouter()
    const { query } = useRoute()
    const { cart, addToCart } = useCart()

    const addItem = (item: Pizza | ExtraItem) => {
      const cartItem = addToCart(item)
      if (isPizza(item))
        push({
          name: 'customize',
          params: { id: item.id },
          query: { item: cartItem.id, ...query },
        })
    }

    const outOfStock = isPizza(props.item)
      ? props.item.toppings.some((t) => t.stock === 0)
      : props.item.stock === 0

    return {
      isPizza,
      addItem,
      outOfStock,
    }
  },
}
</script>
