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
export const fetchUser2 = gql`
  query FetchUserContext2($email: String!) {
    self(email: $email) {
      id
      name
      userType
      password
    }
  }
`

export const fetchUser3 = gql`
  query FetchUserContext3 {
    self2 {
      id
      email
      password
      name
    }
  }
`

