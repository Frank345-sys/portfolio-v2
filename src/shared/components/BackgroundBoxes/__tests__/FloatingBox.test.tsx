import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { useMotionValue } from 'motion/react'
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
    expect(() => render(<Wrapper box={box} />)).not.toThrow()
  })

  it('aplica la opacidad correcta al box', () => {
    const { container } = render(<Wrapper box={box} />)
    expect(container.firstChild).toBeTruthy()
  })

  it('tiene la clase bg-floating-box-bg en reposo', () => {
    const { container } = render(<Wrapper box={box} />)
    const card = container.querySelector('.rounded-2xl')
    expect(card?.classList.contains('bg-floating-box-bg')).toBe(true)
  })
})
