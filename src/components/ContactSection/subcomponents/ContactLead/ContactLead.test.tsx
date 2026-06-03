/**
 * Tests para `ContactLead` — contrato de copy y comportamiento condicional del párrafo introductorio.
 *
 * @fileoverview Valida texto fijo (canales GitHub, LinkedIn, WhatsApp) y la coletilla
 * condicional " o correo" según si `CONTACT_EMAIL_HREF` es truthy o vacío.
 * @remarks No usa `renderWithMotion` — `ContactLead` es puramente presentacional.
 * `CONTACT_EMAIL_HREF` se mockea con un getter sobre estado hoisteado (`vi.hoisted`) para
 * alternar entre correo presente y ausente sin remockear el módulo entre tests.
 */
import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { ContactLead } from './ContactLead'

import type * as ContactSectionConstants from '../../constants'

/**
 * Estado mutable hoisteado para controlar `CONTACT_EMAIL_HREF` en cada `it`.
 * Usar getter en el mock para que los cambios en `beforeEach` se reflejen en el módulo.
 */
const contactLeadEmailState = vi.hoisted(() => ({
  href: 'mailto:test@example.com',
}))

vi.mock('../../constants', async (importOriginal) => {
  const actual: typeof ContactSectionConstants = await importOriginal()
  return {
    ...actual,
    get CONTACT_EMAIL_HREF() {
      return contactLeadEmailState.href
    },
  }
})

/**
 * {@link ContactLead}: copy del párrafo introductorio; `CONTACT_EMAIL_HREF` desde `../../constants`.
 * Mock con getter sobre estado hoisteado para alternar correo presente / ausente.
 *
 * **Cobertura**
 * - Texto fijo: colaboración y canales (GitHub, LinkedIn, WhatsApp)
 * - Condicional “ o correo” si `CONTACT_EMAIL_HREF` es truthy; cierre sin coletilla si está vacío
 */
describe('ContactLead', () => {
  beforeEach(() => {
    contactLeadEmailState.href = 'mailto:test@example.com'
  })

  it('resume colaboraciones y menciona GitHub, LinkedIn y WhatsApp', () => {
    render(<ContactLead />)
    expect(screen.getByText(/¿Colaboración en producto/i)).toBeInTheDocument()
    expect(screen.getByText(/GitHub/i)).toBeInTheDocument()
    expect(screen.getByText(/LinkedIn/i)).toBeInTheDocument()
    expect(screen.getByText(/WhatsApp/i)).toBeInTheDocument()
  })

  it('menciona correo cuando CONTACT_EMAIL_HREF está definido', () => {
    render(<ContactLead />)
    expect(screen.getByText(/whatsapp o correo/i)).toBeInTheDocument()
  })

  it('no menciona correo cuando CONTACT_EMAIL_HREF está vacío', () => {
    contactLeadEmailState.href = ''
    render(<ContactLead />)
    expect(screen.queryByText(/whatsapp o correo/i)).not.toBeInTheDocument()
    expect(screen.getByText(/linkedin, whatsapp\.$/i)).toBeInTheDocument()
  })
})
