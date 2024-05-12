import { useState } from 'react'
type Theme = 'light' | 'dark' | 'system'

export const useTheme = () => {
  const [theme, selectTheme] = useState<Theme>((localStorage.getItem('theme') as Theme) || 'system')

  const setTheme = (theme: Theme) => {
    localStorage.setItem('theme', theme)
    selectTheme(theme)
  }

  return { theme, setTheme }
}
