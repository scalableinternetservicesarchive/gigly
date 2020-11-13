import { useQuery } from '@apollo/client'
import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import Modal from 'react-modal'
import { getApolloClient } from '../../graphql/apolloClient'
import { FetchListings } from '../../graphql/query.gen'
import { style } from '../../style/styled'
// import { fetchUser3 } from '../auth/fetchUser'
import { AppRouteParams } from '../nav/route'
import { toast } from '../toast/toast'
import { fetchListings } from './fetchListings'
import { editListing } from './mutateListings'
import { Page } from './Page'

interface LecturesPageProps extends RouteComponentProps, AppRouteParams {}

interface CardData {
  id: number
  serviceName: string
  username: string
  profPic: string
  price: number
}

enum HeaderItems {
  MOST_RECENT = 'Most Recent',
  LOW_TO_HIGH = 'Low to High',
}

function getCard(c: CardData, setCardToEdit: (id: number) => void) {
  return (
    <Card
      key={c.id}
      onClick={() => {
        setCardToEdit(c.id)
      }}
    >
      <CardInfo>
        <div
          style={{
            backgroundColor: 'white',
            paddingLeft: '15px',
            fontWeight: 'bold',
            paddingRight: '15px',
            paddingTop: '8px',
            borderRadius: '25px 25px 0px 0px',
            color: '#696969',
            width: '250px',
          }}
        >
          {c.serviceName}
        </div>
        <div
          className="flex flex-row"
          style={{
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingTop: '5px',
            paddingLeft: '5px',
            paddingBottom: '5px',
            backgroundColor: 'white',
            borderRadius: '0px 0px 25px 25px',
          }}
        >
          <UserPic $img={c.profPic} />
          <div style={{ paddingLeft: '15px', color: '#696969' }}>{c.username}</div>
          <div style={{ paddingLeft: '25px', color: '#3C82DC' }}>{'$' + c.price}</div>
        </div>
      </CardInfo>
    </Card>
  )
}

