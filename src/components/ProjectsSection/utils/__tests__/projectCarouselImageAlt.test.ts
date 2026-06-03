/**
 * Tests para components/ProjectsSection/utils/__tests__/projectCarouselImageAlt.test.ts.
 *
 * @fileoverview Suite Vitest que valida el contrato de render, accesibilidad y regresiones del código bajo prueba.
 * @remarks Usa Testing Library; si el archivo importa `renderWithMotion`, el árbol va envuelto en el proveedor de Motion.
 */

import { describe, expect, it } from 'vitest'

import { getProjectCarouselImageAltBase } from '../projectCarouselImageAlt'

describe('getProjectCarouselImageAltBase', () => {
  it('envuelve el título entre comillas angulares para lectura natural', () => {
    expect(getProjectCarouselImageAltBase('Mi app')).toBe(
      'Captura de pantalla de la interfaz del proyecto «Mi app»'
    )
  })

  it('normaliza espacios alrededor del título', () => {
    expect(getProjectCarouselImageAltBase('  Shop  ')).toBe(
      'Captura de pantalla de la interfaz del proyecto «Shop»'
    )
  })

  it('usa frase neutral si el título queda vacío', () => {
    expect(getProjectCarouselImageAltBase('')).toBe(
      'Captura de pantalla de la interfaz del proyecto'
    )
    expect(getProjectCarouselImageAltBase('   ')).toBe(
      'Captura de pantalla de la interfaz del proyecto'
    )
  })
})
