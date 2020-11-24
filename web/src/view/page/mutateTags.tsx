import { ApolloClient, gql } from '@apollo/client'
import { AddTag, AddTagVariables, TagInput } from '../../graphql/query.gen'

const addTagMutation = gql`
  mutation AddTag($input: TagInput!) {
    addTag(tag: $input) {
      type
      listing {
        id
      }
    }
  }
`

export function addTag(client: ApolloClient<any>, input: TagInput) {
  return client.mutate<AddTag, AddTagVariables>({
    mutation: addTagMutation,
    variables: { input },
  })
}
