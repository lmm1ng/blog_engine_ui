// import type { Metadata } from "next";

import { Separator } from '@/components/ui/separator'
import Header from './header'

export default function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="h-full flex flex-col">
      <Header />
      <Separator className="mb-3" />
      <main className="container flex-1">{children}</main>
    </div>
  )
}
