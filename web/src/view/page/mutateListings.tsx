import { ApolloClient, gql } from '@apollo/client'
import {
  AddListing,
  AddListingVariables,
  EditListingInput,
  EditListingVariables,
  ListingInput,
} from '../../graphql/query.gen'

const addListingMutation = gql`
  mutation AddListing($input: ListingInput!) {
    addListing(listing: $input) {
      username
      price
      sellingName
    }
  }
`

const editListingMutation = gql`
  mutation EditListing($input: EditListingInput!) {
    editListing(editInfo: $input) {
      id
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

export function editListing(client: ApolloClient<any>, input: EditListingInput) {
  return client.mutate<EditListingInput, EditListingVariables>({
    mutation: editListingMutation,
    variables: { input },
  })
}
