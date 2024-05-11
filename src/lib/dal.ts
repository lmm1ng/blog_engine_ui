import 'server-only'

import fetch from '@/lib/fetch'
import { IUser } from '@/models/user'
import { cache } from 'react'
import { cookies } from 'next/headers'

export const verifySession = cache(async () => {
  console.log('co', cookies().getAll())
  let me: IUser | null = null
  try {
    me = (await fetch<IUser>('/v1/auth/user'))?.data
  } catch (e) {
    console.error('Cant fetch user', e)
  }

  console.log('me', me)

  return { isAuth: Boolean(me), user: me }
})
