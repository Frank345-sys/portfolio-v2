/**
 * Pruebas de `runThemeTransition` — transición CSS y respeto a `prefers-reduced-motion`.
 *
 * @fileoverview Valida `.theme-transitioning` y aplicación inmediata sin animación forzada.
 * @remarks jsdom no aplica las transiciones CSS; se comprueba solo la clase en `<html>`.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { runThemeTransition } from './runThemeTransition'

describe('runThemeTransition', () => {
  beforeEach(() => {
    document.documentElement.classList.remove('theme-transitioning')
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('aplica .theme-transitioning, ejecuta updateDom y la quita tras 300 ms', () => {
    const updateDom = vi.fn()

    runThemeTransition(updateDom)

    expect(updateDom).toHaveBeenCalledTimes(1)
    expect(
      document.documentElement.classList.contains('theme-transitioning')
    ).toBe(true)

    vi.advanceTimersByTime(300)
    expect(
      document.documentElement.classList.contains('theme-transitioning')
    ).toBe(false)
  })

  it('con prefers-reduced-motion no añade .theme-transitioning', () => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn().mockReturnValue({ matches: true, addEventListener: vi.fn() })
    )
    const updateDom = vi.fn()

    runThemeTransition(updateDom)

    expect(updateDom).toHaveBeenCalledTimes(1)
    expect(
      document.documentElement.classList.contains('theme-transitioning')
    ).toBe(false)
  })
})
