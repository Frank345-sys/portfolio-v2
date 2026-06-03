/**
 * Tests para `ContactLinkCards` — contrato de render, accesibilidad y atributos de enlaces.
 *
 * @fileoverview Valida landmark `<nav>`, cardinalidad de `<li>` (redes + correo), `href` y
 * `target="_blank"` en enlaces externos, y que el correo use `mailto` sin abrir nueva pestaña.
 * @remarks No usa `renderWithMotion` — `ContactLinkCards` es puramente presentacional.
 * Títulos con metacaracteres: {@link escapeRegex} desde `@/test/helpers`.
 * Cardinalidad calculada como `PRIMARY_SOCIAL_LINKS.length + PRIMARY_EMAIL_LINKS.length`
 * para escalar automáticamente si se añaden entradas.
 */
import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { escapeRegex } from '@/test/helpers'

import {
  CONTACT_EMAIL_HREF,
  PRIMARY_EMAIL_LINKS,
  PRIMARY_SOCIAL_LINKS,
} from './constants'
import { ContactLinkCards } from './ContactLinkCards'

/**
 * {@link ContactLinkCards}: `nav` + lista de {@link LinkCard} (redes externas; correo sin `target="_blank"`).
 * Datos en `./constants` (`PRIMARY_*`, `CONTACT_EMAIL_HREF` alineados al contrato de sección).
 *
 * **Cobertura**
 * - Landmark: `nav` con nombre accesible fijo (`aria-label`)
 * - Cardinalidad: un `li` por entrada en `PRIMARY_SOCIAL_LINKS` y `PRIMARY_EMAIL_LINKS`
 * - Redes: `href` del contrato, `target="_blank"` y `rel` externos
 * - Correo: `href` acorde a `CONTACT_EMAIL_HREF`, sin abrir en nueva pestaña
 */
describe('ContactLinkCards', () => {
  it('renderiza nav con nombre accesible de enlaces de contacto', () => {
    render(<ContactLinkCards />)
    expect(
      screen.getByRole('navigation', {
        name: /enlaces de contacto y perfiles en redes/i,
      })
    ).toBeInTheDocument()
  })

  it('genera un ítem de lista por cada enlace social y de correo', () => {
    render(<ContactLinkCards />)
    const nav = screen.getByRole('navigation', {
      name: /enlaces de contacto y perfiles en redes/i,
    })
    const items = within(nav).getAllByRole('listitem')
    expect(items).toHaveLength(
      PRIMARY_SOCIAL_LINKS.length + PRIMARY_EMAIL_LINKS.length
    )
  })

  it('genera enlaces externos por cada red con href esperado y target _blank', () => {
    render(<ContactLinkCards />)
    const socialLinkMatchers = PRIMARY_SOCIAL_LINKS.map((entry) => ({
      entry,
      namePattern: new RegExp(escapeRegex(entry.title), 'i'),
    }))
    for (const { entry, namePattern } of socialLinkMatchers) {
      const link = screen.getByRole('link', {
        name: namePattern,
      })
      expect(link).toHaveAttribute('href', entry.href)
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    }
  })

  it('la tarjeta de correo usa mailto sin target _blank', () => {
    render(<ContactLinkCards />)
    const nav = screen.getByRole('navigation', {
      name: /enlaces de contacto y perfiles en redes/i,
    })
    const mail = within(nav).getByRole('link', { name: /correo/i })
    expect(mail).toHaveAttribute('href', CONTACT_EMAIL_HREF)
    expect(mail).not.toHaveAttribute('target', '_blank')
  })
})
