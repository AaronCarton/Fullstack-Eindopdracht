<template>
  <div class="main-bg sm:bg-cover">
    <div class="bg-opacity-65 min-h-screen bg-black py-6 px-12 sm:px-60">
      <div class="grid-rows-auto grid grid-cols-4 gap-6">
        <OverviewNav class="col-start-1 col-end-4 row-start-1 row-end-1 flex items-center" />

        <!--<h2 class="font-title text-4xl text-neutral-50">Afhalen</h2>-->

        <div class="col-span-4 col-start-1 col-end-3 row-span-2 row-start-2 p-3 sm:col-span-3">
          <div v-for="p of result.pizzas" :key="p.id" class="grid-rows-auto grid grid-cols-3">
            <div class="max-h-120 row-start-auto rounded-lg bg-white">
              <div class="h-60">
                <img
                  :src="`./pizzas/${p.name}.jpg`"
                  :alt="`image of ${p.name} pizza`"
                  class="h-full w-full rounded-t-lg object-cover"
                />
              </div>
              <div class="flex flex-col p-3">
                <p class="mb-2 text-2xl font-semibold">{{ p.name }}</p>

                <p class="mb-6 font-semibold text-neutral-600">
                  {{
                    p.toppings
                      //@ts-ignore
                      .map((t) => t.name)
                      .toString()
                      .split(',')
                      .join(', ')
                  }}
                </p>
                <div class="flex items-center justify-between">
                  <p class="justify-end text-xl font-semibold">€{{ p.totalPrice + 2 }}</p>
                  <button
                    class="self-center justify-self-center rounded-lg bg-red-700 px-6 py-2 font-bold text-neutral-50"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="row-end-8 col-span-1 col-start-4 row-span-1 row-start-1 hidden flex-col rounded-lg bg-neutral-50 p-3 sm:flex"
        >
          <h2 class="text-2xl font-semibold">Order</h2>
          <div class="flex w-full items-center justify-between p-4">
            <p class="text-xl">1x</p>
            <h2 class="justify-self-start text-xl font-bold">Margherita</h2>
            <p class="self-end justify-self-end text-xl">€18.99</p>
          </div>
          <div class="mt-110 mb-3 flex w-full justify-between rounded-lg bg-neutral-200 p-3">
            <p class="text-xl font-bold">Total price</p>
            <p class="text-xl">€18.99</p>
          </div>
          <button class="w-full rounded-lg bg-red-700 px-6 py-2 font-bold text-neutral-50">
            Checkout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useQuery } from '@vue/apollo-composable'
import OverviewNav from '../../../components/generic/OverviewNav.vue'
import { PIZZAS } from '../../../graphql/query.pizza'

export default {
  setup() {
    const { result, loading, error } = useQuery(PIZZAS)

    console.log(result.value)

    return {
      result,
      loading,
      error,
    }
  },

  components: {
    OverviewNav,
  },
}
</script>
