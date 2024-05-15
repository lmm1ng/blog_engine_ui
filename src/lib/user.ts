'use server'

import { API } from './api'
import { IPrivateUser } from '@/models/user'
import getHeaders from './headers'

export default async function getUser(): Promise<IPrivateUser | null> {
  return fetch(API.auth.user, {
    headers: await getHeaders(),
    cache: 'no-cache',
  }).then(async res => {
    if (res.ok) {
      const data = await res.json()
      return data.data
    }
    return null
  })
}
