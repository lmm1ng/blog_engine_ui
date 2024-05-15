import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/providers/theme'
import { Toaster } from '@/components/ui/toaster'
import { cn } from '@/lib/utils'
import { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mindposter',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="h-full"
    >
      <body className={cn(inter.className, 'h-full')}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          storageKey="theme"
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
