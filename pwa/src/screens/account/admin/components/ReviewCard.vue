<template>
  <div class="rounded-lg border border-gray-300 bg-gray-100 px-3 py-2 shadow">
    <Rating :rating="review.rating" />
    <p class="my-2">{{ review.comment }}</p>
    <div class="m-1 flex justify-between text-sm text-gray-500">
      <p>
        <span class="capitalize">{{ review.order.deliveryType.toLowerCase() }}</span> for
        {{
          [
            ...review.order.items.map((i) => i.name),
            ...review.order.extras.map((e) => e.name),
          ].join(', ')
        }}
      </p>
      <p>€ {{ orderTotal }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue'
import ExtraItem from '../../../../interfaces/extraItem.interface'
import Pizza, { isPizza } from '../../../../interfaces/pizza.interface'
import Review from '../../../../interfaces/review.interface'
import Rating from './Rating.vue'

export default {
  props: {
    review: {
      type: Object as () => Review,
      required: true,
    },
  },
  components: {
    Rating,
  },
  setup({ review: { order } }) {
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
    const orderTotal = computed(() => {
      const itemsTotal = order.items.reduce((total, item) => {
        return total + parseFloat(priceItem(item))
      }, 0)
      const extrasTotal = order.extras.reduce((total, item) => {
        return total + item.price
      }, 0)

      return (itemsTotal + extrasTotal).toFixed(2)
    })

    return { orderTotal }
  },
}
</script>
