'use server'

import { cookies } from 'next/headers'

export default async function getHeaders(): Promise<HeadersInit> {
  return { Cookie: `session=${cookies().get('session')?.value}` }
}
