<template>
  <div class="col-span-3 grid grid-cols-5 rounded-lg bg-neutral-100">
    <template v-if="pizza && orderItem">
      <div class="relative col-span-2">
        <div class="absolute flex w-full rounded-tl-lg bg-neutral-50 bg-opacity-[85%] p-2">
          <Back class="absolute cursor-pointer" @click="$router.go(-1)" />
          <a class="mx-auto font-medium">{{ pizza.name }}</a>
        </div>
        <img
          :src="`/pizzas/${pizza.name}.jpg`"
          :alt="`image of ${pizza.name} pizza`"
          class="h-full w-full rounded-l-lg object-cover"
        />
      </div>
      <div class="col-span-3 m-3 overflow-auto">
        <div class="flex flex-col">
          <div class="my-3">
            <h3 class="mb-1.5 font-medium">Size</h3>
            <ButtonGroup
              :onClick="handleSize"
              :group="'size'"
              :names="Object.values(PizzaSize)"
              :value="orderItem.item.size"
            />
          </div>
          <div class="my-3">
            <h3 class="mb-1.5 font-medium">Type</h3>
            <ButtonGroup
              :onClick="handleType"
              :group="'type'"
              :names="Object.values(PizzaType)"
              :value="orderItem.item.type"
            />
          </div>
        </div>
        <div class="">
          <!-- TODO add overflow to this nested div instead of full parent div -->
          <div class="my-3">
            <h3 class="mb-1.5 font-medium">Toppings</h3>
            <div class="flex flex-col">
              <ToppingItem
                v-for="topping in pizza.toppings"
                :key="topping.id"
                :topping="topping"
                :onClick="handleToppingRemove"
              />
            </div>
          </div>
          <div class="my-3">
            <h3 class="mb-1.5 font-medium">Extra Toppings</h3>
            <div class="flex flex-col">
              <ToppingItem
                v-for="topping in allToppings"
                :key="topping.id"
                :topping="topping"
                :onClick="handleToppingAdd"
              />
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>Not Found</template>
  </div>
</template>

<script lang="ts">
import { computed, ref, Ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useQuery } from '@vue/apollo-composable'
import { ArrowLeft as Back } from 'lucide-vue-next'

import useCart from '../../../composables/useCart'
import ButtonGroup from '../components/ButtonGroup.vue'
import ToppingItem from '../components/ToppingItem.vue'

import { PIZZA } from '../../../graphql/query.pizza'
import Pizza, { PizzaSize, PizzaType } from '../../../interfaces/pizza.interface'
import { TOPPINGS } from '../../../graphql/query.topping'
import Topping from '../../../interfaces/topping.interface'

export default {
  components: {
    Back,
    ButtonGroup,
    ToppingItem,
  },
  setup() {
    const pizza: Ref<Pizza | undefined> = ref()
    const { findItem, updateCartItem } = useCart()
    const { params, query } = useRoute()
    const { result: tRes } = useQuery(TOPPINGS)
    const { result: pRes } = useQuery(PIZZA, {
      id: params.id,
    })

    const allToppings = computed(() => (tRes.value?.toppings as Topping[]) ?? [])

    watch(pRes, (res) => {
      pizza.value = res.pizza as Pizza
    })

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
      const topping = { ...t, default: false }
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
        console.log(pizza.value)
      }
    }

    const handleToppingRemove = (t: Topping) => {
      console.log(t)

      if (t.default) return
      updateCartItem(`${query.item}`, (cartItem) => ({
        ...cartItem,
        item: {
          ...cartItem.item,
          toppings: cartItem.item.toppings.filter((topping) => topping.id !== t.id),
        },
      }))
      if (pizza.value) {
        pizza.value = {
          ...pizza.value,
          toppings: pizza.value.toppings.filter((topping) => topping.id !== t.id),
        }
      }
    }

    return {
      pizza,
      orderItem: findItem(`${query.item}`),
      allToppings,
      PizzaSize,
      PizzaType,

      handleSize,
      handleType,
      handleToppingAdd,
      handleToppingRemove,
    }
  },
}
</script>
