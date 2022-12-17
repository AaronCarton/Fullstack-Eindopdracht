import gql from 'graphql-tag'

export const REVIEWS = gql`
  query {
    reviews {
      id
      orderId
      customerId
      rating
      comment
      order {
        id
        deliveryType
        items {
          name
          basePrice
          toppings {
            name
            price
          }
        }
        extras {
          name
          price
        }
      }
    }
  }
`
