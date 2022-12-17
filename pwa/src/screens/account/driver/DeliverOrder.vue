<template>
  <div class="p-5">
    <div class="flex gap-10">
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
            {{
              `${[...order.items.map((i) => i.name), ...order.extras.map((i) => i.name)].join(
                ', ',
              )} (${order.id})`
            }}
          </option>
        </select>
      </div>
      <div>
        <div class="group flex gap-5">
          <div>
            <input
              type="checkbox"
              id="tracking"
              class="peer hidden"
              v-model="tracking"
              :disabled="selectedOrder === null"
            />
            <label
              for="tracking"
              @click="selectedOrder === null ? toast.error('Select an order first!') : null"
              class="block cursor-pointer select-none rounded-lg bg-green-600 py-1 px-3 font-semibold text-neutral-50 peer-checked:bg-red-700 peer-disabled:cursor-not-allowed peer-disabled:bg-gray-400 peer-disabled:text-gray-300"
            >
              <span> {{ tracking ? 'Stop delivery' : 'Start delivery' }} </span>
            </label>
          </div>
          <button
            :disabled="!tracking"
            @click="completeDelivery"
            class="block cursor-pointer select-none rounded-lg bg-green-600 py-1 px-3 font-semibold text-neutral-50 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-300"
          >
            Complete delivery
          </button>
        </div>
      </div>
    </div>
    <MapView
      class="h-80 w-full rounded-md"
      :map-coordinates="{ lng: 3.3232699, lat: 50.8425729 }"
      :markers="[driverPos as LngLatLike, orderPos as LngLatLike]"
      :start-route="driverPos"
      :end-route="orderPos"
    />
  </div>
</template>

<script lang="ts">
import { useMutation, useQuery } from '@vue/apollo-composable'
import { ref, watch } from 'vue'
import useTracking from '../../../composables/useTracking'
import MapView from '../../../components/generic/MapView.vue'
import { computed } from '@vue/reactivity'
import { GET_ACTIVE_ORDERS } from '../../../graphql/query.orders'
import { UPDATE_ORDER_STATUS } from '../../../graphql/mutation.order'
import Order from '../../../interfaces/order.interface'
import { useToast } from 'vue-toastification'
import { LngLatLike } from 'mapbox-gl'

export default {
  components: {
    MapView,
  },
  setup() {
    const tracking = ref(false)
    const toast = useToast()
    const driverPos = ref<number[]>()
    const orderPos = ref<number[]>()
    const selectedOrder = ref<String | null>(null)
    const { result, loading, error, refetch: refetchOrders } = useQuery(GET_ACTIVE_ORDERS)
    const { connectToServer, disconnectFromServer, trackOrder, trackDriver, changeOrderStatus } =
      useTracking()

    const orders = computed(() => (result.value?.findActiveOrders as Order[]) ?? [])
    watch(orders, (val) => console.log(val))

    watch(tracking, (val) => {
      if (val) {
        if (selectedOrder.value) {
          connectToServer()
          trackDriver(selectedOrder.value.toString())
          trackOrder(selectedOrder.value.toString(), (location) => {
            driverPos.value = location.geolocation.coordinates
          })
          const order = orders.value.find((order) => order.id === selectedOrder.value)
          if (order) {
            console.log(order)

            orderPos.value = [order.lng, order.lat]
          }
        } else {
          tracking.value = false
          toast.error('Select an order first!', {
            timeout: 5000,
          })
        }
      } else {
        disconnectFromServer()
      }
    })
    watch(selectedOrder, (val) => {
      if (!val) {
        tracking.value = false
        disconnectFromServer()

        driverPos.value = undefined
      }
    })

    const completeDelivery = () => {
      // complete order
      const { mutate, onDone } = useMutation(UPDATE_ORDER_STATUS, {
        variables: {
          id: selectedOrder.value,
          status: 'DELIVERED',
        },
      })
      mutate()

      onDone(() => {
        // send order complete emit
        changeOrderStatus(selectedOrder.value.toString(), 'DELIVERED')

        // stop tracking
        tracking.value = false
        disconnectFromServer()
        driverPos.value = undefined

        // refresh orders
        selectedOrder.value = null
        refetchOrders()

        toast.success('Delivery completed!', {
          timeout: 5000,
        })
      })
    }

    return {
      toast,
      orders,
      tracking,
      selectedOrder,
      driverPos,
      orderPos,
      completeDelivery,
    }
  },
}
</script>
