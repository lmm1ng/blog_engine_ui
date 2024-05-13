import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { IPost } from '@/models/post'
import MarkdownIt from 'markdown-it'
import 'react-markdown-editor-lite/lib/index.css'
import '@/app/editor-overwrites.css'

const parser = new MarkdownIt()

export default function FeedPost({ post }: { post: IPost }) {
  return (
    <Card className="text-ellipsis break-words">
      <CardHeader>
        <CardTitle className="flex flex-col gap-3">
          <div className="flex justify-between">
            <div className="flex items-center space-x-2">
              <Avatar>
                <AvatarFallback>{post.user.displayedName[0]}</AvatarFallback>
              </Avatar>
              <span className="text-sm">{post.user.displayedName}</span>
            </div>
            <span className="text-xs">{new Date(post.createdAt).toLocaleString()}</span>
          </div>
          <div>{post.title}</div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <span
          className="custom-html-style"
          dangerouslySetInnerHTML={{ __html: parser.render(post.short) }}
        />
      </CardContent>
      <CardFooter>
        <Button>Reed more...</Button>
      </CardFooter>
    </Card>
  )
}
