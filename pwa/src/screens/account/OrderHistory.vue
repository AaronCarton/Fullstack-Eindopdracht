<template>
  <div class="w-3/4 p-5">
    <h2 class="mb-4 text-xl font-bold">Order History</h2>
    <div>
      <table class="text-md w-full border-neutral-700 text-left text-neutral-800">
        <thead class="text-sm uppercase text-neutral-600">
          <tr>
            <th scope="col" class="py-3 px-6">Order ID</th>
            <th scope="col" class="py-3 px-6">Items</th>
            <th scope="col" class="py-3 px-6">Order Date</th>
            <th scope="col" class="py-3 px-6">Price</th>
            <th scope="col" class="py-3 px-6">Status</th>
          </tr>
        </thead>
        <tbody class="">
          <template v-if="orders.length > 0">
            <tr
              v-for="order in orders"
              :key="order.id"
              class="border-b-2 border-neutral-300 last:border-b-0"
            >
              <td class="py-4 px-6">{{ order.id }}</td>
              <td class="py-4 px-6">{{ order.items.map((p) => p.name).toString() }}</td>
              <td class="py-4 px-6">
                {{ new Date(order.createdAt).toLocaleDateString() }}
              </td>
              <td class="py-4 px-6">€ {{ order.total }}</td>
              <td class="py-4 px-6">
                <div
                  v-if="order.status === 'delivered'"
                  class="rounded-lg bg-green-200 py-0.5 text-center font-bold text-green-500"
                >
                  Delivered
                </div>
                <div
                  v-else
                  class="rounded-lg bg-amber-200 py-0.5 text-center font-bold capitalize text-yellow-600"
                >
                  {{ order.status }}
                </div>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr class="text-center font-bold uppercase text-neutral-400">
              <td class="px-6 pb-9 pt-11" colspan="5">No orders yet</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { GET_OWN_ORDERS } from '../../graphql/query.orders'
import { computed, watch } from 'vue-demi'
import Order from '../../interfaces/order.interface'

export default {
  setup() {
    const { result, loading, error } = useQuery(GET_OWN_ORDERS)

    const orders = computed(() => (result.value?.findOwnOrders as Order[]) ?? [])
    watch(orders, (val) => console.log(val))

    return {
      orders,
      result,
      loading,
      error,
    }
  },
}
</script>
