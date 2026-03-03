import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combina clases de Tailwind usando clsx y tailwind-merge. Resuelve conflictos
 * dejando la última clase aplicable.
 *
 * @param inputs - Valores de clase a combinar (strings, objetos condicionales, etc.).
 * @returns Cadena de clases sin duplicados ni conflictos.
 *
 * @example
 * ```ts
 * cn('px-4 py-2', isActive && 'bg-blue-500') // → 'px-4 py-2 bg-blue-500'
 * cn('p-4', 'p-2') // → 'p-2'
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
