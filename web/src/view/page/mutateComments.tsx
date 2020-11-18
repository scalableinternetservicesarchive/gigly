import { ApolloClient, gql } from '@apollo/client'
import { AddComment, AddCommentVariables, CommentInput } from '../../graphql/query.gen'

const addCommentMutation = gql`
  mutation AddComment($input: CommentInput!) {
    addComment(comment: $input) {
      commentContents
      listing {
        id
      }
      userId
    }
  }
`

export function addComment(client: ApolloClient<any>, input: CommentInput) {
  return client.mutate<AddComment, AddCommentVariables>({
    mutation: addCommentMutation,
    variables: { input },
  })
}
