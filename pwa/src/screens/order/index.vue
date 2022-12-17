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
          class="scroll flex h-full w-full flex-col justify-between overflow-y-auto rounded-lg bg-white"
        >
          <h1
            class="mb-10 w-full rounded-t-lg bg-red-700 p-4 text-center text-2xl font-bold text-neutral-50"
          >
            Your order has been placed
          </h1>
          <!-- Tracking graphic -->

          <div
            class="relative mb-10 flex h-3 w-4/6 items-center self-center rounded-full bg-gray-300 dark:bg-gray-700 lg:h-8 lg:w-5/6"
          >
            <div>
              <div
                :class="`
                absolute -translate-y-1/2 -translate-x-1/2 rounded-2xl p-2
                ${progress >= 0 ? 'bg-red-700' : 'bg-gray-300'}`"
              >
                <Clock class="h-5 w-5 text-white lg:h-10 lg:w-10 xl:h-10 xl:w-10" />
                <p
                  class="-translate-x-2/6 lg:-translate-x-1/5 absolute mt-2 text-center text-sm font-medium lg:text-lg"
                >
                  Pending
                </p>
              </div>
              <div
                :class="`absolute left-1/3 -translate-y-1/2 -translate-x-1/2 rounded-2xl p-2 
                ${progress >= 33 ? 'bg-red-700' : 'bg-gray-300'}`"
              >
                <ChefHat class="h-5 w-5 text-white lg:h-10 lg:w-10 xl:h-10 xl:w-10" />
                <p
                  class="-translate-x-2/6 lg:-translate-x-1/5 absolute mt-2 text-center text-sm font-medium lg:text-lg"
                >
                  Cooking
                </p>
              </div>
              <div
                :class="`absolute left-2/3 -translate-y-1/2 -translate-x-1/2 rounded-2xl bg-gray-300 p-2 
                ${progress >= 66 ? 'bg-red-700' : 'bg-gray-300'}`"
              >
                <Car class="h-5 w-5 text-white lg:h-10 lg:w-10 xl:h-10 xl:w-10" />
                <p
                  v-if="deliveryType === 'delivery'"
                  class="-translate-x-2/6 absolute mt-2 text-center text-sm font-medium lg:-translate-x-1/4 lg:text-lg"
                >
                  Delivering
                </p>
                <p
                  v-if="deliveryType === 'takeaway'"
                  class="-translate-x-2/6 absolute mt-2 text-center text-sm font-medium lg:-translate-x-1/4 lg:text-lg"
                >
                  Ready for pickup
                </p>
              </div>
              <div
                :class="`absolute left-full -translate-y-1/2 -translate-x-1/2 rounded-2xl bg-gray-300 p-2 
                ${progress >= 100 ? 'bg-red-700' : 'bg-gray-300'}`"
              >
                <Check class="h-5 w-5 text-white lg:h-10 lg:w-10 xl:h-10 xl:w-10" />
                <p
                  class="-translate-x-2/6 absolute mt-2 text-center text-sm font-medium lg:-translate-x-1/4 lg:text-lg"
                >
                  {{ deliveryType === 'takeaway' ? 'Picked up' : 'Delivered' }}
                </p>
              </div>
            </div>
            <div class="h-3 rounded-full bg-red-700 lg:h-8" :style="`width: ${progress}%`"></div>
          </div>
          <div
            class="flex h-full w-full flex-col items-center justify-center gap-6 self-center p-9 lg:flex-row lg:p-9 lg:px-28"
          >
            <div class="my-3 h-full w-full lg:w-1/3">
              <div class="relative h-full">
                <div
                  class="border-1 scrollbar flex h-full w-full flex-col overflow-auto rounded-lg border-neutral-400 bg-neutral-100"
                >
                  <div class="h-50 flex w-full flex-col p-5">
                    <div v-for="item in order.items" class="flex w-full items-center gap-5">
                      <div class="flex w-full justify-between">
                        <div>
                          <p class="font-bold">{{ item.name }}</p>
                          <div v-for="topping in item.toppings" class="last:mb-5">
                            <p v-if="!topping.default">+ {{ topping.name }}</p>
                          </div>
                        </div>

                        <p class="font-semibold">€{{ priceItem(item) }}</p>
                      </div>
                    </div>
                    <div v-for="item in order.extras" class="flex w-full items-center gap-5">
                      <div class="flex w-full justify-between">
                        <p class="font-bold">{{ item.name }}</p>

                        <p class="font-semibold">€{{ priceItem(item) }}</p>
                      </div>
                    </div>
                  </div>
                  <div
                    class="absolute bottom-0 right-0 flex w-full justify-between rounded-b-lg bg-red-700 py-2 px-5 font-bold text-neutral-50"
                  >
                    <p>Total:</p>
                    <p class="px-4">€{{ orderTotal }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="order.status === 'DELIVERED'" class="h-full w-4/5 rounded-md bg-gray-200">
              <div
                class="mx-auto flex h-full w-4/6 flex-col content-center items-center justify-center gap-5 py-7"
              >
                <h3 class="text-xl font-bold">How was your experience?</h3>
                <StarRating :ratingChange="ratingChange" />
                <textarea
                  class="form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:bg-white focus:text-gray-700 focus:outline-none"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  placeholder="Leave a comment?"
                  v-model="review"
                ></textarea>
                <button
                  @click="submitReview"
                  class="w-1/3 rounded-lg bg-red-700 px-6 py-2 text-center font-bold text-neutral-50 active:bg-red-800"
                >
                  Submit
                </button>
              </div>
            </div>
            <template v-else-if="order.status === 'DELIVERING' && deliveryType === 'delivery'">
              <MapView
                class="my-3 w-full rounded-md lg:h-full"
                :map-coordinates="{ lng: 3.3232699, lat: 50.8425729 }"
                :markers="[driverCoords as LngLatLike, orderCoords as LngLatLike]"
                :start-route="driverCoords"
                :end-route="orderCoords"
              />
            </template>
          </div>
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
import { Clock, ChefHat, Car, Check } from 'lucide-vue-next'
import { LngLatLike } from 'mapbox-gl'
import StarRating from '../../components/generic/StarRating.vue'
import MapView from '../../components/generic/MapView.vue'

import 'animate.css'
/* import font awesome icon component */
import Order from '../../interfaces/order.interface'
import { GET_ORDER } from '../../graphql/query.orders'
import useTracking from '../../composables/useTracking'
import ExtraItem from '../../interfaces/extraItem.interface'
import Pizza, { isPizza } from '../../interfaces/pizza.interface'
import LiveLocation from '../../interfaces/live-location.interface'
import {
  Clipboard as Pending,
  ChefHat as Cooking,
  Bike as Delivering,
  Home as Delivered,
} from 'lucide-vue-next'

export default {
  components: {
    MapView,
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
    const review = ref<string>('')
    const driverPosition = ref<LiveLocation | null>(null)
    const driverCoords = ref<number[]>()
    const orderCoords = ref<number[]>()

    const route = useRoute()
    const deliveryType = computed(() => route.query.type)

    const { params } = useRoute()
    const { connectToServer, connected, trackOrder, socketServer } = useTracking()
    const { result, loading, error } = useQuery(GET_ORDER, {
      id: params.id,
    })

    const ratingChange = (num: number) => {
      rating.value = num
    }

    const submitReview = () => {
      console.log('submit review', rating.value, review.value)
    }

    //check how many times an item is in order and add the amount to the item
    const getAmount = (item: any) => {
      let amount = 0
      order.value.items.forEach((i: any) => {
        if (i.name === item.name) {
          amount++
        }
      })
      return amount
    }

    const randomPrice = () => {
      return Math.floor(Math.random() * 100) + 1
    }

    // check what the status of the order is and add the corosponding icon

    connectToServer()
    trackOrder(params.id as string, (location: any) => {
      console.log('location received', location)
      driverPosition.value = location
    })
    watch(driverPosition, (val) => {
      if (val) {
        driverCoords.value = val.geolocation.coordinates
      }
    })

    const order = computed(() => (result.value?.order as Order) ?? [])
    watch(order, (val) => {
      console.log('order changed', val)

      if (val) {
        progress.value = trackingProgress[val.status]
        orderCoords.value = [val.lng, val.lat]
      }
    })

    const priceItem = (item: Pizza | ExtraItem) => {
      if (isPizza(item)) {
        let price = item.basePrice
        if (item.type === 'cheesyCrust') price += 5

        if (item.size === 'small') price -= 3
        else if (item.size === 'large') price += 3
        return item.toppings.reduce((total, t) => total + t.price, price).toFixed(2)
      } else {
        return item.price.toFixed(2)
      }
    }
    const orderTotal = computed(() => {
      return order.value.items.reduce((total, item) => {
        return total + parseFloat(priceItem(item))
      }, 0)
    })

    return {
      rating,
      order,
      error,
      progress,
      trackingProgress,
      driverPosition,
      driverCoords,
      orderCoords,
      getAmount,
      randomPrice,
      deliveryType,
      ratingChange,
      priceItem,
      orderTotal,
      review,
      submitReview,
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
