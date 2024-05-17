import { Inter } from 'next/font/google'
import './globals.css'
import './editor-overwrites.css'
import { ThemeProvider } from '@/providers/theme'
import { Toaster } from '@/components/ui/toaster'
import { cn } from '@/lib/utils'
import { Metadata, Viewport } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export const metadata: Metadata = {
  title: 'Mindposter',
  applicationName: 'Mindposter',
  description: 'Open platform for your articles',
  openGraph: {
    type: 'website',
    url: process.env.NEXT_PUBLIC_API_URL,
    title: 'Mindposter',
    description: 'Open platform for your articles',
    siteName: 'Mindposter',
    images: [
      {
        url: process.env.NEXT_PUBLIC_API_URL + '/pencil.svg',
      },
    ],
  },
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
