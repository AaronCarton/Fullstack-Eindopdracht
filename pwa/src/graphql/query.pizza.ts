import gql from 'graphql-tag'

export const PIZZAS = gql`
  query pizzas {
    pizzas {
      id
      name
      description
      type
      cheesyCrust
      toppings {
        id
        name
        price
      }
      basePrice
      totalPrice
    }
  }
`
