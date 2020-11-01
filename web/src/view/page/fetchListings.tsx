import { gql } from '@apollo/client'

export const fetchListings = gql`
  query FetchListings {
    listings {
      username
      price
      sellingName
    }
  }
`
