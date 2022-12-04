<template>
  <div>
    <OverviewNav
      :section-change="sectionChange"
      class="col-start-1 col-end-5 row-start-1 row-end-1 mb-5 flex h-14 w-full items-center"
    />
    <div class="scrollbar col-span-4 row-span-2 row-start-2 h-[90%] overflow-y-auto p-3">
      <OverviewList :section="currSection" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ref, Ref } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { PIZZAS } from '../../../graphql/query.pizza'
import Pizza from '../../../interfaces/pizza.interface'

import OverviewNav from '../components/OverviewNav.vue'
import OverviewList from './OverviewList.vue'

export default {
  components: {
    OverviewList,
    OverviewNav,
  },
  setup() {
    let currSection: Ref<string> = ref('pizzas')

    const sectionChange = (section: string) => {
      currSection.value = section
      console.log('section change to', currSection.value)
    }

    return {
      currSection,
      sectionChange,
    }
  },
}
</script>
