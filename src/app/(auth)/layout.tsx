import getUser from '@/lib/getUser'
import Header from './header'
import { API } from '@/lib/api'
import { cookies } from 'next/headers'

// import type { Metadata } from "next";
export default async function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = await getUser()

  if (user) {
    await fetch(API.auth.logout, {
      headers: { Cookie: `session=${cookies().get('session')?.value}` },
      method: 'POST',
    })
  }

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex justify-center items-center">{children}</main>
    </div>
  )
}
