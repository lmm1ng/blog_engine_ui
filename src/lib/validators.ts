import { z } from 'zod'

export const username = z.string().min(3, {
  message: 'Username must be at least 3 characters.',
})

export const displayedName = z.string().min(3, {
  message: 'Display name must be at least 3 characters.',
})

export const password = z.string().min(5, {
  message: 'Password must be at least 5 characters.',
})

export const inviteCode = z.string().min(5, {
  message: 'Invite code must be at least 5 characters.',
})

export const short = z
  .string()
  .min(100, {
    message: 'Short must be at least 100 characters.',
  })
  .max(3000, { message: 'Short must be no more than 3000 characters.' })

export const post = z.string().min(1, {
  message: 'Post required',
})

export const title = z.string().min(1, {
  message: 'Title required',
})
