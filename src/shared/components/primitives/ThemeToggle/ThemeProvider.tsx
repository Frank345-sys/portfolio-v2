/**
 * Proveedor de tema: persistencia, clase `dark` en `<html>` y transición suave al alternar.
 *
 * @fileoverview Estado global compartido por todos los `ThemeToggle`; montar una sola vez en `App.tsx`.
 * @remarks {@link useTheme} consume este contexto.
 */

import { createContext, useEffect, useState, type ReactNode } from 'react'

import {
  THEME_COLOR_HEX,
  THEME_STORAGE_KEY,
  isTheme,
  type Theme,
} from '@/shared/constants/theme'

import { runThemeTransition } from './utils/runThemeTransition'

export interface ThemeContextValue {
  /** True si el tema aplicado es oscuro (`html` tiene clase `dark`). */
  isDark: boolean
  /** Fija el tema con transición suave de colores. */
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

ThemeContext.displayName = 'ThemeContext'

function getSystemPrefersDark(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function getStoredTheme(): Theme | null {
  if (typeof window === 'undefined') return null
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
  return isTheme(stored) ? stored : null
}

function applyTheme(theme: Theme) {
  const root = document.documentElement
  if (theme === 'dark') {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }
}

function syncThemeColorMeta(theme: Theme) {
  if (typeof document === 'undefined') return
  let el = document.getElementById('meta-theme-color') as HTMLMetaElement | null
  if (!el) {
    el = document.createElement('meta')
    el.id = 'meta-theme-color'
    el.setAttribute('name', 'theme-color')
    document.head.appendChild(el)
  }
  el.setAttribute('content', THEME_COLOR_HEX[theme])
}

function commitTheme(theme: Theme) {
  applyTheme(theme)
  syncThemeColorMeta(theme)
  window.localStorage.setItem(THEME_STORAGE_KEY, theme)
}

interface ThemeProviderProps {
  children: ReactNode
}

/**
 * Estado de tema compartido y transición CSS al alternar claro/oscuro.
 *
 * @example
 * ```tsx
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 * ```
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    const stored = getStoredTheme()
    if (stored) return stored
    return getSystemPrefersDark() ? 'dark' : 'light'
  })

  useEffect(() => {
    commitTheme(theme)
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

  function setTheme(next: Theme) {
    runThemeTransition(() => {
      commitTheme(next)
      setThemeState(next)
    })
  }

  const value: ThemeContextValue = {
    isDark: theme === 'dark',
    setTheme,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export { ThemeContext }
