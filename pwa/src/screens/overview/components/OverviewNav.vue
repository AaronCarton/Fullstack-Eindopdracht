<template>
  <div class="rounded-full bg-neutral-50 px-8 py-1">
    <ul class="flex items-center gap-6">
      <li>
        <RouterLink to="/">
          <Home class="fill h-6 w-6" />
        </RouterLink>
      </li>
      <li class="text-neutral-400 last:hidden">|</li>
      <template v-for="section in sections">
        <li>
          <button
            class="text-xl font-bold capitalize text-neutral-900 hover:text-neutral-600"
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
