import PostList from '@/components/post-list'
import { API } from '@/lib/api'

export default async function FeedPage({ params }: { params: { page: string } }) {
  const limit = 5
  const posts = await fetch(
    API.posts.feed + '?' + new URLSearchParams({ page: params.page, limit: limit.toString() }),
    { cache: 'no-store' },
  ).then(async res => res.json())
  return (
    <PostList
      type="feed"
      page={Number(params.page)}
      limit={limit}
      posts={posts}
    />
  )
}
