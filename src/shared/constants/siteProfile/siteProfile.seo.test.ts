/**
 * Tests de contrato SEO para textos en `siteProfile.ts`.
 *
 * @fileoverview Valida longitudes recomendadas de `<title>` y meta `description` sin acoplarse al HTML.
 * @remarks Fuente única: `SITE_PAGE_TITLE`, `SITE_META_DESCRIPTION` y `SITE_META_DESCRIPTION_SHORT`.
 */

import { describe, expect, it } from 'vitest'

import {
  SITE_META_DESCRIPTION,
  SITE_META_DESCRIPTION_SHORT,
  SITE_PAGE_TITLE,
} from './siteProfile'

/** Rango orientativo Google para `<title>` (caracteres visibles). */
const TITLE_MIN = 30
const TITLE_MAX = 60

/** Rango orientativo para meta description (snippet). */
const META_DESC_MIN = 120
const META_DESC_MAX = 160

describe('siteProfile SEO', () => {
  it('SITE_PAGE_TITLE está dentro del rango recomendado para snippet', () => {
    expect(SITE_PAGE_TITLE.length).toBeGreaterThanOrEqual(TITLE_MIN)
    expect(SITE_PAGE_TITLE.length).toBeLessThanOrEqual(TITLE_MAX)
  })

  it('SITE_META_DESCRIPTION está dentro del rango recomendado', () => {
    expect(SITE_META_DESCRIPTION.length).toBeGreaterThanOrEqual(META_DESC_MIN)
    expect(SITE_META_DESCRIPTION.length).toBeLessThanOrEqual(META_DESC_MAX)
  })

  it('SITE_META_DESCRIPTION_SHORT es más breve que la descripción principal', () => {
    expect(SITE_META_DESCRIPTION_SHORT.length).toBeLessThan(
      SITE_META_DESCRIPTION.length
    )
    expect(SITE_META_DESCRIPTION_SHORT.length).toBeLessThanOrEqual(
      META_DESC_MAX
    )
  })
})
