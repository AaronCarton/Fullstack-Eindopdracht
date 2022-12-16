import gql from 'graphql-tag'

export const CREATE_ORDER = gql`
  mutation CreateOrder(
    $time: DateTime!
    $address: String!
    $lat: Float!
    $lng: Float!
    $deliveryType: DeliveryType!
    $paymentMethod: String!
    $items: [CreatePizzaOrderInput!]!
    $extras: [CreateItemOrderInput!]!
  ) {
    createOrder(
      createOrderInput: {
        deliveryTime: $time
        deliveryType: $deliveryType
        address: $address
        lat: $lat
        lng: $lng
        paymentMethod: $paymentMethod
        items: $items
        extras: $extras
      }
    ) {
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

export const EXTRA_INPUT_FRAGMENT = gql`
  fragment OrderItem on Order {
    category
    name
    price
  }
`
