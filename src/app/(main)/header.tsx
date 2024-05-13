'use client'

import { ThemeSelect } from '@/components/theme-select'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { IPrivateUser } from '@/models/user'
import { API } from '@/lib/api'
import HeaderDropdown from './header-dropdown'
import { useRouter } from 'next/navigation'

export default function Header() {
  const [user, setUser] = useState<IPrivateUser | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetch(API.auth.user, { credentials: 'same-origin' }).then(async res => {
      if (res.status === 200) {
        const data = await res.json()
        setUser(data.data)
      }
    })
  }, [])

  const onLogout = () => {
    fetch(API.auth.logout, { credentials: 'same-origin', method: 'POST' }).then(async res => {
      if (res.status === 200) {
        setUser(null)
      }
    })
  }

  return (
    <header className="flex items-center px-5 justify-between py-2">
      <span
        className="text-2xl cursor-pointer flex space-x-1 items-center"
        onClick={() => router.push('/')}
      >
        <motion.div
          initial="default"
          whileHover="hover"
          whileTap="hover"
          className="flex space-x-2"
        >
          <motion.div
            variants={{ default: { rotate: 0, scale: 1 }, hover: { rotate: 360, scale: 1.2 } }}
          >
            <Image
              src="/pencil.svg"
              width="25"
              height="25"
              alt="pencil"
            />
          </motion.div>
          <span>Blog</span>
        </motion.div>
      </span>
      <div className="flex items-center gap-4">
        <motion.div
          className="cursor-pointer"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => router.push('/post/new')}
        >
          <Image
            src="/bulb.svg"
            width="30"
            height="30"
            alt="create-post"
          />
        </motion.div>
        {!user && <ThemeSelect />}
        <HeaderDropdown
          user={user}
          onLogout={onLogout}
        />
      </div>
    </header>
  )
}
