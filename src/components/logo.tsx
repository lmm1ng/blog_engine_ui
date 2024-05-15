'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Logo() {
  const router = useRouter()
  return (
    <span
      className="cursor-pointer flex space-x-1 items-center"
      onClick={() => router.push('/')}
    >
      <motion.div
        initial="default"
        whileHover="hover"
        whileTap="hover"
        className="flex space-x-2 text-2xl"
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
        <span className="text-xl">Mindposter</span>
      </motion.div>
    </span>
  )
}