const sortHeaderItems = [HeaderItems.MOST_RECENT, HeaderItems.LOW_TO_HIGH]

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function SellingPage(props: LecturesPageProps) {
  // Whether or not to read from the listings
  const [haveListings, setHaveListings] = React.useState<boolean>(false)
  const [search, setSearch] = React.useState<string>('')
  const { loading, data } = useQuery<FetchListings>(fetchListings)
  const [selectedSort, setSelectedSort] = React.useState<HeaderItems>(HeaderItems.MOST_RECENT)
  const [listingToEdit, setListingToEdit] = React.useState<number | null>(null) // Null means don't show the editing window!
  const [serviceNameEdited, setServiceNameEdited] = React.useState<string>('')
  const [servicePriceEdited, setServicePriceEdited] = React.useState<number | null>(null)
  const [serviceStartDateEdited, setServiceStartDateEdited] = React.useState<string>('')
  const [serviceEndDateEdited, setServiceEndDateEdited] = React.useState<string>('')
  const [serviceLocationEdited, setServiceLocationEdited] = React.useState<string>('')
  const [serviceDescriptionEdited, setServiceDescriptionEdited] = React.useState<string>('')
  const [serviceImageEdited, setServiceImageEdited] = React.useState<string>('')

  // Function passed to each card to set the state to the listing to be edited
  const setCardToEdit = (id: number) => {
    setListingToEdit(id)
  }

  let cards: CardData[] = []
  if (data) {
    const cards: CardData[] = []
    data?.listings?.map((listing, index) => {
      cards.push({
        id: listing.id ?? index,
        serviceName: listing.sellingName,
        username: listing.username,
        price: listing.price ?? 0,

        profPic:
          'https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=670&q=80',
      })
    })

    // Filter from searchbar
    let filteredCards = cards.filter(card => {
      return (
        card.serviceName.toLowerCase().includes(search.toLowerCase()) ||
        card.username.toLowerCase().includes(search.toLowerCase())
      )
    })
    // const {loading: loading2, data: data2} = useQuery(fetchUser3);
    // if (loading2) return (<h1>loading...</h1>)

    // Sort from low to high if that's selected, otherwise default to most recent
    if (selectedSort === HeaderItems.LOW_TO_HIGH)
      filteredCards = filteredCards.sort((a: CardData, b: CardData) => {
        return a.price - b.price
      })

    const cardUIs = filteredCards.map(card => getCard(card, setCardToEdit))

    return (
      <>
        <Page>
          <div style={{ paddingTop: '100px' }}>
            <div
              style={{
                height: '100%',
                width: '225px',
                position: 'fixed',
                zIndex: 1,
                top: 0,
                left: 0,
                backgroundColor: '#696969',
                overflowX: 'hidden',
                fontFamily: 'Roboto',
              }}
            >
              <div style={{ marginTop: '100px' }}>
                <SideBarHeader>SORT</SideBarHeader>
                <SideBarItem
                  onClick={() => {
                    setSelectedSort(HeaderItems.MOST_RECENT)
                  }}
                  $clicked={selectedSort === HeaderItems.MOST_RECENT}
                >
                  Most Recent
                </SideBarItem>
                <SideBarItem
                  onClick={() => {
                    setSelectedSort(HeaderItems.LOW_TO_HIGH)
                  }}
                  $clicked={selectedSort === HeaderItems.LOW_TO_HIGH}
                >
                  Low to High
                </SideBarItem>
              </div>
            </div>
            <div>
              <input
                className="input"
                type="text"
                style={{
                  backgroundColor: 'E3E3E3',
                  borderRadius: '20px',
                  height: '5vh',
                  width: '50vw',
                  padding: '1.5rem',
                  fontFamily: 'Roboto',
                }}
                placeholder="Search"
                value={search}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setSearch(e.target.value)
                }}
              />
            </div>
            <div
              className="flex flex-row"
              style={{ flexDirection: 'row', flexWrap: 'wrap', paddingTop: '80px', maxWidth: '1000px' }}
            >
              {cardUIs}
            </div>
          </div>
        </Page>
        <Modal isOpen={listingToEdit !== null}>
          <form>
            <div style={{ paddingTop: '100px', marginLeft: '200px' }}>
              <div style={{ fontFamily: 'sans-serif', fontSize: '36px' }}>Edit Listing ID: {listingToEdit}</div>
              <input
                type="text"
                placeholder="Service Name"
                style={{
                  border: '1px solid #808080',
                  display: 'flex',
                  borderRadius: '20px',
                  padding: '5px',
                  paddingLeft: '10px',
                  margin: '5px',
                  minHeight: '13px',
                  fontSize: '0.9em',
                  color: '#303030',
                  resize: 'none',
                  width: '100%',
                }}
                onChange={e => setServiceNameEdited(e.target.value)}
              />
              <input
                type="text"
                placeholder="Service Price"
                style={{
                  border: '1px solid #808080',
                  display: 'flex',
                  borderRadius: '20px',
                  padding: '5px',
                  paddingLeft: '10px',
                  margin: '5px',
                  minHeight: '13px',
                  fontSize: '0.9em',
                  color: '#303030',
                  resize: 'none',
                  width: '100%',
                }}
                onChange={e => setServicePriceEdited(parseInt(e.target.value))}
              />
              <input
                type="text"
                placeholder="Availability: Start Date"
                style={{
                  border: '1px solid #808080',
                  display: 'flex',
                  borderRadius: '20px',
                  padding: '5px',
                  paddingLeft: '10px',
                  margin: '5px',
                  minHeight: '13px',
                  fontSize: '0.9em',
                  color: '#303030',
                  resize: 'none',
                  width: '100%',
                }}
                onChange={e => setServiceStartDateEdited(e.target.value)}
              />
              <input
                type="text"
                placeholder="Availability: End Date"
                style={{
                  border: '1px solid #808080',
                  display: 'flex',
                  borderRadius: '20px',
                  padding: '5px',
                  paddingLeft: '10px',
                  margin: '5px',
                  minHeight: '13px',
                  fontSize: '0.9em',
                  color: '#303030',
                  resize: 'none',
                  width: '100%',
                }}
                onChange={e => setServiceEndDateEdited(e.target.value)}
              />
              <input
                type="text"
                placeholder="Location"
                style={{
                  border: '1px solid #808080',
                  display: 'flex',
                  borderRadius: '20px',
                  padding: '5px',
                  paddingLeft: '10px',
                  margin: '5px',
                  minHeight: '13px',
                  fontSize: '0.9em',
                  color: '#303030',
                  resize: 'none',
                  width: '100%',
                }}
                onChange={e => setServiceLocationEdited(e.target.value)}
              />
              <input
                type="text"
                placeholder="Description"
                style={{
                  border: '1px solid #808080',
                  display: 'flex',
                  borderRadius: '20px',
                  padding: '5px',
                  paddingLeft: '10px',
                  margin: '5px',
                  minHeight: '13px',
                  fontSize: '0.9em',
                  color: '#303030',
                  resize: 'none',
                  width: '100%',
                }}
                onChange={e => setServiceDescriptionEdited(e.target.value)}
              />
              <input
                type="text"
                placeholder="Image URL"
                style={{
                  border: '1px solid #808080',
                  display: 'flex',
                  borderRadius: '20px',
                  padding: '5px',
                  paddingLeft: '10px',
                  margin: '5px',
                  minHeight: '13px',
                  fontSize: '0.9em',
                  color: '#303030',
                  resize: 'none',
                  width: '100%',
                }}
                onChange={e => setServiceImageEdited(e.target.value)}
              />
              <button
                onClick={() => {
                  setListingToEdit(null)
                }}
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleSubmit(listingToEdit as number, serviceNameEdited)
                }}
              >
                Save
              </button>
            </div>
          </form>
        </Modal>
      </>
    )
  } else {
    // Failed GraphQL query :(( fall back on this dummy data
    return <div>yikes</div>
  }
}

