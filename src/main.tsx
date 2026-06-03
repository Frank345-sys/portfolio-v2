/**
 * Punto de entrada de la SPA: monta `App` en `#root` con `StrictMode`.
 *
 * @fileoverview Bootstrap mínimo: estilos globales, `reportWebVitals`, guard de `#root` y montaje de `<App />`.
 * @remarks Mantener mínimo: la composición vive en `App.tsx`. El `ErrorBoundary` raíz captura fallos
 * que escapen al boundary interno de App (p. ej. Footer).
 * Para enviar Web Vitals a un endpoint, pasar la función como callback a `reportWebVitals()`.
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import 'lenis/dist/lenis.css'

import './index.css'
import { ErrorBoundary } from '@/shared/components/primitives/ErrorBoundary'
import { reportWebVitals } from '@/shared/utils/reportWebVitals'

import { App } from './App'

reportWebVitals()

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Elemento #root no encontrado')
}

createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
)
