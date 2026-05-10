import { Component, type ErrorInfo, type ReactNode } from 'react'

import { BUTTON, LAYOUT, TYPOGRAPHY } from '@/shared/constants/tokens'
import { cn } from '@/shared/utils/cn'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

/**
 * Captura errores de renderizado en el subárbol (p. ej. fallos al hidratar un chunk `lazy()`)
 * y muestra un mensaje con rol `alert` y acción de reintento.
 *
 * No sustituye a un monitor externo de errores; en desarrollo se registra el detalle en consola.
 */
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  public override state: ErrorBoundaryState = {
    hasError: false,
  }

  public static getDerivedStateFromError(): Partial<ErrorBoundaryState> {
    return { hasError: true }
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    if (import.meta.env.DEV) {
      console.error('ErrorBoundary:', error, errorInfo.componentStack)
    }
  }

  private handleRetry = (): void => {
    this.setState({ hasError: false })
  }

  public override render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          className={cn(
            LAYOUT.container.narrow,
            LAYOUT.px,
            'border-error-base bg-error-lighter text-text-strong border-l-4 py-6'
          )}
        >
          <p className={TYPOGRAPHY.paragraph.primary}>
            No pudimos mostrar este bloque. Puede deberse a un fallo de red al
            cargar el contenido.
          </p>
          <div className={cn(LAYOUT.spacing.compact, 'mt-4')}>
            <button
              type="button"
              className={cn(BUTTON.variant.solid.primary, BUTTON.size.md)}
              onClick={this.handleRetry}
            >
              Reintentar
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
