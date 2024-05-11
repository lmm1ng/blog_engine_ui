import Header from './header'

// import type { Metadata } from "next";
export default function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex justify-center items-center">{children}</main>
    </div>
  )
}
