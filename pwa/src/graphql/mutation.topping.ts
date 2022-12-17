import gql from 'graphql-tag'

export const UPDATE_TOPPING_STOCK = gql`
  mutation setToppingStock($id: String!, $amount: Float!) {
    setToppingStock(id: $id, amount: $amount) {
      id
      stock
    }
  }
`
