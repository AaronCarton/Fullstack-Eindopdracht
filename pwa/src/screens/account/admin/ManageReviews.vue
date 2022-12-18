<template>
  <div class="flex h-full py-5 px-8">
    <div class="flex w-1/2 flex-col">
      <RatingOverview class="w-full" :reviews="reviews" />
    </div>
    <div class="flex h-full w-1/2 flex-col gap-4 overflow-y-scroll p-4">
      <template v-if="reviews.length > 0">
        <ReviewCard v-for="review in reviews" :review="review" />
      </template>
      <template v-else>
        <div class="text-center">
          <p class="text-lg font-medium dark:text-gray-400">No reviews yet</p>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { ref } from 'vue-demi'

import { REVIEWS } from '../../../graphql/query.review'
import Review from '../../../interfaces/review.interface'
import ReviewCard from './components/ReviewCard.vue'
import RatingOverview from './components/RatingOverview.vue'

export default {
  components: {
    ReviewCard,
    RatingOverview,
  },
  setup() {
    const reviews = ref<Review[]>([])
    const { result, loading, onResult } = useQuery(REVIEWS)

    onResult((result) => {
      reviews.value = result.data.reviews
    })
    return { result, loading, reviews }
  },
}
</script>
