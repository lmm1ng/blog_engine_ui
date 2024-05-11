export interface IPost {
  id: number
  userId: number
  title: string
  short: string
  body: string
  tags: string[]
  isPublished: boolean
}
