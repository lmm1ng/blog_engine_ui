'use client'

import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
// import style manually
import 'react-markdown-editor-lite/lib/index.css'
import '@/app/editor-overwrites.css'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { short, title, post } from '@/lib/validators'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useRouter } from 'next/navigation'
import { API } from '@/lib/api'
import { IPost } from '@/models/post'
import { Textarea } from '@/components/ui/textarea'

const formSchema = z.object({
  body: post,
  short,
  title,
  isPublished: z.boolean(),
  tags: z.array(z.string()),
})

type InferForm = z.infer<typeof formSchema>

const mdParser = new MarkdownIt()

export default function PostEditor({
  inital,
  editId = null,
  startStep = 1,
}: {
  inital?: InferForm
  editId?: IPost['id'] | null
  startStep?: number
}) {
  const router = useRouter()

  const [step, setStep] = useState(startStep)

  const form = useForm<InferForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      body: inital?.body ?? '',
      short: inital?.short ?? '',
      title: inital?.title ?? '',
      isPublished: inital?.isPublished ?? true,
      tags: inital?.tags ?? [],
    },
  })

  const onSubmit = async (form: InferForm) => {
    const res = await fetch(API.posts.post + (editId !== null ? `/${editId}` : ''), {
      method: editId === null ? 'POST' : 'PUT',
      body: JSON.stringify(form),
      credentials: 'same-origin',
    })

    if (res.ok) {
      if (editId == null) {
        router.push('/feed')
      }
      router.push('/posts/' + editId)

      router.refresh()
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-3">
        <span className="text-lg font-bold">Step {step}</span>
        <div className="flex space-x-2">
          {step !== 1 && (
            <Button
              variant="secondary"
              onClick={() => setStep(step - 1)}
            >
              Prev
            </Button>
          )}
          {step !== 2 && (
            <Button
              variant="secondary"
              onClick={() => setStep(step + 1)}
            >
              Next
            </Button>
          )}
        </div>
      </div>

      <Form {...form}>
        <form
          className="flex-1 flex flex-col space-y-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {step === 1 && (
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem className="h-full flex flex-col">
                  <FormLabel>Post body</FormLabel>
                  <FormControl className="flex-1">
                    <MdEditor
                      defaultValue={form.getValues('body')}
                      renderHTML={text => mdParser.render(text)}
                      onChange={({ text }) => field.onChange(text)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {step === 2 && (
            <>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="short"
                render={({ field }) => (
                  <FormItem className="flex-1 flex flex-col">
                    <FormLabel>Short</FormLabel>
                    <FormControl>
                      <Textarea
                        className="flex-1"
                        {...field}
                        style={{ resize: 'none' }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end ">
                <Button type="submit">{editId === null ? 'Create' : 'Edit'}</Button>
              </div>
            </>
          )}
        </form>
      </Form>
    </div>
  )
}
