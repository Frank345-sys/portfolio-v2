/**
 * Tests para `BackgroundBoxes` — capa decorativa, children y cardinalidad de cajas.
 *
 * @fileoverview Integración con Motion; lista `aria-hidden`, resize vía hook y parallax en tests de hooks.
 * Sin `FloatingBox.test.tsx` (smoke del hijo cubierto aquí + `useFloatingBoxParallax.test.ts`).
 * @remarks Usa `renderWithMotion`.
 */

import { act, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { renderWithMotion, setupMatchMedia } from '@/test/helpers'

import { BackgroundBoxes } from './BackgroundBoxes'
import { FLOATING_BOX_COUNT } from './utils/boxGenerator'

describe('BackgroundBoxes', () => {
  it('monta sin errores y el contenedor tiene overflow-hidden', () => {
    const { container } = renderWithMotion(
      <BackgroundBoxes>{null}</BackgroundBoxes>
    )
    const root = container.firstElementChild
    expect(root).toBeInTheDocument()
    expect(root?.className).toContain('overflow-hidden')
  })

  it('renderiza el panel de contenido con data-testid', () => {
    renderWithMotion(<BackgroundBoxes>{null}</BackgroundBoxes>)
    expect(screen.getByTestId('background-boxes-content')).toBeInTheDocument()
  })

  it('renderiza el contenido hijo (children)', () => {
    renderWithMotion(
      <BackgroundBoxes>
        <p>Contenido de prueba</p>
      </BackgroundBoxes>
    )
    expect(screen.getByText('Contenido de prueba')).toBeInTheDocument()
  })

  /**
   * Cada caja es un `<li>` bajo `<ul aria-hidden="true">` (capa decorativa).
   * `getAllByRole('listitem', { hidden: true })` alinea con `FLOATING_BOX_COUNT`.
   */
  it('renderiza un ítem de lista por cada caja flotante', () => {
    renderWithMotion(<BackgroundBoxes>{null}</BackgroundBoxes>)
    expect(screen.getAllByRole('listitem', { hidden: true })).toHaveLength(
      FLOATING_BOX_COUNT
    )
  })

  it('mantiene el número de cajas tras resize a mobile', () => {
    renderWithMotion(<BackgroundBoxes>{null}</BackgroundBoxes>)
    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        value: 375,
        writable: true,
      })
      window.dispatchEvent(new Event('resize'))
    })
    expect(screen.getAllByRole('listitem', { hidden: true })).toHaveLength(
      FLOATING_BOX_COUNT
    )
  })
})

describe('BackgroundBoxes según viewport', () => {
  afterEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      writable: true,
      value: 1280,
    })
    window.dispatchEvent(new Event('resize'))
  })

  it('adapta el layout en viewport mobile (375px)', () => {
    setupMatchMedia({ lgMatches: false })
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      writable: true,
      value: 375,
    })
    window.dispatchEvent(new Event('resize'))

    const { container } = renderWithMotion(
      <BackgroundBoxes>{null}</BackgroundBoxes>
    )
    expect(container.firstElementChild).toBeInTheDocument()
    expect(screen.getAllByRole('listitem', { hidden: true })).toHaveLength(
      FLOATING_BOX_COUNT
    )
  })

  it('muestra el layout completo en viewport desktop (1440px)', () => {
    setupMatchMedia({ lgMatches: true })
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      writable: true,
      value: 1440,
    })
    window.dispatchEvent(new Event('resize'))

    const { container } = renderWithMotion(
      <BackgroundBoxes>{null}</BackgroundBoxes>
    )
    expect(container.firstElementChild).toBeInTheDocument()
    expect(screen.getAllByRole('listitem', { hidden: true })).toHaveLength(
      FLOATING_BOX_COUNT
    )
  })
})
