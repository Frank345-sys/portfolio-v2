/**
 * URLs no vacías tras `trim`.
 * Misma regla en preview de card, modal ampliado y derivados del componente padre.
 *
 * @fileoverview Funciones puras o helpers sin acoplar a una sección concreta del portfolio.
 * @remarks Preferir pruebas unitarias directas; evitar importar React salvo que el módulo lo requiera.
 */
export function getValidUrls(urls: readonly string[]): string[] {
  return urls.filter((url) => url.trim().length > 0)
}
