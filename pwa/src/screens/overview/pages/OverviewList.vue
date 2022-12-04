<template>
  <div>
    <template v-if="items">
      <div
        v-if="items.length > 0"
        class="grid-rows-auto grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        <Card
          v-for="item of items"
          :key="item.id"
          :type="section === 'pizzas' ? 'items' : 'extras'"
          :item="item"
        />
      </div>
      <div v-else>
        <div class="col-span-3">
          <p class="mt-20 text-center text-2xl font-semibold text-white">Loading...</p>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="col-span-3">
        <p class="mt-20 text-center text-2xl font-semibold text-white">No items found</p>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import Card from '../components/Card.vue'
import { useQuery } from '@vue/apollo-composable'
import { PIZZAS } from '../../../graphql/query.pizza'
import { DRINKS, DESSERTS } from '../../../graphql/query.item'
import { watch, ref } from 'vue'

export default {
  props: {
    section: {
      type: String,
      required: true,
    },
  },
  components: {
    Card,
  },
  setup(props) {
    const items = ref()

    watch(
      () => props.section,
      () => {
        getItems()
      },
    )

    const getItems = () => {
      switch (props.section) {
        case 'pizzas':
          const { onResult: pRes } = useQuery(PIZZAS)
          pRes((result) => {
            items.value = result.data.pizzas
          })
          break
        case 'drinks':
          const { onResult: dRes } = useQuery(DRINKS)
          dRes((result) => {
            items.value = result.data.extraItemsByCategory
          })
          break
        case 'desserts':
          const { onResult: deRes } = useQuery(DESSERTS)
          deRes((result) => {
            items.value = result.data.extraItemsByCategory
          })
          break
        default:
          items.value = null
          break
      }
    }
    getItems()

    return { items }
  },
}
</script>
