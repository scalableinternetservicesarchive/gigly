import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { style } from '../../style/styled'
import { AppRouteParams } from '../nav/route'
import { Page } from './Page'
import { check } from '../../../../common/src/util'
import { Spacer } from '../../style/spacer'
import { toastErr } from '../toast/toast'

interface HomePageProps extends RouteComponentProps, AppRouteParams {}

interface SignupForm {
  name: string
  email: string
  password: string
  comfirmPassword: string
}

interface LoginForm {
  name: string
  password: string
}

export function HomePage(props: HomePageProps) {
  const [signup, setsignup] = useState(true)
  const [signupUser, setSignup] = React.useState<SignupForm>({
    name: '',
    email: '',
    password: '',
    comfirmPassword: '',
  })
  const [loginUser, setLogin] = React.useState<LoginForm>({
    name: '',
    password: '',
  })
  const [success, setSuccess] = useState<boolean>(false) //check status for login or signup
  const [err, setError] = useState({ email: false, name: false, password: false })

  // reset error when email/name change
  useEffect(() => setError({ ...err, email: !validateEmail(signupUser.email) }), [signupUser.email])
  useEffect(() => setError({ ...err, name: false }), [signupUser.name])
  useEffect(() => setError({ ...err, password: false }), [signupUser.password])

  function login() {
    if (!validate(signupUser.email, signupUser.name, signupUser.password, setError)) {
      toastErr('invalid email/name')
      return
    }
    const signup_email = signupUser.email
    const signup_username = signupUser.name
    const signup_password = signupUser.password

    fetch('/auth/createUser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ signup_email, signup_username, signup_password }),
    })
      .then(res => {
        check(res.ok, 'response status ' + res.status)
        return res.text()
      })
      .then(() => window.location.replace('/'))
      .catch(err => {
        toastErr(err.toString())
        setError({ email: true, name: true, password: true })
      })
  }
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
                <form onSubmit={() => login()}>
                  <FormInput>
                    <input
                      type="text"
                      placeholder="Username"
                      style={{ fontSize: '0.9em', color: '#303030', resize: 'none', width: '100%' }}
                      onChange={e =>
                        setSignup({
                          name: e.target.value,
                          email: signupUser.email,
                          password: signupUser.password,
                          comfirmPassword: signupUser.comfirmPassword,
                        })
                      }
                      value={signupUser.name}
                    />
                  </FormInput>
                  <Spacer $h1 />
                  <FormInput>
                    <input
                      type="text"
                      placeholder="Email"
                      style={{ fontSize: '0.9em', color: '#303030', resize: 'none', width: '100%' }}
                      onChange={e =>
                        setSignup({
                          name: signupUser.name,
                          email: e.target.value,
                          password: signupUser.password,
                          comfirmPassword: signupUser.comfirmPassword,
                        })
                      }
                      value={signupUser.email}
                    />
                  </FormInput>
                  <Spacer $h1 />
                  <FormInput>
                    <input
                      type="text"
                      placeholder="Password"
                      style={{ fontSize: '0.9em', color: '#303030', resize: 'none', width: '100%' }}
                      onChange={e =>
                        setSignup({
                          name: signupUser.name,
                          email: signupUser.email,
                          password: e.target.value,
                          comfirmPassword: signupUser.comfirmPassword,
                        })
                      }
                      value={signupUser.password}
                    />
                  </FormInput>
                  <Spacer $h1 />
                  <FormInput>
                    <input
                      type="text"
                      placeholder="Comfirm Password"
                      style={{ fontSize: '0.9em', color: '#303030', resize: 'none', width: '100%' }}
                      onChange={e =>
                        setSignup({
                          name: signupUser.name,
                          email: signupUser.email,
                          password: signupUser.password,
                          comfirmPassword: e.target.value,
                        })
                      }
                      value={signupUser.comfirmPassword}
                    />
                  </FormInput>
                  <br />
                  <SubmitButton type="submit">
                    <LabelText>Signup</LabelText>
                  </SubmitButton>
                </form>
                <LinkButton onClick={() => setsignup(false)} style={{ marginBottom: '16px' }}>
                  <LabelText>Already have an account? Login here!</LabelText>
                </LinkButton>
              </>
            ) : (
              <>
                <form onSubmit={() => validateUser(loginUser)}>
                  <Spacer $h2 />
                  <FormInput style={{ backgroundColor: 'E3E3E3', borderRadius: '20px' }}>
                    <input
                      type="text"
                      placeholder="Username"
                      style={{ fontSize: '0.9em', resize: 'none', width: '100%' }}
                      onChange={e =>
                        setLogin({
                          name: e.target.value,
                          password: loginUser.password,
                        })
                      }
                      value={loginUser.name}
                    />
                  </FormInput>
                  <Spacer $h2 />
                  <FormInput>
                    <input
                      type="text"
                      placeholder="Password"
                      style={{ fontSize: '0.9em', color: '#303030', resize: 'none', width: '100%' }}
                      onChange={e =>
                        setLogin({
                          name: loginUser.name,
                          password: e.target.value,
                        })
                      }
                      value={loginUser.password}
                    />
                  </FormInput>
                  <br />
                  <SubmitButton type="submit">
                    <LabelText>Login</LabelText>
                  </SubmitButton>
                </form>
                <LinkButton onClick={() => setsignup(true)} style={{ marginBottom: '16px' }}>
                  <LabelText>Don't have an account? Create Now!</LabelText>
                </LinkButton>
              </>
            )}
          </div>
        </div>
      </Page>
    </Home>
  )
}

