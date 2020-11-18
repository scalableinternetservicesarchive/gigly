import { gql } from '@apollo/client'

export const fetchListings = gql`
  query FetchListings {
    listings {
      id
      username
      price
      sellingName
      comments {
        commentContents
        userId
      }
    }
  }
`
export const fetchListing = gql`
  query FetchListing($listingId: Int!) {
    listing(listingId: $listingId) {
      price
      sellingName
      comments {
        commentContents
        userId
      }
    }
  }
`