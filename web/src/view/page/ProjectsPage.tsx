import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { getApolloClient } from '../../graphql/apolloClient'
import { style } from '../../style/styled'
import { AppRouteParams } from '../nav/route'
import { toast } from '../toast/toast'
import { AvailabilityChart } from './components/AvailabilityChart'
import { addListing } from './mutateListings'
import { Page } from './Page'

interface ProjectsPageProps extends RouteComponentProps, AppRouteParams { }
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

export function ProjectsPage(props: ProjectsPageProps) {
  const [editForm, showEditForm] = React.useState(false)
  const [user, editUser] = React.useState<TestUser>({
    name: 'Julia Baylon',
    email: 'julia@gmail.com',
    phone: '(123) 456 - 7890',
    location: 'Westwood, CA',
  })

  var bools = [
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0],
  ]

  const [edit] = React.useState(true)

  return (
    <Page>
      <div style={{ width: '100%' }}>
        <Row>
          <div style={{ flex: 1 }}>
            <div
              style={{
                margin: 'auto',
                width: '180px',
                height: '180px',
                borderRadius: '180px',
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
                <HeaderLabelText> EDIT MY INFORMATION: </HeaderLabelText>
                <FormInput>
                  <input
                    type="text"
                    placeholder="name"
                    style={{ fontSize: '0.9em', color: '#303030', resize: 'none', width: '100%' }}
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
                    style={{ fontSize: '0.9em', color: '#303030', resize: 'none', width: '100%' }}
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
                    style={{ fontSize: '0.9em', color: '#303030', resize: 'none', width: '100%' }}
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
      <p style={{ color: 'white' }}>
        The goal of the course project is to gain hands-on experience building and deploying a scalable web service on
        the internet. This is a "learn
      </p>
      <div style={{ width: '100%', display: 'flex' }}> {AvailabilityChart(bools, edit)} </div>
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

function NewPostForm() {
  const [post, editPost] = React.useState<Post>({
    name: '',
    price: 0,
    start: '',
    end: '',
    location: '',
    tags: '',
    description: '',
  })
  return (
    <>
      <form>
        <HeaderLabelText>NEW POST: </HeaderLabelText>
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
        <FormLabelText>upload image(s) </FormLabelText>
        <input style={{ marginTop: '10px' }} accept="image" type="file" />
        <br />
        <SubmitButton
          type="submit"
          onClick={() => {
            // handleSubmit('test', 10, 'i hope this works')
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
const FormLabelText = style('h1', { fontSize: '0.9em', letterSpacing: '1.25px', marginLeft: '8px' })
const LabelText = style('h1', { fontSize: '0.9em', letterSpacing: '1.25px' })
const HeaderLabelText = style('h1', { fontSize: '1.2em', letterSpacing: '1.25px' })
const FormText = style('p', { fontSize: '0.9em', color: 'black', resize: 'none', width: '100%' })
