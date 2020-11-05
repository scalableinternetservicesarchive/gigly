import { gql } from '@apollo/client'

export const fetchComments = gql`
  query FetchComments {
    comments {
      listingId
      username
      commentContents
    }
  }
`