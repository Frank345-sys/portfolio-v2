import { screen } from '@testing-library/react'
import { SITE_DISPLAY_NAME } from '@/shared/constants/siteProfile'
import { renderWithMotion } from '@/test/renderWithMotion'
import { HeroSection } from './HeroSection'

describe('HeroSection', () => {
  it('el nombre va en un h1', () => {
    renderWithMotion(<HeroSection />)
    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1).toHaveTextContent(SITE_DISPLAY_NAME)
  })

  it('el CTA de CV enlaza al PDF en public/', () => {
    renderWithMotion(<HeroSection />)
    const cta = screen.getByText('Ver CV (PDF)').closest('a')
    expect(cta).toBeTruthy()
    expect(cta).toHaveAttribute(
      'href',
      '/Francisco_Gonzalez_Frontend_Developer_2026.pdf'
    )
  })

  it('muestra el stack principal en el hero (escáner de keywords)', () => {
    renderWithMotion(<HeroSection />)
    expect(screen.getByText('React · TypeScript · Next.js')).toBeInTheDocument()
  })
})
