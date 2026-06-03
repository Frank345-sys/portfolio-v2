/**
 * Extrae el id de sección a partir de un `href` de ancla interna (`#id`).
 * Útil para scroll-spy y enlaces que apuntan a `<element id="…">`.
 *
 * @fileoverview Funciones puras o helpers sin acoplar a una sección concreta del portfolio.
 * @remarks Preferir pruebas unitarias directas; evitar importar React salvo que el módulo lo requiera.
 */
export function hashSectionId(href: string): string | null {
  if (!href.startsWith('#') || href === '#') return null
  return href.slice(1)
}
