<template>
  <template v-if="error">
    <div class="my-15 text-center">
      <h1 class="font-mono text-2xl font-medium">ORDER NOT FOUND</h1>
    </div>
  </template>
  <template v-else-if="order">
    <div class="main-bg h-screen w-screen sm:bg-cover">
      <div
        class="bg-opacity-65 mx-auto flex h-full w-screen items-center bg-black py-20 px-4 sm:px-10 md:px-10 lg:px-10 xl:px-36"
      >
        <div class="scroll flex h-full w-full flex-col overflow-y-auto rounded-lg bg-white pb-5">
          <h1
            class="mb-10 w-full rounded-t-lg bg-red-700 p-4 text-center text-xl font-bold text-neutral-50 md:text-2xl"
          >
            {{ $t('order.title') }}
          </h1>
          <!-- Tracking graphic -->

          <div
            class="relative mb-10 flex h-3 w-4/6 items-center self-center rounded-full bg-gray-300 dark:bg-gray-700 md:h-8 md:w-5/6"
          >
            <div>
              <div
                :class="`
                absolute -translate-y-1/2 -translate-x-1/2 rounded-2xl p-2
                ${progress >= 0 ? 'bg-red-700' : 'bg-gray-300'}`"
              >
                <Clock class="h-5 w-5 text-white md:h-10 md:w-10" />
                <p
                  class="-translate-x-2/6 md:-translate-x-1/5 absolute mt-2 text-center text-sm font-medium md:text-lg"
                >
                  {{ $t('order.pending') }}
                </p>
              </div>
              <div
                :class="`absolute left-1/3 -translate-y-1/2 -translate-x-1/2 rounded-2xl p-2 
                ${progress >= 33 ? 'bg-red-700' : 'bg-gray-300'}`"
              >
                <ChefHat class="h-5 w-5 text-white md:h-10 md:w-10" />
                <p
                  class="-translate-x-2/6 md:-translate-x-1/5 absolute mt-2 text-center text-sm font-medium md:text-lg"
                >
                  {{ $t('order.cooking') }}
                </p>
              </div>
              <div
                :class="`absolute left-2/3 -translate-y-1/2 -translate-x-1/2 rounded-2xl bg-gray-300 p-2 
                ${progress >= 66 ? 'bg-red-700' : 'bg-gray-300'}`"
              >
                <Car class="h-5 w-5 text-white md:h-10 md:w-10" />
                <p
                  v-if="deliveryType === 'delivery'"
                  class="-translate-x-2/6 absolute mt-2 text-center text-sm font-medium md:-translate-x-1/4 md:text-lg"
                >
                  {{ $t('order.delivering') }}
                </p>
                <p
                  v-if="deliveryType === 'takeaway'"
                  class="-translate-x-2/6 absolute mt-2 text-center text-sm font-medium md:-translate-x-1/4 md:text-lg"
                >
                  {{ $t('order.delivered') }}
                </p>
              </div>
              <div
                :class="`absolute left-full -translate-y-1/2 -translate-x-1/2 rounded-2xl bg-gray-300 p-2 
                ${progress >= 100 ? 'bg-red-700' : 'bg-gray-300'}`"
              >
                <Check class="h-5 w-5 text-white md:h-10 md:w-10" />
                <p
                  class="-translate-x-2/5 absolute mt-2 text-center text-sm font-medium md:w-20 md:-translate-x-1/4 md:text-lg"
                >
                  {{ deliveryType === 'takeaway' ? 'Picked up' : 'Delivered' }}
                </p>
              </div>
            </div>
            <div class="h-3 rounded-full bg-red-700 md:h-8" :style="`width: ${progress}%`"></div>
          </div>
          <div
            class="flex h-full w-full flex-col items-center gap-6 self-center p-9 lg:flex-row lg:px-28"
          >
            <div class="h-full w-full lg:w-1/3">
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

                        <p class="font-semibold">???{{ priceItem(item) }}</p>
                      </div>
                    </div>
                    <div v-for="item in order.extras" class="flex w-full items-center gap-5">
                      <div class="flex w-full justify-between">
                        <p class="font-bold">{{ item.name }}</p>

                        <p class="font-semibold">???{{ priceItem(item) }}</p>
                      </div>
                    </div>
                  </div>
                  <div
                    class="absolute bottom-0 right-0 flex w-full justify-between rounded-b-lg bg-red-700 py-2 px-5 font-bold text-neutral-50"
                  >
                    <p>Total:</p>
                    <p class="">???{{ orderTotal }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="order.status === 'DELIVERED'" class="w-full rounded-md bg-gray-100 lg:w-2/3">
              <div
                class="mx-auto flex h-full w-4/6 flex-col content-center items-center justify-center gap-5 py-7"
              >
                <h3 class="text-center text-xl font-bold">{{ $t('order.reviewTitle') }}</h3>
                <StarRating
                  :disabled="order.reviewId !== null"
                  :rating="rating"
                  :ratingChange="ratingChange"
                />
                <textarea
                  :disabled="order.reviewId !== null"
                  class="form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:bg-white focus:text-gray-700 focus:outline-none"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  :placeholder="$t('order.reviewPlaceholder')"
                  v-model="review"
                ></textarea>
                <button
                  :disabled="order.reviewId !== null || !review || rating === 0"
                  @click="submitReview"
                  class="w-fit rounded-lg bg-red-700 px-6 py-2 text-center font-bold text-neutral-50 active:bg-red-800 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {{
                    order.reviewId !== null ? $t('order.reviewSuccess') : $t('order.reviewButton')
                  }}
                </button>
              </div>
            </div>
            <template v-else-if="order.status === 'DELIVERING' && deliveryType === 'delivery'">
              <MapView
                class="h-100 my-3 w-full rounded-md md:h-full"
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
import { useToast } from 'vue-toastification'
import { useMutation, useQuery } from '@vue/apollo-composable'
import { Clock, ChefHat, Car, Check } from 'lucide-vue-next'
import { LngLatLike } from 'mapbox-gl'
import StarRating from '../../components/generic/StarRating.vue'
import MapView from '../../components/generic/MapView.vue'

import 'animate.css'
/* import font awesome icon component */
import Order from '../../interfaces/order.interface'
import { ADD_REVIEW } from '../../graphql/mutation.review'
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
    const review = ref<string>(null)
    const driverPosition = ref<LiveLocation | null>(null)
    const driverCoords = ref<number[]>()
    const orderCoords = ref<number[]>()

    const toast = useToast()
    const route = useRoute()
    const deliveryType = computed(() => route.query.type)

    const { params } = useRoute()
    const { connectToServer, connected, trackOrder, socketServer, onOrderStatusChange } =
      useTracking()
    const {
      result,
      loading,
      error,
      refetch: refetchOrder,
    } = useQuery(GET_ORDER, {
      id: params.id,
    })

    const ratingChange = (num: number) => {
      rating.value = num
      console.log('rating change', rating.value, num)
    }

    const submitReview = () => {
      console.log('submit review', rating.value, review.value)
      const { mutate, onError, onDone } = useMutation(ADD_REVIEW, {
        variables: {
          orderId: params.id,
          rating: rating.value,
          comment: review.value,
        },
      })
      mutate()
      onError((err) => {
        console.log('error', err)
        toast.error(err.message)
      })
      onDone(() => {
        toast.success('Review submitted')
        refetchOrder()
      })
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
    onOrderStatusChange(({ orderId, status }) => {
      console.log('status changed', status)
      refetchOrder()
      progress.value = trackingProgress[status]
    })

    const order = computed(() => (result.value?.order as Order) ?? undefined)
    watch(order, (val) => {
      console.log('order changed', val)

      if (val) {
        progress.value = trackingProgress[val.status]
        orderCoords.value = [val.lng, val.lat]
        rating.value = val.review?.rating ?? 0
        review.value = val.review?.comment ?? null
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
      const itemsTotal = order.value.items.reduce((total, item) => {
        return total + parseFloat(priceItem(item))
      }, 0)
      const extrasTotal = order.value.extras.reduce((total, item) => {
        return total + item.price
      }, 0)

      return (itemsTotal + extrasTotal).toFixed(2)
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
