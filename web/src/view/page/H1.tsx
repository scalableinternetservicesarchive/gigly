import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { useState } from 'react'
import { AppRouteParams } from '../nav/route'
import { Page } from './Page'
import { Spacer } from '../../style/spacer'
import { style } from '../../style/styled'
import { Button } from '../../style/button'
import { input, ribeyeMarrow, buttonStyle } from './LandingStyle'

interface HomePageProps extends RouteComponentProps, AppRouteParams {}

function createUser(username: string, email: string) {
  //dummy function for creating user
  return true
}

function validateUser(username: string, email: string) {
  //dummy function for validating user
  return true
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function HomePage(props: HomePageProps) {
  const [userName, setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirm, setConfirm] = useState<string>('')
  const [signup, setSignup] = useState(false) // default to login
  const [success, setSuccess] = useState<boolean>(false) //check status for login or signup

  if (success) {
    //redirect to the market page
    setSuccess(true)
  }
  console.log(signup)
  console.log(userName)

  return (
    <>
      <Home>
        <Page>
          <Subtitle style={ribeyeMarrow}> Welcome to </Subtitle>
          <Title style={ribeyeMarrow}> GiGly </Title>
          <CatchPhrase> Finding and offering services easily! </CatchPhrase>
          {signup && (
            <>
              <input
                className="input"
                type="text"
                style={input}
                placeholder="Email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setEmail(e.target.value)
                }}
              />
              <Spacer $h4 />
            </>
          )}
          <input
            className="input"
            type="text"
            style={input}
            placeholder="Username"
            value={userName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setUsername(e.target.value)
            }}
          />
          <Spacer $h4 />
          <input
            className="input"
            type="text"
            style={input}
            placeholder="Password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value)
            }}
          />
          <Spacer $h4 />
          {signup && (
            <>
              <>
                <input
                  className="input"
                  type="text"
                  style={input}
                  placeholder="Confirm Password"
                  value={confirm}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setConfirm(e.target.value)
                  }}
                />
                <Spacer $h4 />
              </>
              <Button
                style={buttonStyle}
                onClick={async () => {
                  const created = await createUser(userName, email)
                  if (created) {
                    // route to the main page with credential stored
                    setSuccess(true)
                    return
                  }
                }}
              >
                Signup
              </Button>
              <Spacer $h7 />
              <Button style={buttonStyle} onClick={e => setSignup(false)}>
                Already have an account?Login here!
              </Button>
            </>
          )}
          {!signup && (
            <>
              <Spacer $h4 />
              <Button
                style={buttonStyle}
                onClick={async () => {
                  const validated = await validateUser(userName, email)
                  if (validated) {
                    // route to the main page with credential stored
                    setSuccess(true)
                    return
                  }
                }}
              >
                LogIn
              </Button>
              <Spacer $h7 />
              <form
                onSubmit={() => {
                  setSignup(true)
                  console.log('hey')
                }}
              >
                <SubmitButton type="submit">
                  <LabelText>Don't have an account? Create Now!</LabelText>
                </SubmitButton>
              </form>
              <button onClick={() => {setSignup(true)}}>Click Me</button>
              {/* <Clicker style={buttonStyle} onClick={() => {setSignup(true)}}>
               Don't have an account? Create Now!
             </Clicker> */}
            </>
          )}
        </Page>
      </Home>
    </>
  )
}

const Home = style('div', 'flex', {
  backgroundColor: '#B0C4DE',
  width: '100vw',
  height: '100vh',
  margin: 'none',
  border: 'none',
  display: 'flex',
  justifyContent: 'center',
})

const Title = style('div', 'flex-l', {
  fontSize: '6rem',
  justifyContent: 'center',
  padding: '0.8rem',
})

const Subtitle = style('div', 'flex-l', {
  fontSize: '4rem',
  marginTop: '25%',
  justifyContent: 'center',
})

const CatchPhrase = style('div', 'flex-l', {
  fontSize: '1.5rem',
  fontFamily: "'Risque', sans-serif",
  justifyContent: 'center',
  paddingTop: '0.8rem',
  paddingBottom: '1.3rem',
  color: '#FFF',
})

