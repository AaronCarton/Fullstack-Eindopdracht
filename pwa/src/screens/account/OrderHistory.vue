<template>
  <div class="w-full p-5">
    <h2 class="mb-4 text-xl font-medium">Order History</h2>
    <div>
      <table class="text-md w-full border-neutral-700 text-left text-neutral-800">
        <thead class="border-b-2 border-neutral-300 text-sm font-medium uppercase text-neutral-600">
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
              v-for="order in [...orders].reverse()"
              :key="order.id"
              class="border-b-2 border-neutral-300 last:border-b-0"
            >
              <td class="py-4 px-6">{{ order.id }}</td>
              <td class="py-4 px-6">
                {{
                  [...order.items.map((p) => p.name), ...order.extras.map((i) => i.name)].join(', ')
                }}
              </td>
              <td class="py-4 px-6">
                {{
                  new Date(order.createdAt).toLocaleDateString('en-EN', {
                    month: 'short',
                    day: '2-digit',
                    year: 'numeric',
                  })
                }}
              </td>
              <td class="py-4 px-6">€ {{ orderTotal(order) }}</td>
              <td class="py-4 px-6">
                <div
                  v-if="order.status === 'DELIVERED'"
                  class="rounded-lg bg-green-200 py-0.5 px-4 text-center font-bold text-green-500"
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
              <td class="py-4 px-6">
                <button
                  @click="
                    $router.push({
                      name: 'order',
                      params: { id: order.id },
                      query: {
                        type: order.deliveryType.toLowerCase(),
                      },
                    })
                  "
                  class="rounded-lg bg-red-700 px-4 py-1 font-bold text-neutral-50 hover:bg-red-800"
                >
                  View
                </button>
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
import Pizza, { isPizza } from '../../interfaces/pizza.interface'
import ExtraItem from '../../interfaces/extraItem.interface'
import { io } from 'socket.io-client'

export default {
  setup() {
    const { result, loading, error } = useQuery(GET_OWN_ORDERS)

    const orders = computed(() => (result.value?.findOwnOrders as Order[]) ?? [])
    const calculateTotal = (order: Order) =>
      order.items.reduce((acc, item) => {
        return acc + item.toppings.reduce((acc, topping) => acc + topping.price, 0)
      }, 0) + order.extras.reduce((acc, item) => acc + item.price, 0)

    watch(orders, (val) => console.log(val))

    const priceItem = (item: Pizza | ExtraItem) => {
      if (isPizza(item)) {
        let price = item.basePrice
        if (item.type === 'cheesyCrust') price += 5

        if (item.size === 'small') price -= 3
        else if (item.size === 'large') price += 3
        return item.toppings.reduce((total, t) => total + t.price, price).toFixed(2)
      } else {
        return item.price.toFixed(2)
      }
    }
    const orderTotal = (order: Order) => {
      return order.items.reduce((total, item) => {
        return total + parseFloat(priceItem(item))
      }, 0)
    }

    return {
      calculateTotal,
      orders,
      result,
      loading,
      error,

      orderTotal,
    }
  },
}
</script>
