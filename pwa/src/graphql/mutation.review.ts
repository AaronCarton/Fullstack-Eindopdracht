import gql from 'graphql-tag'

export const ADD_REVIEW = gql`
  mutation createReview($orderId: String!, $rating: Float!, $comment: String!) {
    createReview(createReviewInput: { orderId: $orderId, rating: $rating, comment: $comment }) {
      id
      orderId
      customerId
      rating
      comment
    }
  }
`
