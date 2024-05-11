'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { IUser } from '@/models/user'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import fetch from '@/lib/fetch'

export default function HeaderProfile() {
  const [user, setUser] = useState<IUser | null>(null)

  useEffect(() => {
    fetch<IUser>('/v1/auth/user').then(console.log)
  }, [])
  return (
    <>
      {false ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">{user?.displayedName}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{user?.username}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button asChild>
          <Link href="/sign-in">Sign In</Link>
        </Button>
      )}
    </>
  )
}
