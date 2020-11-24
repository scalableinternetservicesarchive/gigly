import { useQuery } from '@apollo/client'
import * as React from 'react'
import { useContext } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { getApolloClient } from '../../../graphql/apolloClient'
import { FetchListing /*, FetchUser*/ } from '../../../graphql/query.gen'
import { style } from '../../../style/styled'
import { UserContext } from '../../auth/user'
import { toast } from '../../toast/toast'
import { fetchListing } from '../fetchListings'
// import { fetchUser } from '../fetchUser'
import { addComment } from '../mutateComments'
import { AvailabilityChart } from './AvailabilityChart'

// interface User {
//   name: string
//   profPic: string
// }

//Will get rid of email, phone, profpic later
interface Listing {
  listingId: number
  listingTypeSelling: boolean
  name: string
  email: string
  phone: string
  title: string
  profPic: string
  pic1: string | null
  pic2: string | null
  pic3: string | null
  price: number | null
  startDate: string
  endDate: string
  location: string
  about: string
  description: string
  availability: string
  tags: string[]
}

function strToMatrix(s: string) {
  //array of strings
  let strArray = s.split(' ')

  //char matrix
  let charMatrix: string[][] = []
  for (var i = 0; i < strArray.length; i++) {
    charMatrix.push(strArray[i].split(''))
  }

  //number matrix
  let numMatrix: number[][] = []
  for (var i = 0; i < charMatrix.length; i++) {
    let temp: number[] = []
    for (var j = 0; j < charMatrix[0].length; j++) {
      temp.push(parseInt(charMatrix[i][j]))
    }
    numMatrix.push(temp)
  }

  return numMatrix
}

function getDescriptionLine(s: string) {
  return <p style={{ fontSize: '0.9em', lineHeight: '1.25em' }}>{s}</p>
}

//will get rid of commenterPic later
interface Comment {
  commenter: string
  date: string
  commenterPic: string
  comment: string
}

function getComment(c: Comment) {
  return (
    <div style={{ width: '100%', display: 'flex', marginTop: '5%' }}>
      <div style={{ flex: '10%' }}> {getCommenterPhoto(c.commenterPic)} </div>
      <div style={{ flex: '90%', marginLeft: '5%' }}>
        <div style={{ fontSize: '0.9em', WebkitTextStrokeWidth: '0.5px' }}> {c.commenter} </div>
        <div style={{ fontSize: '0.8em', color: 'rgba(0, 0, 0, 0.8)', marginTop: '1%', marginBottom: '1%' }}>
          {' '}
          {c.date}{' '}
        </div>
        <div style={{ fontSize: '0.9em', color: '#666666' }}>
          {' '}
          {c.comment.split('\n').map(line => getDescriptionLine(line))}{' '}
        </div>
      </div>
    </div>
  )
}

function getCommenterPhoto(l: string) {
  return (
    <div
      style={{
        width: '6vh',
        height: '6vh',
        WebkitBorderRadius: '6vh',
        borderRadius: '6vh',
        border: '0.5px solid #18A0FB',
        backgroundPositionY: 'center',
        backgroundSize: 'cover',
        backgroundImage: 'url(' + l + ')',
      }}
    ></div>
  )
}

function handleSubmit(commentContents: string, listingId_ref: number, userId: number, username: string, userPic: string) {

  let dateTime = new Date();
  let d = dateTime.getDate();
  let month = dateTime.getMonth() + 1;
  let year = dateTime.getFullYear();
  let meridiem = 'AM';
  let hr = dateTime.getHours();
  let min = dateTime.getMinutes();
  if(hr >= 12) {
    meridiem = 'PM';
    if(hr < 12) {
      hr = hr % 12;
    }
  } else if(hr == 0) {
    hr = 12;
  }
  let date = `${month<10?`0${month}`:`${month}`}/${d}/${year} at ${hr}:${min} ${meridiem}`;

  addComment(getApolloClient(), { date, commentContents, listingId_ref, userId, username, userPic })
    .then(() => {
      toast('submitted!')
    })
    .catch(err => {
      console.log('oops')
      console.log(err)
    })
}

