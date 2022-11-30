<template>
  <div class="rating flex items-center gap-1">
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
    ratingChange: {
      type: Function,
      required: true,
    },
  },
  components: {
    Star,
  },
  setup(props) {
    const rating = ref(0)

    const click = (id: number) => {
      rating.value = id
      props.ratingChange(id)
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
.rating:hover .star {
  color: #facc15;
  scale: 1.3;
}
/* turn all stars after hovered star grey */
.rating .star:hover ~ .star {
  color: #d1d5db !important;
  scale: 1;
}
</style>
