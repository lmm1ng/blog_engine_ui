'use client'

import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { API } from '@/lib/api'
import { useState } from 'react'

export default function Invites() {
  const { toast } = useToast()
  const [invite, setInvite] = useState('')

  const onClick = () => {
    fetch(API.invites.generate)
      .then(res => res.json())
      .then(res => {
        setInvite(res.data as string)
      })
  }

  const onInviteClick = () => {
    navigator.clipboard.writeText(invite)
    toast({ title: 'Copied to buffer!', duration: 2000 })
  }
  return (
    <div className="flex flex-col">
      <span className="text-xl mb-5">Invites</span>
      <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
        <Button
          onClick={onClick}
          className="w-full sm:max-w-[150px]"
        >
          Generate
        </Button>
        {Boolean(invite.length) && (
          <div
            onClick={onInviteClick}
            className="w-full sm:w-auto bg-gray-100 p-4 rounded-sm text-center cursor-pointer"
          >
            <code style={{ color: 'hsl(222.2 84% 4.9%)' }}>{invite}</code>
          </div>
        )}
      </div>
    </div>
  )
}
