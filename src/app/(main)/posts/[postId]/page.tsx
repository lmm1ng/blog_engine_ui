import MDView from '@/components/md-view'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { API } from '@/lib/api'
import { IResponse } from '@/models/common'
import { IPost } from '@/models/post'

export default async function Post({ params }: { params: { postId: string } }) {
  const post: IResponse<IPost> = await fetch(API.posts.get + `/${params.postId}`, {
    cache: 'no-cache',
  }).then(async res => res.json())
  return (
    <article>
      <header className="flex justify-between mb-2">
        <div className="flex items-center space-x-2 font-bold">
          <Avatar>
            <AvatarFallback>{post.data.user.displayedName[0]}</AvatarFallback>
          </Avatar>
          <span>{post.data.user.displayedName}</span>
        </div>
        <span className="text-xs">{new Date(post.data.createdAt).toLocaleString()}</span>
      </header>
      <span className="font-bold text-2xl">{post.data.title}</span>
      <main>
        <MDView content={post.data.body} />
      </main>
    </article>
  )
}
