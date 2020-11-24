import { gql } from '@apollo/client'

export const fetchListings = gql`
  query FetchListings {
    listings {
      id
      username
      price
      sellingName
      image
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
      username
      price
      sellingName
      startDate
      endDate
      location
      description
      comments {
        date
        commentContents
        userId
        username
        userPic
      }
      tags {
        type
      }
    }
  }
`
