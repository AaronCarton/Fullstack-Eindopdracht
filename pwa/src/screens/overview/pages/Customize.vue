<template>
  <div class="col-start-1 col-end-4 row-start-1 row-end-5 rounded-lg bg-white">
    <div v-if="pizza" class="">
      <div class="">
        {{ pizza.name }}
      </div>
    </div>
    <div v-else>Not Found</div>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useQuery } from '@vue/apollo-composable'

import { PIZZA } from '../../../graphql/query.pizza'
import Pizza from '../../../interfaces/pizza.interface'

export default {
  setup() {
    const { params } = useRoute()
    const { result, loading, error } = useQuery(PIZZA, {
      id: params.id,
    })
    const pizza = computed(() => (result.value?.pizza as Pizza) ?? undefined)

    return {
      pizza,

      result,
      loading,
      error,
    }
  },
}
</script>
