import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AboutSection } from '../AboutSection'
import { ABOUT_HERO, ABOUT_VALUES } from '../constants'

describe('AboutSection', () => {
  it('se puede renderizar sin que reviente', () => {
    expect(() => render(<AboutSection />)).not.toThrow()
  })

  it('tiene el div con id sobre-mi (ancla de la página)', () => {
    const { container } = render(<AboutSection />)
    expect(container.querySelector('#sobre-mi')).toBeTruthy()
  })

  it('muestra el nombre en el título principal (h2)', () => {
    render(<AboutSection />)
    const titulo = screen.getByRole('heading', { level: 2 })
    expect(titulo.textContent).toContain(ABOUT_HERO.firstName)
    expect(titulo.textContent).toContain(ABOUT_HERO.lastName)
  })

  it('muestra texto de la bio (parte del primer párrafo)', () => {
    render(<AboutSection />)
    expect(
      screen.getByText(/Ingeniero en Sistemas Computacionales/)
    ).toBeInTheDocument()
  })

  it('muestra los tres valores de "cómo trabajo"', () => {
    render(<AboutSection />)
    for (const v of ABOUT_VALUES) {
      expect(screen.getByText(v.name)).toBeInTheDocument()
    }
  })

  it('muestra el texto Sobre mí', () => {
    render(<AboutSection />)
    expect(screen.getByText(/sobre mí/i)).toBeInTheDocument()
  })

  it('muestra el texto Stack técnico', () => {
    render(<AboutSection />)
    expect(screen.getByText(/stack técnico/i)).toBeInTheDocument()
  })

  it('muestra el texto Experiencia', () => {
    render(<AboutSection />)
    expect(screen.getByText('Experiencia')).toBeInTheDocument()
  })

  it('muestra el texto Formación académica', () => {
    render(<AboutSection />)
    expect(screen.getByText(/formación académica/i)).toBeInTheDocument()
  })

  it('muestra el texto Certificaciones', () => {
    render(<AboutSection />)
    expect(screen.getByText(/certificaciones/i)).toBeInTheDocument()
  })
})
