<template>
  <div class="fixed right-5 top-5">
    <div
      id="toast-default"
      :class="`${bgColor} flex w-full max-w-xs items-center rounded-lg p-4 text-white shadow dark:bg-gray-800 dark:text-gray-400`"
      role="alert"
    >
      <div class="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg">
        <Check v-if="type === 'success'" class="h-7 w-7 text-green-800" />
        <X v-else-if="type === 'error'" class="h-7 w-7 text-red-800" />
        <Alert v-else-if="type === 'warning'" class="h-7 w-7 text-amber-800" />
        <Info v-else-if="type === 'info'" class="h-7 w-7 text-blue-800" />
      </div>
      <div class="mx-3 text-base font-medium tracking-wide">{{ message }}</div>
      <button
        type="button"
        class="-mx-1.5 -my-1.5 ml-auto inline-flex h-8 w-8 rounded-lg p-1.5 text-gray-700 hover:text-gray-900"
        data-dismiss-target="#toast-default"
        aria-label="Close"
      >
        <span class="sr-only">Close</span>
        <X class="h-5 w-5" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed } from '@vue/reactivity'
import { Check, X, AlertTriangle, Info } from 'lucide-vue-next'
export default {
  components: {
    X,
    Info,
    Check,
    Alert: AlertTriangle,
  },
  props: {
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String as () => 'success' | 'error' | 'warning' | 'info',
      required: true,
    },
  },
  setup(props) {
    const bgColor = computed(() => {
      switch (props.type) {
        case 'success':
          return 'bg-green-500'
        case 'error':
          return 'bg-red-500'
        case 'warning':
          return 'bg-yellow-500'
        case 'info':
          return 'bg-blue-500'
      }
    })

    return { bgColor }
  },
}
</script>
