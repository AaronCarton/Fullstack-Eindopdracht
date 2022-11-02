<template>
  <div>
    <a class="cursor-pointer py-2" @click="onClick(topping)">{{ topping.name }}</a>
  </div>
</template>

<script lang="ts">
import Topping from '../../../interfaces/topping.interface'
export default {
  props: {
    topping: {
      type: Object as () => Topping,
      required: true,
    },
    onClick: {
      type: Function,
      required: true,
    },
  },
}
</script>
