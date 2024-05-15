import MDView from '@/components/md-view'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { API } from '@/lib/api'
import getUser from '@/lib/user'
import { IResponse } from '@/models/common'
import { IPost } from '@/models/post'
import Image from 'next/image'
import Link from 'next/link'

export default async function Post({ params }: { params: { postId: string } }) {
  const user = await getUser()

  const post: IResponse<IPost> = await fetch(API.posts.post + `/${params.postId}`, {
    cache: 'no-cache',
  }).then(res => res.json())
  return (
    <article>
      <header className="flex justify-between mb-2">
        <div className="flex items-center space-x-2 font-bold">
          <Avatar>
            <AvatarFallback>{post.data.user.displayedName[0]}</AvatarFallback>
          </Avatar>
          <span>{post.data.user.displayedName}</span>
        </div>
        <div className="flex flex-col gap-2 items-end">
          <span className="text-xs">{new Date(post.data.createdAt).toLocaleString()}</span>
          {user?.id === post.data.userId && (
            <Link href={'/post/edit/' + post.data.id}>
              <Image
                src="/edit.svg"
                width="20"
                height="20"
                alt="edit-post"
              />
            </Link>
          )}
        </div>
      </header>
      <span className="font-bold text-2xl">{post.data.title}</span>
      <main>
        <MDView content={post.data.body} />
      </main>
    </article>
  )
}
