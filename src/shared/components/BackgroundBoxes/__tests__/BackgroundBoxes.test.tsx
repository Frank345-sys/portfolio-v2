import { describe, it, expect } from 'vitest'
import { act, render, screen } from '@testing-library/react'
import { BackgroundBoxes } from '../BackgroundBoxes'

describe('BackgroundBoxes', () => {
  it('renderiza sin errores', () => {
    expect(() => render(<BackgroundBoxes />)).not.toThrow()
  })

  it('renderiza el contenido hijo (children)', () => {
    render(
      <BackgroundBoxes>
        <p>Contenido de prueba</p>
      </BackgroundBoxes>
    )
    expect(screen.getByText('Contenido de prueba')).toBeInTheDocument()
  })

  it('renderiza sin errores cuando no hay children', () => {
    const { container } = render(<BackgroundBoxes />)
    const root = container.firstElementChild
    expect(root).toBeInTheDocument()
    expect(root?.className).toContain('overflow-hidden')
  })

  // CORREGIDO: el root no tiene bg-hero-bg — ese token está en HeroSection,
  // no en BackgroundBoxes. Se reemplaza por un test significativo.
  it('renderiza 14 FloatingBox en desktop', () => {
    render(<BackgroundBoxes />)
    expect(document.querySelectorAll('.bg-floating-box-bg').length).toBe(14)
  })

  // CORREGIDO: siempre son 14 cajas independientemente del breakpoint
  it('sigue renderizando 14 FloatingBox tras resize a mobile', () => {
    render(<BackgroundBoxes />)
    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        value: 375,
        writable: true,
      })
      window.dispatchEvent(new Event('resize'))
    })
    expect(document.querySelectorAll('.bg-floating-box-bg').length).toBe(14)
  })
})
