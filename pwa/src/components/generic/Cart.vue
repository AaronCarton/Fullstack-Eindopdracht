<template>
  <div class="hidden flex-col justify-between rounded-lg bg-neutral-50 p-3 lg:flex">
    <div class="">
      <div class="flex items-center justify-between">
        <h2 class="text-2xl font-semibold">Order</h2>
        <a class="font-medium capitalize">{{ deliveryType }}</a>
      </div>
      <div v-for="{ id, item } in cart" class="w-full py-4 px-2">
        <div class="flex items-center justify-between">
          <h2 class="justify-self-start text-xl font-medium">{{ item.name }}</h2>
          <!-- TODO calculate price -->
          <p class="self-end justify-self-end text-xl">€168.99</p>
        </div>
        <div>
          <div class="flex justify-between">
            <p
              class="whitespace-nowrap align-middle text-sm font-medium capitalize text-neutral-400"
            >
              {{ item.size }} {{ item.type }}
            </p>
            <!-- TODO: add edit and delete button -->
            <div class="flex gap-3">
              <Edit class="h-4 w-4 cursor-pointer" @click="editItem(id, item)" />
              <Delete class="h-4 w-4 cursor-pointer text-red-700" @click="deleteItem(id, item)" />
            </div>
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
      <button
        class="w-full rounded-lg bg-red-700 px-6 py-2 font-bold text-neutral-50 active:bg-red-800"
      >
        Checkout
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import useCart from '../../composables/useCart'
import { Trash as Delete, Pencil as Edit } from 'lucide-vue-next'
import { countDuplicates } from '../../bootstrap/utils'
import { useRoute, useRouter } from 'vue-router'
import { computed } from '@vue/reactivity'
import { search } from 'superagent'

export default {
  components: {
    Delete,
    Edit,
  },
  setup() {
    const { cart, removeFromCart } = useCart()
    const { push } = useRouter()
    const route = useRoute()

    // TODO: get cart from localstorage
    const searchQuery = computed(() => route.query)

    const editItem = (id: string, item: any) => {
      push({
        name: 'customize',
        params: { id: item.id },
        query: { item: id, type: searchQuery.value.type },
      })
    }

    const deleteItem = (id: string, item: any) => {
      const isCurrentItem = searchQuery.value.item == id
      removeFromCart(id)
      // TODO: remove from localstorage

      if (isCurrentItem) {
        push({
          path: '/overview',
          query: { ...searchQuery.value, item: undefined },
        })
      }
    }

    return {
      cart,
      deliveryType: searchQuery.value.type,

      editItem,
      deleteItem,
      countDuplicates,
    }
  },
}
</script>
