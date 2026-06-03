/**
 * Límite de error de React con mensaje accesible y acción «Reintentar».
 *
 * @fileoverview Aísla fallos de render o de árbol hijo y muestra una superficie de recuperación sin descargar toda la página.
 * @remarks El fallback ocupa el área del boundary (p. ej. `<main>`) y deja header/footer usables.
 */

import { Component, type ErrorInfo, type ReactNode } from 'react'

import { ErrorBoundaryFallback } from './subcomponents/ErrorBoundaryFallback'
import { deriveErrorCode } from './utils/deriveErrorCode'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  errorCode: string
  retryCount: number
  lastAttemptAt: Date | null
}

/**
 * Captura errores de renderizado en el subárbol (p. ej. fallos al cargar un chunk `lazy()`)
 * y muestra una tarjeta coherente con `role="alert"` y botón Reintentar.
 *
 * Preferir **un único** límite para varios `<Suspense>` hermanos con el mismo riesgo
 * de fallo masivo por red — evita multiplicar el mismo mensaje.
 *
 * No sustituye a un monitor externo de errores; en desarrollo se registra el detalle en consola.
 */
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  public override state: ErrorBoundaryState = {
    hasError: false,
    errorCode: 'ERR_NETWORK_FAILED',
    retryCount: 0,
    lastAttemptAt: null,
  }

  public static getDerivedStateFromError(
    error: Error
  ): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      errorCode: deriveErrorCode(error),
      lastAttemptAt: new Date(),
    }
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    if (import.meta.env.DEV) {
      console.error('ErrorBoundary:', error, errorInfo.componentStack)
    }
  }

  private handleRetry = (): void => {
    this.setState((prev) => ({
      hasError: false,
      retryCount: prev.retryCount + 1,
      lastAttemptAt: new Date(),
    }))
  }

  public override render(): ReactNode {
    if (this.state.hasError && this.state.lastAttemptAt) {
      return (
        <ErrorBoundaryFallback
          errorCode={this.state.errorCode}
          retryCount={this.state.retryCount}
          lastAttemptAt={this.state.lastAttemptAt}
          onRetry={this.handleRetry}
        />
      )
    }

    return this.props.children
  }
}
