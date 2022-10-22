import gql from 'graphql-tag'

export const GET_SELF_USER = gql`
  query {
    findUser {
      id
      uid
      street
      houseNumber
      city
    }
  }
`
