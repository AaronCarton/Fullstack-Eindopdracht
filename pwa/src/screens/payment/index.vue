<template>
  <div class="flex w-full flex-col gap-1 overflow-auto rounded-lg bg-white">
    <h1 class="mb-6 w-full bg-red-700 p-4 text-center text-4xl font-bold text-neutral-50 shadow-md">
      {{ $t('checkout.title') }}
    </h1>

    <div class="justify-self-start px-6 py-0">
      <!--Payment methodes-->

      <div class="mx-auto my-0 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div>
          <div class="flex flex-col gap-1">
            <h2 class="mb-3 text-lg font-semibold lg:text-2xl">
              {{ $t('checkout.desiredMoment') }}
            </h2>
            <Listbox v-model="selectedTime">
              <div class="relative mt-1">
                <ListboxButton
                  class="relative w-full cursor-pointer rounded-lg border-2 border-neutral-200 bg-white py-2 pl-3 pr-10 text-left hover:border-neutral-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-red-300 sm:text-sm"
                >
                  <span class="block truncate">{{ selectedTime }}</span>
                  <span
                    class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                  >
                    <ListIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </span>
                </ListboxButton>

                <transition
                  leave-active-class="transition duration-100 ease-in"
                  leave-from-class="opacity-100"
                  leave-to-class="opacity-0"
                >
                  <ListboxOptions
                    class="scrollbar absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                  >
                    <ListboxOption
                      v-slot="{ selected }"
                      v-for="time in times"
                      :key="time"
                      :value="time"
                    >
                      <li
                        :class="[
                          selected ? 'bg-red-100 text-red-900' : 'text-gray-900',
                          'relative cursor-default select-none py-2 pl-10 pr-4',
                        ]"
                      >
                        <span
                          class="hover:font-medium"
                          :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']"
                          >{{ time }}</span
                        >
                        <span
                          v-if="selected"
                          class="absolute inset-y-0 left-0 flex items-center pl-3 text-red-600"
                        >
                        </span>
                      </li>
                    </ListboxOption>
                  </ListboxOptions>
                </transition>
              </div>
            </Listbox>
            <!-- <select
              v-else
              name="As fast as possible"
              placeholder="As fast as possible"
              class="max-w-auto border-1 h-auto gap-2 rounded-lg border-neutral-400 bg-white p-3"
            >
              <option value="As fast as possible" selected hidden>As fast as possible</option>
              <option
                class="bg-neutral-200 text-center text-neutral-500"
                value="No options"
                disabled
              >
                No options
              </option>
            </select> -->
          </div>
          <div class="py-3">
            <h2 class="mb-3 text-lg font-semibold capitalize lg:text-2xl">
              {{ deliveryType }} address
            </h2>
            <div v-if="deliveryType === 'takeaway'">
              <div class="border-1 rounded-md border-neutral-400 bg-neutral-50 p-2">
                <p class="font-semibold">Pizza Time Restaurant</p>
                <p class="text-neutral-400">Sint-Martens-Latemlaan 1B, 8500 Kortrijk</p>
              </div>
            </div>
            <div v-else>
              <div class="gap-3 rounded-lg">
                <div class="flex flex-col gap-1">
                  <label class="font-medium lg:text-lg" for="street">{{
                    $t('checkout.street')
                  }}</label>
                  <input
                    type="text"
                    class="h-auto rounded-lg border-2 border-neutral-200 bg-white p-2 hover:border-neutral-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-red-300"
                    placeholder="ex. Nowherestreet"
                    :value="user?.street"
                    id="street"
                  />
                </div>
                <div class="col-span-1 flex flex-col gap-1">
                  <label class="font-medium lg:text-lg" for="houseNr">{{
                    $t('checkout.houseNumber')
                  }}</label>
                  <input
                    type="number"
                    class="h-auto rounded-lg border-2 border-neutral-200 bg-white p-2 outline-none hover:border-neutral-300 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-red-300"
                    placeholder="ex. 155"
                    maxlength="4"
                    :value="user?.houseNumber || this.value"
                    id="houseNr"
                  />
                </div>
                <div class="col-span-1 flex flex-col gap-1">
                  <label class="font-medium lg:text-lg" for="pC">{{ $t('checkout.postal') }}</label>
                  <div
                    class="group flex justify-between rounded-lg border-2 border-neutral-200 p-2 hover:border-neutral-300"
                  >
                    <input
                      type="text"
                      class="w-full bg-white focus:outline-none"
                      placeholder="ex. Kortrijk or 8500"
                      id="pC"
                      v-model="city"
                    />
                    <Clear
                      @click="emptyInput()"
                      class="cursor-pointer rounded-full active:bg-red-200"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-3">
              <a
                class="cursor-pointer text-sm font-semibold text-red-600"
                @click="
                  $router.replace({
                    name: $route.name!,
                    query: {
                      ...$route.query,
                      type: deliveryType === 'takeaway' ? 'delivery' : 'takeaway',
                    },
                  })
                "
              >
                Switch to
                <span class="font-bold">{{
                  deliveryType === 'takeaway' ? 'delivery' : 'takeaway'
                }}</span>
                instead?
              </a>
            </div>
          </div>
        </div>
        <div>
          <h2 class="mb-3 text-lg font-semibold capitalize lg:text-2xl">Payment Methods</h2>
          <RadioGroup v-model="selectedMethode" data-cy="payment-methodes">
            <RadioGroupOption value="bancontact" class="focus:outline-none" v-slot="{ checked }">
              <li
                class="ne mb-3 list-none rounded-lg border-2 border-neutral-200 p-3 font-semibold text-neutral-600 focus:outline-none"
                :class="{
                  ' border-neutral-400 bg-neutral-100 text-neutral-900 ': checked,
                  ' bg-none  hover:border-neutral-500': !checked,
                }"
                data-cy="bancontact"
              >
                <div v-auto-animate>
                  <div class="flex cursor-pointer justify-between">
                    <div class="flex gap-2">
                      <img class="h-6 w-auto rounded" :src="bancontactURL" alt="" srcset="" />
                      <span>Bancontact</span>
                    </div>
                    <Check v-show="checked" class="fill-green-600 stroke-green-50" />
                  </div>
                  <div
                    v-if="checked"
                    class="mt-3 flex items-center justify-center border-t-2 border-neutral-400 bg-neutral-100 py-3"
                  >
                    <QrcodeVue
                      value="https://www.youtube.com/watch?v=lpvT-Fciu-4"
                      :size="150"
                      level="H"
                      class="border-4 border-neutral-50"
                    ></QrcodeVue>
                  </div>
                </div>
              </li>
            </RadioGroupOption>
            <RadioGroupOption
              class="hover:border-neutral-500 focus:outline-none"
              value="visa"
              v-slot="{ checked }"
            >
              <li
                class="mb-3 list-none rounded-lg border-2 border-neutral-200 p-3 font-semibold text-neutral-600 focus:outline-none"
                :class="{
                  ' border-neutral-400  bg-neutral-100 text-neutral-900  ': checked,
                  ' bg-none  hover:border-neutral-500 ': !checked,
                }"
              >
                <div v-auto-animate>
                  <div class="flex cursor-pointer justify-between">
                    <div class="flex gap-2">
                      <img class="h-6 w-auto rounded" :src="visaURL" alt="" srcset="" />
                      <span>MasterCard / Visa</span>
                    </div>
                    <Check v-show="checked" class="fill-green-600 stroke-green-50" />
                  </div>
                  <div
                    v-if="checked"
                    class="mt-3 border-t-2 border-neutral-400 bg-neutral-100 py-3"
                  >
                    <form action="" class="w-full">
                      <div class="mb-3">
                        <label class="font-semibold" for="kaartnr">Cart Number</label>
                        <input
                          type="text"
                          id="kaartnr"
                          class="mt-2 h-auto w-full rounded-lg border-2 border-neutral-200 bg-white p-2 hover:border-neutral-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-red-300"
                        />
                      </div>
                      <div class="flex w-full justify-between gap-2">
                        <div class="flex flex-col items-start gap-3">
                          <label class="font-semibold" for="vdatum">Expire Date</label>
                          <input
                            class="h-auto rounded-lg border-2 border-neutral-200 bg-white p-2 hover:border-neutral-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-red-300"
                            type="month"
                            id="vdatum"
                            placeholder="02-2203"
                          />
                        </div>
                        <div class="flex flex-col items-start gap-3">
                          <label class="font-semibold" for="CC">CVC / CVV</label>
                          <input
                            class="h-auto rounded-lg border-2 border-neutral-200 bg-white p-2 hover:border-neutral-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-red-300"
                            type="text"
                            maxlength="4"
                            placeholder="ex. 0157"
                            id="CC"
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </li>
            </RadioGroupOption>

            <RadioGroupOption value="paypal" class="focus:outline-none" v-slot="{ checked }">
              <li
                class="ne mb-3 list-none rounded-lg border-2 border-neutral-200 p-3 font-semibold text-neutral-600 focus:outline-none"
                :class="{
                  ' border-neutral-400 bg-neutral-100 text-neutral-900 ': checked,
                  ' bg-none  hover:border-neutral-500': !checked,
                }"
              >
                <div v-auto-animate>
                  <div class="flex cursor-pointer justify-between">
                    <div class="flex gap-2">
                      <img class="h-6 w-auto rounded" :src="paypalURL" alt="" srcset="" />
                      <span>PayPal</span>
                    </div>
                    <Check v-show="checked" class="fill-green-600 stroke-green-50" />
                  </div>
                  <div
                    v-if="checked"
                    class="mt-3 flex items-center justify-center border-t-2 border-neutral-400 bg-neutral-100 py-3"
                  >
                    <button class="rounded-3xl bg-[#EABC53] px-8 py-2 font-bold text-[#0C2688]">
                      Pay with PayPal
                    </button>
                  </div>
                </div>
              </li>
            </RadioGroupOption>

            <RadioGroupOption value="mobile" class="focus:outline-none" v-slot="{ checked }">
              <li
                class="ne mb-3 list-none rounded-lg border-2 border-neutral-200 p-3 font-semibold text-neutral-600 focus:outline-none"
                :class="{
                  ' border-neutral-400 bg-neutral-100 text-neutral-900 ': checked,
                  ' bg-none  hover:border-neutral-500': !checked,
                }"
              >
                <div v-auto-animate>
                  <div class="flex cursor-pointer justify-between">
                    <div class="flex gap-2">
                      <img class="h-6 w-auto rounded" :src="payconiqURL" alt="" srcset="" />
                      <span>Payconiq</span>
                    </div>
                    <Check v-show="checked" class="fill-green-600 stroke-green-50" />
                  </div>
                  <div
                    v-if="checked"
                    class="mt-3 flex items-center justify-center border-t-2 border-neutral-400 bg-neutral-100 py-3"
                  >
                    <QrcodeVue
                      value="https://www.youtube.com/watch?v=lpvT-Fciu-4"
                      :size="150"
                      level="H"
                      class="rounded-lg border-4 border-neutral-50"
                    ></QrcodeVue>
                  </div>
                </div>
              </li>
            </RadioGroupOption>
          </RadioGroup>
        </div>
      </div>
    </div>
    <!--Payment button-->
    <div class="mt-auto flex justify-center px-6 pb-3">
      <button
        @click="submitOrder"
        class="w-[65%] rounded-lg bg-red-700 px-6 py-2 font-bold text-neutral-50 hover:bg-red-800"
        data-cy="pay-button"
      >
        Pay
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import {
  X as Clear,
  ChevronDown as Chevron,
  ChevronsUpDown as ListIcon,
  CheckCircle2 as Check,
  CreditCard as Card,
  Smartphone as Mobile,
} from 'lucide-vue-next'
import {
  RadioGroup,
  RadioGroupOption,
  RadioGroupLabel,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/vue'
import { vAutoAnimate } from '@formkit/auto-animate'
import QrcodeVue from 'qrcode.vue'
import { filter } from 'graphql-anywhere'
import { useMutation } from '@vue/apollo-composable'
import { computed } from '@vue/reactivity'
import { ref, watch } from 'vue'
import { useToast } from 'vue-toastification'
import { useRoute, useRouter } from 'vue-router'

import useCart from '../../composables/useCart'
import useUser from '../../composables/useUser'
import {
  CREATE_ORDER,
  ORDER_INPUT_FRAGMENT,
  EXTRA_INPUT_FRAGMENT,
} from '../../graphql/mutation.order'
import { getLocation } from 'graphql'

import bancontactURL from '../../assets/paymentMethods/bancontact.png'
import visaURL from '../../assets/paymentMethods/visa.png'
import paypalURL from '../../assets/paymentMethods/paypal.png'
import payconiqURL from '../../assets/paymentMethods/payconiq.png'

export default {
  components: {
    RadioGroup,
    RadioGroupOption,
    RadioGroupLabel,
    Clear,
    Chevron,
    ListIcon,
    Check,
    QrcodeVue,
    Mobile,
    Listbox,
    Card,
    ListboxButton,
    ListboxOption,
    ListboxOptions,
  },

  setup() {
    const route = useRoute()
    const toast = useToast()
    const { user } = useUser()
    const { push } = useRouter()
    const deliveryType = computed(() => route.query.type)
    const { cart, getCartTotal } = useCart()
    const searchQuery = computed(() => route.query)

    const selectedMethod = ref('')
    let times: string[] = []
    let time = new Date()
    const selectedTime = ref('As soon as possible')

    const city = ref('')

    enum postalCodes {
      Heule = 8501,
      Kortrijk = 8500,
      Bissegem = 8501,
      Marke = 8510,
      Bellegem = 8510,
      Kooigem = 8510,
      Rollegem = 8510,
      Aalbeke = 8511,
    }
    const submitOrder = async () => {
      if (selectedMethod.value === '') {
        toast.error('Please select a payment method')
        return
      }
      console.log('submitting order', cart.value)

      // filter cart items to match the correct OrderInput
      let orderItems = filter(
        ORDER_INPUT_FRAGMENT,
        cart.value.items.map((ci) => ci.item),
      )
      let extraItems = filter(
        EXTRA_INPUT_FRAGMENT,
        cart.value.extras.map((ci) => ci.item),
      )

      const location: any = await getLocation()
      console.log('location found', location)

      // create order mutation
      const { mutate: addOrder, onError } = useMutation(CREATE_ORDER, () => ({
        variables: {
          items: orderItems,
          extras: extraItems,
          address: 'test',
          lng: location?.coords.longitude,
          lat: location?.coords.latitude,
          time: Date.now(),
          deliveryType: deliveryType.value?.toString().toUpperCase(),
          paymentMethod: selectedMethod.value.toUpperCase(),
        },
      }))
      onError((err) => {
        console.log(err)
        toast.error(err.message || 'Something went wrong')
      })

      let res = await addOrder()

      if (res?.data.createOrder.id) {
        console.log('order created', res.data.createOrder.id)
        push({
          name: 'order',
          params: { id: res.data.createOrder.id },
          query: {
            ...searchQuery.value,
          },
        })
      }
    }

    watch(time, () => {
      makeTimes()
    })

    watch(city, () => {
      if (postalCodes[city.value]) {
        city.value = city.value + ' ' + postalCodes[city.value]
      }
      if (user.value?.city) {
        city.value = user.value?.city
      } else {
        city.value = city.value
      }
    })

    const getLocation = () => {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
      })
    }

    //list of postal codes
    const emptyInput = () => {
      city.value = ''
    }
    //function that makes a list of times in hour and minutes with a 15 minute interval and starting with 10:00 and ending with 23:00 and checkes if current time is in the list and if it is it will remove all times before the current time
    const makeTimes = () => {
      let hour = time.getHours()
      let minutes = time.getMinutes()
      let timeString = hour + ':' + minutes

      let timeNumber = Number(timeString.replace(':', '.'))
      let timeList = []
      timeList.push('As soon as possible')
      for (let i = 10; i < 23; i++) {
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
      console.log(times[0])
    }
    makeTimes()

    return {
      cart,
      user,
      times,
      postalCodes,
      deliveryType,
      selectedTime,
      city,
      selectedMethode: selectedMethod,

      getCartTotal,
      submitOrder,
      emptyInput,
      makeTimes,

      bancontactURL,
      visaURL,
      paypalURL,
      payconiqURL,
    }
  },
}
</script>
