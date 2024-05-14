'use server'

import { cookies } from 'next/headers'
import { API } from './api'
import { IPrivateUser } from '@/models/user'

export default async function getUser(): Promise<IPrivateUser | null> {
  return fetch(API.auth.user, {
    headers: { Cookie: `session=${cookies().get('session')?.value}` },
    cache: 'no-cache',
  }).then(async res => {
    if (res.ok) {
      const data = await res.json()
      return data.data
    }
    return null
  })
}
