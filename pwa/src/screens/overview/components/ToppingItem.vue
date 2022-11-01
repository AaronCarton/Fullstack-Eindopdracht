<template>
  <div>
    <a href="">{{ topping.name }}</a>
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
