import { describe, it, expect } from 'vitest'
import { useMotionValue } from 'motion/react'
import { renderWithMotion } from '@/test/renderWithMotion'
import { FloatingBox } from '../subcomponents/FloatingBox'
import type { BoxData } from '../types'
import { generateBoxes } from '../utils'

function Wrapper({ box }: { box: BoxData }) {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  return <FloatingBox box={box} mouseX={mx} mouseY={my} />
}

describe('FloatingBox', () => {
  const box = generateBoxes(1440)[0]!

  it('renderiza sin errores', () => {
    expect(() => renderWithMotion(<Wrapper box={box} />)).not.toThrow()
  })

  /**
   * Token semántico de superficie (ver FloatingBox), más estable que clases de radio.
   */
  it('usa bg-bg-weak en la tarjeta visible del box', () => {
    const { container } = renderWithMotion(<Wrapper box={box} />)
    const surface = container.querySelector('.bg-bg-weak')
    expect(surface).toBeInTheDocument()
  })
})
