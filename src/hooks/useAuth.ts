import { API } from '@/lib/api'
import { IPrivateUser } from '@/models/user'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export const useAuth = () => {
  const router = useRouter()
  const [user, setUser] = useState<IPrivateUser | null>(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    fetch(API.auth.user, {
      credentials: 'same-origin',
    })
      .then(async res => {
        if (res.ok) {
          const data = await res.json()
          setUser(data.data)
        }
      })
      .finally(() => setLoading(false))
  }, [router])

  return { user, isLoading, setUser }
}
