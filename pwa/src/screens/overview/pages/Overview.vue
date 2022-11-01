<template>
  <OverviewNav class="col-start-1 col-end-4 row-start-1 row-end-1 flex items-center" />
  <div class="col-span-4 col-start-1 col-end-3 row-span-2 row-start-2 p-3 sm:col-span-3">
    <div class="grid grid-cols-3 gap-7">
      <template v-if="pizzas">
        <Card v-for="p of pizzas" :key="p.id" :pizza="p" />
      </template>
      <template v-else>
        <div class="col-span-3">
          <p class="text-center text-2xl font-semibold">Loading...</p>
        </div>
      </template>
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
