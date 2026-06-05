/**
 * Tests para components/ProjectsSection/ProjectsSection.test.tsx.
 *
 * @fileoverview Suite Vitest que valida el contrato de render, accesibilidad y regresiones del código bajo prueba.
 * @remarks Usa Testing Library; si el archivo importa `renderWithMotion`, el árbol va envuelto en el proveedor de Motion.
 */

import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { MEDIA_QUERY_LG_MIN } from '@/shared/constants/breakpoints'
import {
  renderWithMotion,
  runAxeAudit,
  setupIntersectionObserver,
  setupMatchMedia,
} from '@/test/helpers'

import {
  PROJECTS_NAV_RAIL_ARIA_LABEL,
  PROJECTS_SECTION_ANCHOR_ID,
  PROJECTS_SECTION_TITLE_ID,
} from './constants/landmarks'
import { PROJECTS } from './constants/projects'
import { ProjectsSection } from './ProjectsSection'

const scrollIntoViewMock = vi.fn()

describe('ProjectsSection', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    scrollIntoViewMock.mockClear()

    Object.defineProperty(Element.prototype, 'scrollIntoView', {
      configurable: true,
      value: scrollIntoViewMock,
      writable: true,
    })

    setupIntersectionObserver()
    setupMatchMedia()
  })

  it('tiene ancla compartida y aria-labelledby del encabezado de sección', () => {
    renderWithMotion(<ProjectsSection />)

    const section = document.getElementById(PROJECTS_SECTION_ANCHOR_ID)
    expect(section).toBeTruthy()
    expect(section).toHaveAttribute(
      'aria-labelledby',
      PROJECTS_SECTION_TITLE_ID
    )
  })

  it('renderiza el encabezado de sección como h2', () => {
    renderWithMotion(<ProjectsSection />)
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /proyectos en producción/i,
      })
    ).toBeInTheDocument()
  })

  it('renderiza un artículo por cada entrada en PROJECTS dentro de una lista ordenada', () => {
    renderWithMotion(<ProjectsSection />)

    expect(
      document.querySelector(`#${PROJECTS_SECTION_ANCHOR_ID} ol`)
    ).toBeTruthy()

    expect(screen.getAllByRole('article')).toHaveLength(PROJECTS.length)
  })

  it('cada artículo usa aria-labelledby acorde al id del proyecto', () => {
    renderWithMotion(<ProjectsSection />)
    const articles = screen.getAllByRole('article')
    for (const [index, article] of articles.entries()) {
      const project = PROJECTS[index]!
      expect(article).toHaveAttribute(
        'aria-labelledby',
        `project-${project.id}-title`
      )
    }
  })

  it('expone el nombre accesible del artículo con un p.sr-only (todos los viewports)', () => {
    renderWithMotion(<ProjectsSection />)

    for (const project of PROJECTS) {
      const label = document.getElementById(`project-${project.id}-title`)
      expect(label).toBeTruthy()
      expect(label?.tagName.toLowerCase()).toBe('p')
      expect(label).toBeInTheDocument()
      const rect = label!.getBoundingClientRect()
      expect(rect.width).toBeLessThanOrEqual(1)
      expect(rect.height).toBeLessThanOrEqual(1)
      expect(label).toHaveTextContent(project.title)
    }
  })

  it('no duplica ids de título entre panel sticky y artículos en viewport lg', () => {
    renderWithMotion(<ProjectsSection />)

    const seen = new Set<string>()
    const duplicates: string[] = []

    for (const el of document.querySelectorAll('[id]')) {
      const id = el.id
      if (!id) continue
      if (seen.has(id)) duplicates.push(id)
      seen.add(id)
    }

    expect(duplicates).toEqual([])
  })

  it('el rail de navegación tiene un botón por proyecto', () => {
    renderWithMotion(<ProjectsSection />)

    const rail = screen.getByRole('navigation', {
      name: PROJECTS_NAV_RAIL_ARIA_LABEL,
    })
    expect(within(rail).getAllByRole('button')).toHaveLength(PROJECTS.length)
  })

  it('muestra el título del primer proyecto en el panel lateral sticky', () => {
    renderWithMotion(<ProjectsSection />)

    const stickyPanel = document.querySelector('.sticky.top-24')
    expect(stickyPanel).toBeTruthy()
    expect(
      within(stickyPanel as HTMLElement).getByRole('heading', {
        level: 3,
        name: PROJECTS[0]!.title,
      })
    ).toBeInTheDocument()
  })

  it('al pulsar el primer botón del rail se invoca scrollIntoView', async () => {
    const user = userEvent.setup()
    renderWithMotion(<ProjectsSection />)

    const rail = screen.getByRole('navigation', {
      name: PROJECTS_NAV_RAIL_ARIA_LABEL,
    })
    const firstButton = within(rail).getByRole('button', {
      name: new RegExp(`ir al proyecto 1:\\s*${PROJECTS[0]!.title}`, 'i'),
    })

    await user.click(firstButton)

    expect(scrollIntoViewMock).toHaveBeenCalledWith({
      behavior: 'auto',
      block: 'center',
    })
  })

  it('llama a matchMedia con la query de breakpoint lg', () => {
    const spy = vi.spyOn(window, 'matchMedia')
    renderWithMotion(<ProjectsSection />)

    expect(spy).toHaveBeenCalledWith(MEDIA_QUERY_LG_MIN)
  })

  it('axe: sección Proyectos sin violaciones conocidas', async () => {
    const { container } = renderWithMotion(<ProjectsSection />)
    expect(await runAxeAudit(container)).toHaveNoViolations()
  }, 15_000)
})
