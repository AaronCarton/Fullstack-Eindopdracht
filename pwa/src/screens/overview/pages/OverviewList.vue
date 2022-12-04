<template>
  <div>
    <div
      v-if="items"
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
        <p class="text-center text-2xl font-semibold">Loading...</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Card from '../components/Card.vue'
import { useQuery } from '@vue/apollo-composable'
import { PIZZAS } from '../../../graphql/query.pizza'
import { DRINKS } from '../../../graphql/query.item'
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
        default:
          items.value = []
          break
      }
    }
    getItems()

    return { items }
  },
}
</script>
