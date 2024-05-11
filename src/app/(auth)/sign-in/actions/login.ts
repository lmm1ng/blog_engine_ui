'use server'
import fetch from '@/lib/fetch'

export const login = async (form: { username: string; password: string }) => {
  const out: { err: unknown } = { err: null }
  try {
    await fetch('/v1/auth/login', { method: 'POST', body: JSON.stringify(form) })
  } catch (e) {
    console.log('e', e)
    out.err = e
  }

  return out
}
