/**
 * Tema claro u oscuro con persistencia, clase en `<html>` y color de barra del sistema.
 *
 * @fileoverview Aplica `dark` en `documentElement`, persiste en `localStorage`, actualiza `meta[name="theme-color"]` y escucha `prefers-color-scheme` sin valor guardado.
 * @remarks `setTheme` añade temporalmente la clase `theme-transitioning` durante la transición (~300 ms) para suavizar el cambio.
 */

import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'theme'

type Theme = 'light' | 'dark'

/** Coincide con `html { background-color: var(--color-bg-white) }` (light → white, dark → `--color-gray-950`). */
const THEME_COLOR_HEX: Record<Theme, string> = {
  light: '#ffffff',
  dark: '#171717',
}

interface UseThemeReturn {
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

function syncThemeColorMeta(theme: Theme) {
  if (typeof document === 'undefined') return
  // `getElementById` retorna `HTMLElement | null`; el `id` `meta-theme-color` lo emite
  // exclusivamente el `<meta>` de `index.html` (y lo recreamos aquí como `meta` si falta),
  // así que el cast restringe la API expuesta a `HTMLMetaElement`.
  let el = document.getElementById('meta-theme-color') as HTMLMetaElement | null
  if (!el) {
    el = document.createElement('meta')
    el.id = 'meta-theme-color'
    el.setAttribute('name', 'theme-color')
    document.head.appendChild(el)
  }
  el.setAttribute('content', THEME_COLOR_HEX[theme])
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
    syncThemeColorMeta(theme)
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
