import gql from 'graphql-tag'

export const CREATE_ORDER = gql`
  mutation CreateOrder($items: [CreatePizzaOrderInput!]!) {
    createOrder(createOrderInput: { items: $items }) {
      id
    }
  }
`
