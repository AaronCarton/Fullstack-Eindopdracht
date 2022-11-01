<template>
  <div class="col-span-3 grid grid-cols-5 rounded-lg bg-neutral-100">
    <template v-if="pizza">
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
      <div class="col-span-3 p-2">
        <div class="flex flex-col">
          <div class="my-3">
            <h3 class="mb-1.5 font-medium">Size</h3>
            <ButtonGroup
              :onClick="handleSize"
              :group="'size'"
              :names="['Small', 'Medium', 'Large']"
            />
          </div>
          <div class="my-3">
            <h3 class="mb-1.5 font-medium">Type</h3>
            <ButtonGroup
              :onClick="handleType"
              :group="'type'"
              :names="['Classic', 'Pan', 'Cheesy Crust']"
            />
          </div>
        </div>

        <div class="my-3">
          <h3 class="mb-1.5 font-medium">Toppings</h3>
          <div class="flex flex-col">
            <ToppingItem
              v-for="topping in toppings"
              :key="topping.id"
              :topping="topping"
              :onClick="handleTopping"
            />
          </div>
        </div>
      </div>
    </template>
    <template v-else>Not Found</template>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useQuery } from '@vue/apollo-composable'
import { ArrowLeft as Back } from 'lucide-vue-next'

import ButtonGroup from '../components/ButtonGroup.vue'
import ToppingItem from '../components/ToppingItem.vue'
import { PIZZA } from '../../../graphql/query.pizza'
import Pizza from '../../../interfaces/pizza.interface'
import { TOPPINGS } from '../../../graphql/query.topping'
import Topping from '../../../interfaces/topping.interface'

export default {
  components: {
    Back,
    ButtonGroup,
    ToppingItem,
  },
  setup() {
    const { params } = useRoute()
    const { result: tRes } = useQuery(TOPPINGS)
    const { result: pRes } = useQuery(PIZZA, {
      id: params.id,
    })

    const pizza = computed(() => (pRes.value?.pizza as Pizza) ?? undefined)
    const toppings = computed(() => (tRes.value?.toppings as Topping[]) ?? [])

    const handleSize = (size: string) => {
      console.log(size)
    }

    const handleType = (type: string) => {
      console.log(type)
    }

    const handleTopping = (topping: string) => {
      console.log(topping)
    }

    return {
      pizza,
      toppings,

      handleSize,
      handleType,
      handleTopping,
    }
  },
}
</script>
