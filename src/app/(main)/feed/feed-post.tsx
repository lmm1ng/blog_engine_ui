import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { IPost } from '@/models/post'
import MDView from '@/components/md-view'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

export default async function FeedPost({ post }: { post: IPost }) {
  return (
    <Card className="text-ellipsis break-words">
      <CardHeader className="p-4">
        <CardTitle className="flex flex-col gap-3">
          <div className="flex justify-between">
            <div className="flex items-center space-x-2">
              <Avatar>
                <AvatarFallback>{post.user.displayedName[0]}</AvatarFallback>
              </Avatar>
              <span className="text-sm">{post.user.displayedName}</span>
            </div>
            <span className="text-xs font-normal">{new Date(post.createdAt).toLocaleString()}</span>
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
        <Button asChild>
          <Link href={`/posts/${post.id}`}>Read more...</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
