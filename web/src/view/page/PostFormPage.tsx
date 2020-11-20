import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { useContext } from 'react'
import { getApolloClient } from '../../graphql/apolloClient'
import { style } from '../../style/styled'
import { UserContext } from '../auth/user'
import { AppRouteParams } from '../nav/route'
import { toast } from '../toast/toast'
import { AvailabilityChart } from './components/AvailabilityChart'
import { addListing } from './mutateListings'
import { Page } from './Page'

interface PostFormPageProps extends RouteComponentProps, AppRouteParams {}
// const imageSrc = require('../../../../public/assets/julia.jpg')
// eslint-disable-next-line @typescript-eslint/no-unused-vars

interface TestUser {
  name: string
  email: string
  phone: string
  location: string
}

interface Post {
  name: string
  price: number
  start: string
  end: string
  location: string
  tags: string
  description: string
}

export function PostFormPage(props: PostFormPageProps) {
  const [editForm, showEditForm] = React.useState(false)
  const [testuser, editUser] = React.useState<TestUser>({
    name: 'Julia Baylon',
    email: 'julia@gmail.com',
    phone: '(123) 456 - 7890',
    location: 'Westwood, CA',
  })

  const bools = [
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0],
  ]

  const [edit] = React.useState(true)

  const [post, editPost] = React.useState<Post>({
    name: '',
    price: 0,
    start: '',
    end: '',
    location: '',
    tags: '',
    description: '',
  })
  const [imageURL, editImageURL] = React.useState<string>('')

  const { user } = useContext(UserContext)

  if (user == null) {
    return (
      <Home>
        <Page>
          <CatchPhrase style={{ paddingTop: '38%' }}>We are so glad you're here!</CatchPhrase>
          <CatchPhrase>
            Make sure to{' '}
            <button
              style={{ color: 'white', textDecorationLine: 'underline' }}
              onClick={() => {
                window.location.replace('/')
              }}
            >
              login
            </button>{' '}
            before making a post ;)
          </CatchPhrase>
        </Page>
      </Home>
    )
  }

  console.log('at post form page: ' + user.name)
  return (
    <Page>
      <div style={{ paddingTop: '80px' }}>
        <form>
          <HeaderLabelText>NEW POST: </HeaderLabelText>
          {/* <p>{user === null ? 'no user' : user.name}</p> */}
          <FormLabelText>service name </FormLabelText>
          <FormInput>
            <input
              type="text"
              placeholder="Service Name"
              style={{ fontSize: '0.9em', color: '#303030', resize: 'none', width: '100%' }}
              onChange={e =>
                editPost({
                  name: e.target.value,
                  price: post.price,
                  start: post.start,
                  end: post.end,
                  location: post.location,
                  tags: post.tags,
                  description: post.description,
                })
              }
            />
          </FormInput>
          <FormLabelText>service price </FormLabelText>
          <FormInput>
            <input
              type="number"
              placeholder="Service Price"
              style={{ fontSize: '0.9em', color: '#303030', resize: 'none', width: '100%' }}
              onChange={e =>
                editPost({
                  name: post.name,
                  price: parseInt(e.target.value),
                  start: post.start,
                  end: post.end,
                  location: post.location,
                  tags: post.tags,
                  description: post.description,
                })
              }
            />
          </FormInput>
          <FormLabelText>service availability start date</FormLabelText>
          <FormInput>
            <input
              type="date"
              placeholder="Service Availability"
              style={{ fontSize: '0.9em', color: '#303030', resize: 'none', width: '100%' }}
              onChange={e =>
                editPost({
                  name: post.name,
                  price: post.price,
                  start: e.target.value,
                  end: post.end,
                  location: post.location,
                  tags: post.tags,
                  description: post.description,
                })
              }
            />
          </FormInput>
          <FormLabelText>service availability end date</FormLabelText>
          <FormInput>
            <input
              type="date"
              placeholder="Service Availability"
              style={{ fontSize: '0.9em', color: '#303030', resize: 'none', width: '100%' }}
              onChange={e =>
                editPost({
                  name: post.name,
                  price: post.price,
                  start: post.start,
                  end: e.target.value,
                  location: post.location,
                  tags: post.tags,
                  description: post.description,
                })
              }
            />
          </FormInput>
          <FormLabelText>service location </FormLabelText>
          <FormInput>
            <input
              type="text"
              placeholder="Service Location"
              style={{ fontSize: '0.9em', color: '#303030', resize: 'none', width: '100%' }}
              onChange={e =>
                editPost({
                  name: post.name,
                  price: post.price,
                  start: post.start,
                  end: post.end,
                  location: e.target.value,
                  tags: post.tags,
                  description: post.description,
                })
              }
            />
          </FormInput>
          <FormLabelText> service tags </FormLabelText>
          <FormInput>
            <input
              type="text"
              placeholder="Service Tags"
              style={{ fontSize: '0.9em', color: '#303030', resize: 'none', width: '100%' }}
              onChange={e =>
                editPost({
                  name: post.name,
                  price: post.price,
                  start: post.start,
                  end: post.end,
                  location: post.location,
                  tags: e.target.value,
                  description: post.description,
                })
              }
            />
          </FormInput>
          <FormLabelText>service description </FormLabelText>
          <FormInput>
            <input
              type="text"
              placeholder="Service Description"
              style={{ fontSize: '0.9em', color: '#303030', resize: 'none', width: '100%' }}
              onChange={e =>
                editPost({
                  name: post.name,
                  price: post.price,
                  start: post.start,
                  end: post.end,
                  location: post.location,
                  tags: post.tags,
                  description: e.target.value,
                })
              }
            />
          </FormInput>
          <FormLabelText>link image </FormLabelText>
          <FormInput>
            <input
              type="text"
              placeholder="Image URL"
              style={{ fontSize: '0.9em', color: '#303030', resize: 'none', width: '100%' }}
              onChange={e => editImageURL(e.target.value)}
            />
          </FormInput>
          <SubmitButton
            type="submit"
            onClick={() => {
              handleSubmit(
                testuser.name,
                post.price,
                post.name,
                post.start,
                post.end,
                post.location,
                post.description,
                imageURL
              )
            }}
          >
            <LabelText>SUBMIT</LabelText>
          </SubmitButton>
        </form>
        <h2>{post.name}</h2>
        <h2>{post.price}</h2>
        <h2>{post.start} </h2>
        <h2>{post.end} </h2>
        <h2>{post.tags} </h2>
        <h2>{post.location} </h2>
        <h2>{post.description}</h2>
        <div style={{ width: '1000px', display: 'flex' }}> {AvailabilityChart(bools, edit)} </div>
      </div>
    </Page>
  )
}
function MyAccountInfo(props: TestUser) {
  return (
    <>
      <HeaderLabelText> MY INFORMATION:</HeaderLabelText>
      <FormInput>
        <FormText>{props.name}</FormText>
      </FormInput>
      <FormInput>
        <FormText>{props.email}</FormText>
      </FormInput>
      <FormInput>
        <FormText>{props.phone}</FormText>
      </FormInput>
      <FormInput>
        <FormText>{props.location} </FormText>
      </FormInput>
    </>
  )
}

