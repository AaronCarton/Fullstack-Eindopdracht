<template>
  <div>
    <template v-if="items">
      <div
        v-if="items.length > 0"
        class="grid-rows-auto grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        data-cy="pizza-overview"
      >
        <Card
          v-for="item of items"
          :key="item.id"
          :type="section === 'pizzas' ? 'items' : 'extras'"
          :item="item"
        />
      </div>
      <div v-else>
        <div
          class="grid-rows-auto grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          <SkeletonView v-for="s of skeletons" :key="s" />
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
import { watch, ref, Ref } from 'vue'
import SkeletonView from '../components/SkeletonView.vue'

export default {
  props: {
    section: {
      type: String,
      required: true,
    },
  },
  components: {
    Card,
    SkeletonView,
  },
  setup(props) {
    const items = ref()
    const skeletons: Ref<number> = ref(6)

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

    return { items, skeletons }
  },
}
</script>
<style>
@keyframes pulse {
  50% {
    opacity: 0.5;
  }
}
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
