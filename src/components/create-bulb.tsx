'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

export default function CreateBulb() {
  return (
    <motion.div
      className="cursor-pointer"
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
    >
      <Link href={'/post/new'}>
        <Image
          src="/bulb.svg"
          width="30"
          height="30"
          alt="create-post"
        />
      </Link>
    </motion.div>
  )
}
