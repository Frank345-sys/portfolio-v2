/**
 * Tests para shared/utils/__tests__/getValidUrls.test.ts.
 *
 * @fileoverview Suite Vitest que valida el contrato de render, accesibilidad y regresiones del código bajo prueba.
 * @remarks Usa Testing Library; si el archivo importa `renderWithMotion`, el árbol va envuelto en el proveedor de Motion.
 */

import { describe, expect, it } from 'vitest'

import { getValidUrls } from '../getValidUrls'

describe('getValidUrls', () => {
  it('omite cadenas vacías y solo espacios', () => {
    expect(getValidUrls(['', '  ', '\t', '/a.png', ' /b.png '])).toEqual([
      '/a.png',
      ' /b.png ',
    ])
  })

  it('devuelve array vacío si no hay entradas válidas', () => {
    expect(getValidUrls([])).toEqual([])
    expect(getValidUrls(['', ' '])).toEqual([])
  })
})
