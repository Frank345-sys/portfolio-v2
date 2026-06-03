/**
 * Prefijo `import.meta.env.BASE_URL` para rutas de assets públicos (capturas en `PROJECTS[].images`).
 *
 * @fileoverview Funciones puras o helpers sin acoplar a una sección concreta del portfolio.
 * @remarks Preferir pruebas unitarias directas; evitar importar React salvo que el módulo lo requiera.
 */
export function withSiteBaseUrl(path: string): string {
  const PUBLIC_BASE_URL = import.meta.env.BASE_URL
  return `${PUBLIC_BASE_URL}${path.replace(/^\/+/, '')}`
}
