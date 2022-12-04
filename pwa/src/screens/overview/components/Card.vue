<template>
  <div class="col-span-1 row-span-5 row-start-auto rounded-lg bg-white">
    <div class="relative h-40">
      <template v-if="outOfStock()">
        <div
          class="absolute flex h-full w-full items-center justify-center rounded-t-lg bg-gray-800 bg-opacity-80"
        >
          <p class="text-2xl font-medium text-neutral-100">Out of Stock</p>
        </div>
      </template>
      <img
        :src="`/${type === 'items' ? 'pizza' : (item as ExtraItem).category}s/${item.name}.jpg`"
        class="h-full w-full rounded-t-lg object-cover object-top"
      />
    </div>
    <div class="flex flex-col p-3">
      <p class="mb-2 text-2xl font-semibold">{{ item.name }}</p>
      <template v-if="type === 'items'">
        <p class="mb-6 h-10 overflow-hidden text-sm font-semibold text-neutral-400">
          {{
            (item as Pizza).toppings
              .map((t) => t.name)
              .toString()
              .split(',')
              .join(', ')
          }}
        </p>
      </template>
      <div class="flex items-center justify-between">
        <p class="text-xl font-semibold">
          €{{
            type === 'items'
              ? (item as Pizza).toppings.reduce(
                  (total, t) => total + t.price,
                  (item as Pizza).basePrice,
                )
              : (item as ExtraItem).price
          }}
        </p>
        <button
          :disabled="outOfStock()"
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
import Pizza from '../../../interfaces/pizza.interface'

export default {
  props: {
    type: {
      type: String as () => 'items' | 'extras',
      required: true,
    },
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
      const cartItem = addToCart(props.type, item)
      if (props.type === 'items')
        push({
          name: 'customize',
          params: { id: item.id },
          query: { item: cartItem.id, ...query },
        })
    }

    const outOfStock = () => {
      if (props.type === 'items') {
        const item = props.item as Pizza
        return item.toppings.some((t) => t.stock === 0)
      } else {
        const item = props.item as ExtraItem
        return item.stock === 0
      }
    }
    return {
      addItem,
      outOfStock,
    }
  },
}
</script>
