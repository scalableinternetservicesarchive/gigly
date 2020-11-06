import { gql } from '@apollo/client'

export const fetchUser = gql`
  query FetchUserContext {
    self(email:"rothfels@cs.ucla.edu") {
      id
      name
      userType
    }
  }
`
