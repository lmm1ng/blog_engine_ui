import { ThemeSelect } from '@/components/theme-select'
import HeaderDropdown from './header-dropdown'
import Logo from '@/components/logo'
import CreateBulb from '@/components/create-bulb'
import getUser from '@/lib/user'

export default async function Header() {
  const user = await getUser()
  const isAuth = Boolean(user)

  return (
    <header className="flex items-center px-5 justify-between py-2">
      <Logo />
      <div className="flex items-center gap-4">
        <CreateBulb isAuth={isAuth} />
        {!user && <ThemeSelect />}
        <HeaderDropdown user={user} />
      </div>
    </header>
  )
}
