<template>
  <div class="p-5">
    <div class="flex gap-10">
      <div>
        <p class="mb-5 text-xl font-medium">Start tracking</p>
        <div class="relative">
          <input
            type="checkbox"
            id="tracking"
            class="peer hidden"
            v-model="tracking"
            :disabled="selectedOrder === null"
          />
          <label
            for="tracking"
            class="z-20 block cursor-pointer select-none rounded-lg bg-red-600 py-1 px-3 font-semibold text-neutral-50 peer-checked:bg-green-600 peer-disabled:cursor-not-allowed peer-disabled:bg-gray-400"
          >
            <span> Tracking {{ tracking ? 'enabled' : 'disabled' }} </span>
          </label>
        </div>
      </div>
      <div>
        <p class="mb-5 text-xl font-medium">Select Order</p>
        <select
          v-model="selectedOrder"
          placeholder="Select order"
          id="countries"
          class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        >
          <option :value="null" selected>No order selected</option>
          <option v-for="order in orders" :key="order.id" :value="order.id">
            {{ `${order.items.map((item) => item.name).join(', ')} (${order.id})` }}
          </option>
        </select>
      </div>
    </div>
    <MapView
      class="h-72 w-full rounded-md"
      :map-coordinates="{ lng: 3.3232699, lat: 50.8425729 }"
    />
  </div>
</template>

<script lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { ref, watch } from 'vue'
import useTracking from '../../../composables/useTracking'
import MapView from '../../../components/generic/MapView.vue'
import { computed } from '@vue/reactivity'
import { GET_ACTIVE_ORDERS } from '../../../graphql/query.orders'
import Order from '../../../interfaces/order.interface'

export default {
  components: {
    MapView,
  },
  setup() {
    const tracking = ref(false)
    const selectedOrder = ref<String | null>(null)
    const { result, loading, error } = useQuery(GET_ACTIVE_ORDERS)
    const { connectToServer, disconnectFromServer, connected, trackDriver } = useTracking()

    const orders = computed(() => (result.value?.findActiveOrders as Order[]) ?? [])
    watch(orders, (val) => console.log(val))

    watch(tracking, (val) => {
      if (val) {
        if (selectedOrder.value) {
          connectToServer()
          trackDriver(selectedOrder.value.toString())
        } else {
          tracking.value = false
          alert('Please select an order')
        }
      } else {
        disconnectFromServer()
      }
    })
    watch(selectedOrder, (val) => {
      if (!val) {
        tracking.value = false
        disconnectFromServer()
      }
    })

    return {
      orders,
      tracking,
      selectedOrder,
    }
  },
}
</script>
