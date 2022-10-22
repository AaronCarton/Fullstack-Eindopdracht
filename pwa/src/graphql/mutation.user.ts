import gql from 'graphql-tag'

export const CREATE_NEW_USER = gql`
  mutation CreateUser($uid: String!) {
    createUser(createUserInput: { uid: $uid }) {
      id
      uid
      street
      houseNumber
      city
    }
  }
`
