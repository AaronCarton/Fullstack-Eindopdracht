import gql from 'graphql-tag'

export const GET_OWN_ORDERS = gql`
  query {
    findOwnOrders {
      id
      status
      deliveryType
      extras {
        name
        price
      }
      items {
        name
        type
        size
        basePrice
        toppings {
          name
          default
          category
          price
        }
      }
      createdAt
    }
  }
`
export const GET_ACTIVE_ORDERS = gql`
  query {
    findActiveOrders {
      id
      status
      lng
      lat
      createdAt
      items {
        name
      }
      extras {
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
      lng
      lat
      reviewId
      review {
        rating
        comment
      }
      items {
        name
        size
        type
        basePrice
        toppings {
          name
          default
          category
          price
        }
      }
      extras {
        category
        name
        price
      }
      createdAt
    }
  }
`
