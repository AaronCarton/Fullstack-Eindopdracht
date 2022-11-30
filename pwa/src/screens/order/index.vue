<template>
  <template v-if="error">
    <div class="my-15 text-center">
      <h1 class="font-mono text-2xl font-medium">ORDER NOT FOUND</h1>
    </div>
  </template>
  <template v-else-if="order">
    <div class="flex flex-col gap-6 p-5">
      <div>{{ order.id }}</div>
      <div>{{ order }}</div>
      <div class="flex w-1/5 flex-col items-center gap-5">
        <h3 class="text-xl font-bold">How was your experience?</h3>
        <StarRating :ratingChange="ratingChange" />
        <textarea
          class="form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:bg-white focus:text-gray-700 focus:outline-none"
          id="exampleFormControlTextarea1"
          rows="3"
          placeholder="Leave a comment?"
        ></textarea>
        <button
          class="w-1/3 rounded-lg bg-red-700 px-6 py-2 text-center font-bold text-neutral-50 active:bg-red-800"
        >
          Submit
        </button>
      </div>
      <div>{{ JSON.stringify(driverPosition, null, 2) || 'Driver position not found' }}</div>
    </div>
  </template>
</template>

<script lang="ts">
import { watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import { computed } from '@vue/reactivity'
import { useQuery } from '@vue/apollo-composable'

import StarRating from '../../components/generic/StarRating.vue'
import Order from '../../interfaces/order.interface'
import { GET_ORDER } from '../../graphql/query.orders'
import useTracking from '../../composables/useTracking'
import LiveLocation from '../../interfaces/live-location.interface'

export default {
  components: {
    StarRating,
  },
  setup() {
    const rating = ref<number>(0)
    const driverPosition = ref<LiveLocation | null>(null)
    const { params } = useRoute()
    const { connectToServer, connected, trackOrder, socketServer } = useTracking()
    const { result, loading, error } = useQuery(GET_ORDER, {
      id: params.id,
    })

    const ratingChange = (num: number) => {
      rating.value = num
    }

    connectToServer()
    trackOrder(params.id as string, (location: any) => {
      console.log('location received', location)
      driverPosition.value = location
    })

    const order = computed(() => (result.value?.order as Order) ?? [])
    watch(order, (val) => console.log(val))

    return {
      rating,
      order,
      error,
      driverPosition,

      ratingChange,
    }
  },
}
</script>
