'use client'

import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
// import style manually
import 'react-markdown-editor-lite/lib/index.css'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { short, title, post } from '@/lib/validators'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { useRouter } from 'next/navigation'
import { API } from '@/lib/api'
import { IPost } from '@/models/post'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

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

  useEffect(() => {
    if (editId !== null) {
      return
    }

    const storage = localStorage.getItem('draftForm')
    const jsonDraft: InferForm = storage ? JSON.parse(storage) : form.formState.defaultValues

    Object.entries(jsonDraft).forEach(([key, value]) => {
      form.setValue(key as keyof InferForm, value)
    })
  }, [editId, form])

  useEffect(() => {
    const sub = form.watch(val => localStorage.setItem('draftForm', JSON.stringify(val)))
    return () => sub.unsubscribe()
  }, [form])

  const onSubmit = async (form: InferForm) => {
    const res = await fetch(API.posts.post + (editId !== null ? `/${editId}` : ''), {
      method: editId === null ? 'POST' : 'PUT',
      body: JSON.stringify(form),
      credentials: 'same-origin',
    })

    if (res.ok) {
      if (editId === null) {
        router.push('/feed')
      } else {
        router.push('/posts/' + editId)
      }
      router.refresh()
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between mb-3 gap-2">
        <span className="text-md text-gray-400">
          {step === 1 && 'Your idea article title'}
          {step === 2 && 'Share your thoughts using Markdown language'}
          {step === 3 && 'Extract a teaser of your post to display as a preview of your post'}
        </span>
        <div className="flex gap-2 [&>*]:basis-[50%]">
          {step !== 1 ? (
            <Button
              variant="secondary"
              onClick={() => setStep(step - 1)}
            >
              Prev
            </Button>
          ) : (
            <div className="sm:hidden" />
          )}
          {step !== 3 ? (
            <Button
              variant="secondary"
              onClick={() => setStep(step + 1)}
            >
              Next
            </Button>
          ) : (
            <div className="sm:hidden" />
          )}
        </div>
      </div>

      <Form {...form}>
        <form
          className="flex-1 flex flex-col space-y-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {step === 1 && (
            <div className="h-full w-full  flex items-center justify-center">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="w-full sm:w-[50%]">
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          {step === 2 && (
            <>
              <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                  <FormItem className="h-full flex flex-col">
                    <FormControl className="flex-1">
                      <MdEditor
                        defaultValue={form.getValues('body')}
                        renderHTML={text => {
                          field.onChange(text)
                          return mdParser.render(text)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
          {step === 3 && (
            <>
              <FormField
                control={form.control}
                name="short"
                render={({ field }) => (
                  <FormItem className="flex-1 flex flex-col">
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
              <div className="flex justify-end">
                <Button
                  className="w-full sm:w-auto"
                  type="submit"
                >
                  {editId === null ? 'Post' : 'Save'}
                </Button>
              </div>
            </>
          )}
        </form>
      </Form>
    </div>
  )
}
