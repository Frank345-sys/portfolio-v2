/**
 * Pruebas de `useFloatingBoxParallax` — muelles cerca de 0 con parallax off, respuesta con puntero y relajación al desactivar.
 *
 * @fileoverview `renderHook` con `useMotionValue` locales como entrada; `act` + `waitFor` para convergencia de springs.
 * @remarks Casos asíncronos que esperan vuelta a reposo cuando `parallaxEnabled` pasa a false tras mover el puntero.
 */

import { renderHook, act, waitFor } from '@testing-library/react'
import { useMotionValue } from 'motion/react'
import { describe, expect, it } from 'vitest'

import { useFloatingBoxParallax } from './useFloatingBoxParallax'

describe('useFloatingBoxParallax', () => {
  it('con parallaxEnabled false mantiene los springs cerca de 0 aunque cambien mouseX/mouseY', async () => {
    const { result } = renderHook(() => {
      const mouseX = useMotionValue(1)
      const mouseY = useMotionValue(1)
      const out = useFloatingBoxParallax({
        depth: 2,
        mouseX,
        mouseY,
        parallaxEnabled: false,
      })
      return { out, mouseX, mouseY }
    })

    act(() => {
      result.current.mouseX.set(10)
      result.current.mouseY.set(-5)
    })

    await waitFor(
      () => {
        expect(Math.abs(result.current.out.mouseX.get())).toBeLessThan(0.05)
        expect(Math.abs(result.current.out.mouseY.get())).toBeLessThan(0.05)
      },
      { timeout: 3000 }
    )
  })

  it('con parallaxEnabled true desplaza los springs al mover el puntero', async () => {
    const depth = 2

    const { result } = renderHook(() => {
      const mouseX = useMotionValue(0)
      const mouseY = useMotionValue(0)
      const out = useFloatingBoxParallax({
        depth,
        mouseX,
        mouseY,
        parallaxEnabled: true,
      })
      return { out, mouseX, mouseY }
    })

    act(() => {
      result.current.mouseX.set(1)
      result.current.mouseY.set(-0.5)
    })

    await waitFor(
      () => {
        expect(result.current.out.mouseX.get()).toBeGreaterThan(1)
        expect(result.current.out.mouseY.get()).toBeLessThan(-1)
      },
      { timeout: 3000 }
    )
  })

  it('al desactivar parallax tras mover el puntero acerca los springs a 0', async () => {
    const { result, rerender } = renderHook(
      ({ enabled }: { enabled: boolean }) => {
        const mouseX = useMotionValue(0)
        const mouseY = useMotionValue(0)
        const out = useFloatingBoxParallax({
          depth: 1,
          mouseX,
          mouseY,
          parallaxEnabled: enabled,
        })
        return { out, mouseX, mouseY }
      },
      { initialProps: { enabled: true as boolean } }
    )

    act(() => {
      result.current.mouseX.set(2)
    })

    await waitFor(
      () => {
        expect(Math.abs(result.current.out.mouseX.get())).toBeGreaterThan(5)
      },
      { timeout: 3000 }
    )

    rerender({ enabled: false })

    await waitFor(
      () => {
        expect(Math.abs(result.current.out.mouseX.get())).toBeLessThan(0.5)
        expect(Math.abs(result.current.out.mouseY.get())).toBeLessThan(0.5)
      },
      { timeout: 3000 }
    )
  })
})
