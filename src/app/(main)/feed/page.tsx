import { PostCard } from '@/components/post-card'
import fetch from '@/lib/fetch'
import { IPost } from '@/models/post'

export default async function Feed() {
  const posts = await fetch<IPost[]>('/v1/posts/feed', { next: { revalidate: 200 } })
  return (
    <div className="feed">
      {posts.data.map(post => (
        <PostCard
          key={post.id}
          post={post}
        />
      ))}
    </div>
  )
}
