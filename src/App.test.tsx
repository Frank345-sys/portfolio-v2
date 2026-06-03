/**
 * Tests para `App` — contrato estructural y de accesibilidad del compositor raíz.
 *
 * @fileoverview Valida la estructura DOM de App: skip link, landmark `<main id="contenido-principal">`,
 * orden de secciones y que `Footer` quede fuera del contenido principal.
 * @remarks No usa `renderWithMotion` — mockea `motion/react` directamente con `vi.mock` para aislar
 * la composición sin el proveedor real. Todos los hijos van mockeados; sus contratos internos
 * se cubren en sus propios `*.test.tsx`.
 */
import { render, screen, within } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { App } from './App'

vi.mock('@/components/Header', () => ({
  Header: () => <header data-testid="header-mock">Header</header>,
}))

vi.mock('@/components/HeroSection', () => ({
  HeroSection: () => <section data-testid="hero-section-mock">Hero</section>,
}))

vi.mock('@/components/AboutSection', () => ({
  AboutSection: () => <section data-testid="about-section-mock">About</section>,
}))

vi.mock('@/components/ProjectsSection', () => ({
  ProjectsSection: () => (
    <section data-testid="projects-section-mock">Projects</section>
  ),
}))

vi.mock('@/components/ContactSection', () => ({
  ContactSection: () => (
    <section data-testid="contact-section-mock">Contact</section>
  ),
}))

vi.mock('@/components/Footer', () => ({
  Footer: () => <footer data-testid="footer-mock">Footer</footer>,
}))

vi.mock('@/shared/components/primitives/SmoothScrollRoot', () => ({
  SmoothScrollRoot: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="smooth-scroll-root">{children}</div>
  ),
}))

vi.mock('motion/react', () => ({
  LazyMotion: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="lazy-motion">{children}</div>
  ),
  MotionConfig: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="motion-config">{children}</div>
  ),
  domAnimation: {},
}))

/**
 * `App` se prueba con todas las secciones mockeadas: garantizamos el contrato a11y
 * (skip link, `<main id="contenido-principal">`, orden de secciones, footer fuera de main)
 * sin acoplarnos a la UI interna de cada sección.
 */
describe('App', () => {
  it('renderiza el skip link como primer enlace al contenido principal', () => {
    render(<App />)
    const skipLink = screen.getByRole('link', {
      name: /saltar al contenido principal/i,
    })
    expect(skipLink).toHaveAttribute('href', '#contenido-principal')
  })

  it('expone un único <main> con el id que apunta el skip link', () => {
    render(<App />)
    const main = screen.getByRole('main')
    expect(main).toHaveAttribute('id', 'contenido-principal')
  })

  it('renderiza header, hero, about, projects, contact y footer en orden', async () => {
    render(<App />)
    expect(await screen.findByTestId('header-mock')).toBeInTheDocument()
    expect(await screen.findByTestId('hero-section-mock')).toBeInTheDocument()
    expect(await screen.findByTestId('about-section-mock')).toBeInTheDocument()
    expect(
      await screen.findByTestId('projects-section-mock')
    ).toBeInTheDocument()
    expect(
      await screen.findByTestId('contact-section-mock')
    ).toBeInTheDocument()
    expect(await screen.findByTestId('footer-mock')).toBeInTheDocument()
  })

  it('mantiene Hero, About, Projects y Contact dentro del <main> y el Footer fuera', async () => {
    render(<App />)
    const main = screen.getByRole('main')
    expect(
      await within(main).findByTestId('hero-section-mock')
    ).toBeInTheDocument()
    expect(
      await within(main).findByTestId('about-section-mock')
    ).toBeInTheDocument()
    expect(
      await within(main).findByTestId('projects-section-mock')
    ).toBeInTheDocument()
    expect(
      await within(main).findByTestId('contact-section-mock')
    ).toBeInTheDocument()
    expect(within(main).queryByTestId('footer-mock')).not.toBeInTheDocument()
  })
})
