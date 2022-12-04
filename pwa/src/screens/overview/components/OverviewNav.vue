<template>
  <div class="rounded-full bg-neutral-50 px-8 py-1">
    <ul class="flex items-center gap-6">
      <li>
        <RouterLink to="/">
          <Home class="fill h-6 w-6" />
        </RouterLink>
      </li>
      <li class="text-neutral-400">|</li>
      <li>
        <button
          class="text-xl font-bold text-neutral-900 hover:text-neutral-600"
          @click="sectionChange('pizzas')"
        >
          Pizza
        </button>
      </li>
      <li class="text-neutral-400">|</li>
      <li>
        <button
          class="text-xl font-bold text-neutral-900 hover:text-neutral-600"
          @click="sectionChange('drinks')"
        >
          Drinks
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { ref, Ref, watch } from 'vue'
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
    return {}
  },
}
</script>
