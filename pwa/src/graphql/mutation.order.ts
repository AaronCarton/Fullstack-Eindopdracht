import gql from 'graphql-tag'

export const CREATE_ORDER = gql`
  mutation CreateOrder($time: DateTime!, $address: String!, $items: [CreatePizzaOrderInput!]!) {
    createOrder(createOrderInput: { deliveryTime: $time, address: $address, items: $items }) {
      id
    }
  }
`

export const ORDER_INPUT_FRAGMENT = gql`
  fragment OrderItem on Order {
    name
    type
    size
    basePrice
    toppings {
      name
      category
      price
      default
    }
  }
`
