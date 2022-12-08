<template>
  <div class="col-span-4 grid grid-cols-5 rounded-lg bg-neutral-100">
    <template v-if="pizza && orderItem">
      <div class="relative col-span-2">
        <div
          class="absolute flex h-10 w-10 items-center rounded-tl-lg rounded-br-lg bg-neutral-100 p-2"
        >
          <Back class="stroke-2.5 absolute h-7 w-7 cursor-pointer" @click="goBack()" />
        </div>
        <img
          :src="`/assets/pizzas/${pizza.name}.jpg`"
          :alt="`image of ${pizza.name} pizza`"
          class="h-full w-full rounded-l-lg object-cover object-left"
        />
      </div>
      <div class="col-span-3 m-3 flex flex-col overflow-hidden px-4 py-3">
        <a class="mb-3 text-3xl font-bold">{{ pizza.name }}</a>
        <div class="mt-3 mb-6 flex flex-row gap-14 md:flex-col md:gap-6">
          <div>
            <h3 class="mb-6 text-2xl font-semibold">Size</h3>

            <ButtonGroup
              :onClick="handleSize"
              :group="'size'"
              :names="Object.values(PizzaSize)"
              :value="orderItem.item.size"
            />
          </div>
          <div class="">
            <h3 class="mb-6 text-2xl font-semibold">Type</h3>
            <ButtonGroup
              :onClick="handleType"
              :group="'type'"
              :names="Object.values(PizzaType)"
              :value="orderItem.item.type"
            />
          </div>
        </div>
        <div class="flex flex-col overflow-y-scroll">
          <!-- TODO add overflow to this nested div instead of full parent div -->
          <div class="mb-4">
            <h3 class="mb-4 text-2xl font-semibold">Toppings</h3>
            <div class="">
              <!-- TODO: Sort by category and by name so adding/removing is less jarring -->
              <ToppingItem
                v-for="topping in orderItem.item.toppings"
                :key="topping.id"
                :topping="topping"
                :onClick="handleToppingRemove"
                :type="'remove'"
              />
            </div>
          </div>
          <div class="mb-4">
            <h3 class="mb-4 text-2xl font-semibold">Extra Toppings</h3>
            <div class="">
              <!-- TODO: Sort by category and by name so adding/removing is less jarring -->
              <ToppingItem
                v-for="topping in allToppings"
                :key="topping.id"
                :topping="topping"
                :onClick="handleToppingAdd"
                :type="'add'"
              />
            </div>
          </div>
        </div>
        <button
          @click="goBack()"
          class="mx-auto mt-3 w-3/5 rounded-lg bg-red-700 px-6 py-2 font-bold text-neutral-50 active:bg-red-800"
        >
          Add to Cart
        </button>
      </div>
    </template>
    <template v-else>Not Found</template>
  </div>
</template>

<script lang="ts">
import { computed, ref, Ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuery } from '@vue/apollo-composable'
import { ArrowLeft as Back, X as Remove } from 'lucide-vue-next'

import useCart from '../../../composables/useCart'
import ButtonGroup from '../components/ButtonGroup.vue'
import ToppingItem from '../components/ToppingItem.vue'

import { PIZZA } from '../../../graphql/query.pizza'
import Pizza, { PizzaSize, PizzaType } from '../../../interfaces/pizza.interface'
import { TOPPINGS } from '../../../graphql/query.topping'
import Topping from '../../../interfaces/topping.interface'
import { useToast } from 'vue-toastification'
import { CartItem } from '../../../interfaces/cart.interface'

export default {
  components: {
    Remove,
    Back,
    ButtonGroup,
    ToppingItem,
  },
  setup() {
    const pizza: Ref<Pizza | undefined> = ref()
    const { allToppings, findItem, updateCartItem } = useCart()
    const toast = useToast()
    const { push } = useRouter()
    const { params, query } = useRoute()
    const { result: pRes } = useQuery(PIZZA, {
      id: params.id,
    })

    const orderItem = computed(() => findItem('items', `${query.item}`) as CartItem | undefined)

    watch(pRes, (res: any) => {
      pizza.value = res.pizza as Pizza
    })

    const goBack = () => {
      push({ path: '/overview', query: { type: query.type } })
    }

    const handleSize = (size: PizzaSize) => {
      updateCartItem(`${query.item}`, (cartItem) => ({
        ...cartItem,
        item: {
          ...cartItem.item,
          size,
        },
      }))
    }

    const handleType = (type: PizzaType) => {
      updateCartItem(`${query.item}`, (cartItem) => ({
        ...cartItem,
        item: {
          ...cartItem.item,
          type,
        },
      }))
    }

    const handleToppingAdd = (t: Topping) => {
      if (t.stock <= 0) return
      // max 7 toppings
      if (orderItem.value!.item.toppings.length >= 5)
        return toast.warning('Only a maximum of 5 toppings are allowed')
      const topping = { ...t, default: false }
      // add topping to cart item
      updateCartItem(`${query.item}`, (cartItem) => ({
        ...cartItem,
        item: {
          ...cartItem.item,
          toppings: [...cartItem.item.toppings, topping],
        },
      }))
      if (pizza.value) {
        pizza.value = {
          ...pizza.value,
          toppings: [...pizza.value.toppings, topping],
        }
      }
    }

    const handleToppingRemove = (t: Topping) => {
      if (t.default === false) {
        // remove topping from cart item
        updateCartItem(`${query.item}`, (cartItem) => {
          // filter out topping (once)
          const index = cartItem.item.toppings.lastIndexOf(t)
          const toppings = [...cartItem.item.toppings]
          toppings.splice(index, 1)
          return {
            ...cartItem,
            item: {
              ...cartItem.item,
              toppings,
            },
          }
        })
      }
      // if (pizza.value) {
      //   pizza.value = {
      //     ...pizza.value,
      //     toppings: pizza.value.toppings.filter((topping) => topping.id !== t.id),
      //   }
      // }
    }

    return {
      pizza,
      orderItem,
      allToppings,
      PizzaSize,
      PizzaType,

      goBack,
      handleSize,
      handleType,
      handleToppingAdd,
      handleToppingRemove,
    }
  },
}
</script>
