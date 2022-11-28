<template>
  <div class="grid-rows-auto grid w-full gap-1 overflow-auto rounded-lg bg-white px-3 py-3">
    <!--Payment methodes-->
    <div class="flex flex-col gap-1">
      <label class="font-semibold lg:text-xl" for="time">Select a desired moment</label>
      <select
        class="max-w-auto border-1 h-auto gap-2 rounded-lg border-neutral-400 bg-white py-1 px-2 font-semibold lg:text-xl"
        value="As fast as possible"
        id="time"
        v-if="times.length > 0"
      >
        <option value="As fast as possible" selected>As fast as possible</option>
        <option v-for="time in times" :key="time" :value="time">
          {{ time }}
        </option>
      </select>
      <select v-else name="As fast as possible" placeholder="As fast as possible">
        <option value="As fast as possible" selected>As fast as possible</option>
        <option class="bg-neutral-200 text-center text-neutral-500" value="No options" disabled>
          No options
        </option>
      </select>
    </div>
    <div class="py-3">
      <h2 class="text-lg font-bold lg:text-2xl">Payment methodes</h2>

      <div class="mt-5 flex items-center">
        <PaymentForm :methode="m" />
      </div>
    </div>

    <!--information for delivery-->
    <form class="row-span-3">
      <h2 class="mb-3 text-lg font-bold lg:text-2xl">{{ deliveryType }} information</h2>
      <div class="grid grid-cols-1">
        <div class="col-span-1 grid rounded-lg p-6">
          <div class="flex flex-col gap-1">
            <label class="font-semibold lg:text-xl" for="">Delivery date</label>
            <input
              type="date"
              class="w-50 h-auto rounded-lg border-2 border-neutral-200 bg-white px-2 py-1 font-semibold lg:text-xl"
            />
          </div>
        </div>
        <div
          v-if="!user?.street && !user?.city && !user?.houseNumber"
          class="col-span-1 grid grid-cols-3 gap-3 rounded-lg p-6"
        >
          <div class="col-span-2 flex flex-col gap-1">
            <label class="font-bold lg:text-xl" for="">Street name</label>
            <input
              type="text"
              class="h-auto rounded-lg border-2 border-neutral-200 bg-white py-1 px-2 text-xl font-semibold"
            />
          </div>
          <div class="col-span-1 flex flex-col gap-1">
            <label class="text-xl font-bold" for="">Street nr.</label>
            <input
              type="number"
              class="h-auto rounded-lg border-2 border-neutral-200 bg-white py-1 px-2 text-xl font-semibold"
            />
          </div>
          <div class="col-span-1 flex flex-col gap-1">
            <label class="text-xl font-bold" for="">Postal code</label>
            <input
              type="text"
              class="h-auto rounded-lg border-2 border-neutral-200 bg-white py-1 px-2 text-xl font-semibold"
            />
          </div>
        </div>
      </div>
    </form>

    <!--Payment button-->
    <div class="bottom-0 col-span-1 flex items-end justify-center">
      <button class="w-[65%] rounded-lg bg-red-700 px-6 py-2 font-bold text-neutral-50">Pay</button>
    </div>
  </div>
</template>
<script lang="ts">
import { computed } from '@vue/reactivity'
import { Ref, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import useCart from '../../composables/useCart'
import PaymentForm from './components/PaymentForm.vue'
import useUser from '../../composables/useUser'
export default {
  components: {
    PaymentForm,
  },

  setup() {
    const route = useRoute()
    const { user } = useUser()
    let times: string[] = []
    let time = new Date()
    const { cart, getCartTotal } = useCart()
    let m: Ref<string> = ref('')
    const deliveryType = computed(() => route.query.type)
    console.log(new Date().getHours())

    watch(m, () => {
      const newMethode = m
      console.log(newMethode.value)
    })

    watch(time, () => {
      makeTimes()
    })
    //function that makes a list of times in hour and minutes with a 15 minute interval and starting with 10:00 and ending with 23:00 and checkes if current time is in the list and if it is it will remove all times before the current time
    const makeTimes = () => {
      let hour = time.getHours()
      let minutes = time.getMinutes()
      let timeString = hour + ':' + minutes

      let timeNumber = Number(timeString.replace(':', '.'))
      let timeList = []
      for (let i = 10; i < 24; i++) {
        for (let j = 0; j < 60; j += 15) {
          if (j == 0) {
            timeList.push(i + ':00')
          } else {
            timeList.push(i + ':' + j)
          }
        }
      }
      // if timelist is empty return "no times available"
      if (timeList.length == 0) {
        timeList.push('no times available')
      }
      if (timeNumber > 10) {
        timeList = timeList.filter((t) => Number(t.replace(':', '.')) > timeNumber)
      }
      times = timeList
      console.log(times)
    }
    makeTimes()

    return {
      cart,
      user,
      PaymentForm,
      getCartTotal,
      m,
      makeTimes,
      times,
      deliveryType,
    }
  },
}
</script>
