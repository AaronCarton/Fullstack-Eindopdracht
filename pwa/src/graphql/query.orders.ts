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
export const GET_ACTIVE_ORDERS = gql`
  query {
    findActiveOrders {
      id
      status
      createdAt
      items {
        name
      }
    }
  }
`

export const GET_ORDER = gql`
  query order($id: String!) {
    order(id: $id) {
      id
      status
      items {
        name
        size
        type
        basePrice
        toppings {
          name
          default
          category
        }
      }
      createdAt
    }
  }
`
