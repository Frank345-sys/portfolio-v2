/**
 * Tests para components/ProjectsSection/subcomponents/ProjectInfo/ProjectInfo.test.tsx.
 *
 * @fileoverview Suite Vitest que valida el contrato de render, accesibilidad y regresiones del código bajo prueba.
 * @remarks Usa Testing Library; si el archivo importa `renderWithMotion`, el árbol va envuelto en el proveedor de Motion.
 */

import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { renderWithMotion } from '@/test/helpers'

import { ProjectInfo } from './ProjectInfo'
import {
  PORTFOLIO_LEGACY_PROJECT_ID,
  PORTFOLIO_LEGACY_PROJECT_LINKS,
} from '../../constants/portfolioLegacyLinks'
import { PROJECTS } from '../../constants/projects'

const PORTFOLIO_LEGACY_PROJECT = PROJECTS.find(
  (project) => project.id === PORTFOLIO_LEGACY_PROJECT_ID
)

if (!PORTFOLIO_LEGACY_PROJECT) {
  throw new Error(
    `PROJECTS debe incluir el proyecto legacy con id ${PORTFOLIO_LEGACY_PROJECT_ID}`
  )
}

describe('ProjectInfo', () => {
  it('renderiza contenido principal y headingId', () => {
    renderWithMotion(
      <ProjectInfo
        project={PORTFOLIO_LEGACY_PROJECT}
        visible={true}
        totalProjects={5}
        headingId="project-5-title"
      />
    )

    expect(screen.getByRole('heading', { level: 3 })).toHaveAttribute(
      'id',
      'project-5-title'
    )
    expect(screen.getByText('Portfolio v1 (histórico)')).toBeInTheDocument()
    expect(screen.getByText('App Web')).toBeInTheDocument()
    expect(
      screen.getByText(/primera versión pública de mi sitio/i)
    ).toBeInTheDocument()
    expect(screen.getByText('05 / 05')).toBeInTheDocument()
  })

  it('renderiza bullets, skills y enlaces opcionales', () => {
    renderWithMotion(
      <ProjectInfo
        project={PORTFOLIO_LEGACY_PROJECT}
        visible={true}
        totalProjects={5}
        headingId="project-5-title"
      />
    )

    expect(screen.getAllByRole('listitem')).toHaveLength(
      PORTFOLIO_LEGACY_PROJECT.bullets.length
    )
    expect(screen.getAllByText(/problema:/i).length).toBeGreaterThan(0)

    for (const skill of PORTFOLIO_LEGACY_PROJECT.skills) {
      expect(screen.getByText(skill)).toBeInTheDocument()
    }

    expect(
      screen.getByRole('link', {
        name: /ver sitio en vivo \(abre en una nueva pestaña\)/i,
      })
    ).toHaveAttribute('href', PORTFOLIO_LEGACY_PROJECT_LINKS.link)
    expect(
      screen.getByRole('link', {
        name: /código en github \(abre en una nueva pestaña\)/i,
      })
    ).toHaveAttribute('href', PORTFOLIO_LEGACY_PROJECT_LINKS.githubLink)
  })

  it('no renderiza nada cuando visible es false', () => {
    renderWithMotion(
      <ProjectInfo
        project={PORTFOLIO_LEGACY_PROJECT}
        visible={false}
        totalProjects={5}
        headingId="project-5-title"
      />
    )

    expect(
      screen.queryByText('Portfolio v1 (histórico)')
    ).not.toBeInTheDocument()
  })

  it('no muestra enlace al proyecto si link está omitido', () => {
    const { link: _, ...withoutLink } = PORTFOLIO_LEGACY_PROJECT
    void _

    renderWithMotion(
      <ProjectInfo
        project={withoutLink}
        visible={true}
        totalProjects={5}
        headingId="project-5-title"
      />
    )

    expect(
      screen.queryByRole('link', { name: /ver sitio en vivo/i })
    ).not.toBeInTheDocument()
    expect(
      screen.getByRole('link', {
        name: /código en github \(abre en una nueva pestaña\)/i,
      })
    ).toBeInTheDocument()
  })

  it('no muestra enlace al proyecto si link está vacío', () => {
    renderWithMotion(
      <ProjectInfo
        project={{ ...PORTFOLIO_LEGACY_PROJECT, link: '' }}
        visible={true}
        totalProjects={5}
        headingId="project-5-title"
      />
    )

    expect(
      screen.queryByRole('link', { name: /ver sitio en vivo/i })
    ).not.toBeInTheDocument()
    expect(
      screen.getByRole('link', {
        name: /código en github \(abre en una nueva pestaña\)/i,
      })
    ).toBeInTheDocument()
  })

  it('no muestra enlace al repositorio si githubLink no está definido', () => {
    const { githubLink: _drop, ...project } = PORTFOLIO_LEGACY_PROJECT
    void _drop
    renderWithMotion(
      <ProjectInfo
        project={project}
        visible={true}
        totalProjects={5}
        headingId="project-5-title"
      />
    )

    expect(
      screen.queryByRole('link', { name: /código en github/i })
    ).not.toBeInTheDocument()
  })

  it('muestra las tecnologías del proyecto como chips visibles', () => {
    renderWithMotion(
      <ProjectInfo
        project={PORTFOLIO_LEGACY_PROJECT}
        visible={true}
        totalProjects={5}
        headingId="project-5-title"
      />
    )

    for (const skill of PORTFOLIO_LEGACY_PROJECT.skills) {
      expect(screen.getByText(skill)).toBeInTheDocument()
    }
  })

  it('no pone id en el h3 del título cuando headingId está omitido', () => {
    renderWithMotion(
      <ProjectInfo
        project={PORTFOLIO_LEGACY_PROJECT}
        visible={true}
        totalProjects={5}
      />
    )

    const titleHeading = screen.getByRole('heading', {
      level: 3,
      name: PORTFOLIO_LEGACY_PROJECT.title,
    })
    expect(titleHeading).not.toHaveAttribute('id')
  })
})
