'use server'
import fetch from '@/lib/fetch'

export const register = async (form: {
  username: string
  displayName: string
  password: string
  repeatPassword: string
  invite: string
}) => {
  const out: { err: unknown } = { err: null }
  try {
    await fetch('/v1/auth/register', { method: 'POST', body: JSON.stringify(form) })
  } catch (e) {
    console.log('e', e)
    out.err = e
  }

  return out
}
