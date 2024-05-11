import { ThemeSelect } from '@/components/theme-select'
import HeaderProfile from './header-profile'

export default function Header() {
  return (
    <header className="flex items-center px-5 justify-between py-2">
      <span className="text-lg">Blog</span>
      <div className="flex items-center gap-4">
        <ThemeSelect />
        <HeaderProfile />
      </div>
    </header>
  )
}
