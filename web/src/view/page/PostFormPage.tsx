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
  description: string
}

export function PostFormPage(props: PostFormPageProps) {
  const [popup, showPopup] = React.useState(false)
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
    description: '',
  })
  const [imageURL, editImageURL] = React.useState<string>('')

  const { user } = useContext(UserContext)
  function handleSubmit(
    username: string,
    userId_ref: number,
    price: number,
    sellingName: string,
    startDate: string,
    endDate: string,
    location: string,
    description: string,
    image: string
  ) {
    addListing(getApolloClient(), {
      username,
      userId_ref,
      price,
      sellingName,
      startDate,
      endDate,
      location,
      description,
      image,
    })
      .then(() => {
        // showPopup(true)
        window.location.replace('/app/selling')
        toast('submitted!')
        // window.location.replace('/app/selling')
      })
      .catch(err => {
        console.log('oops')
        console.log(err)
      })
  }

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
        {/* {popup&&<ConfirmSubmit />} */}
        {popup && <ConfirmSubmit key={2} />}
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
            type="button"
            onClick={() => {
              handleSubmit(
                user.name,
                user.id,
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
        <div style={{ width: '1000px', display: 'flex' }}> {AvailabilityChart(bools, edit)} </div>
      </div>
    </Page>
  )
  function ConfirmSubmit() {
    return (
      <>
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '500px',
            height: '300px',
            backgroundColor: 'grey',
          }}
        >
          <h1
            style={{
              position: 'fixed',
              top: '30%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            Success!{' '}
          </h1>
          <SubmitButton
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            type="button"
            onClick={() => window.location.replace('/app/selling')}
          >
            <LabelText>Go to Selling Page</LabelText>
          </SubmitButton>
          <SubmitButton
            style={{
              position: 'fixed',
              top: '70%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            type="button"
            onClick={() => showPopup(false)}
          >
            <LabelText>Make Another Post</LabelText>
          </SubmitButton>
        </div>
      </>
    )
  }
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

const SelectInput = style('select', {
  border: '1px solid #808080',
  display: 'flex',
  borderRadius: '20px',
  width: '100%',
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
  cursor: 'pointer',
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
