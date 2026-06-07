/**
 * Pruebas de `useFloatingBoxFloat` — congelación de `y` al pausar scroll.
 *
 * @fileoverview Valida que la pausa no resetee el `MotionValue` a 0.
 * @remarks Fija `floatY` manualmente antes de pausar vía registro; el driver usa `pause()` sin `stop()`.
 */

import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import {
  pauseScrollRegisteredAnimations,
  resetScrollAnimationControlsRegistryForTests,
} from '../../../../hooks/useScrollAnimationPause'
import { useFloatingBoxFloat } from '../useFloatingBoxFloat'

const BOX_FLOAT = {
  floatAmp: 18,
  floatDur: 4,
  floatDelay: 0.2,
} as const

describe('useFloatingBoxFloat', () => {
  afterEach(() => {
    resetScrollAnimationControlsRegistryForTests()
  })

  it('al pausar conserva la posición vertical actual', () => {
    const { result } = renderHook(() => useFloatingBoxFloat(BOX_FLOAT))

    act(() => {
      result.current.set(-11)
    })

    act(() => {
      pauseScrollRegisteredAnimations()
    })

    expect(result.current.get()).toBe(-11)
  })
})
