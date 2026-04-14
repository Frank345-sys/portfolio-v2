import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'theme'

export type Theme = 'light' | 'dark'

export interface UseThemeReturn {
  /** True si el tema aplicado es oscuro (`html` tiene clase `dark`). */
  isDark: boolean
  /** Fija el tema, persiste en `localStorage` y actualiza la clase en `document.documentElement`. */
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
 * Tema claro/oscuro: `localStorage`, clase `dark` en `<html>` y sincronización con
 * `prefers-color-scheme` cuando no hay valor guardado. Ver `UseThemeReturn`.
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

  const setTheme = useCallback((next: Theme) => {
    const root = document.documentElement
    root.classList.add('theme-transitioning')
    applyTheme(next)
    setThemeState(next)
    window.setTimeout(() => {
      root.classList.remove('theme-transitioning')
    }, 300)
  }, [])

  return {
    isDark: theme === 'dark',
    setTheme,
  }
}
