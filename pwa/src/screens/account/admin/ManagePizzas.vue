<template>
  <template v-if="pizzas.length > 0">
    <div class="flex h-full w-full justify-center gap-7 overflow-y-scroll p-5">
      <EditCard class="h-fit w-1/4" v-for="pizza in pizzas" :pizza="pizza" />
    </div>
  </template>
  <template v-else>
    <p class="mt-20 text-center text-2xl font-semibold text-white">No items found</p>
  </template>
</template>

<script lang="ts">
import { Ref, ref } from 'vue-demi'
import { useQuery } from '@vue/apollo-composable'

import EditCard from './components/EditCard.vue'
import { PIZZAS } from '../../../graphql/query.pizza'
import Pizza from '../../../interfaces/pizza.interface'

export default {
  components: {
    EditCard,
  },
  setup() {
    const pizzas: Ref<Pizza[]> = ref([])
    const { result, loading, onResult } = useQuery(PIZZAS)

    onResult((result) => {
      pizzas.value = result.data.pizzas
    })

    return { result, loading, pizzas }
  },
}
</script>
