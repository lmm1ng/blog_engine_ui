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
import { API } from '@/lib/api'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
  body: post,
  short,
  title,
  isPublished: z.boolean(),
  tags: z.array(z.string()),
})

const mdParser = new MarkdownIt(/* Markdown-it options */)

export default function NewPost() {
  const router = useRouter()
  const [step, setStep] = useState(1)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      body: '',
      short: '',
      title: '',
      isPublished: true,
      tags: [],
    },
  })

  const onCreatePost = async (form: z.infer<typeof formSchema>) => {
    const res = await fetch(API.posts.create, {
      method: 'POST',
      body: JSON.stringify(form),
      credentials: 'same-origin',
    })

    if (res.status === 201) {
      router.push('/')
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
              onClick={() => setStep(2)}
            >
              Next
            </Button>
          )}
        </div>
      </div>

      <Form {...form}>
        <form
          className="h-full"
          onSubmit={form.handleSubmit(onCreatePost)}
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
                  <FormItem>
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
                  <FormItem>
                    <FormLabel>Short</FormLabel>
                    <FormControl>
                      <MdEditor
                        //     value={field.value}
                        // onChange={({text}) => field.onChange(text)}
                        //     className="h-full my-2"
                        //  renderHTML={text => mdParser.render(text)}
                        renderHTML={text => mdParser.render(text)}
                        onChange={({ text }) => field.onChange(text)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end mt-4">
                <Button type="submit">Create</Button>
              </div>
            </>
          )}
        </form>
      </Form>
    </div>
  )
}
