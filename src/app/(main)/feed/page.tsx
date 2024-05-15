import PostList from '@/components/post-list'
import { API } from '@/lib/api'

export default async function FeedPage() {
  const limit = 5
  const posts = await fetch(
    API.posts.feed + '?' + new URLSearchParams({ page: '1', limit: limit.toString() }),
    { cache: 'no-store' },
  ).then(async res => res.json())
  return (
    <PostList
      type="feed"
      posts={posts}
      limit={limit}
    />
  )
}
