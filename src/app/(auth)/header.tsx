import { ThemeSelect } from '@/components/theme-select'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="flex items-center px-5 justify-between py-2">
      <span className="text-2xl">
        <Link href="/">Blog</Link>
      </span>
      <div className="flex items-center gap-4">
        <ThemeSelect />
      </div>
    </header>
  )
}
