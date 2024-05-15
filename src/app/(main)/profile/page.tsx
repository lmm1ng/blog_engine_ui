import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import getUser from '@/lib/user'
import { redirect } from 'next/navigation'
import Invites from './invites'

export default async function Profile() {
  const user = await getUser()
  if (!user) {
    return redirect('/')
  }
  return (
    <div className="w-full">
      <header className="flex justify-between items-center">
        <span className="text-2xl font-bold">{user.username}</span>
        <Avatar className="w-[100px] h-[100px]">
          <AvatarFallback className="text-5xl">{user.displayedName[0]}</AvatarFallback>
        </Avatar>
      </header>
      <Separator className="my-5" />
      <Invites />
    </div>
  )
}
