import { API } from '@/lib/api'
import Post from '@/components/post'
import styles from './styles.module.scss'
import { cn } from '@/lib/utils'
import { IResponse } from '@/models/common'
import { IPost } from '@/models/post'

import PostsPagination from '@/components/posts-pagination'
import { redirect } from 'next/navigation'

export default async function Feed({ page = '1' }: { page?: string }) {
  const limit = 5

  const posts: IResponse<IPost[]> = await fetch(
    API.posts.feed + '?' + new URLSearchParams({ page: page || '1', limit: limit.toString() }),
    { cache: 'no-store' },
  ).then(async res => res.json())

  const total = posts.meta?.total || 0

  if (Number(page) !== 1 && total === 0) {
    redirect('/feed')
  }

  return (
    <div className={cn(styles.container, 'flex flex-col w-full space-y-10 h-full')}>
      <div className="flex-1 space-y-5">
        {(posts.data || []).map(post => (
          <Post
            key={post.id}
            post={post}
          />
        ))}
      </div>
      <footer>
        <PostsPagination
          page={Number(page)}
          limit={limit}
          total={total}
        />
      </footer>
    </div>
  )
}
