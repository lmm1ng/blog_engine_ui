import Logo from '@/components/logo'
import { ThemeSelect } from '@/components/theme-select'

export default function Header() {
  return (
    <header className="flex items-center px-5 justify-between py-2">
      <Logo />
      <div className="flex items-center gap-4">
        <ThemeSelect />
      </div>
    </header>
  )
}
