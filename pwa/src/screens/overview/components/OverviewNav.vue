<template>
  <div
    class="relative flex items-center justify-center rounded-full bg-neutral-50 px-2 py-1 lg:px-8"
  >
    <ul class="flex items-center justify-center gap-1 lg:gap-6">
      <li>
        <RouterLink to="/">
          <Home class="fill absolute left-6 top-4 h-6 w-6" />
        </RouterLink>
      </li>
      <template v-for="section in sections">
        <li>
          <button
            class="sm:text-md font-bold capitalize text-neutral-900 hover:text-neutral-600 lg:text-xl"
            @click="sectionChange(section)"
          >
            {{ section }}
          </button>
        </li>
        <li class="text-neutral-400 last:hidden">|</li>
      </template>
    </ul>
  </div>
</template>

<script lang="ts">
import { Home } from 'lucide-vue-next'

export default {
  props: {
    sectionChange: {
      type: Function,
      required: true,
    },
  },
  components: {
    Home,
  },

  setup() {
    const sections = ['pizzas', 'drinks', 'desserts']
    return { sections }
  },
}
</script>
