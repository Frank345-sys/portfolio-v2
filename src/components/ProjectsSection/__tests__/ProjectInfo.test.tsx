import { describe, expect, it } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithMotion } from '@/test/renderWithMotion'
import { SKILL_LABEL } from '@/shared/constants/skills'
import { ProjectInfo } from '../subcomponents/ProjectInfo'
import type { Project } from '../types'

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
  link: 'https://frank345-sys.github.io/portfolio_web/',
  githubLink: 'https://github.com/Frank345-sys/portfolio_web',
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

    PROJECT_MOCK.bullets.forEach((bullet) => {
      expect(screen.getByText(bullet)).toBeInTheDocument()
    })

    PROJECT_MOCK.skills.forEach((skill) => {
      expect(screen.getByText(skill)).toBeInTheDocument()
    })

    expect(
      screen.getByRole('link', { name: /abrir sitio en vivo/i })
    ).toHaveAttribute('href', PROJECT_MOCK.link)
    expect(
      screen.getByRole('link', { name: /código en github/i })
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

  it('no muestra enlace al proyecto si link no está definido', () => {
    const { link: _drop, ...project } = PROJECT_MOCK
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
      screen.queryByRole('link', { name: /abrir sitio en vivo/i })
    ).not.toBeInTheDocument()
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
})
