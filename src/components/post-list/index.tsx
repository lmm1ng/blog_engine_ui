import Post from '@/components/post'
import styles from './styles.module.scss'
import { cn } from '@/lib/utils'
import { IResponse } from '@/models/common'
import { IPost } from '@/models/post'

import PostsPagination from '@/components/posts-pagination'
import { redirect } from 'next/navigation'

export default async function PostList({
  page = 1,
  type = 'feed',
  posts,
  limit = 10,
}: {
  page?: number
  type?: 'feed' | 'user'
  posts: IResponse<IPost[]>
  limit?: number
}) {
  const total = posts.meta?.total || 0

  if (page !== 1 && total === 0) {
    redirect(type === 'feed' ? '/feed' : '/posts/my')
  }

  return (
    <div className={cn(styles.container, 'flex flex-col w-full space-y-10 h-full')}>
      <div className="flex-1 space-y-5">
        {(posts.data || []).map(post => (
          <Post
            key={post.id}
            post={post}
            editable={type === 'user'}
          />
        ))}
      </div>
      {Boolean(total) && (
        <footer>
          <PostsPagination
            type={type}
            page={page}
            limit={limit}
            total={total}
          />
        </footer>
      )}
    </div>
  )
}
