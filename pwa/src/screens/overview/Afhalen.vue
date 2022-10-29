<template>
  <div class="bg-[url(../HomeBG.jpg)] sm:bg-cover">
    <div class="bg-opacity-65 min-h-screen bg-black py-6 px-12 sm:px-60">
      <div class="grid-rows-auto grid grid-cols-4 gap-6">
        <OverviewNav
          class="col-start-1 col-end-4 row-start-1 row-end-1 flex items-center"
        />

        <!--<h2 class="font-title text-4xl text-neutral-50">Afhalen</h2>-->

        <div
          class="col-span-4 col-start-1 col-end-3 row-span-2 row-start-2 p-3 sm:col-span-3"
        >
          <div v-for="p of pizzas" :key="p.id" class="grid-rows-auto grid grid-cols-3">
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

                <p class="mb-6 max-h-12 overflow-hidden font-semibold text-neutral-600">
                  {{
                    p.toppings
                      .map((t) => t.name)
                      .toString()
                      .split(',')
                      .join(', ')
                  }}
                </p>
                <div class="flex items-center justify-between">
                  <p class="text-xl font-semibold">€{{ p.totalPrice }}</p>
                  <button
                    @click="addToCart(p)"
                    class="self-center rounded-lg bg-red-700 px-6 py-2 font-bold text-neutral-50"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Cart />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { PIZZAS } from '../../graphql/query.pizza'
import Cart from '../../components/generic/Cart.vue'
import Pizza from '../../interfaces/pizza.interface'
import OverviewNav from '../../components/generic/OverviewNav.vue'

export default {
  components: {
    Cart,
    OverviewNav,
  },
  setup() {
    const { result, loading, error } = useQuery(PIZZAS)
    const orders: any[] = []
    console.log(result.value)

    const addToCart = (pizza: any) => {
      orders.push(pizza)
      console.log(orders)
    }

    const pizzas = computed(() => (result.value?.pizzas as Pizza[]) ?? [])

    return {
      result,
      loading,
      error,

      pizzas,
      orders,
      addToCart,
    }
  },
}
</script>
