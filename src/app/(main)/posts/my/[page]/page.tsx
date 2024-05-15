import PostList from '@/components/post-list'
import { API } from '@/lib/api'
import getHeaders from '@/lib/headers'
import getUser from '@/lib/user'
import { redirect } from 'next/navigation'

export default async function MyPostsPage({ params }: { params: { page: string } }) {
  const limit = 5
  const user = await getUser()
  if (!user) {
    return redirect('/')
  }
  const posts = await fetch(
    API.posts.post +
      '?' +
      new URLSearchParams({ page: params.page || '1', limit: limit.toString() }),
    { cache: 'no-store', headers: await getHeaders() },
  ).then(async res => res.json())
  return (
    <PostList
      type="user"
      posts={posts}
      page={Number(params.page)}
      limit={limit}
    />
  )
}
