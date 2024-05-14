import { API } from '@/lib/api'
import FeedPost from './feed-post'
import styles from './styles.module.scss'
import { cn } from '@/lib/utils'
import { IResponse } from '@/models/common'
import { IPost } from '@/models/post'

export default async function Feed() {
  const posts: IResponse<IPost[]> = await fetch(API.posts.feed, { cache: 'no-store' }).then(
    async res => res.json(),
  )

  return (
    <div className={cn(styles.container, 'flex flex-col w-full space-y-10')}>
      {(posts.data || []).map(post => (
        <FeedPost
          key={post.id}
          post={post}
        />
      ))}
    </div>
  )
}
