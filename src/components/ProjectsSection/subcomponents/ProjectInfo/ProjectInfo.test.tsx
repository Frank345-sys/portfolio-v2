/**
 * Tests para components/ProjectsSection/subcomponents/ProjectInfo/ProjectInfo.test.tsx.
 *
 * @fileoverview Suite Vitest que valida el contrato de render, accesibilidad y regresiones del código bajo prueba.
 * @remarks Usa Testing Library; si el archivo importa `renderWithMotion`, el árbol va envuelto en el proveedor de Motion.
 */

import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import {
  SITE_GITHUB_PAGES_PORTFOLIO_WEB_HREF,
  SITE_GITHUB_REPO_PORTFOLIO_WEB_HREF,
} from '@/shared/constants/siteProfile'
import { SKILL_LABEL } from '@/shared/constants/skills/skillLabels'
import { renderWithMotion } from '@/test/helpers'

import { ProjectInfo } from './ProjectInfo'

import type { Project } from '../../types'

const PROJECT_MOCK: Project = {
  id: 5,
  title: 'Portfolio Web (Legacy)',
  subtitle: 'App Web',
  description: 'Proyecto de ejemplo para validar el panel de información.',
  bullets: [
    'Implementación de componentes reutilizables.',
    'Aplicación de buenas prácticas de accesibilidad.',
  ],
  skills: [SKILL_LABEL.REACT, SKILL_LABEL.TYPESCRIPT],
  images: ['/images/projects/portfolio-legacy.png'],
  link: SITE_GITHUB_PAGES_PORTFOLIO_WEB_HREF,
  githubLink: SITE_GITHUB_REPO_PORTFOLIO_WEB_HREF,
}

describe('ProjectInfo', () => {
  it('renderiza contenido principal y headingId', () => {
    renderWithMotion(
      <ProjectInfo
        project={PROJECT_MOCK}
        visible={true}
        totalProjects={5}
        headingId="project-5-title"
      />
    )

    expect(screen.getByRole('heading', { level: 3 })).toHaveAttribute(
      'id',
      'project-5-title'
    )
    expect(screen.getByText('Portfolio Web (Legacy)')).toBeInTheDocument()
    expect(screen.getByText('App Web')).toBeInTheDocument()
    expect(
      screen.getByText(
        'Proyecto de ejemplo para validar el panel de información.'
      )
    ).toBeInTheDocument()
    expect(screen.getByText('05 / 05')).toBeInTheDocument()
  })

  it('renderiza bullets, skills y enlaces opcionales', () => {
    renderWithMotion(
      <ProjectInfo
        project={PROJECT_MOCK}
        visible={true}
        totalProjects={5}
        headingId="project-5-title"
      />
    )

    for (const bullet of PROJECT_MOCK.bullets) {
      expect(screen.getByText(bullet)).toBeInTheDocument()
    }

    for (const skill of PROJECT_MOCK.skills) {
      expect(screen.getByText(skill)).toBeInTheDocument()
    }

    expect(
      screen.getByRole('link', {
        name: /ver sitio en vivo \(abre en una nueva pestaña\)/i,
      })
    ).toHaveAttribute('href', PROJECT_MOCK.link)
    expect(
      screen.getByRole('link', {
        name: /código en github \(abre en una nueva pestaña\)/i,
      })
    ).toHaveAttribute('href', PROJECT_MOCK.githubLink)
  })

  it('no renderiza nada cuando visible es false', () => {
    renderWithMotion(
      <ProjectInfo
        project={PROJECT_MOCK}
        visible={false}
        totalProjects={5}
        headingId="project-5-title"
      />
    )

    expect(screen.queryByText('Portfolio Web (Legacy)')).not.toBeInTheDocument()
  })

  it('no muestra enlace al proyecto si link está omitido', () => {
    const { link: _, ...withoutLink } = PROJECT_MOCK
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
        project={{ ...PROJECT_MOCK, link: '' }}
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
    const { githubLink: _drop, ...project } = PROJECT_MOCK
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
        project={PROJECT_MOCK}
        visible={true}
        totalProjects={5}
        headingId="project-5-title"
      />
    )

    for (const skill of PROJECT_MOCK.skills) {
      expect(screen.getByText(skill)).toBeInTheDocument()
    }
  })

  it('no pone id en el h3 del título cuando headingId está omitido', () => {
    renderWithMotion(
      <ProjectInfo project={PROJECT_MOCK} visible={true} totalProjects={5} />
    )

    const titleHeading = screen.getByRole('heading', {
      level: 3,
      name: PROJECT_MOCK.title,
    })
    expect(titleHeading).not.toHaveAttribute('id')
  })
})
