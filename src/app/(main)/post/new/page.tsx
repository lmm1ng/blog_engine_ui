'use client'

import MDEditor from '@uiw/react-md-editor'
import { useState } from 'react'
import './styles.css'

export default function NewPost() {
  const [value, setValue] = useState('**Hello world!!!**')
  //   const { theme } = useTheme()
  return (
    <div className="h-full">
      <MDEditor
        className="h-full"
        value={value}
        //@ts-ignore
        onChange={setValue}
        height={'100%'}
        // data-color-mode={}
      />
    </div>
  )
}
