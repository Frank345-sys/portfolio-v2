/**
 * Tests para shared/utils/__tests__/hashSectionId.test.ts.
 *
 * @fileoverview Suite Vitest que valida el contrato de render, accesibilidad y regresiones del código bajo prueba.
 * @remarks Usa Testing Library; si el archivo importa `renderWithMotion`, el árbol va envuelto en el proveedor de Motion.
 */

import { describe, it, expect } from 'vitest'

import { hashSectionId } from '../hashSectionId'

describe('hashSectionId', () => {
  it('devuelve el id sin # para anclas internas', () => {
    expect(hashSectionId('#sobre-mi')).toBe('sobre-mi')
  })

  it('devuelve null para # solo o enlaces no ancla', () => {
    expect(hashSectionId('#')).toBeNull()
    expect(hashSectionId('/blog')).toBeNull()
    expect(hashSectionId('')).toBeNull()
  })
})
