/**
 * URLs no vacías tras `trim`.
 * Misma regla en preview de card, lightbox y derivados del componente padre.
 */
export function getValidUrls(urls: readonly string[]): string[] {
  return urls.filter((url) => url.trim().length > 0)
}
