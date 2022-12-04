<template>
  <button
    @click="setIsOpen(true)"
    class="fixed right-3 bottom-3 rounded-full bg-neutral-700 p-4 shadow-md hover:bg-gray-800 xl:hidden"
  >
    <span
      v-if="cart.items.length > 0"
      class="absolute top-0 left-0 -m-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-red-700 text-xs font-bold leading-none text-white"
      >{{ totalItems }}</span
    >
    <span v-else> </span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-8 w-8 text-neutral-50"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
  </button>

  <TransitionRoot appear as="template" :show="isOpen">
    <Dialog
      :initialFocus="checkoutButtonRef"
      class="fixed inset-0 z-10 overflow-hidden"
      :open="isOpen"
      @close="setIsOpen"
    >
      <TransitionChild
        enter="transition-opacity ease-in-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="transition-opacity ease-in-out duration-300"
        leave-from="opacity-100"
        leave-to="opacity-0"
        as="template"
      >
        <DialogOverlay class="absolute inset-0 bg-black bg-opacity-40" />
      </TransitionChild>

      <TransitionChild
        enter="transform ease-in-out transition-transform duration-300"
        enter-from="translate-x-full"
        enter-to="translate-x-0"
        leave="transform ease-in-out transition-transform duration-300"
        leave-from="translate-x-0"
        leave-to="translate-x-full"
        as="template"
      >
        <div class="fixed inset-y-0 right-0 flex w-full max-w-sm flex-col bg-white">
          <div class="flex items-center justify-between p-4 shadow">
            <div>
              <DialogTitle class="text-xl font-bold">Cart summary</DialogTitle>
              <h2 class="text-md font-semibold text-neutral-500">{{ deliveryType }}</h2>
            </div>
            <button
              @click="setIsOpen(false)"
              class="rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-neutral-200 focus:ring-offset-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div class="flex flex-1 flex-col">
            <div class="relative flex-1">
              <div class="absolute inset-0 overflow-y-scroll">
                <div class="flex flex-col divide-y divide-gray-100">
                  <div v-for="{ id, item } in cart.items" :key="id" class="w-full p-4">
                    <div class="flex flex-col">
                      <div class="flex items-center justify-between">
                        <h3 class="justify-self-start text-xl font-semibold leading-tight">
                          {{ item.name }}
                        </h3>
                        <p class="mt-2 justify-self-end leading-normal text-gray-800">
                          €{{ priceItem(item) }}
                        </p>
                      </div>
                      <div class="flex justify-between">
                        <p
                          class="whitespace-nowrap align-middle text-sm font-medium capitalize text-neutral-400"
                        >
                          {{ item.size }} {{ item.type }}
                        </p>
                        <!-- TODO: add edit and delete button -->
                        <div class="flex gap-3">
                          <Edit
                            class="h-4 w-4 cursor-pointer stroke-neutral-900"
                            @click="editItem(id, item), setIsOpen(false)"
                          />
                          <Delete
                            class="h-4 w-4 cursor-pointer text-red-700"
                            @click="deleteItem(id, item), setIsOpen(false)"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-for="{ id, item } in cart.extras" :key="id" class="w-full p-4">
                    <div class="flex flex-col">
                      <div class="flex items-center justify-between">
                        <h3 class="justify-self-start text-xl font-semibold leading-tight">
                          {{ item.name }}
                        </h3>
                        <p class="mt-2 justify-self-end leading-normal text-gray-800">
                          €{{ item.price }}
                        </p>
                      </div>
                      <div class="flex justify-between">
                        <p
                          class="whitespace-nowrap align-middle text-sm font-medium capitalize text-neutral-400"
                        >
                          {{ item.category }}
                        </p>
                        <!-- TODO: add edit and delete button -->
                        <div class="flex gap-3">
                          <Edit
                            class="h-4 w-4 cursor-pointer stroke-neutral-900"
                            @click="editItem(id, item), setIsOpen(false)"
                          />
                          <Delete
                            class="h-4 w-4 cursor-pointer text-red-700"
                            @click="deleteItem(id, item), setIsOpen(false)"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-neutral-50 py-6 px-4">
              <div
                class="flex items-center justify-between gap-4 rounded-lg bg-neutral-200 px-3 py-2"
              >
                <div class="text-center text-xl font-semibold">Total price</div>
                <div class="text-center text-xl font-semibold">€{{ getCartTotal() }}</div>
              </div>
              <div class="mt-4 flex flex-col space-y-2">
                <RouterLink
                  class="rounded-lg bg-red-700 p-3 text-center font-bold text-white hover:bg-red-800 focus:ring-2 focus:ring-red-400"
                  to="/overview/payment"
                  @click="setIsOpen(false)"
                >
                  Checkout
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </TransitionChild>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts">
import { ref } from 'vue'
import {
  Dialog,
  DialogDescription,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import useCart from '../../../composables/useCart'
import { Trash as Delete, Pencil as Edit } from 'lucide-vue-next'
import { useRoute, useRouter } from 'vue-router'
import { computed } from '@vue/reactivity'
import Pizza, { isPizza } from '../../../interfaces/pizza.interface'
import ExtraItem from '../../../interfaces/extraItem.interface'
export default {
  components: {
    Dialog,
    DialogOverlay,
    DialogTitle,
    DialogDescription,
    TransitionRoot,
    TransitionChild,
    Edit,
    Delete,
  },
  setup() {
    const { cart, getCartTotal, removeFromCart } = useCart()
    const { push } = useRouter()
    const route = useRoute()

    const totalItems = computed(() => {
      return cart.value.items.length + cart.value.extras.length
    })

    // TODO: get cart from localstorage
    const searchQuery = computed(() => route.query)
    let isOpen = ref(false)
    let checkoutButtonRef = ref(null)
    const priceItem = (item: any) => {
      let price = item.basePrice

      if (item.size === 'small') price -= 3
      else if (item.size === 'large') price += 3
      //@ts-ignore
      return (price + item.toppings.reduce((acc, t) => acc + t.price, 0)).toFixed(2)
    }

    const editItem = (id: string, item: any) => {
      push({
        name: 'customize',
        params: { id: item.id },
        query: { item: id, type: searchQuery.value.type },
      })
    }
    const deleteItem = (id: string, item: Pizza | ExtraItem) => {
      const isCurrentItem = searchQuery.value.item == id
      removeFromCart(isPizza(item) ? 'items' : 'extras', id)
      // TODO: remove from localstorage

      if (isCurrentItem) {
        push({
          path: '/overview',
          query: { ...searchQuery.value, item: undefined },
        })
      }
    }
    return {
      //Cart
      cart,
      totalItems,
      priceItem,
      getCartTotal,
      editItem,
      deleteItem,
      deliveryType: searchQuery.value.type,
      checkoutButtonRef,
      isOpen,
      // @ts-ignore
      setIsOpen(value) {
        isOpen.value = value
      },
    }
  },
}
</script>
