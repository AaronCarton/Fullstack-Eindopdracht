<template>
  <div class="flex items-center justify-between">
    <h2 class="justify-self-start text-xl font-medium">{{ item.name }}</h2>
    <!-- TODO calculate price -->
    <p class="self-end justify-self-end text-xl">€{{ priceItem(item) }}</p>
  </div>
  <div>
    <div class="flex justify-between">
      <p class="whitespace-nowrap align-middle text-sm font-medium capitalize text-neutral-400">
        {{ isPizza(item) ? `${item.size} ${item.type}` : item.category }}
      </p>

      <div class="ml-auto flex gap-3">
        <Edit v-if="isPizza(item)" class="h-4 w-4 cursor-pointer" @click="editItem(id, item)" />
        <Delete class="h-4 w-4 cursor-pointer text-red-700" @click="deleteItem(id, item)" />
      </div>
    </div>
    <template v-if="isPizza(item)">
      <p
        v-if="item.toppings.filter((t) => t.default === false).length > 0"
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
import Pizza, { isPizza } from '../../interfaces/pizza.interface'
import { Pencil as Edit, Trash as Delete } from 'lucide-vue-next'
import ExtraItem, { isExtraItem } from '../../interfaces/extraItem.interface'

export default {
  props: {
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
  components: {
    Delete,
    Edit,
  },
  setup(props) {
    //Calculate price of cart item based on size , type and toppings
    const priceItem = (item: Pizza | ExtraItem) => {
      if (isPizza(item)) {
        let price = item.basePrice
        if (item.type === 'cheesyCrust') price += 5

        if (item.size === 'small') price -= 3
        else if (item.size === 'large') price += 3
        return item.toppings.reduce((total, t) => total + t.price, price).toFixed(2)
      } else {
        return item.price.toFixed(2)
      }
    }

    return {
      isPizza,
      isExtraItem,
      priceItem,
      countDuplicates,
    }
  },
}
</script>
