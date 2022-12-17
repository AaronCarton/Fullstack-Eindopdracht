<template>
  <div class="">
    <OverviewNav
      :section-change="sectionChange"
      class="col-start-1 col-end-5 row-start-1 row-end-1 mb-5 flex h-14 w-full items-center"
    />
    <div class="lg:scrollbar col-span-4 row-span-2 row-start-2 h-[90%] overflow-y-auto p-3">
      <OverviewList :section="currSection" />
    </div>
  </div>
</template>

<script lang="ts">
import { ref, Ref } from 'vue'

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
    }

    return {
      currSection,
      sectionChange,
    }
  },
}
</script>
