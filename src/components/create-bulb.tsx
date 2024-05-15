'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useTheme } from 'next-themes'

enum BULB_STATE {
  ON = '/bulb-on.svg',
  OFF = '/bulb-off.svg',
}

export default function CreateBulb() {
  const { theme } = useTheme()
  const [image, setImage] = useState(BULB_STATE.OFF)

  const onOver = () => {
    if (image !== BULB_STATE.ON) {
      setImage(BULB_STATE.ON)
    }
  }

  const onOut = () => {
    if (image !== BULB_STATE.OFF) {
      setImage(BULB_STATE.OFF)
    }
  }

  return (
    <motion.div
      className="cursor-pointer"
      whileHover={{ scale: 1.3 }}
      whileTap={{ scale: 0.8 }}
      onMouseOver={onOver}
      onMouseOut={onOut}
    >
      <Link href={'/post/new'}>
        <Image
          className={`bulb-image--${image === BULB_STATE.OFF ? 'off' : 'on'}`}
          src={image}
          width="32"
          height="32"
          alt="create-post"
        />
      </Link>
    </motion.div>
  )
}
