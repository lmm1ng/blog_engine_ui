import { IUser } from './user'

export interface IPost {
  id: number
  user: IUser
  userId: number
  title: string
  short: string
  body: string
  tags: string[]
  isPublished: boolean
  createdAt: string
  updatedAt: string
  deletedAt: string
}
