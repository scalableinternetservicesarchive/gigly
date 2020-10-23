import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { style } from '../../style/styled'
import { AppRouteParams } from '../nav/route'
import { Page } from './Page'

interface LecturesPageProps extends RouteComponentProps, AppRouteParams {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function LecturesPage(props: LecturesPageProps) {
  return (
    <Page>
      <div style={{ paddingTop: '100px' }}>
        <Card>
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
              }}
            >
              Personalized Guitar Lessons
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
              <UserInfo />
              <div style={{ paddingLeft: '15px', color: '#696969' }}>Dolphin 123</div>
              <div style={{ paddingLeft: '25px', color: '#3C82DC' }}>$30</div>
            </div>
          </CardInfo>
        </Card>
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

const UserInfo = style('div', {
  width: '50px',
  height: '50px',
  borderRadius: '180px',
  border: '0.5px solid #18A0FB',
  backgroundPositionY: 'center',
  backgroundSize: 'cover',
  backgroundImage:
    'url(' +
    'https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=670&q=80' +
    ')',
})
