'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

export type ThemeKey = 'girl' | 'boy' | 'unsure'

export const THEME_COLORS: Record<ThemeKey, { primary: string; label: string }> = {
  girl: { primary: '#E8A1AC', label: 'Girl' },
  boy: { primary: '#8AA0AB', label: 'Boy' },
  unsure: { primary: '#ecc371', label: 'Not sure yet' },
}

const STORAGE_KEY = 'nesti_theme'

type ThemeContextValue = {
  theme: ThemeKey
  setTheme: (t: ThemeKey) => void
  color: string
  // Returns the gender_tag values a product must match to show under the current theme
  allowedGenderTags: string[] | null // null = no filtering (show everything)
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeKey>('unsure')

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ThemeKey | null
    if (stored && THEME_COLORS[stored]) setThemeState(stored)
  }, [])

  function setTheme(t: ThemeKey) {
    setThemeState(t)
    localStorage.setItem(STORAGE_KEY, t)
  }

  const allowedGenderTags =
    theme === 'boy' ? ['boy', 'unisex'] : theme === 'girl' ? ['girl', 'unisex'] : null // 'unsure' = show all

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, color: THEME_COLORS[theme].primary, allowedGenderTags }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useNestiTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useNestiTheme must be used within ThemeProvider')
  return ctx
}
