// import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/providers/theme'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="h-screen"
    >
      <body className={`${inter.className} h-full`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}