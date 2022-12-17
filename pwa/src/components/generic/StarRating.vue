<template>
  <div :class="`rating flex items-center gap-1 ${disabled ? 'disabled' : ''}`">
    <Star :num="1" :active="rating >= 1" :click="click" />
    <Star :num="2" :active="rating >= 2" :click="click" />
    <Star :num="3" :active="rating >= 3" :click="click" />
    <Star :num="4" :active="rating >= 4" :click="click" />
    <Star :num="5" :active="rating >= 5" :click="click" />
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import Star from './Star.vue'
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      required: true,
    },
    ratingChange: {
      type: Function,
      required: true,
    },
  },
  components: {
    Star,
  },
  setup(props) {
    const rating = ref(props.rating)

    const click = (id: number) => {
      if (props.disabled) return
      props.ratingChange(id)
      rating.value = id
    }

    return {
      rating,

      click,
    }
  },
}
</script>

<style>
.rating .active {
  color: #facc15 !important;
}
/* by default be grey */
.rating .star {
  color: #d1d5db;
  transition: scale 0.25s linear;
}
/* when hovering parent turn all yellow */
.rating:hover:not(.disabled) .star {
  color: #facc15;
  scale: 1.3;
}
/* turn all stars after hovered star grey */
.rating:not(.disabled) .star:hover ~ .star {
  color: #d1d5db !important;
  scale: 1;
}
</style>
