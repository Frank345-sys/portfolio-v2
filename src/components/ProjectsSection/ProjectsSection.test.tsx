import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { MEDIA_QUERY_LG_MIN } from '@/shared/constants/breakpoints'
import {
  setupIntersectionObserver,
  setupMatchMedia,
} from '@/test/helpers/mockBrowserApis'
import { renderWithMotion } from '@/test/renderWithMotion'

import {
  PROJECTS,
  projectArticleLabelId,
  PROJECTS_NAV_RAIL_ARIA_LABEL,
  PROJECTS_SECTION_TITLE_ID,
  PROJECTS_SECTION_ANCHOR_ID,
} from './constants'
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
      const project = PROJECTS[index]
      expect(project).toBeDefined()
      expect(article).toHaveAttribute(
        'aria-labelledby',
        projectArticleLabelId(project!.id)
      )
    }
  })

  it('expone el nombre accesible del artículo con un p.sr-only (todos los viewports)', () => {
    renderWithMotion(<ProjectsSection />)

    for (const project of PROJECTS) {
      const label = document.getElementById(projectArticleLabelId(project.id))
      expect(label).toBeTruthy()
      expect(label?.tagName.toLowerCase()).toBe('p')
      const rect = label?.getBoundingClientRect()
      expect(rect).toBeDefined()
      expect(rect!.width <= 1 && rect!.height <= 1).toBe(true)
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
})
