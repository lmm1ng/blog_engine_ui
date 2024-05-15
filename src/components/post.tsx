import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { IPost } from '@/models/post'
import MDView from '@/components/md-view'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import Image from 'next/image'

export default function Post({ post, editable }: { post: IPost; editable?: boolean }) {
  return (
    <Card className="text-ellipsis break-words">
      <CardHeader className="p-4">
        <CardTitle className="flex flex-col gap-3">
          <div className="flex justify-between">
            <div className="flex items-center space-x-2 w-full">
              <Avatar>
                <AvatarFallback className="font-normal">
                  {post.user.displayedName[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col sm:flex-row justify-between w-full">
                <span className="text-sm">{post.user.displayedName}</span>
                <span className="text-xs font-normal">
                  {new Date(post.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
          <div>{post.title}</div>
        </CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="p-4">
        <MDView content={post.short} />
      </CardContent>
      <Separator />
      <CardFooter className="p-4">
        <footer className="flex justify-between w-full items-center">
          <Button asChild>
            <Link href={`/posts/${post.id}`}>Read more...</Link>
          </Button>
          {editable ? (
            <Link href={'/post/edit/' + post.id}>
              <Image
                src="/edit.svg"
                width="20"
                height="20"
                alt="edit-post"
              />
            </Link>
          ) : (
            <div />
          )}
        </footer>
      </CardFooter>
    </Card>
  )
}
