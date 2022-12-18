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

export const UPDATE_USER_ROLE = gql`
  mutation UpdateUserRole($uid: String!, $role: Role!) {
    updateUserRole(uid: $uid, role: $role) {
      id
      uid
      role
    }
  }
`
