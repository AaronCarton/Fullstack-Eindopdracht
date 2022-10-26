import gql from 'graphql-tag'

export const TOPPINGS = gql`
  query toppings {
    toppings {
      id
      name
      price
    }
  }
`
