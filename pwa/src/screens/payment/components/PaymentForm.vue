<template>
  <form v-if="methode === 'visa'" action="" class="w-full p-6">
    <div class="mb-6">
      <label for="kaartnr">Kaartnummer</label>
      <input type="text" id="kaartnr" class="w-full" />
    </div>
    <div class="flex w-full justify-between">
      <div class="flex gap-3">
        <label for="vdatum">Vervaldatum</label>
        <input type="text" id="vdatum" />
      </div>
      <div class="flex gap-3">
        <label for="CC">CVC / CVV</label>
        <input type="text" id="CC" />
      </div>
    </div>
  </form>
  <div v-else class="flex h-full w-full items-center justify-center rounded-lg bg-neutral-100 p-6">
    <h1 class="text-2xl font-bold">Betaling zal volgen na het drukken op pay</h1>
  </div>
</template>
<script lang="ts">
export default {
  props: {
    methode: {
      type: String,
      required: false,
    },
  },
  setup() {
    return {}
  },
}
</script>
