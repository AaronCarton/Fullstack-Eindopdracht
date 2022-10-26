<template>
  <div class="bg-[url(../HomeBG.jpg)] sm:bg-cover">
    <div class="bg-opacity-65 min-h-screen bg-black py-6 px-12 sm:px-60">
      <div class="grid-rows-auto grid grid-cols-4 gap-6">
        <OverviewNav class="col-start-1 col-end-4 row-start-1 row-end-1 flex items-center " />

        <!--<h2 class="font-title text-4xl text-neutral-50">Afhalen</h2>-->

        <div
          class="col-span-4 col-start-1 col-end-3 row-span-2 row-start-2 p-3 sm:col-span-3"
        >
          <div
            v-for="p of result.pizzas"
            :key="p.id"
            class="grid-rows-auto grid grid-cols-3"
          >
            <div class="row-start-auto rounded-lg max-h-120 bg-white">
              <div class="h-60">
                <img
                  :src="`./pizzas/${p.name}.jpg`"
                  :alt="`image of ${p.name} pizza`"
                  class="h-full w-full rounded-t-lg object-cover"
                />
              </div>
              <div class="flex flex-col p-3">
                <p class="mb-2 text-2xl font-semibold">{{ p.name }}</p>

                <p class="mb-6 font-semibold text-neutral-600 overflow-hidden max-h-12">
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
                <p class="text-xl font-semibold">€{{ p.totalPrice }}</p>
                <button
                  @click="addToCart(p)"
                  class=" self-center rounded-lg  px-6 py-2 font-bold  bg-red-700 text-neutral-50"
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
            <div class="flex items-center justify-between p-4 w-full">
              <p class="text-xl">1x</p>
              <h2 class="justify-self-start text-xl font-bold"> Margherita</h2>
              <p class="justify-self-end self-end text-xl">€16.99</p>
            </div>
            <div class="bg-neutral-200 w-full flex justify-between p-3 mt-110 mb-3 rounded-lg">
            <p class="text-xl font-bold">Totale prijs</p>
              <p class="text-xl">€16.99</p>
          </div>
            <button class="  rounded-lg  px-6 py-2 font-bold w-full bg-red-700 text-neutral-50">
              Checkout
            </button>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useQuery } from '@vue/apollo-composable'
import OverviewNav from '../../components/generic/OverviewNav.vue'
import { PIZZAS } from '../../graphql/query.pizza'

export default {
  setup() {
    const { result, loading, error } = useQuery(PIZZAS)
    const orders : any[] = []
    console.log(result.value)

    const addToCart = (pizza: any) => {
      orders.push(pizza)
      console.log(orders)
    }

    return {
      result,
      loading,
      error,
      orders,
      addToCart
    }
  },

  components: {
    OverviewNav,
  },
}
</script>
