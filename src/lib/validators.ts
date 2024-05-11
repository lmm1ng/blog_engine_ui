import { z } from 'zod'

export const username = z.string().min(3, {
  message: 'Username must be at least 3 characters.',
})

export const displayName = z.string().min(3, {
  message: 'Display name must be at least 3 characters.',
})

export const password = z.string().min(5, {
  message: 'Password must be at least 5 characters.',
})

export const inviteCode = z.string().min(5, {
  message: 'Invite code must be at least 5 characters.',
})
