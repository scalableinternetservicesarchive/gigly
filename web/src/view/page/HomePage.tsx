import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { useState } from 'react'
import { getApolloClient } from '../../graphql/apolloClient'
import { style } from '../../style/styled'
import { AppRouteParams } from '../nav/route'
import { toast } from '../toast/toast'
import { addListing } from './mutateListings'
import { Page } from './Page'

interface HomePageProps extends RouteComponentProps, AppRouteParams {}
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

export function HomePage(props: HomePageProps) {
  const [signup, setsignup] = useState(false)
  const [user, editUser] = React.useState<TestUser>({
    name: 'Julia Baylon',
    email: 'julia@gmail.com',
    phone: '(123) 456 - 7890',
    location: 'Westwood, CA',
  })
  const [userName, setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirm, setConfirm] = useState<string>('')
  const [success, setSuccess] = useState<boolean>(false) //check status for login or signup

  const [edit] = React.useState(true)

  return (
    <Home>
      <Page>
        <Subtitle> Welcome to </Subtitle>
        <Title> GiGly </Title>
        <CatchPhrase> Finding and offering services easily! </CatchPhrase>
        <div style={{ width: '100%' }}>
            <div>
              {signup ? (
                <>
                  <form onSubmit={() => setsignup(false)}>
                    <HeaderLabelText> Sign Up: </HeaderLabelText>
                    <FormInput>
                      <input
                        type="text"
                        style={{ fontSize: '0.9em', color: '#303030', resize: 'none', width: '100%' }}
                        placeholder="Email"
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setEmail(e.target.value)
                        }}
                      />
                    </FormInput>
                    <FormInput>
                      <input
                        type="text"
                        placeholder="email"
                        style={{ fontSize: '0.9em', color: '#303030', resize: 'none', width: '100%' }}
                        onChange={e =>
                          editUser({
                            name: user.name,
                            email: e.target.value,
                            phone: user.phone,
                            location: user.location,
                          })
                        }
                        value={user.email}
                      />
                    </FormInput>
                    <FormInput>
                      <input
                        type="text"
                        placeholder="phone number"
                        style={{ fontSize: '0.9em', color: '#303030', resize: 'none', width: '100%' }}
                        onChange={e =>
                          editUser({
                            name: user.name,
                            email: user.email,
                            phone: e.target.value,
                            location: user.location,
                          })
                        }
                        value={user.phone}
                      />
                    </FormInput>
                    <FormInput>
                      <input
                        type="text"
                        placeholder="location"
                        style={{ fontSize: '0.9em', color: '#303030', resize: 'none', width: '100%' }}
                        onChange={e =>
                          editUser({ name: user.name, email: user.email, phone: user.phone, location: e.target.value })
                        }
                        value={user.location}
                      />
                    </FormInput>
                    <input accept="image" type="file" />
                    <br />
                    <SubmitButton type="submit">
                      <LabelText>Sign Up</LabelText>
                    </SubmitButton>
                  </form>
                  <SubmitButton onClick={() => setsignup(false)} style={{ marginBottom: '16px' }}>
                    <LabelText>Already have an account? Login here!</LabelText>
                  </SubmitButton>
                </>
              ) : (
                <>
                  <form onSubmit={() => setsignup(false)}>
                    <HeaderLabelText> Login: </HeaderLabelText>
                    <FormInput>
                      <input
                        type="text"
                        style={{ fontSize: '0.9em', color: '#303030', resize: 'none', width: '100%' }}
                        placeholder="Email"
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setEmail(e.target.value)
                        }}
                      />
                    </FormInput>
                    <FormInput>
                      <input
                        type="text"
                        placeholder="email"
                        style={{ fontSize: '0.9em', color: '#303030', resize: 'none', width: '100%' }}
                        onChange={e =>
                          editUser({
                            name: user.name,
                            email: e.target.value,
                            phone: user.phone,
                            location: user.location,
                          })
                        }
                        value={user.email}
                      />
                    </FormInput>
                    <FormInput>
                      <input
                        type="text"
                        placeholder="phone number"
                        style={{ fontSize: '0.9em', color: '#303030', resize: 'none', width: '100%' }}
                        onChange={e =>
                          editUser({
                            name: user.name,
                            email: user.email,
                            phone: e.target.value,
                            location: user.location,
                          })
                        }
                        value={user.phone}
                      />
                    </FormInput>
                    <FormInput>
                      <input
                        type="text"
                        placeholder="location"
                        style={{ fontSize: '0.9em', color: '#303030', resize: 'none', width: '100%' }}
                        onChange={e =>
                          editUser({ name: user.name, email: user.email, phone: user.phone, location: e.target.value })
                        }
                        value={user.location}
                      />
                    </FormInput>
                    <input accept="image" type="file" />
                    <br />
                    <SubmitButton type="submit">
                      <LabelText>Login</LabelText>
                    </SubmitButton>
                  </form>
                  <SubmitButton onClick={() => setsignup(true)} style={{ marginBottom: '16px' }}>
                    <LabelText>Don't have an account? Create Now!</LabelText>
                  </SubmitButton>
                </>
              )}
            </div>
        </div>
        <p style={{ color: 'white' }}>
          The goal of the course project is to gain hands-on experience building and deploying a scalable web service on
          the internet. This is a "learn
        </p>
      </Page>
    </Home>
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

function handleSubmit(username: string, price: number, sellingName: string) {
  addListing(getApolloClient(), { username, price, sellingName })
    .then(() => {
      toast('submitted!')
    })
    .catch(err => {
      console.log('oops')
      console.log(err)
    })
}

const Home = style('div', 'flex', {
  backgroundColor: '#B0C4DE',
  width: '100vw',
  height: '100%',
  margin: 'none',
  border: 'none',
  display: 'flex',
  justifyContent: 'center',
})

const Title = style('div', 'flex-l', {
  fontSize: '6rem',
  justifyContent: 'center',
  padding: '0.8rem',
  color: '#FFF',
  fontFamily: "'Ribeye Marrow', sans-serif",
})

const Subtitle = style('div', 'flex-l', {
  fontSize: '4rem',
  marginTop: '25%',
  justifyContent: 'center',
  color: '#FFF',
  fontFamily: "'Ribeye Marrow', sans-serif",
})

const CatchPhrase = style('div', 'flex-l', {
  fontSize: '1.5rem',
  fontFamily: "'Risque', sans-serif",
  justifyContent: 'center',
  paddingTop: '0.8rem',
  paddingBottom: '1.3rem',
  color: '#FFF',
})

{/* // const Row = style('div', { display: 'flex', flexDirection: 'row' }) */}

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
const FormLabelText = style('h1', { fontSize: '0.9em', letterSpacing: '1.25px', marginLeft: '8px' })
const LabelText = style('h1', { fontSize: '0.9em', letterSpacing: '1.25px' })
const HeaderLabelText = style('h1', { fontSize: '1.2em', letterSpacing: '1.25px' })
const FormText = style('p', { fontSize: '0.9em', color: 'black', resize: 'none', width: '100%' })
