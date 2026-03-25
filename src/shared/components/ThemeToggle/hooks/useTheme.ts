import { useEffect, useState } from 'react'

const STORAGE_KEY = 'theme'

export type Theme = 'light' | 'dark'

export interface UseThemeReturn {
  isDark: boolean
  setTheme: (theme: Theme) => void
}

function getSystemPrefersDark(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function getStoredTheme(): Theme | null {
  if (typeof window === 'undefined') return null
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') return stored
  return null
}

function applyTheme(theme: Theme) {
  const root = document.documentElement
  if (theme === 'dark') {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }
}

/**
 * Lee y persiste el tema (claro/oscuro) en `localStorage`, aplica la clase `dark`
 * en `<html>` y escucha cambios de `prefers-color-scheme` si no hay valor guardado.
 *
 * @returns Estado `isDark` y `setTheme` para alternar o fijar el tema.
 */
export function useTheme(): UseThemeReturn {
  const [theme, setThemeState] = useState<Theme>(() => {
    const stored = getStoredTheme()
    if (stored) return stored
    return getSystemPrefersDark() ? 'dark' : 'light'
  })

  useEffect(() => {
    applyTheme(theme)
    window.localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  useEffect(() => {
    const stored = getStoredTheme()
    if (stored) return

    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      setThemeState(e.matches ? 'dark' : 'light')
    }
    media.addEventListener('change', handleChange)
    return () => media.removeEventListener('change', handleChange)
  }, [])

  const setTheme = (next: Theme) => {
    const root = document.documentElement
    root.classList.add('theme-transitioning')
    applyTheme(next)
    setThemeState(next)
    window.setTimeout(() => {
      root.classList.remove('theme-transitioning')
    }, 300)
  }

  return {
    isDark: theme === 'dark',
    setTheme,
  }
}
