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
import { API } from '@/lib/api'
import { IPrivateUser } from '@/models/user'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function HeaderProfile() {
  const [user, setUser] = useState<IPrivateUser | null>(null)

  useEffect(() => {
    fetch(API.auth.user, { credentials: 'same-origin' }).then(async res => {
      if (res.status === 200) {
        const data = await res.json()
        setUser(data.data)
      }
    })
  }, [])

  const logout = () => {
    fetch(API.auth.logout, { credentials: 'same-origin', method: 'POST' }).then(async res => {
      if (res.status === 200) {
        setUser(null)
      }
    })
  }
  return (
    <>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>{user.displayedName}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{user.username}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
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
