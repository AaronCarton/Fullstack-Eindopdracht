<template>
  <div class="flex items-center justify-between">
    <h2 class="justify-self-start text-xl font-medium">{{ item.name }}</h2>
    <!-- TODO calculate price -->
    <p class="self-end justify-self-end text-xl">€{{ priceItem(item) }}</p>
  </div>
  <div>
    <div class="flex justify-between">
      <template v-if="type === 'items'">
        <p class="whitespace-nowrap align-middle text-sm font-medium capitalize text-neutral-400">
          {{ (item as Pizza).size }} {{ (item as Pizza).type }}
        </p>
      </template>
      <div class="flex gap-3">
        <Edit class="h-4 w-4 cursor-pointer" @click="editItem(id, item, type)" />
        <Delete class="h-4 w-4 cursor-pointer text-red-700" @click="deleteItem(id, item, type)" />
      </div>
    </div>
    <template v-if="type === 'items'">
      <p
        v-if="(item as Pizza).toppings.filter((t) => t.default === false).length > 0"
        class="align-middle text-sm font-medium text-neutral-400"
      >
        <span class="align-baseline text-xl leading-none text-green-500">+</span>
        {{
          // filter out the base topping, map the names, and count the duplicates
          countDuplicates(
            (item as Pizza).toppings.filter((t) => t.default === false).map((t) => t.name),
          )
            // map  [ [ "Olive", 3 ], [ "Spicy meat", 2 ], [ "Mushroom", 1 ] ]
            // to "3x Olive, 2x Spicy meat, Mushroom"
            .map((t) => (t[1] > 1 ? `${t[1]}x ${t[0]}` : t[0]))
            .join(', ')
        }}
      </p>
    </template>
  </div>
</template>

<script lang="ts">
import { countDuplicates } from '../../bootstrap/utils'
import Pizza from '../../interfaces/pizza.interface'
import ExtraItem from '../../interfaces/extraItem.interface'
import useCart from '../../composables/useCart'
import { useRoute } from 'vue-router'
import { computed } from '@vue/reactivity'

export default {
  props: {
    type: {
      type: String as () => 'items' | 'extras',
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    item: {
      type: Object as () => Pizza | ExtraItem,
      required: true,
    },
    editItem: {
      type: Function,
      required: true,
    },
    deleteItem: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    //Calculate price of cart item based on size , type and toppings
    const priceItem = (item: any) => {
      let price = item.basePrice
      if (item.type === 'cheesyCrust') price += 5

      if (item.size === 'small') price -= 3
      else if (item.size === 'large') price += 3
      //@ts-ignore
      return item.toppings.reduce((total, t) => total + t.price, price).toFixed(2)
    }

    return {
      priceItem,
      countDuplicates,
    }
  },
}
</script>
