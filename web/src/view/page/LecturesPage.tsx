import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { AppRouteParams } from '../nav/route'
import { SellingCard } from './components/SellingCard'
import { Page } from './Page'

interface LecturesPageProps extends RouteComponentProps, AppRouteParams {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function LecturesPage(props: LecturesPageProps) {
  return (
    <Page>
      <SellingCard/>
    </Page>
  )
}
