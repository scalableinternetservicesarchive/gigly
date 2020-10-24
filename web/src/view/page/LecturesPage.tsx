import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { style } from '../../style/styled'
import { AppRouteParams } from '../nav/route'
import { Page } from './Page'

interface LecturesPageProps extends RouteComponentProps, AppRouteParams {}

interface CardData {
  serviceName: string
  username: string
  profPic: string
  price: number
}

function getCard(c: CardData) {
  return (
    <Card key={c.serviceName}>
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
          <UserInfo $img={c.profPic} />
          <div style={{ paddingLeft: '15px', color: '#696969' }}>{c.username}</div>
          <div style={{ paddingLeft: '25px', color: '#3C82DC' }}>{'$' + c.price}</div>
        </div>
      </CardInfo>
    </Card>
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function LecturesPage(props: LecturesPageProps) {
  const [search, setSearch] = React.useState<string>('')
  const cards: CardData[] = [
    {
      serviceName: 'Personalized Guitar Lessons',
      username: 'Dolphin123',
      price: 30,
      profPic:
        'https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=670&q=80',
    },
    {
      serviceName: 'Spanish Translation',
      username: 'Fox456',
      price: 18,
      profPic:
        'https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=670&q=80',
    },
    {
      serviceName: ':))))))))))',
      username: 'lol',
      price: 9000,
      profPic:
        'https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=670&q=80',
    },
  ]
  const filteredCards = cards.filter(card => {
    return (
      card.serviceName.toLowerCase().includes(search.toLowerCase()) ||
      card.username.toLowerCase().includes(search.toLowerCase())
    )
  })
  return (
    <Page>
      <div style={{ paddingTop: '100px' }}>
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
      <div className="flex flex-row" style={{ paddingTop: '80px' }}>
        {filteredCards.map(card => getCard(card))}
      </div>
    </Page>
  )
}

const Card = style('div', 'flex white items-center list pa6 ph2 ', {
  backgroundPositionY: 'center',
  backgroundSize: 'cover',
  backgroundImage:
    'url(' +
    'https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=670&q=80' +
    ')',
  paddingTop: '20px',
  paddingBottom: '10px',
  justifyContent: 'flex-start',
  minHeight: '200px',
  minWidth: '250px',
  borderRadius: '25px',
  fontFamily: 'Roboto',
})

const CardInfo = style('div', 'flex flex-column', {
  paddingTop: '100px',
})

const UserInfo = style('div', (c: { $img?: string }) => ({
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
