import { IPost } from '@/models/post'

export function PostCard({ post }: { post: IPost }) {
  return <div>{post.id}</div>
}
