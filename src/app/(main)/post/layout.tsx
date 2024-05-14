import getUser from '@/lib/getUser'
import { redirect } from 'next/navigation'

export default async function PostLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = await getUser()

  if (!user) {
    redirect('/')
  }
  return <>{children}</>
}
