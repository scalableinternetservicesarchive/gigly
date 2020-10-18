import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { style } from '../../style/styled'
import { BodyText } from '../../style/text'
import { AppRouteParams } from '../nav/route'
import { Page } from './Page'

interface ProjectsPageProps extends RouteComponentProps, AppRouteParams {}
// const imageSrc = require('../../../../public/assets/julia.jpg')
// eslint-disable-next-line @typescript-eslint/no-unused-vars

interface TestUser {
  name: string
  email: string
  phone: string
  location: string
}

export function ProjectsPage(props: ProjectsPageProps) {
  const [editForm, showEditForm] = React.useState(false)
  const [user, editUser] = React.useState<TestUser>({
    name: 'Julia B.',
    email: 'julia@gmail.com',
    phone: '(123) 456 - 7890',
    location: 'Westwood, CA',
  })
  return (
    <Page>
      <div style={{ width: '100%' }}>
        <Row>
          <div style={{ flex: 1 }}>
            <div
              style={{
                margin: 'auto',
                width: '50vh',
                height: '50vh',
                borderRadius: '50vh',
                border: '0.5px solid #18A0FB',
                backgroundPositionY: 'center',
                backgroundSize: 'cover',
                backgroundImage:
                  'url(' +
                  'https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=670&q=80' +
                  ')',
              }}
            ></div>
          </div>
          <div style={{ flex: 2, flexDirection: 'column' }}>
            {editForm ? (
              <form onSubmit={() => showEditForm(false)}>
                <LabelText>Edit My Information: </LabelText>
                <FormInput>
                  <input
                    type="text"
                    placeholder="nameee"
                    style={{ fontSize: '0.9em', color: '#808080', resize: 'none', width: '100%' }}
                    onChange={e =>
                      editUser({ name: e.target.value, email: user.email, phone: user.phone, location: user.location })
                    }
                    value={user.name}
                  />
                </FormInput>
                <FormInput>
                  <input
                    type="text"
                    placeholder="email"
                    style={{ fontSize: '0.9em', color: '#808080', resize: 'none', width: '100%' }}
                    onChange={e =>
                      editUser({ name: user.name, email: e.target.value, phone: user.phone, location: user.location })
                    }
                    value={user.email}
                  />
                </FormInput>
                <FormInput>
                  <input
                    type="text"
                    placeholder="phone number"
                    style={{ fontSize: '0.9em', color: '#808080', resize: 'none', width: '100%' }}
                    onChange={e =>
                      editUser({ name: user.name, email: user.email, phone: e.target.value, location: user.location })
                    }
                    value={user.phone}
                  />
                </FormInput>
                <FormInput>
                  <input
                    type="text"
                    placeholder="location"
                    style={{ fontSize: '0.9em', color: '#808080', resize: 'none', width: '100%' }}
                    onChange={e =>
                      editUser({ name: user.name, email: user.email, phone: user.phone, location: e.target.value })
                    }
                    value={user.location}
                  />
                </FormInput>
                <SubmitButton type="submit">
                  <LabelText>SUBMIT</LabelText>
                </SubmitButton>
              </form>
            ) : (
              <>
                <MyAccountInfo name={user.name} email={user.email} phone={user.phone} location={user.location} />
                <SubmitButton onClick={() => showEditForm(true)} style={{ marginBottom: '16px' }}>
                  <LabelText>EDIT</LabelText>
                </SubmitButton>
              </>
            )}
          </div>
        </Row>
        <NewPostForm />
      </div>
      <MyAccount name={user.name} email={user.email} phone={user.phone} location={user.location} />
      <BodyText>
        The goal of the course project is to gain hands-on experience building and deploying a scalable web service on
        the internet. This is a "learn by doing" course so we'll spend time in lectures and lab sessions building
        features, watching them fail at scale, and then fixing them. 😉
      </BodyText>
    </Page>
  )
}
function MyAccountInfo(props: TestUser) {
  return (
    <>
      <LabelText>MY INFORMATION:</LabelText>
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
// function MyAccountForm() {
//   // const [user] = React.useState<TestUser>({ name: 'Julia B.', email: 'julia@gmail.com', phone: '(123) 456 - 7890' })

//   return (
//     <>
//       <form>
//         <h1>Fo rm</h1>
//         <FormInput>
//           <input
//             type="text"
//             placeholder="name"
//             style={{ fontSize: '0.9em', color: '#808080', resize: 'none', width: '100%' }}
//             // value={user.name}
//           />
//         </FormInput>
//         <FormInput>
//           <input
//             type="text"
//             placeholder="email"
//             style={{ fontSize: '0.9em', color: '#808080', resize: 'none', width: '100%' }}
//           />
//         </FormInput>
//         <FormInput>
//           <input
//             type="text"
//             placeholder="phone number"
//             style={{ fontSize: '0.9em', color: '#808080', resize: 'none', width: '100%' }}
//           />
//         </FormInput>
//         <FormInput>
//           <input
//             type="text"
//             placeholder="location"
//             style={{ fontSize: '0.9em', color: '#808080', resize: 'none', width: '100%' }}
//           />
//         </FormInput>
//         <SubmitButton type="submit">
//           <LabelText>SUBMIT</LabelText>
//         </SubmitButton>
//       </form>
//     </>
//   )
// }

function NewPostForm() {
  return (
    <>
      <form>
        <LabelText>NEW POST: </LabelText>
        <FormInput>
          <input
            type="text"
            placeholder="Service Name"
            style={{ fontSize: '0.9em', color: '#808080', resize: 'none', width: '100%' }}
          />
        </FormInput>
        <FormInput>
          <input
            type="number"
            placeholder="Service Price"
            style={{ fontSize: '0.9em', color: '#808080', resize: 'none', width: '100%' }}
          />
        </FormInput>
        <FormInput>
          <input
            type="date"
            placeholder="Service Availability"
            style={{ fontSize: '0.9em', color: '#808080', resize: 'none', width: '100%' }}
          />
        </FormInput>
        <FormInput>
          <input
            type="text"
            placeholder="Service Location"
            style={{ fontSize: '0.9em', color: '#808080', resize: 'none', width: '100%' }}
          />
        </FormInput>
        <FormInput>
          <input
            type="text"
            placeholder="Service Tags"
            style={{ fontSize: '0.9em', color: '#808080', resize: 'none', width: '100%' }}
          />
        </FormInput>
        <FormInput>
          <input
            type="text"
            placeholder="Service Description"
            style={{ fontSize: '0.9em', color: '#808080', resize: 'none', width: '100%' }}
          />
        </FormInput>
        <input
          accept="image"
          type="file"
          // placeholder="Service Description"
          // style={{ fontSize: '0.9em', color: '#808080', resize: 'none', width: '100%' }}
        />
        <br />
        <SubmitButton type="submit">
          <LabelText>SUBMIT</LabelText>
        </SubmitButton>
      </form>
    </>
  )
}
function MyAccount(props: TestUser) {
  const [editForm, showEditForm] = React.useState(true)
  return (
    <>
      <div style={{ width: '100%' }}>
        <Row>
          <div style={{ flex: 1 }}>
            <div
              style={{
                margin: 'auto',
                width: '50vh',
                height: '50vh',
                borderRadius: '50vh',
                border: '0.5px solid #18A0FB',
                backgroundPositionY: 'center',
                backgroundSize: 'cover',
                backgroundImage:
                  'url(' +
                  'https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=670&q=80' +
                  ')',
              }}
            ></div>
          </div>
          <div style={{ flex: 2, flexDirection: 'column' }}>
            {editForm ? (
              <form onSubmit={() => showEditForm(false)}>
                <LabelText>Edit My Information: </LabelText>
                <FormInput>
                  <input
                    type="text"
                    placeholder="name"
                    style={{ fontSize: '0.9em', color: '#808080', resize: 'none', width: '100%' }}
                    // value={user.name}
                  />
                </FormInput>
                <FormInput>
                  <input
                    type="text"
                    placeholder="email"
                    style={{ fontSize: '0.9em', color: '#808080', resize: 'none', width: '100%' }}
                  />
                </FormInput>
                <FormInput>
                  <input
                    type="text"
                    placeholder="phone number"
                    style={{ fontSize: '0.9em', color: '#808080', resize: 'none', width: '100%' }}
                  />
                </FormInput>
                <FormInput>
                  <input
                    type="text"
                    placeholder="location"
                    style={{ fontSize: '0.9em', color: '#808080', resize: 'none', width: '100%' }}
                  />
                </FormInput>
                <SubmitButton type="submit">
                  <LabelText>SUBMIT</LabelText>
                </SubmitButton>
              </form>
            ) : (
              <>
                <MyAccountInfo name={props.name} email={props.email} phone={props.phone} location={props.location} />
                <SubmitButton onClick={() => showEditForm(true)} style={{ marginBottom: '16px' }}>
                  <LabelText>EDIT</LabelText>
                </SubmitButton>
              </>
            )}
          </div>
        </Row>
        <NewPostForm />
      </div>
    </>
  )
}

const Row = style('div', { display: 'flex', flexDirection: 'row' })
const FormInput = style('div', {
  border: '1px solid #808080',
  display: 'flex',
  borderRadius: '20px',
  padding: '5px',
  paddingLeft: '10px',
  margin: '5px',
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
const FormText = style('p', { fontSize: '0.9em', color: 'black', resize: 'none', width: '100%' })
