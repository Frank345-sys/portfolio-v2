/**
 * Extrae el id de sección a partir de un `href` de ancla interna (`#id`).
 * Útil para scroll-spy y enlaces que apuntan a `<element id="…">`.
 */
export function hashSectionId(href: string): string | null {
  if (!href.startsWith('#') || href === '#') return null
  return href.slice(1)
}
