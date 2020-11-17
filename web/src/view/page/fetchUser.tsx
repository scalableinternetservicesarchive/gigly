import { gql } from '@apollo/client'

export const fetchUser = gql`
  query FetchUser($userId: Int!) {
    user(userId: $userId) {
      name
    }
  }
`