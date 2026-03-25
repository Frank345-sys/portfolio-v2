import { screen } from '@testing-library/react'
import { renderWithMotion } from '@/test/renderWithMotion'
import { HeroSection } from './HeroSection'

describe('HeroSection', () => {
  it('el nombre va en un h1', () => {
    renderWithMotion(<HeroSection />)
    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1).toHaveTextContent('Frank González')
  })

  it('el botón de CV es un link a /cv.pdf', () => {
    renderWithMotion(<HeroSection />)
    const cta = screen.getByText('Descargar CV').closest('a')
    expect(cta).toBeTruthy()
    expect(cta).toHaveAttribute('href', '/cv.pdf')
  })
})
