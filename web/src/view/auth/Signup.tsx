import * as React from 'react'
import { useEffect, useState } from 'react'
import { check } from '../../../../common/src/util'
import { Button } from '../../style/button'
import { Input } from '../../style/input'
import { toastErr } from '../toast/toast'
import { RouteComponentProps } from '@reach/router'
import { AppRouteParams } from '../nav/route'

interface SignupProps extends RouteComponentProps, AppRouteParams {}

export function Signup(props: SignupProps) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [err, setError] = useState({ email: false, name: false, password: false })

  // reset error when email/name change
  useEffect(() => setError({ ...err, email: !validateEmail(email) }), [email])
  useEffect(() => setError({ ...err, name: false }), [name])
  useEffect(() => setError({ ...err, password: false }), [password])

  function login() {
    if (!validate(email, name, password, setError)) {
      toastErr('invalid email/name')
      return
    }

    fetch('/auth/createUser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name, password }),
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
    <>
      <div className="mt3">
        <label className="db fw4 lh-copy f6" htmlFor="email">
          Email address
        </label>
        <Input $hasError={err.email} $onChange={setEmail} $onSubmit={login} name="email" type="email" />
      </div>
      <div className="mt3">
        <label className="db fw4 lh-copy f6" htmlFor="name">
          Name
        </label>
        <Input $hasError={err.name} $onChange={setName} $onSubmit={login} name="name" />
      </div>
      <div className="mt3">
        <label className="db fw4 lh-copy f6" htmlFor="name">
          Password
        </label>
        <Input $hasError={err.password} $onChange={setPassword} $onSubmit={login} name="password" />
      </div>
      <div className="mt3">
        <Button onClick={login}>Sign Up</Button>
      </div>
    </>
  )
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
