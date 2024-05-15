import PostEditor from '@/components/post-editor'
import { API } from '@/lib/api'
import getUser from '@/lib/user'
import { IResponse } from '@/models/common'
import { IPost } from '@/models/post'
import { redirect } from 'next/navigation'

export default async function EditPost({ params }: { params: { postId: string } }) {
  const post: IResponse<IPost> = await fetch(API.posts.post + `/${params.postId}`, {
    cache: 'no-cache',
  }).then(async res => res.json())

  const user = await getUser()

  if (post.data.userId !== user?.id) {
    redirect('/')
  }

  const initial = {
    body: post.data?.body,
    short: post.data?.short,
    title: post.data?.title,
    isPublished: post.data?.isPublished,
    tags: post.data?.tags,
  }

  return (
    <PostEditor
      editId={post.data.id}
      inital={initial}
    />
  )
}
