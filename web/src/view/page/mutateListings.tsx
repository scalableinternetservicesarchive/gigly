import { ApolloClient, gql } from '@apollo/client'
import { AddListing, AddListingVariables, ListingInput } from '../../graphql/query.gen'

const addListingMutation = gql`
  mutation AddListing($input: ListingInput!) {
    addListing(listing: $input) {
      username
      price
      sellingName
    }
  }
`

export function addListing(client: ApolloClient<any>, input: ListingInput) {
  return client.mutate<AddListing, AddListingVariables>({
    mutation: addListingMutation,
    variables: { input },
  })
}
