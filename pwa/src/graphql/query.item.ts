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

export const DESSERTS = gql`
  query {
    extraItemsByCategory(category: "dessert") {
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
