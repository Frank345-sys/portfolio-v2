import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { renderWithMotion } from '@/test/renderWithMotion'

import { PROJECTS } from '../constants'
import { ProjectsSection } from '../ProjectsSection'

const scrollIntoViewMock = vi.fn()
function takeNoIntersectionRecords() {
  return []
}

/** Misma consulta que en `useProjectsScrollSync` (breakpoint `lg`). */
const LG_MEDIA = '(min-width: 1024px)'

function mockScrollAndObservers(options?: { lgMatches?: boolean }) {
  const lgMatches = options?.lgMatches ?? true
  scrollIntoViewMock.mockClear()

  Object.defineProperty(Element.prototype, 'scrollIntoView', {
    configurable: true,
    value: scrollIntoViewMock,
    writable: true,
  })

  globalThis.IntersectionObserver = class {
    observe = vi.fn()
    unobserve = vi.fn()
    disconnect = vi.fn()
    takeRecords = vi.fn(takeNoIntersectionRecords)
    root = null
    rootMargin = ''
    thresholds = []
  } as unknown as typeof IntersectionObserver

  const listeners: Array<(e: MediaQueryListEvent) => void> = []
  const lgMql = {
    get matches() {
      return lgMatches
    },
    media: LG_MEDIA,
    addEventListener: vi.fn(
      (_: string, cb: (e: MediaQueryListEvent) => void) => {
        listeners.push(cb)
      }
    ),
    removeEventListener: vi.fn(),
  }

  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: vi.fn((query: string) => {
      // motion-dom usa "(prefers-reduced-motion)" al inicializar; no reutilizar el MQL de `lg`
      // (antes devolvía `matches: true` y Motion mostraba aviso falso en consola).
      if (query.includes('prefers-reduced-motion')) {
        return {
          matches: false,
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        }
      }
      return lgMql
    }),
  })
}

describe('ProjectsSection', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    mockScrollAndObservers()
  })

  it('tiene id proyectos y aria-labelledby del encabezado de sección', () => {
    renderWithMotion(<ProjectsSection />)

    const section = document.getElementById('proyectos')
    expect(section).toBeTruthy()
    expect(section).toHaveAttribute(
      'aria-labelledby',
      'projects-section-heading'
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

  it('renderiza un artículo por cada entrada en PROJECTS', () => {
    renderWithMotion(<ProjectsSection />)
    expect(screen.getAllByRole('article')).toHaveLength(PROJECTS.length)
  })

  it('cada artículo usa aria-labelledby acorde al id del proyecto', () => {
    renderWithMotion(<ProjectsSection />)
    const articles = screen.getAllByRole('article')
    articles.forEach((article, index) => {
      const project = PROJECTS[index]
      expect(project).toBeDefined()
      expect(article).toHaveAttribute(
        'aria-labelledby',
        `project-${project!.id}-title`
      )
    })
  })

  it('expone el nombre accesible del artículo con un p.sr-only (todos los viewports)', () => {
    renderWithMotion(<ProjectsSection />)

    PROJECTS.forEach((project) => {
      const label = document.getElementById(`project-${project.id}-title`)
      expect(label).toBeTruthy()
      expect(label?.tagName.toLowerCase()).toBe('p')
      expect(label).toHaveClass('sr-only')
      expect(label).toHaveTextContent(project.title)
    })
  })

  it('no duplica ids de título entre panel sticky y artículos en viewport lg', () => {
    renderWithMotion(<ProjectsSection />)

    const seen = new Set<string>()
    const duplicates: string[] = []

    document.querySelectorAll('[id]').forEach((el) => {
      const id = el.id
      if (!id) return
      if (seen.has(id)) duplicates.push(id)
      seen.add(id)
    })

    expect(duplicates).toEqual([])
  })

  it('el rail de navegación tiene un botón por proyecto', () => {
    renderWithMotion(<ProjectsSection />)

    const rail = screen.getByRole('navigation', {
      name: /navegación entre proyectos/i,
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
      name: /navegación entre proyectos/i,
    })
    const firstButton = within(rail).getByRole('button', {
      name: /ir al proyecto 1/i,
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

    expect(spy).toHaveBeenCalledWith(LG_MEDIA)
  })
})
