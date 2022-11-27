<template>
  <template v-if="error">
    <div class="my-15 text-center">
      <h1 class="font-mono text-2xl font-medium">ORDER NOT FOUND</h1>
    </div>
  </template>
  <template v-else-if="order">
    <div class="flex flex-col gap-6 p-5 font-mono">
      <div>{{ order.id }}</div>
      <div>{{ order }}</div>
      <div>{{ JSON.stringify(driverPosition, null, 2) || 'Driver position not found' }}</div>
    </div>
  </template>
</template>

<script lang="ts">
import { watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import { computed } from '@vue/reactivity'
import { useQuery } from '@vue/apollo-composable'

import Order from '../../interfaces/order.interface'
import { GET_ORDER } from '../../graphql/query.orders'
import useTracking from '../../composables/useTracking'
import LiveLocation from '../../interfaces/live-location.interface'

export default {
  setup() {
    const driverPosition = ref<LiveLocation | null>(null)
    const { params } = useRoute()
    const { connectToServer, connected, trackOrder, socketServer } = useTracking()
    const { result, loading, error } = useQuery(GET_ORDER, {
      id: params.id,
    })

    connectToServer()
    trackOrder(params.id as string, (location: any) => {
      console.log('location received', location)
      driverPosition.value = location
    })

    const order = computed(() => (result.value?.order as Order) ?? [])
    watch(order, (val) => console.log(val))

    return {
      order,
      error,
      driverPosition,
    }
  },
}
</script>
