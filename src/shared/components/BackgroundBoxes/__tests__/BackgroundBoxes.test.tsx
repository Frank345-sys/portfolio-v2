import { describe, it, expect } from 'vitest'
import { act, screen } from '@testing-library/react'
import { renderWithMotion } from '@/test/renderWithMotion'
import { BackgroundBoxes } from '../BackgroundBoxes'
import { FLOATING_BOX_COUNT } from '../utils'

describe('BackgroundBoxes', () => {
  it('renderiza sin errores', () => {
    expect(() => renderWithMotion(<BackgroundBoxes />)).not.toThrow()
  })

  it('renderiza el contenido hijo (children)', () => {
    renderWithMotion(
      <BackgroundBoxes>
        <p>Contenido de prueba</p>
      </BackgroundBoxes>
    )
    expect(screen.getByText('Contenido de prueba')).toBeInTheDocument()
  })

  it('renderiza sin errores cuando no hay children', () => {
    const { container } = renderWithMotion(<BackgroundBoxes />)
    const root = container.firstElementChild
    expect(root).toBeInTheDocument()
    expect(root?.className).toContain('overflow-hidden')
  })

  /**
   * Cada FloatingBox es un <li aria-hidden> (decorativo). Se usa hidden: true
   * para incluirlos en la consulta, alineado con FLOATING_BOX_COUNT del generador.
   */
  it('renderiza un ítem de lista por cada caja flotante', () => {
    renderWithMotion(<BackgroundBoxes />)
    expect(screen.getAllByRole('listitem', { hidden: true })).toHaveLength(
      FLOATING_BOX_COUNT
    )
  })

  it('mantiene el número de cajas tras resize a mobile', () => {
    renderWithMotion(<BackgroundBoxes />)
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
