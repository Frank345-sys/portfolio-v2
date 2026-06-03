/**
 * Estado reactivo de `window.matchMedia(query).matches` para breakpoints u otras media queries.
 *
 * @fileoverview Expone `matches` con `useSyncExternalStore` y snapshot SSR estable (`false` sin `window`).
 * @remarks Pasa una `query` estable (p. ej. constante importada) para no re-suscribirte al listener en cada render.
 */

import { useCallback, useSyncExternalStore } from 'react'

/**
 * Estado reactivo de `window.matchMedia(query).matches`.
 *
 * @param query - Media query CSS (p. ej. `MEDIA_QUERY_LG_MIN`).
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      if (typeof window === 'undefined') return () => {}
      const mq = window.matchMedia(query)
      mq.addEventListener('change', onStoreChange)
      return () => mq.removeEventListener('change', onStoreChange)
    },
    [query]
  )

  const getSnapshot = useCallback(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(query).matches
  }, [query])

  const getServerSnapshot = useCallback(() => false, [])

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
