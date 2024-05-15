import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mindposter | Feed',
  description: 'All posted articles',
  openGraph: {
    url: process.env.NEXT_PUBLIC_API_URL + '/feed',
    title: 'Feed',
  },
}

export default function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
