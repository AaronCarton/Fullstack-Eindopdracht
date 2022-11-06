<template>
  <div class="p-5">
    <div class="flex gap-10">
      <div>
        <p class="mb-5 text-xl font-medium">Start tracking</p>
        <input type="checkbox" id="tracking" class="peer hidden" v-model="tracking" />
        <label
          for="tracking"
          class="block select-none rounded-lg border-2 border-neutral-500 py-1 px-3 font-semibold text-neutral-500 hover:border-neutral-900 hover:text-neutral-900 peer-checked:border-red-700 peer-checked:bg-red-700 peer-checked:text-neutral-50 peer-checked:hover:border-red-600 peer-checked:hover:bg-red-600"
        >
          Tracking {{ tracking ? 'enabled' : 'disabled' }}
        </label>
      </div>
      <div>
        <p class="mb-5 text-xl font-medium">Select Order</p>
        <select
          v-model="selectedOrder"
          placeholder="Select order"
          id="countries"
          class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        >
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="FR">France</option>
          <option value="DE">Germany</option>
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
import { ref } from 'vue'
import useTracking from '../../../composables/useTracking'
import MapView from '../../../components/generic/MapView.vue'

export default {
  components: {
    MapView,
  },
  setup() {
    const { connectToServer, connected, trackOrder } = useTracking()
    const tracking = ref(false)
    const selectedOrder = ref()

    connectToServer()

    return {
      tracking,
      selectedOrder,
    }
  },
}
</script>
