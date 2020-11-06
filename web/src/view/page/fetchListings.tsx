import { gql } from '@apollo/client'

export const fetchListings = gql`
  query FetchListings {
    listings {
      id
      username
      price
      sellingName
    }
  }
`
