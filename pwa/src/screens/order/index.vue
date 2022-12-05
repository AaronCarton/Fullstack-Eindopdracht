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
          class="flex h-full w-full flex-col items-center justify-between gap-6 rounded-lg bg-white p-5"
        >
          <h1 class="text-2xl font-bold">Order: {{ order.id }}</h1>
          <!-- Tracking graphic -->

          <div
            class="flex w-[65%] flex-col items-center gap-5 rounded-3xl bg-red-700 px-7 py-5"
            v-auto-animate
          >
            <div class="flex flex-col items-center gap-3">
              <div v-if="order.status === 'PENDING'">
                <Pending class="h-10 w-10 stroke-white" />
              </div>
              <div v-else-if="order.status === 'COOKING'">
                <Cooking class="wiggle h-10 w-10 stroke-white" />
              </div>
              <div v-else-if="order.status === 'DELIVERING'">
                <Delivering class="scooter h-10 w-10 stroke-white" />
              </div>
              <div v-else-if="order.status === 'DELIVERED'">
                <Delivered class="h-10 w-10 stroke-white" />
              </div>
              <p class="font-subtitle text-4xl text-white">{{ order.status }}</p>
            </div>
            <div class="h-5 w-full rounded-full bg-gray-600 dark:bg-gray-700" v>
              <div class="h-5 rounded-full bg-white" v-bind:style="{ width: progressBar }"></div>
            </div>
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
  },
  setup() {
    enum trackingProgress {
      PENDING = '25%',
      COOKING = '50%',
      DELIVERING = '75%',
      DELIVERED = '100%',
    }
    let progress: string = ''
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

    const progressBar = computed(() => {
      let progress: string = ''
      if (result.value?.order?.status === 'PENDING') {
        progress = trackingProgress.PENDING
      } else if (result.value?.order?.status === 'COOKING') {
        progress = trackingProgress.COOKING
      } else if (result.value?.order?.status === 'DELIVERING') {
        progress = trackingProgress.DELIVERING
      } else if (result.value?.order?.status === 'DELIVERED') {
        progress = trackingProgress.DELIVERED
      }

      return progress
    })
    // check what the status of the order is and add the corosponding icon

    connectToServer()
    trackOrder(params.id as string, (location: any) => {
      console.log('location received', location)
      driverPosition.value = location
    })

    const order = computed(() => (result.value?.order as Order) ?? undefined)
    watch(order, (val) => console.log(val))

    return {
      rating,
      order,
      error,
      progress,
      trackingProgress,
      driverPosition,
      progressBar,

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
