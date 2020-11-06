import { gql } from '@apollo/client'

export const fetchUser = gql`
  query FetchUserContext {
    self(email: "r@gmail.com") {
      id
      name
      userType
    }
  }
`
