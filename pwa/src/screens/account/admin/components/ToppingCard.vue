<template>
  <div class="flex flex-col rounded-lg bg-white">
    <div class="relative flex h-40 items-center justify-center">
      <img :src="`/assets/toppings/${topping.name}.png`" class="h-1/4 w-1/4 rounded-t-lg" />
    </div>
    <div class="flex flex-col justify-between">
      <div class="flex grow justify-between px-3 pt-3 pb-2 align-top">
        <p class="mb-2 text-lg font-semibold">{{ topping.name }}</p>
        <div class="flex items-center gap-3">
          <Edit class="h-5 w-5 cursor-pointer" />
          <Delete class="h-5 w-5 cursor-pointer text-red-700" />
        </div>
      </div>
      <div class="mb-3 self-center">
        <button
          @click="stock--"
          class="rounded-l-lg bg-red-700 py-1 px-3 text-white active:bg-red-800"
        >
          -
        </button>
        <input
          class="w-12 appearance-none bg-red-800 py-1 text-center font-medium text-white outline-none"
          type="number"
          name="stock"
          v-model="stock"
        />
        <button
          @click="stock++"
          class="rounded-r-lg bg-red-700 py-1 px-3 text-white active:bg-red-800"
        >
          +
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, watch } from 'vue'
import { Trash as Delete, Pencil as Edit } from 'lucide-vue-next'

import Topping from '../../../../interfaces/topping.interface'
import { UPDATE_TOPPING_STOCK } from '../../../../graphql/mutation.topping'
import { useMutation } from '@vue/apollo-composable'
import { useToast } from 'vue-toastification'

export default {
  props: {
    topping: {
      type: Object as () => Topping,
      required: true,
    },
  },
  components: {
    Edit,
    Delete,
  },
  setup(props) {
    const toast = useToast()
    const stock = ref<number>(props.topping.stock)

    watch(stock, (newStock, oldStock) => {
      console.log(newStock)

      const { mutate, onError } = useMutation(UPDATE_TOPPING_STOCK, {
        variables: {
          id: props.topping.id,
          amount: newStock,
        },
      })
      mutate()
      onError((error) => {
        console.log(error)
        toast.error(`Failed to update topping stock, ${error.message}`)
        stock.value = oldStock
      })
    })

    return { stock }
  },
}
</script>
