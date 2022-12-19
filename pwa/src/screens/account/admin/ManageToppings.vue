<template>
  <template v-if="toppings.length > 0">
    <div class="flex h-full w-full flex-wrap gap-4 overflow-y-scroll p-5">
      <ToppingCard class="h-fit w-1/4" v-for="topping in toppings" :topping="topping" />
    </div>
  </template>
  <template v-else>
    <p class="mt-20 text-center text-2xl font-semibold text-white">No items found</p>
  </template>
</template>

<script lang="ts">
import { Ref, ref } from 'vue-demi'
import { useQuery } from '@vue/apollo-composable'

import ToppingCard from './components/ToppingCard.vue'
import { TOPPINGS } from '../../../graphql/query.topping'
import Topping from '../../../interfaces/topping.interface'
import useCart from '../../../composables/useCart'

export default {
  components: {
    ToppingCard,
  },
  setup() {
    const toppings: Ref<Topping[]> = ref([])
    const { loadToppings } = useCart()
    const { result, loading, onResult } = useQuery(TOPPINGS)

    onResult((result) => {
      toppings.value = result.data.toppings
      loadToppings() // reload toppings
    })

    return { result, loading, toppings }
  },
}
</script>