function handleSubmit(id: number, sellingName: string) {
  editListing(getApolloClient(), {
    id,
    username: null,
    price: null,
    sellingName,
    startDate: null,
    endDate: null,
    location: null,
    description: null,
    image: null,
  })
    .then(() => {
      toast('submitted!')
    })
    .catch(err => {
      console.log('oops')
      console.log(err)
    })
}

const Card = style('div', 'flex white items-center list pa6 ph2 ', {
  backgroundPositionY: 'center',
  backgroundSize: 'cover',
  backgroundImage:
    'url(' +
    'https://images.unsplash.com/photo-1516979187457-637abb4f9353?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80' +
    ')',
  paddingTop: '20px',
  paddingBottom: '10px',

  marginBottom: '8px',
  justifyContent: 'flex-start',
  minHeight: '200px',
  minWidth: '250px',
  marginRight: '10px',
  borderRadius: '25px',
  fontFamily: 'Roboto',
})

const CardInfo = style('div', 'flex flex-column', {
  paddingTop: '100px',
})

const UserPic = style('div', (c: { $img?: string }) => ({
  width: '50px',
  height: '50px',
  borderRadius: '180px',
  border: '0.5px solid #18A0FB',
  backgroundPositionY: 'center',
  backgroundSize: 'cover',
  backgroundImage:
    c.$img !== undefined
      ? 'url(' + c.$img + ')'
      : 'url(' +
        'https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=670&q=80' +
        ')',
}))

const SideBarItem = style('div', (c: { $clicked?: boolean }) => ({
  paddingLeft: '15px',
  paddingTop: '10px',
  fontWeight: c.$clicked ? 'bold' : 'initial',
  cursor: 'pointer',
}))

const SideBarHeader = style('div', {
  paddingLeft: '15px',
  paddingTop: '50px',
  fontWeight: 'bold',
  fontSize: '24px',
})
