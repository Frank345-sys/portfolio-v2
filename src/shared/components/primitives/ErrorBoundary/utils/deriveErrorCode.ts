/**
 * Mapea un `Error` de runtime a un código legible en el fallback.
 *
 * @fileoverview Clasificación heurística por mensaje (`fetch`, chunk, timeout) hacia códigos estables en UI.
 * @remarks El fallback por defecto es {@link ERROR_BOUNDARY_DEFAULT_CODE}; ampliar reglas junto con `deriveErrorCode.test.ts`.
 */
import { ERROR_BOUNDARY_DEFAULT_CODE } from '../constants'

/**
 * Deriva un identificador estable para la UI a partir del mensaje del error.
 */
export function deriveErrorCode(error: Error): string {
  const message = error.message.toLowerCase()

  if (
    message.includes('failed to fetch') ||
    message.includes('network') ||
    message.includes('importing a module') ||
    message.includes('dynamically imported')
  ) {
    return ERROR_BOUNDARY_DEFAULT_CODE
  }

  if (message.includes('chunk') || message.includes('loading')) {
    return 'ERR_CHUNK_LOAD_FAILED'
  }

  return 'ERR_RENDER_FAILED'
}
