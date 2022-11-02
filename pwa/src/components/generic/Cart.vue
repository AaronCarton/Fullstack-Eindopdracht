<template>
  <div class="hidden flex-col justify-between rounded-lg bg-neutral-50 p-3 sm:flex">
    <div class="">
      <h2 class="text-2xl font-semibold">Order</h2>
      <div v-for="{ item } in cart" class="w-full py-4 px-2">
        <div class="flex items-center justify-between">
          <h2 class="justify-self-start text-xl font-medium">{{ item.name }}</h2>
          <!-- TODO calculate price -->
          <p class="self-end justify-self-end text-xl">€168.99</p>
        </div>
        <div>
          <div class="flex">
            <p
              class="whitespace-nowrap align-middle text-sm font-medium capitalize text-neutral-400"
            >
              {{ item.size }} {{ item.type }}
            </p>
            <!-- TODO: add edit and delete button -->
            <!-- <div>Edit | Delete</div> -->
          </div>
          <p
            v-if="item.toppings.filter((t) => t.default === false).length > 0"
            class="align-middle text-sm font-medium text-neutral-400"
          >
            <span class="align-baseline text-xl leading-none text-green-500">+</span>
            {{
              // filter out the base topping, map the names, and count the duplicates
              countDuplicates(item.toppings.filter((t) => t.default === false).map((t) => t.name))
                // map  [ [ "Olive", 3 ], [ "Spicy meat", 2 ], [ "Mushroom", 1 ] ]
                // to "3x Olive, 2x Spicy meat, Mushroom"
                .map((t) => (t[1] > 1 ? `${t[1]}x ${t[0]}` : t[0]))
                .join(', ')
            }}
          </p>
        </div>
      </div>
    </div>
    <div class="flex flex-col justify-end">
      <div class="mb-3 flex w-full justify-between rounded-lg bg-neutral-200 p-3">
        <p class="text-xl font-bold">Total price</p>
        <!-- TODO calculate price -->
        <p class="text-xl">€168.99</p>
      </div>
      <button class="w-full rounded-lg bg-red-700 px-6 py-2 font-bold text-neutral-50">
        Checkout
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import useCart from '../../composables/useCart'
import { countDuplicates } from '../../bootstrap/utils'

export default {
  setup() {
    const { cart } = useCart()

    return { cart, countDuplicates }
  },
}
</script>
