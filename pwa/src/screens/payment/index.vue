<template>
  <div class="grid-rows-7 grid w-full gap-3 rounded-lg bg-neutral-50 p-3">
    <!--Payment methodes-->
    <div class="row-span-3 grid grid-cols-2 bg-neutral-200 p-6">
      <div class="col-span-1 flex flex-col justify-evenly">
        <h2 class="text-2xl font-bold">Betalings methodes</h2>
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
                class="h-25 w-25 rounded-lg object-fill peer-checked:ring-2 peer-checked:ring-red-400"
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
                class="h-25 w-25 rounded-lg peer-checked:ring-2 peer-checked:ring-red-600"
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
                class="h-25 w-25 rounded-lg peer-checked:ring-2 peer-checked:ring-red-600"
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
                class="h-25 w-25 rounded-lg peer-checked:ring-2 peer-checked:ring-red-600"
            /></label>
          </div>
        </div>
      </div>
      <div class="col-span-1 flex items-center">
        <PaymentForm :methode="m" />
      </div>
    </div>
    <!--Order summary-->
    <div class="row-span-3 bg-neutral-200">
      <p>{{}}</p>
    </div>
    <!--Payment button-->
    <div class="bottom-0 col-span-1 flex items-end justify-center">
      <button class="w-[65%] rounded-lg bg-red-700 px-6 py-2 font-bold text-neutral-50">Pay</button>
    </div>
  </div>
</template>
<script lang="ts">
import { Ref, ref, watch } from 'vue'
import useCart from '../../composables/useCart'
import PaymentForm from './components/PaymentForm.vue'
export default {
  components: {
    PaymentForm,
  },
  setup() {
    const { cart, getCartTotal } = useCart()
    let m: Ref<string> = ref('')
    watch(m, () => {
      const newMethode = m
      console.log(newMethode.value)
    })

    return { cart, PaymentForm, getCartTotal, m }
  },
}
</script>
