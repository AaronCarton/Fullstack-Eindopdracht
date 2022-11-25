import gql from 'graphql-tag'

export const PIZZAS = gql`
  query pizzas {
    pizzas {
      id
      name
      description
      type
      toppings {
        id
        name
        price
        stock
      }
      basePrice
      totalPrice
    }
  }
`

export const PIZZA = gql`
  query pizza($id: String!) {
    pizza(id: $id) {
      id
      name
      description
      toppings {
        id
        name
        description
        category
        stock
        default
      }
    }
  }
`
