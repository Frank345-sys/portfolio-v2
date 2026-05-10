/**
 * Punto de entrada opcional para componentes compartidos reutilizables en toda la app.
 * Preferir importar desde `@/shared/components/<Nombre>` cuando el árbol de dependencias lo permita.
 *
 * @module shared/components
 */

/**
 * Límite de error por bloque con `Suspense`/`lazy`: mensaje **`role="alert"`** y botón Reintentar
 * que restablece el subárbol.
 */
export { ErrorBoundary } from './ErrorBoundary'