function handleSubmit(
  username: string,
  price: number,
  sellingName: string,
  startDate: string,
  endDate: string,
  location: string,
  description: string,
  image: string
) {
  addListing(getApolloClient(), { username, price, sellingName, startDate, endDate, location, description, image })
    .then(() => {
      toast('submitted!')
    })
    .catch(err => {
      console.log('oops')
      console.log(err)
    })
}

const Row = style('div', { display: 'flex', flexDirection: 'row' })
const FormInput = style('div', {
  border: '1px solid #808080',
  display: 'flex',
  borderRadius: '20px',
  padding: '5px',
  paddingLeft: '10px',
  margin: '5px',
  minHeight: '13px',
})
const SubmitButton = style('button', {
  display: 'block',
  borderRadius: '20px',
  color: 'white',
  backgroundColor: '#18A0FB',
  padding: '10px',
  paddingLeft: '15px',
  paddingRight: '15px',
  marginLeft: 'auto',
  marginRight: 'auto',
})

const Home = style('div', 'flex', {
  backgroundColor: '#B0C4DE',
  width: '100vw',
  height: '100vh',
  margin: 'none',
  border: 'none',
  display: 'flex',
  justifyContent: 'center',
})

const CatchPhrase = style('div', 'flex-l', {
  fontSize: '1.5rem',
  fontFamily: "'Risque', sans-serif",
  justifyContent: 'center',
  padding: '0.7rem',
  color: '#FFF',
})

const FormLabelText = style('h1', { fontSize: '0.9em', letterSpacing: '1.25px', marginLeft: '8px' })
const LabelText = style('h1', { fontSize: '0.9em', letterSpacing: '1.25px' })
const HeaderLabelText = style('h1', { fontSize: '1.2em', letterSpacing: '1.25px' })
const FormText = style('p', { fontSize: '0.9em', color: 'black', resize: 'none', width: '100%' })
