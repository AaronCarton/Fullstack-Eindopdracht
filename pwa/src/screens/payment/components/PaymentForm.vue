<template>
  <form v-if="methode === 'visa'" action="" class="w-full px-3">
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
        <input class="px-1" type="text" maxlength="4" placeholder="ex. 0157" id="CC" />
      </div>
    </div>
  </form>
  <div v-else class="flex h-full flex-col items-center justify-center rounded-lg bg-red-700 p-6">
    <QrcodeVue
      :value="QRvalue"
      :size="150"
      level="H"
      class="border-4 border-neutral-50"
    ></QrcodeVue>
    <p class="font-bold text-neutral-50">Scan QR code above to pay</p>
  </div>
</template>
<script lang="ts">
import QrcodeVue from 'qrcode.vue'

export default {
  data() {
    return {
      QRvalue: 'https://www.youtube.com/watch?v=lpvT-Fciu-4',
    }
  },
  components: {
    QrcodeVue,
  },

  props: {
    methode: {
      type: String,
      required: false,
    },
  },
  setup() {
    return {
      QrcodeVue,
    }
  },
}
</script>
