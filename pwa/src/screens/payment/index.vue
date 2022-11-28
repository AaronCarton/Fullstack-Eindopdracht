<template>
  <div class="grid-rows-7 grid w-full gap-3 rounded-lg bg-neutral-50 p-3">
    <!--Payment methodes-->
    <div class="row-span-3 grid grid-cols-2 p-6">
      <div class="col-span-1 flex flex-col justify-evenly">
        <h2 class="text-2xl font-bold">Payment methodes</h2>
        <div class="flex gap-10">
          <div>
            <label for="Bancontact">
              <input
                type="radio"
                name="methode"
                id="Bancontact"
                class="peer sr-only"
                value="bancontact"
                @click="m = 'bancontact'"
              />

              <img
                src="/paymentMethodes/Bancontact.png"
                alt=""
                class="h-25 w-25 peer-checked:ring-3 rounded-lg border-2 border-neutral-200 object-fill peer-checked:border-red-500 peer-checked:ring-red-400 peer-checked:ring-opacity-50"
              />
            </label>
          </div>
          <div>
            <label for="Payconiq">
              <input
                type="radio"
                name="methode"
                id="Payconiq"
                class="peer sr-only"
                value="payconiq"
                @click="m = 'payconiq'" />

              <img
                src="/paymentMethodes/Payconiq.png"
                alt=""
                class="h-25 w-25 peer-checked:ring-3 rounded-lg border-2 border-neutral-200 object-fill peer-checked:border-red-500 peer-checked:ring-red-400 peer-checked:ring-opacity-50"
            /></label>
          </div>
          <div>
            <label for="Paypal">
              <input
                type="radio"
                name="methode"
                id="Paypal"
                class="peer sr-only"
                value="paypal"
                @click="m = 'paypal'" />

              <img
                src="/paymentMethodes/Paypal.png"
                alt=""
                class="h-25 w-25 peer-checked:ring-3 rounded-lg border-2 border-neutral-200 object-fill peer-checked:border-red-500 peer-checked:ring-red-400 peer-checked:ring-opacity-50"
            /></label>
          </div>
          <div>
            <label for="Visa">
              <input
                type="radio"
                name="methode"
                id="Visa"
                class="peer sr-only"
                value="visa"
                @click="m = 'visa'" />

              <img
                src="/paymentMethodes/Visa.png"
                alt=""
                class="h-25 w-25 peer-checked:ring-3 rounded-lg border-2 border-neutral-200 object-fill peer-checked:border-red-500 peer-checked:ring-red-400 peer-checked:ring-opacity-50"
            /></label>
          </div>
        </div>
      </div>
      <div class="col-span-1 flex items-center">
        <PaymentForm :methode="m" />
      </div>
    </div>
    <!--information for delivery-->
    <form class="row-span-3 p-6" @submit.prevent="submitOrder">
      <h2 class="mb-3 text-2xl font-bold">Delivery information</h2>
      <div class="grid grid-cols-2 gap-4">
        <div class="col-span-1 grid rounded-lg p-6">
          <div class="flex flex-col gap-1">
            <label class="text-xl font-bold" for="">Delivery date</label>
            <input
              type="date"
              class="w-50 h-auto rounded-lg border-2 border-neutral-200 bg-white px-2 py-1 text-xl font-semibold"
            />
          </div>
          <div class="flex flex-col gap-1">
            <label class="text-xl font-bold" for="">Delivery time</label>
            <select
              class="max-w-auto h-auto rounded-lg border-2 border-neutral-200 bg-white py-1 px-2 text-xl font-semibold"
              value="Select a delivery time"
              v-if="times.length > 0"
            >
              <option value="Select a delivery time" disabled selected>
                Select a delivery time
              </option>
              <option v-for="time in times" :key="time" :value="time">{{ time }}</option>
              >
            </select>
            <select
              v-else
              name=""
              id=""
              class="h-auto w-1/2 rounded-lg border-2 border-neutral-200 bg-white py-1 px-2 text-xl font-semibold"
            >
              <option value="Select a delivery time" disabled selected>
                Select a delivery time
              </option>
              <option value="no options" disabled>No options</option>
            </select>
          </div>
        </div>
        <div class="col-span-1 grid grid-cols-3 gap-3 rounded-lg p-6">
          <div class="col-span-2 flex flex-col gap-1">
            <label class="text-xl font-bold" for="">Street name</label>
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
      <div class="bottom-0 col-span-1 flex items-end justify-center">
        <button class="w-[65%] rounded-lg bg-red-700 px-6 py-2 font-bold text-neutral-50">
          Pay
        </button>
      </div>
    </form>
    <!--Payment button-->
  </div>
</template>
<script lang="ts">
import { filter } from 'graphql-anywhere'
import { useMutation } from '@vue/apollo-composable'
import { computed, reactive } from '@vue/reactivity'
import { Ref, ref, watch } from 'vue'
import { useToast } from 'vue-toastification'
import { useRoute, useRouter } from 'vue-router'

import useCart from '../../composables/useCart'
import useUser from '../../composables/useUser'
import PaymentForm from './components/PaymentForm.vue'
import { CREATE_ORDER, ORDER_INPUT_FRAGMENT } from '../../graphql/mutation.order'

export default {
  components: {
    PaymentForm,
  },

  setup() {
    const user = useUser()
    const toast = useToast()
    const route = useRoute()
    const { push } = useRouter()

    let times: string[] = []
    const { cart, getCartTotal } = useCart()
    let m: Ref<string> = ref('')
    const searchQuery = computed(() => route.query)

    const submitOrder = async () => {
      console.log('submitting order', cart.value)

      // filter cart items to match the correct OrderInput
      let orderItems = filter(
        ORDER_INPUT_FRAGMENT,
        cart.value.map((ci) => ci.item),
      )
      // create order mutation
      const { mutate: addOrder } = useMutation(CREATE_ORDER, () => ({
        variables: {
          items: orderItems,
          time: Date.now(),
          address: 'test',
        },
      }))

      let res = await addOrder()

      if (res?.data.createOrder.id) {
        console.log('order created', res.data.createOrder.id)
        push({ name: 'order', params: { id: res.data.createOrder.id } })
      } else toast.error('Something went wrong')
    }

    watch(m, () => {
      const newMethode = m
      console.log(newMethode.value)
    })
    //function that makes a list of times in hour and minutes with a 15 minute interval and starting with 10:00 and ending with 23:00 and checkes if current time is in the list and if it is it will remove all times before the current time
    const makeTimes = () => {
      let time = new Date()
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
    }

    return {
      cart,
      PaymentForm,
      getCartTotal,
      m,
      makeTimes,
      times,
      deliveryType: searchQuery.value.type,
      submitOrder,
    }
  },
}
</script>
