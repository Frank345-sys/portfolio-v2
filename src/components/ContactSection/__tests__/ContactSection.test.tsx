import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { renderWithMotion } from '@/test/renderWithMotion'
import { screen, within } from '@testing-library/react'
import { ContactSection } from '../ContactSection'
import {
  CONTACT_EMAIL_HREF,
  CONTACT_PROFILE,
  CONTACT_STATUS_ROWS,
  CONTACT_TIMEZONE_LINE,
} from '../constants'

const ioReserve = globalThis.IntersectionObserver

describe('ContactSection', () => {
  beforeEach(() => {
    globalThis.IntersectionObserver = class {
      disconnect() {}
      observe() {}
      takeRecords() {
        return []
      }
      unobserve() {}
    } as unknown as typeof IntersectionObserver
  })

  afterEach(() => {
    globalThis.IntersectionObserver = ioReserve
  })

  it('tiene id contacto y encabezado de sección accesible', () => {
    renderWithMotion(<ContactSection />)

    const section = document.getElementById('contacto')
    expect(section).toBeInTheDocument()
    expect(section).toHaveAttribute(
      'aria-labelledby',
      'contact-section-heading'
    )

    const heading = screen.getByRole('heading', {
      level: 2,
      name: /hablemos de tu próximo paso/i,
    })
    expect(heading).toHaveAttribute('id', 'contact-section-heading')
  })

  it('agrupa las tarjetas de contacto en un nav con nombre accesible', () => {
    renderWithMotion(<ContactSection />)

    expect(
      screen.getByRole('navigation', {
        name: /enlaces de contacto y perfiles en redes/i,
      })
    ).toBeInTheDocument()
  })

  it('renderiza enlaces a GitHub, LinkedIn y WhatsApp con href correctos', () => {
    renderWithMotion(<ContactSection />)

    const github = screen.getByRole('link', { name: /github/i })
    expect(github).toHaveAttribute('href', CONTACT_PROFILE.githubHref)

    const linkedin = screen.getByRole('link', { name: /linkedin/i })
    expect(linkedin).toHaveAttribute('href', CONTACT_PROFILE.linkedinHref)

    const whatsapp = screen.getByRole('link', { name: /whatsapp/i })
    expect(whatsapp).toHaveAttribute('href', CONTACT_PROFILE.whatsAppHref)
  })

  it('muestra tarjeta de correo con mailto y nombre accesible alineado al texto visible', () => {
    renderWithMotion(<ContactSection />)

    const contactNav = screen.getByRole('navigation', {
      name: /enlaces de contacto y perfiles en redes/i,
    })
    const mail = within(contactNav).getByRole('link', { name: /correo/i })
    expect(mail).toHaveAttribute('href', CONTACT_EMAIL_HREF)
    expect(mail).not.toHaveAttribute('target', '_blank')
  })

  it('muestra tiempo de respuesta, hora local y referencia de zona en la tarjeta lateral', () => {
    renderWithMotion(<ContactSection />)

    expect(screen.getByText(/~ 2 h/i)).toBeInTheDocument()
    expect(
      screen.getByText(CONTACT_TIMEZONE_LINE.trim(), { exact: true })
    ).toBeInTheDocument()
    expect(screen.getByText(/hora local/i)).toBeInTheDocument()
    const localClock = document.querySelector('#contacto time[datetime]')
    expect(localClock).toBeInTheDocument()
    expect(localClock?.textContent ?? '').toMatch(/\d{1,2}:\d{2}/)
  })

  it('el aside expone un landmark con nombre y encabezados h3 de subsecciones', () => {
    renderWithMotion(<ContactSection />)

    const aside = screen.getByRole('complementary', {
      name: /resumen de perfil y disponibilidad/i,
    })
    const inAside = within(aside)
    expect(
      inAside.getByRole('heading', { level: 3, name: 'Disponibilidad' })
    ).toBeInTheDocument()
    expect(
      inAside.getByRole('heading', { level: 3, name: 'Servicios disponibles' })
    ).toBeInTheDocument()
  })

  it('la lista de servicios tiene etiqueta accesible y un ítem por fila de datos', () => {
    renderWithMotion(<ContactSection />)

    const aside = screen.getByRole('complementary', {
      name: /resumen de perfil y disponibilidad/i,
    })
    const list = within(aside).getByRole('list', {
      name: /indicadores de disponibilidad por tipo de colaboración/i,
    })
    const items = within(list).getAllByRole('listitem')
    expect(items).toHaveLength(CONTACT_STATUS_ROWS.length)
    for (const row of CONTACT_STATUS_ROWS) {
      expect(
        within(list).getByText(row.label, { exact: true })
      ).toBeInTheDocument()
    }
  })

  it('el bloque de metadatos es una lista de definición con nombre accesible', () => {
    renderWithMotion(<ContactSection />)

    const aside = screen.getByRole('complementary', {
      name: /resumen de perfil y disponibilidad/i,
    })
    const dl = within(aside).getByLabelText(
      'Tiempo de respuesta, hora local y zona horaria de referencia',
      { selector: 'dl' }
    )
    expect(dl.tagName).toBe('DL')

    const inDl = within(dl)
    expect(inDl.getByText('Respuesta', { exact: true })).toBeInTheDocument()
    expect(inDl.getByText('Hora local', { exact: true })).toBeInTheDocument()
    if (CONTACT_TIMEZONE_LINE.trim()) {
      expect(within(dl).getByText('Zona', { exact: true })).toBeInTheDocument()
    }
  })
})
