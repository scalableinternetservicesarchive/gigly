import * as React from 'react'
import { FetchUserContext3_self2, UserType } from '../../graphql/query.gen'

export class UserCtx {
  constructor(public user: FetchUserContext3_self2 | null) {}
  isAdmin() {
    return this.user && this.user?.userType === UserType.ADMIN
  }
}

export const UserContext = React.createContext<UserCtx>(new UserCtx(null))
