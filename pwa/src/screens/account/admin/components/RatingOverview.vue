<template>
  <div>
    <p class="text-lg font-medium dark:text-gray-400">{{ reviews.length }} global ratings</p>
    <div class="mt-4 flex items-center">
      <span class="text-sm font-medium">5 star</span>
      <div class="mx-4 h-5 w-2/4 rounded bg-gray-200 dark:bg-gray-700">
        <div class="h-5 rounded bg-yellow-400" :style="`width: ${getRatingPercentage(5)}%`"></div>
      </div>
      <span class="text-sm font-medium">{{ getRatingPercentage(5) }}%</span>
    </div>
    <div class="mt-4 flex items-center">
      <span class="text-sm font-medium">4 star</span>
      <div class="mx-4 h-5 w-2/4 rounded bg-gray-200 dark:bg-gray-700">
        <div class="h-5 rounded bg-yellow-400" :style="`width: ${getRatingPercentage(4)}%`"></div>
      </div>
      <span class="text-sm font-medium">{{ getRatingPercentage(4) }}%</span>
    </div>
    <div class="mt-4 flex items-center">
      <span class="text-sm font-medium">3 star</span>
      <div class="mx-4 h-5 w-2/4 rounded bg-gray-200 dark:bg-gray-700">
        <div class="h-5 rounded bg-yellow-400" :style="`width: ${getRatingPercentage(3)}%`"></div>
      </div>
      <span class="text-sm font-medium">{{ getRatingPercentage(3) }}%</span>
    </div>
    <div class="mt-4 flex items-center">
      <span class="text-sm font-medium">2 star</span>
      <div class="mx-4 h-5 w-2/4 rounded bg-gray-200 dark:bg-gray-700">
        <div class="h-5 rounded bg-yellow-400" :style="`width: ${getRatingPercentage(2)}%`"></div>
      </div>
      <span class="text-sm font-medium">{{ getRatingPercentage(2) }}%</span>
    </div>
    <div class="mt-4 flex items-center">
      <span class="text-sm font-medium">1 star</span>
      <div class="mx-4 h-5 w-2/4 rounded bg-gray-200 dark:bg-gray-700">
        <div class="h-5 rounded bg-yellow-400" :style="`width: ${getRatingPercentage(1)}%`"></div>
      </div>
      <span class="text-sm font-medium">{{ getRatingPercentage(1) }}%</span>
    </div>
  </div>
</template>

<script lang="ts">
import Review from '../../../../interfaces/review.interface'

export default {
  props: {
    reviews: {
      type: Array as () => Review[],
      required: true,
    },
  },
  setup(props) {
    const getRatingPercentage = (rating: number) => {
      const total = props.reviews.length
      const ratingCount = props.reviews.filter((review) => review.rating === rating).length
      return Math.round((ratingCount / total) * 100)
    }

    return { getRatingPercentage }
  },
}
</script>
