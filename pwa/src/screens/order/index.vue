<template>
  <template v-if="error">
    <div class="my-15 text-center">
      <h1 class="font-mono text-2xl font-medium">ORDER NOT FOUND</h1>
    </div>
  </template>
  <template v-else-if="order">
    <div class="h-screen w-screen bg-[url(/HomeBG.jpg)] sm:bg-auto">
      <div
        class="bg-opacity-65 mx-auto flex h-full w-screen items-center bg-black py-20 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-36"
      >
        <div
          class="flex h-full w-full flex-col place-items-center justify-between gap-6 rounded-lg bg-white p-5"
        >
          <h1 class="text-2xl font-bold">Order: {{ order.id }}</h1>
          <!-- Tracking graphic -->

          <div
            class="relative flex h-8 w-5/6 items-center rounded-full bg-gray-300 dark:bg-gray-700"
          >
            <div>
              <div
                :class="`
                absolute -translate-y-1/2 -translate-x-1/2 rounded-2xl p-2
                ${progress >= 0 ? 'bg-red-700' : 'bg-gray-300'}`"
              >
                <Clock class="h-10 w-10 text-white" />
                <p class="-translate-x-1/6 absolute mt-2 text-center font-medium">Pending</p>
              </div>
              <div
                :class="`absolute left-1/3 -translate-y-1/2 -translate-x-1/2 rounded-2xl p-2 
                ${progress >= 33 ? 'bg-red-700' : 'bg-gray-300'}`"
              >
                <ChefHat class="h-10 w-10 text-white" />
                <p class="-translate-x-1/6 absolute mt-2 text-center font-medium">Cooking</p>
              </div>
              <div
                :class="`absolute left-2/3 -translate-y-1/2 -translate-x-1/2 rounded-2xl bg-gray-300 p-2 
                ${progress >= 66 ? 'bg-red-700' : 'bg-gray-300'}`"
              >
                <Car class="h-10 w-10 text-white" />
                <p class="-translate-x-1/5 absolute mt-2 text-center font-medium">Delivering</p>
              </div>
              <div
                :class="`absolute left-full -translate-y-1/2 -translate-x-1/2 rounded-2xl bg-gray-300 p-2 
                ${progress >= 100 ? 'bg-red-700' : 'bg-gray-300'}`"
              >
                <Check class="h-10 w-10 text-white" />
                <p class="-translate-x-1/5 absolute mt-2 text-center font-medium">Delivered</p>
              </div>
            </div>
            <div class="h-8 rounded-full bg-red-700" :style="`width: ${progress}%`"></div>
          </div>

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
      </div>
    </div>
  </template>
</template>

<script lang="ts">
import { watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import { computed } from '@vue/reactivity'
import { useQuery } from '@vue/apollo-composable'
import StarRating from '../../components/generic/StarRating.vue'
import { Clock, ChefHat, Car, Check } from 'lucide-vue-next'

import 'animate.css'
/* import font awesome icon component */
import Order from '../../interfaces/order.interface'
import { GET_ORDER } from '../../graphql/query.orders'
import useTracking from '../../composables/useTracking'
import LiveLocation from '../../interfaces/live-location.interface'
import {
  Clipboard as Pending,
  ChefHat as Cooking,
  Bike as Delivering,
  Home as Delivered,
} from 'lucide-vue-next'

export default {
  components: {
    StarRating,
    Pending,
    Cooking,
    Delivering,
    Delivered,
    Clock,
    ChefHat,
    Car,
    Check,
  },
  setup() {
    enum trackingProgress {
      PENDING = 0,
      COOKING = 33,
      DELIVERING = 66,
      DELIVERED = 100,
    }
    let progress = ref<number>(0)
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

    // check what the status of the order is and add the corosponding icon

    connectToServer()
    trackOrder(params.id as string, (location: any) => {
      console.log('location received', location)
      driverPosition.value = location
    })

    const order = computed(() => (result.value?.order as Order) ?? [])
    watch(order, (val) => {
      console.log('order changed', val)

      if (val) {
        progress.value = trackingProgress[val.status]
      }
    })

    return {
      rating,
      order,
      error,
      progress,
      trackingProgress,
      driverPosition,

      ratingChange,
    }
  },
}
</script>
<style>
@keyframes scooter {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(10%);
  }
}
.scooter {
  animation: scooter 0.25s linear infinite;
}

@keyframes wiggle {
  0%,
  100% {
    transform: rotate(0);
  }
  50% {
    transform: rotate(15deg);
  }
}
.wiggle {
  animation: wiggle 0.4s linear infinite;
}

/* @keyframes zoom {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}

.zoom {
  animation: zoom 3s linear infinite;
} */
</style>
