export interface IUser {
  id: number
  displayedName: string
}

export interface IPrivateUser extends IUser {
  username: string
  email: string
  invitedByUser: number
}
