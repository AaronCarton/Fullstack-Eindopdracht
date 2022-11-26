<template>
  <div>
    <OverviewNav
      class="col-start-1 col-end-5 row-start-1 row-end-1 flex h-14 w-full items-center"
    />
    <div class="col-span-4 row-span-2 row-start-2 p-3">
      <div
        v-if="pizzas"
        class="grid-rows-auto grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        <Card v-for="p of pizzas" :key="p.id" :pizza="p" />
      </div>
      <div v-else>
        <div class="col-span-3">
          <p class="text-center text-2xl font-semibold">Loading...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { PIZZAS } from '../../../graphql/query.pizza'
import Pizza from '../../../interfaces/pizza.interface'

import Card from '../components/Card.vue'
import OverviewNav from '../components/OverviewNav.vue'

export default {
  components: {
    OverviewNav,
    Card,
  },
  setup() {
    const { result, loading, error } = useQuery(PIZZAS)

    const pizzas = computed(() => (result.value?.pizzas as Pizza[]) ?? [])

    return {
      result,
      loading,
      error,

      pizzas,
    }
  },
}
</script>
