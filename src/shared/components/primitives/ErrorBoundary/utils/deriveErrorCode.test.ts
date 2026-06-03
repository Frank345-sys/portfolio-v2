/**
 * Tests para `deriveErrorCode`.
 *
 * @fileoverview Suite Vitest que fija el mapeo mensaje → código mostrado en el fallback.
 * @remarks Sin DOM; ampliar casos al añadir patrones en `deriveErrorCode.ts`.
 */
import { describe, expect, it } from 'vitest'

import { ERROR_BOUNDARY_DEFAULT_CODE } from '../constants'
import { deriveErrorCode } from './deriveErrorCode'

describe('deriveErrorCode', () => {
  it('clasifica errores de red o import dinámico', () => {
    expect(deriveErrorCode(new Error('Failed to fetch'))).toBe(
      ERROR_BOUNDARY_DEFAULT_CODE
    )
    expect(
      deriveErrorCode(new Error('error dynamically imported module'))
    ).toBe(ERROR_BOUNDARY_DEFAULT_CODE)
  })

  it('clasifica fallos de chunk', () => {
    expect(deriveErrorCode(new Error('Loading chunk 12 failed'))).toBe(
      'ERR_CHUNK_LOAD_FAILED'
    )
  })
})
