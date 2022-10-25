import gql from 'graphql-tag'

export const GET_OWN_ORDERS = gql`
  query {
    findOwnOrders {
      id
      status
      items {
        id
        name
        type
        size
        basePrice
        toppings {
          name
          default
        }
      }
      total
      createdAt
    }
  }
`