const Clicker = style('button', 'flex-l', {
  fontSize: '1.5rem',
  fontFamily: "'Risque', sans-serif",
  justifyContent: 'center',
  paddingTop: '0.8rem',
  paddingBottom: '1.3rem',
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

const LabelText = style('h1', { fontSize: '0.9em', letterSpacing: '1.25px' })




// ###################################



import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { useState } from 'react'
import { AppRouteParams } from '../nav/route'
import { Page } from './Page'
import { Spacer } from '../../style/spacer'
import { style } from '../../style/styled'
import { Button } from '../../style/button'
import { input, ribeyeMarrow, buttonStyle } from './LandingStyle'

interface HomePageProps extends RouteComponentProps, AppRouteParams {}

function createUser(username: string, email: string) {
  //dummy function for creating user
  return true
}

function validateUser(username: string, email: string) {
  //dummy function for validating user
  return true
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function HomePage2(props: HomePageProps) {
  const [userName, setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirm, setConfirm] = useState<string>('')
  const [signup, setSignup] = useState(false) // default to login
  const [success, setSuccess] = useState<boolean>(false) //check status for login or signup

  if (success) {
    //redirect to the market page
    setSuccess(true)
  }
  console.log(signup)
  console.log(userName)

  return (
    <Home>
      <Page>
        <Subtitle style={ribeyeMarrow}> Welcome to </Subtitle>
        <Title style={ribeyeMarrow}> GiGly </Title>
        <CatchPhrase> Finding and offering services easily! </CatchPhrase>
        {signup ? (
          <>
            <input
              className="input"
              type="text"
              style={input}
              placeholder="Email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value)
              }}
            />
            <Spacer $h4 />
            <input
              className="input"
              type="text"
              style={input}
              placeholder="Username"
              value={userName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setUsername(e.target.value)
              }}
            />
            <Spacer $h4 />
            <input
              className="input"
              type="text"
              style={input}
              placeholder="Password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value)
              }}
            />
            <Spacer $h4 />
            <input
              className="input"
              type="text"
              style={input}
              placeholder="Confirm Password"
              value={confirm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setConfirm(e.target.value)
              }}
            />
            <Spacer $h4 />
            <Button
              style={buttonStyle}
              onClick={async () => {
                const created = await createUser(userName, email)
                if (created) {
                  // route to the main page with credential stored
                  setSuccess(true)
                  return
                }
              }}
            >
              Signup
            </Button>
            <Spacer $h7 />
            <Button style={buttonStyle} onClick={e => setSignup(false)}>
              Already have an account?Login here!
            </Button>
          </>
        ) : (
          <>
            <input
              className="input"
              type="text"
              style={input}
              placeholder="Username"
              value={userName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setUsername(e.target.value)
              }}
            />
            <Spacer $h4 />
            <input
              className="input"
              type="text"
              style={input}
              placeholder="Password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value)
              }}
            />
            <Spacer $h4 />
            <Spacer $h4 />
            <Button
              style={buttonStyle}
              onClick={async () => {
                console.log('clicked login button')
                const validated = await validateUser(userName, email)
                if (validated) {
                  // route to the main page with credential stored
                  setSuccess(true)
                  return
                }
              }}
            >
              LogIn
            </Button>
            <Spacer $h7 />
            <form
              onSubmit={() => {
                setSignup(true)
                console.log('hey')
              }}
            >
              <SubmitButton type="submit">
                <LabelText>signup state: {signup}</LabelText>
              </SubmitButton>
            </form>
            <button
              onClick={() => {
                setSignup(true)
              }}
            >
              signup state: {signup}
            </button>
            <Clicker style={buttonStyle} onClick={() => {setSignup(true)}}>
               Don't have an account? Create Now!
             </Clicker>
          </>
        )}
      </Page>
    </Home>
  )
}

const Home = style('div', 'flex', {
  backgroundColor: '#B0C4DE',
  width: '100vw',
  height: '100vh',
  margin: 'none',
  border: 'none',
  display: 'flex',
  justifyContent: 'center',
})

const Title = style('div', 'flex-l', {
  fontSize: '6rem',
  justifyContent: 'center',
  padding: '0.8rem',
})

const Subtitle = style('div', 'flex-l', {
  fontSize: '4rem',
  marginTop: '25%',
  justifyContent: 'center',
})

const CatchPhrase = style('div', 'flex-l', {
  fontSize: '1.5rem',
  fontFamily: "'Risque', sans-serif",
  justifyContent: 'center',
  paddingTop: '0.8rem',
  paddingBottom: '1.3rem',
  color: '#FFF',
})

const Clicker = style('button', 'flex-l', {
  fontSize: '1.5rem',
  fontFamily: "'Risque', sans-serif",
  justifyContent: 'center',
  paddingTop: '0.8rem',
  paddingBottom: '1.3rem',
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

const LabelText = style('h1', { fontSize: '0.9em', letterSpacing: '1.25px' })
