/**
 * Datos estáticos del bloque «Cómo trabajo» (`AboutValues`).
 *
 * @fileoverview Define `ABOUT_VALUES` (tres tarjetas fijas con `name`, `desc` y `detail`)
 * y `ABOUT_VALUES_HEADING_ID`. Tipos en `./types`.
 * @remarks Cambios en `name`, `desc` o `detail` pueden romper tests que fijen texto visible.
 * El número de entradas (actualmente 3) está testeado explícitamente en `AboutValues.test.tsx`.
 */
import type { AboutValue } from './types'

/**
 * Valores de trabajo: tres tarjetas fijas renderizadas como {@link ValueCard} en `AboutValues.tsx`.
 * El `satisfies` garantiza el contrato {@link AboutValue} sin perder el tipo literal `as const`.
 * Orden deliberado: sistemas → rendimiento → fidelidad al diseño.
 */
export const ABOUT_VALUES = [
  {
    name: 'Sistemas de UI',
    desc: 'Componentes y tokens',
    detail:
      'Piezas reutilizables y coherentes: escalan sin reescribir la base en cada release.',
  },
  {
    name: 'Rendimiento medible',
    desc: 'Menos fricción al cargar',
    detail:
      'Optimizo la percepción de velocidad y el camino crítico; menos JS superfluo.',
  },
  {
    name: 'Figma pixel perfect',
    desc: 'Especificación respetada',
    detail:
      'Estados e interacciones alineados al diseño; el código sostiene el producto.',
  },
] as const satisfies readonly AboutValue[]

/** Encabezado `h3` del bloque «Cómo trabajo» (`AboutValues`). */
export const ABOUT_VALUES_HEADING_ID = 'about-values-heading' as const
