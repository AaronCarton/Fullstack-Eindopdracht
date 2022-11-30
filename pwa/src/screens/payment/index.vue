<template>
  <div class="flex w-full flex-col justify-between gap-1 overflow-auto rounded-lg bg-white p-6">
    <div>
      <h1 class="mb-6 text-center text-4xl font-bold">Checkout</h1>
      <!--Payment methodes-->
      <div class="grid grid-cols-2 gap-5">
        <div>
          <div class="flex flex-col gap-1">
            <h2 class="mb-3 text-lg font-semibold lg:text-2xl">Select a desired moment</h2>
            <select
              class="rounded-lg border-2 border-neutral-200 bg-white p-2"
              value="As fast as possible"
              id="time"
              v-if="times.length > 0"
            >
              <option value="As fast as possible" selected>As fast as possible</option>
              <option v-for="time in times" :key="time" :value="time">
                {{ time }}
              </option>
            </select>
            <select
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
            </select>
          </div>
          <div class="py-3">
            <h2 class="mb-3 text-lg font-semibold capitalize lg:text-2xl">
              {{ deliveryType }} address
            </h2>
            <div v-if="deliveryType === 'takeaway'">
              <div class="border-1 rounded-md border-neutral-400 bg-neutral-50 p-2">
                <p class="font-semibold">Restaurant Kortrijk</p>
                <p class="text-neutral-400">President Kennedylaan 100, 8500 Kortrijk</p>
              </div>
            </div>
            <div v-else>
              <div class="gap-3 rounded-lg">
                <div class="flex flex-col gap-1">
                  <label class="font-medium lg:text-lg" for="">Street name</label>
                  <input
                    type="text"
                    class="h-auto rounded-lg border-2 border-neutral-200 bg-white p-2"
                    placeholder="ex. Nowherestreet"
                    :value="user?.street"
                  />
                </div>
                <div class="col-span-1 flex flex-col gap-1">
                  <label class="font-medium lg:text-lg" for="">Street nr.</label>
                  <input
                    type="number"
                    class="h-auto rounded-lg border-2 border-neutral-200 bg-white p-2"
                    placeholder="ex. 155"
                    maxlength="4"
                    :value="user?.houseNumber"
                  />
                </div>
                <div class="col-span-1 flex flex-col gap-1">
                  <label class="font-medium lg:text-lg" for="pC">Postal code</label>
                  <div
                    class="flex justify-between rounded-lg border-2 border-neutral-200 p-2 peer-focus:border-red-400"
                  >
                    <input
                      type="text"
                      class="w-full bg-white focus:outline-none"
                      placeholder="ex. Kortrijk or 8500"
                      id="pC"
                      v-model="city"
                    />
                    <Clear @click="emptyInput()" class="cursor-pointer" />
                  </div>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2 class="mb-3 text-lg font-semibold capitalize lg:text-2xl">Payment Methodes</h2>
          <!-- <PaymentForm :methode="m" /> -->
          <RadioGroup v-model="selected">
            <RadioGroupOption class="" value="Online" v-slot="{ checked }">
              <li
                class="mb-3 list-none rounded-lg border-2 border-neutral-200 p-3 font-semibold text-neutral-600"
                :class="{
                  ' border-neutral-400  bg-neutral-100 text-neutral-900': checked,
                  ' bg-none': !checked,
                }"
              >
                <div v-auto-animate>
                  <div class="flex justify-between">
                    <span>Online Payment</span>
                    <Check v-show="checked" class="fill-green-600 stroke-green-50" />
                  </div>
                  <div
                    v-if="selected === 'Online'"
                    class="mt-3 border-t-2 border-neutral-400 bg-neutral-100 py-3"
                  >
                    <form action="" class="w-full">
                      <div class="mb-3">
                        <label class="font-semibold" for="kaartnr">Cart Number</label>
                        <input type="text" id="kaartnr" class="w-full px-1" />
                      </div>
                      <div class="flex w-full flex-col justify-between gap-2">
                        <div class="flex flex-col gap-3 lg:flex-row">
                          <label class="font-semibold" for="vdatum">Expire Date</label>
                          <input class="px-1" type="month" id="vdatum" placeholder="02-2203" />
                        </div>
                        <div class="flex flex-col gap-3 lg:flex-row">
                          <label class="font-semibold" for="CC">CVC / CVV</label>
                          <input
                            class="px-1"
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

            <RadioGroupOption value="Mobile" v-slot="{ checked }">
              <li
                class="mb-3 list-none rounded-lg border-2 border-neutral-200 p-3 font-semibold text-neutral-600"
                :class="{
                  ' border-neutral-400  bg-neutral-100 text-neutral-900': checked,
                  ' bg-none': !checked,
                }"
              >
                <div v-auto-animate>
                  <div class="flex justify-between">
                    <span>Mobile Payment</span>
                    <Check v-show="checked" class="fill-green-600 stroke-green-50" />
                  </div>
                  <div
                    v-if="selected === 'Mobile'"
                    class="mt-3 border-t-2 border-neutral-400 bg-neutral-100 py-3"
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
          </RadioGroup>
        </div>
      </div>
    </div>
    <!--Payment button-->
    <div class="flex justify-center">
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
import { X as Clear, ChevronDown as Chevron, CheckCircle2 as Check } from 'lucide-vue-next'
import { RadioGroup, RadioGroupOption, RadioGroupLabel } from '@headlessui/vue'
import { vAutoAnimate } from '@formkit/auto-animate'
import QrcodeVue from 'qrcode.vue'

export default {
  components: {
    PaymentForm,
    RadioGroup,
    RadioGroupOption,
    RadioGroupLabel,
    Clear,
    Chevron,
    Check,
    QrcodeVue,
  },

  setup() {
    const route = useRoute()
    const selected = ref('Online')
    const showFormM = ref(false)
    const { user } = useUser()
    let times: string[] = []
    let time = new Date()
    const { cart, getCartTotal } = useCart()
    let m: Ref<string> = ref('')
    const deliveryType = computed(() => route.query.type)
    console.log(new Date().getHours())
    const selectedTime = ref(times[0])
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

    watch(m, () => {
      const newMethode = m
      console.log(newMethode.value)
    })

    watch(time, () => {
      makeTimes()
    })

    watch(city, () => {
      console.log(city.value)
      if (postalCodes[city.value as keyof typeof postalCodes]) {
        console.log('true')
        city.value = city.value + ' ' + postalCodes[city.value as keyof typeof postalCodes]
      }
      if (user.value?.city) {
        city.value = user.value?.city
      } else {
        city.value = city.value
      }
    })

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
      postalCodes,
      deliveryType,
      selectedTime,
      city,
      emptyInput,
      selected,
      showFormM,
    }
  },
}
</script>
