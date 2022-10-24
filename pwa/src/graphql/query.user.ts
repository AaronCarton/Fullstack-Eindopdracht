import gql from 'graphql-tag'

export const GET_SELF_USER = gql`
  query {
    self {
      id
      uid
      role
      street
      houseNumber
      city
    }
  }
`
