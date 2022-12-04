import gql from 'graphql-tag'

export const DRINKS = gql`
  query {
    extraItemsByCategory(category: "drink") {
      id
      name
      description
      category
      price
      stock
      createdAt
      updatedAt
    }
  }
`
