/**
 * Enlaces del portfolio v1 (histórico) en la sección Proyectos.
 *
 * @module components/ProjectsSection/constants/portfolioLegacyLinks
 * @fileoverview Contrato único de URLs (`link`, `githubLink`) derivado de `siteProfile`.
 * @remarks Import directo sin `constants/index.ts`. Consumido por `projects.ts` y tests de `ProjectInfo`.
 */
import {
  SITE_GITHUB_PAGES_PORTFOLIO_WEB_HREF,
  SITE_GITHUB_REPO_PORTFOLIO_WEB_HREF,
} from '@/shared/constants/siteProfile/siteProfile'

import type { Project } from '../types'

/** `id` del proyecto «Portfolio v1 (histórico)» en `projects.ts`. */
export const PORTFOLIO_LEGACY_PROJECT_ID = 5 as const

/**
 * URLs públicas del portfolio legacy: sitio en GitHub Pages y repositorio en GitHub.
 * Fuente única para la entrada con {@link PORTFOLIO_LEGACY_PROJECT_ID} en `projects.ts`.
 */
export const PORTFOLIO_LEGACY_PROJECT_LINKS = {
  link: SITE_GITHUB_PAGES_PORTFOLIO_WEB_HREF,
  githubLink: SITE_GITHUB_REPO_PORTFOLIO_WEB_HREF,
} as const satisfies Required<Pick<Project, 'link' | 'githubLink'>>
