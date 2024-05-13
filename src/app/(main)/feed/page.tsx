import { API } from '@/lib/api'
import { IResponse } from '@/lib/fetch'
import { IPost } from '@/models/post'
import FeedPost from './feed-post'
import styles from './styles.module.scss'
import { cn } from '@/lib/utils'

export default async function Feed() {
  const posts: IResponse<IPost[]> = await fetch(API.posts.feed, { cache: 'no-cache' }).then(
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
