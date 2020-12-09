import { gql } from '@apollo/client'

export const fetchListings = gql`
  query FetchListings {
    listings {
      id
      username
      price
      sellingName
      startDate
      endDate
      location
      description
      image
      comments {
        commentContents
        userId
        username
        userPic
        date
      }
      tags {
        type
      }
      userId_ref
    }
  }
`
export const fetchListingsPaginated = gql`
  query FetchListingsPaginated($input: ListingInputPaginated!) {
    listingsPaginated(input: $input) {
      id
      username
      price
      sellingName
      startDate
      endDate
      location
      description
      image
      comments {
        commentContents
        userId
        username
        userPic
        date
      }
      tags {
        type
      }
      userId_ref
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
      image
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
      userId_ref
    }
  }
`
