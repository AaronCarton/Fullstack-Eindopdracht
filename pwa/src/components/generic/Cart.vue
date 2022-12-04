<template>
  <div class="z-50 hidden flex-col justify-between rounded-lg bg-neutral-50 p-3 lg:flex">
    <div class="overflow-hidden">
      <div class="flex items-center justify-between">
        <h2 class="text-2xl font-semibold">Order</h2>
        <div class="flex items-center gap-2">
          <a class="font-medium capitalize">{{ deliveryType }}</a>
          <template v-if="deliveryType === 'takeaway'">
            <Home class="h-5 w-5" />
          </template>
          <template v-else>
            <Car class="h-6 w-6" />
          </template>
        </div>
      </div>
      <div v-auto-animate class="scrollbar_cart h-[90%] overflow-y-auto overflow-x-hidden">
        <div v-for="{ id, item } in cart.items" class="w-full py-4 px-2">
          <CartItem
            :key="id"
            type="items"
            :id="id"
            :item="item"
            :edit-item="editItem"
            :delete-item="deleteItem"
          />
        </div>
        <div v-for="{ id, item } in cart.extras" class="w-full py-4 px-2">
          <CartItem
            :key="id"
            type="extras"
            :id="id"
            :item="item"
            :edit-item="editItem"
            :delete-item="deleteItem"
          />
        </div>
      </div>
    </div>
    <div class="flex flex-col justify-end">
      <div class="mb-3 flex w-full justify-between rounded-lg bg-neutral-200 p-3">
        <p class="text-xl font-bold">Total price</p>
        <!-- TODO calculate price -->
        <p class="text-xl">€{{ getCartTotal() }}</p>
      </div>
      <button
        class="focus-visible::ring-2 w-full rounded-lg bg-red-700 px-6 py-2 text-center font-bold text-neutral-50 hover:bg-red-800 focus:outline-none focus-visible:ring-red-300"
        @click="checkout"
      >
        Checkout
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { vAutoAnimate } from '@formkit/auto-animate'
import useCart from '../../composables/useCart'
import { Trash as Delete, Pencil as Edit, Home, Car } from 'lucide-vue-next'
import { useRoute, useRouter } from 'vue-router'
import { computed } from '@vue/reactivity'

import CartItem from './CartItem.vue'
import ExtraItem from '../../interfaces/extraItem.interface'
import Pizza, { isPizza } from '../../interfaces/pizza.interface'

export default {
  components: {
    Car,
    Home,
    Delete,
    Edit,
    CartItem,
  },
  setup() {
    const { cart, removeFromCart, getCartTotal, getCartItemPrice } = useCart()
    const { push } = useRouter()
    const route = useRoute()

    const searchQuery = computed(() => route.query)

    const isNotPayment = computed(() => route.name != 'overview/payment')

    const checkout = () => {
      push({
        name: 'payment',
        query: {
          ...searchQuery.value,
        },
      })
    }

    const editItem = (id: string, item: Pizza | ExtraItem) => {
      if (isPizza(item))
        push({
          name: 'customize',
          params: { id: item.id },
          query: { item: id, type: searchQuery.value.type },
        })
    }
    const deleteItem = (id: string, item: Pizza | ExtraItem) => {
      const isCurrentItem = searchQuery.value.item == id
      removeFromCart(isPizza(item) ? 'items' : 'extras', id)
      // TODO: remove from localstorage

      if (isCurrentItem) {
        push({
          path: '/overview',
          query: { ...searchQuery.value, item: undefined },
        })
      }
    }

    // const totalPrice = () => {
    //   return cart.value.reduce((acc, { item }) => acc + Number(priceItem(item)), 0).toFixed(2)
    // }

    return {
      cart,
      deliveryType: searchQuery.value.type,
      isNotPayment,
      editItem,
      deleteItem,
      getCartTotal,
      checkout,
    }
  },
}
</script>
