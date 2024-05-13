'use server'

import MarkdownIt from 'markdown-it'
import 'react-markdown-editor-lite/lib/index.css'
import '@/app/editor-overwrites.css'

const parser = new MarkdownIt()

export default async function MDView({ content }: { content: string }) {
  return (
    <span
      className="custom-html-style"
      dangerouslySetInnerHTML={{ __html: parser.render(content) }}
    />
  )
}
