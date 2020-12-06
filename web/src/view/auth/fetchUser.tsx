// import { gql } from '@apollo/client'
import { ApolloClient, gql } from '@apollo/client'
import { EditUserInput, EditUserVariables } from '../../graphql/query.gen'
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
      userType
      number
      location
      image
    }
  }
`
const editUserMutation = gql`
  mutation EditUser($input: EditUserInput) {
    editUser(editInfo: $input) {
      id
      name
      number
      email
      location
      number
      about
      image
    }
  }
`

export function editUser(client: ApolloClient<any>, input: EditUserInput) {
  return client.mutate<EditUserInput, EditUserVariables>({
    mutation: editUserMutation,
    variables: { input },
  })
}

export const fetchUserFromID = gql`
  query FetchUserFromID($userId: Int!) {
    user(userId: $userId) {
      name
      number
      about
      email
      image
    }
  }
`
