import { PostCard } from '@/components/post-card'
import { API } from '@/lib/api'
import { IResponse } from '@/lib/fetch'
import { IPost } from '@/models/post'

export default async function Feed() {
  const posts: IResponse<IPost[]> = await fetch(API.posts.feed, {
    next: { revalidate: 200 },
  }).then(async res => res.json())

  console.log(posts)
  return (
    <div className="feed">
      {(posts.data || []).map(post => (
        <PostCard
          key={post.id}
          post={post}
        />
      ))}
    </div>
  )
}