function createUser(props: SignupForm) {
  //dummy function for creating user
  return true
}

function validateUser(props: LoginForm) {
  //dummy function for validating user
  return true
}

function validateEmail(email: string) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

function validate(
  email: string,
  name: string,
  password: string,
  setError: React.Dispatch<React.SetStateAction<{ email: boolean; name: boolean; password: boolean }>>
) {
  const validEmail = validateEmail(email)
  const validName = Boolean(name)
  const validPassword = true
  console.log('valid', validEmail, validName)
  setError({ email: !validEmail, name: !validName, password: !validPassword })
  return validEmail && validName
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
  padding: '0.7rem',
  color: '#FFF',
  fontFamily: "'Ribeye Marrow', sans-serif",
})

const Subtitle = style('div', 'flex-l', {
  fontSize: '4rem',
  marginTop: '22%',
  justifyContent: 'center',
  color: '#FFF',
  fontFamily: "'Ribeye Marrow', sans-serif",
})

const CatchPhrase = style('div', 'flex-l', {
  fontSize: '1.5rem',
  fontFamily: "'Risque', sans-serif",
  justifyContent: 'center',
  paddingTop: '0.7rem',
  paddingBottom: '1.2rem',
  color: '#FFF',
})

const FormInput = style('div', {
  display: 'flex',
  padding: '5px',
  paddingLeft: '10px',
  margin: '5px',
  minHeight: '13px',
  backgroundColor: 'E3E3E3',
  borderRadius: '20px',
  height: '4.5vh',
  width: '35vw',
})
const SubmitButton = style('button', {
  display: 'block',
  borderRadius: '20px',
  color: '#B0C4DE',
  backgroundColor: 'F5F5F5',
  padding: '10px',
  paddingLeft: '15px',
  paddingRight: '15px',
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '15vw',
})

const LinkButton = style('button', {
  display: 'block',
  borderRadius: '20px',
  color: 'white',
  backgroundColor: '#B0C4DE',
  paddingLeft: '15px',
  paddingRight: '15px',
  marginLeft: 'auto',
  marginRight: 'auto',
  textDecoration: 'underline',
})

const FormLabelText = style('h1', { fontSize: '0.9em', letterSpacing: '1.25px', marginLeft: '8px' })
const LabelText = style('h1', { fontSize: '0.9em', letterSpacing: '1.25px' })
const HeaderLabelText = style('h1', { fontSize: '1.2em', letterSpacing: '1.25px' })
const FormText = style('p', { fontSize: '0.9em', color: 'black', resize: 'none', width: '100%' })
