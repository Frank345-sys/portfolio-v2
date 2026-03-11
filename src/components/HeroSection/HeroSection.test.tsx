import { render, screen } from '@testing-library/react'

import { HeroSection } from './HeroSection'

describe('HeroSection', () => {
  it('renderiza el título principal como h1', () => {
    render(<HeroSection />)

    const heading = screen.getByRole('heading', { level: 1 })

    expect(heading).toBeInTheDocument()
  })

  it('renderiza el enlace CTA con texto accesible', () => {
    render(<HeroSection />)

    const cta = screen.getByRole('link', {
      name: /abrir cv de frank gonzález en nueva pestaña/i,
    })

    expect(cta).toBeInTheDocument()
    expect(cta).toHaveAttribute('href', '/cv.pdf')
  })
})