export function Popup(listingId: number) {
  const [showing, setShowing] = React.useState('Images')
  const [curPic, setCurPic] = React.useState(0)
  const { user: curUser } = useContext(UserContext)
  let name = ''
  let id = 1
  if(curUser) {
    name = curUser.name
    id = curUser.id
  }
  let profPic = 'https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=670&q=80'


  let listing: Listing = {
    listingId: listingId,
    listingTypeSelling: true,
    name: '',
    email: 'filler_email@gmail.com',
    phone: '(123) 456 - 7890',
    title: 'This will show if your listing data is empty',
    profPic:
      'https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=670&q=80',
    pic1:
      'https://images.unsplash.com/photo-1547567667-1aa64e6f58dc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
    // pic2: null;
    pic2:
      'https://images.unsplash.com/photo-1598647401237-a9387d7ae2da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1748&q=80',
    pic3:
      'https://images.unsplash.com/photo-1516979187457-637abb4f9353?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
    price: 42,
    startDate: '',
    endDate: '',
    location: 'Filler Location',
    about:
      'Here are some sentences about me.\nThis shows up on all of the listings I have posted\nI am talkimg about me.',
    description: 'This is a test to see if the description works.\nThsadfis should appear on the next line.',
    availability:
      '000000111000011000000000 000000110010011000000000 000000111000011000000000 000000111000001100000000 000000111000011000000000 000000111000011000000000 000000010000011000111000',
    tags: ['filler_tag', 'random_tag'],
  }

  // listingId = 4
  //find the listing
  let { loading: listingLoading, data: listingData } = useQuery<FetchListing>(fetchListing, {variables: {listingId }});

  let comments: Comment[] = []
  if (listingData && listingData.listing !== null) {
    listing.name = listingData.listing.username
    listing.title = listingData.listing.sellingName
    listing.price = listingData.listing.price
    listing.startDate = listingData.listing.startDate
    listing.endDate = listingData.listing.endDate
    listing.location = listingData.listing.location
    listing.description = listingData.listing.description
    if (listingData.listing.comments) {
      listingData.listing.comments.map(comment => {
          //No longer queries for the username corresponding to the user ID
          if (comment !== null ) {
            // let userId = comment.userId
            // let { loading: userLoading, data: userData } = useQuery<FetchUser>(fetchUser, {variables: { userId }});
            let username = 'Filler name';
            // if (userData && userData?.user) {
            //   username = userData?.user.name;
            // }
            comments.push({
              commenter: comment.username,
              date: comment.date,
              commenterPic: comment.userPic,
              comment: comment.commentContents
            });
        }
      })
    }
  }

  var pics = [listing.pic1, listing.pic2, listing.pic3]
  var picIndices = []
  for (var i = 0; i < 3; i++) {
    if (pics[i]) {
      picIndices.push(i)
    }
  }

  var availabilityEdit = false

  var availability = strToMatrix(listing.availability)

  var tagsDisplay = listing.tags.join(', ')

  const [comment, editComment] = React.useState<Comment>({
    commenter: '',
    date: '',
    commenterPic: '',
    comment: '',
  })

  return (
    <>
      <div
        style={{
          backgroundColor: 'rgb(88,98,111)',
          display: 'flex',
          justifyContent: 'center',
          height: '100vh',
          width: '100%',
          padding: '6%',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            backgroundColor: 'white',
            display: 'flex',
            width: '67.5%',
            height: '85vh',
            minWidth: '400px',
            borderRadius: '3%',
            padding: '4.5%',
          }}
        >
          <div style={{ flex: '37.5%', borderRight: '1px solid #E5E5E5', overflow: 'scroll' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5%', marginTop: '2.5%' }}>
              <div
                style={{
                  width: '10vh',
                  height: '10vh',
                  WebkitBorderRadius: '10vh',
                  borderRadius: '10vh',
                  border: '0.5px solid #18A0FB',
                  backgroundPositionY: 'center',
                  backgroundSize: 'cover',
                  backgroundImage:
                    'url(' +
                    'https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=670&q=80' +
                    ')',
                }}
              ></div>
              <h1 style={{ marginLeft: '5%', fontSize: '1.6em' }}>{listing.name}</h1>
            </div>
            <div style={{ display: 'flex', marginLeft: '2%', marginBottom: '3%', alignItems: 'center' }}>
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  marginRight: '5%',
                  backgroundSize: 'cover',
                  backgroundImage: 'url(' + 'https://i.ibb.co/0Fzs8GN/phone-call.png' + ')',
                }}
              ></div>
              <h2 style={{ fontSize: '0.9em', marginLeft: '2%' }}>{listing.phone}</h2>
            </div>
            <div style={{ display: 'flex', marginLeft: '2%', alignItems: 'center' }}>
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  marginRight: '5%',
                  backgroundSize: 'cover',
                  backgroundImage: 'url(' + 'https://i.ibb.co/mT7pkQq/email.png' + ')',
                }}
              ></div>
              <h2 style={{ fontSize: '0.9em', marginLeft: '2%' }}>{listing.email}</h2>
            </div>
            {listing.listingTypeSelling ? (
              <h1 style={{ fontSize: '0.9em', letterSpacing: '1.25px', marginTop: '10%' }}>ABOUT</h1>
            ) : (
              <h1></h1>
            )}
            {listing.listingTypeSelling ? (
              <div style={{ marginRight: '10%', marginTop: '4%' }}>
                {listing.about.split('\n').map(line => getDescriptionLine(line))}
              </div>
            ) : (
              <p></p>
            )}
            <h1 style={{ fontSize: '0.9em', letterSpacing: '1.25px', marginTop: '10%' }}>DESCRIPTION</h1>
            <div style={{ marginRight: '10%', marginTop: '4%' }}>
              {listing.description.split('\n').map(line => getDescriptionLine(line))}
            </div>
            <h1 style={{ fontSize: '0.9em', letterSpacing: '1.25px', marginTop: '10%' }}>TAGS</h1>
            <p style={{ fontSize: '0.9em', marginRight: '10%', marginTop: '4%', lineHeight: '1.25em' }}>
              {tagsDisplay}
            </p>
          </div>
          <div style={{ flex: '62.5%', paddingLeft: '7.5%', overflow: 'scroll' }}>
            {listing.listingTypeSelling ? (
              <h2 style={{ fontSize: '0.9em', letterSpacing: '1.25px' }}>OFFERING</h2>
            ) : (
              <h2 style={{ fontSize: '0.9em', letterSpacing: '1.25px' }}>LOOKING FOR</h2>
            )}
            <h1 style={{ fontSize: '1.5em', marginTop: '1.5%' }}>{listing.title}</h1>
            <p style={{ fontSize: '0.9em', marginTop: '2.5%', color: 'rgb(0, 0, 0, 0.75)'  }}>from {listing.startDate} to {listing.endDate}</p>
            <div style={{ display: 'flex', marginTop: '3.5%' }}>
              <div style={{ flex: '30%', display: 'flex', alignItems: 'center' }}>
                <div
                  style={{
                    width: '25px',
                    height: '25px',
                    // marginRight: '5%',
                    backgroundSize: 'cover',
                    backgroundImage: 'url(' + 'https://i.ibb.co/r2jKJkQ/price-tag.png' + ')',
                  }}
                ></div>
                <p style={{ marginLeft: '10px' }}>${listing.price}/hr</p>
              </div>
              <div style={{ marginLeft: '25px', flex: '70%', display: 'flex', alignItems: 'center' }}>
                <div
                  style={{
                    width: '25px',
                    height: '25px',
                    // marginRight: '5%',
                    backgroundSize: 'cover',
                    backgroundImage: 'url(' + 'https://i.ibb.co/4jjpzFb/navigation.png' + ')',
                  }}
                ></div>
                <p style={{ marginLeft: '10px' }}>{listing.location}</p>
              </div>
            </div>
            {listing.listingTypeSelling ? (
              <div style={{ display: 'flex', marginTop: '7%' }}>
                {showing == 'Images' ? (
                  <h2
                    style={{
                      cursor: 'pointer',
                      fontSize: '0.9em',
                      letterSpacing: '1.25px',
                      WebkitTextStrokeWidth: '1px',
                    }}
                  >
                    IMAGES{' '}
                  </h2>
                ) : (
                  <h2
                    onClick={() => setShowing('Images')}
                    style={{ cursor: 'pointer', fontSize: '0.9em', letterSpacing: '1.25px' }}
                  >
                    IMAGES{' '}
                  </h2>
                )}
                {showing == 'Availability' ? (
                  <h2
                    style={{
                      fontSize: '0.9em',
                      WebkitTextStrokeWidth: '1px',
                      letterSpacing: '1.25px',
                      marginLeft: '10%',
                      cursor: 'pointer',
                    }}
                  >
                    AVAILABILITY{' '}
                  </h2>
                ) : (
                  <h2
                    onClick={() => setShowing('Availability')}
                    style={{ cursor: 'pointer', fontSize: '0.9em', letterSpacing: '1.25px', marginLeft: '10%' }}
                  >
                    AVAILABILITY{' '}
                  </h2>
                )}
                {showing == 'Comments' ? (
                  <h2
                    style={{
                      fontSize: '0.9em',
                      WebkitTextStrokeWidth: '1px',
                      letterSpacing: '1.25px',
                      marginLeft: '10%',
                      cursor: 'pointer',
                    }}
                  >
                    COMMENTS{' '}
                  </h2>
                ) : (
                  <h2
                    onClick={() => setShowing('Comments')}
                    style={{ cursor: 'pointer', fontSize: '0.9em', letterSpacing: '1.25px', marginLeft: '10%' }}
                  >
                    COMMENTS{' '}
                  </h2>
                )}
              </div>
            ) : (
              <div style={{ display: 'flex', marginTop: '10%' }}>
                <h2
                  style={{
                    cursor: 'pointer',
                    fontSize: '0.9em',
                    letterSpacing: '1.25px',
                    WebkitTextStrokeWidth: '1px',
                  }}
                >
                  AVAILABILITY{' '}
                </h2>
              </div>
            )}
            {listing.listingTypeSelling && showing == 'Images' ? (
              <div style={{ width: '100%', marginRight: '10%', marginTop: '5%' }}>
                <div style={{ display: 'flex' }}>
                  {picIndices.map(pi =>
                    pi == curPic ? (
                      <div
                        onClick={() => setCurPic(pi)}
                        style={{
                          width: '1.25vh',
                          height: '1.25vh',
                          borderRadius: '1.25vh',
                          marginRight: '2vh',
                          marginBottom: '2vh',
                          backgroundColor: '#808080',
                        }}
                      ></div>
                    ) : (
                      <div
                        onClick={() => setCurPic(pi)}
                        style={{
                          width: '1.25vh',
                          height: '1.25vh',
                          borderRadius: '1.25vh',
                          marginRight: '2vh',
                          marginBottom: '2vh',
                          backgroundColor: '#C4C4C4',
                        }}
                      ></div>
                    )
                  )}
                </div>
                <div
                  style={{
                    height: '45vh',
                    width: '100%',
                    backgroundSize: 'cover',
                    backgroundImage: 'url(' + pics[curPic] + ')',
                  }}
                ></div>
              </div>
            ) : (
              <>
                {showing == 'Availability' ? (
                  <div style={{ width: '100%', marginRight: '10%', marginTop: '5%' }}>
                    <div style={{ width: '99%', display: 'flex' }}>
                      {' '}
                      {AvailabilityChart(availability, availabilityEdit)}{' '}
                    </div>
                  </div>
                ) : (
                  <div style={{ width: '99%' }}>
                    <div style={{ width: '100%', display: 'flex', marginTop: '5%' }}>
                      <div style={{ flex: '10%' }}> {getCommenterPhoto(profPic)} </div>
                      <form style={{ width: '100%', flex: '90%', display: 'flex' }}>
                        <div
                          style={{
                            flex: '90%',
                            marginLeft: '5%',
                            marginTop: '2vh',
                            borderBottom: '1.5px solid #18A0FB',
                            display: 'flex',
                            paddingBottom: '5px',
                          }}
                        >
                          <TextareaAutosize
                            placeholder="Add a comment..."
                            style={{ width: '100%', fontSize: '0.9em', color: '#808080', resize: 'none' }}
                            onChange={e =>
                              editComment({
                                commenter: comment.commenter,
                                date: comment.date,
                                commenterPic: comment.commenterPic,
                                comment: e.target.value,
                              })
                            }
                          />
                        </div>
                        {comment.comment != '' ? (
                          <CommentPostButtonDark
                            type="submit"
                            onClick={() => {
                              handleSubmit(comment.comment, listingId, id, name, profPic)
                            }}
                          >
                            POST
                          </CommentPostButtonDark>
                        ) : (
                          <CommentPostButton>POST</CommentPostButton>
                        )}
                      </form>
                    </div>
                    {comments.map(c => getComment(c))}
                  </div>
                )}{' '}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

const CommentPostButton = style('div', {
  flex: '10%',
  display: 'block',
  borderRadius: '20px',
  color: 'rgba(24, 160, 251, 0.5)',
  padding: '10px',
  fontSize: '0.9em',
})

const CommentPostButtonDark = style('button', {
  flex: '10%',
  display: 'block',
  borderRadius: '20px',
  color: 'rgba(24, 160, 251, 1)',
  padding: '10px',
  fontSize: '0.9em',
})


