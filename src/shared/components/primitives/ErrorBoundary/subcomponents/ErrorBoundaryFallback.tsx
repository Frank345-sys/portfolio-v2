/**
 * UI de recuperación del {@link ErrorBoundary}: tarjeta de estado y acciones en el área del boundary.
 *
 * @fileoverview Fallback centrado en `<section>` dentro del límite (p. ej. `<main>`); header y footer siguen visibles.
 * @remarks Usa tokens `BADGE`, `BUTTON`, `CARD`, `LAYOUT` y `TYPOGRAPHY`; iconos desde `@/shared/icons`.
 * Expone {@link ERROR_BOUNDARY_SECTION_ANCHOR_ID} cuando el hero no está montado para que el nav y el logo sigan enlazando.
 */

import {
  BADGE,
  BUTTON,
  CARD,
  LAYOUT,
  TYPOGRAPHY,
} from '@/shared/constants/tokens'
import { HelpCircleIcon, ImageBrokenIcon, RefreshIcon } from '@/shared/icons'
import { cn } from '@/shared/utils/cn'

import {
  ERROR_BOUNDARY_SECTION_ANCHOR_ID,
  ERROR_BOUNDARY_SOLUTIONS_HREF,
} from '../constants'
import { formatLastAttempt } from '../utils/formatLastAttempt'

import type { ReactNode } from 'react'

export interface ErrorBoundaryFallbackProps {
  errorCode: string
  retryCount: number
  lastAttemptAt: Date
  onRetry: () => void
}

function StatusRow({
  label,
  value,
  valueClassName,
}: {
  label: string
  value: ReactNode
  valueClassName?: string
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className={cn(TYPOGRAPHY.paragraph.secondary, 'text-sm')}>
        {label}
      </span>
      <span
        className={cn(
          TYPOGRAPHY.label.default,
          'text-sm font-medium',
          valueClassName
        )}
      >
        {value}
      </span>
    </div>
  )
}

/**
 * Tarjeta de error centrada en el área del boundary (sin velo a pantalla completa).
 */
export function ErrorBoundaryFallback({
  errorCode,
  retryCount,
  lastAttemptAt,
  onRetry,
}: ErrorBoundaryFallbackProps) {
  const isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true
  const connectionLabel = isOnline ? 'Conexión inestable' : 'Sin conexión'

  return (
    <section
      id={ERROR_BOUNDARY_SECTION_ANCHOR_ID}
      className={cn(
        LAYOUT.section.default,
        LAYOUT.px,
        'flex items-center justify-center'
      )}
    >
      <div
        role="alert"
        aria-live="assertive"
        className={cn(
          CARD.surface.weak,
          'shadow-elevation-lg flex w-full max-w-md flex-col items-center rounded-2xl px-6 py-8 text-center sm:px-8 sm:py-10'
        )}
      >
        <div className="relative mb-6 flex size-20 items-center justify-center">
          <span
            className="bg-error-lighter absolute size-20 rounded-full motion-safe:animate-ping"
            aria-hidden
          />
          <span
            className="bg-error-lighter absolute size-16 rounded-full"
            aria-hidden
          />
          <span className="bg-error-base shadow-elevation-md flex size-12 items-center justify-center rounded-full">
            <ImageBrokenIcon className="size-6 text-white" aria-hidden={true} />
          </span>
        </div>

        <h1 className={cn(TYPOGRAPHY.title.section, 'text-balance')}>
          No pudimos cargar el contenido
        </h1>
        <p
          className={cn(
            TYPOGRAPHY.paragraph.secondary,
            'mt-2 max-w-sm text-balance'
          )}
        >
          Puede deberse a tu conexión o a un problema temporal del servidor.
        </p>

        <p className="border-stroke-soft bg-bg-white text-text-subtle mt-5 inline-flex rounded-lg border px-3 py-1.5 font-mono text-xs tracking-wide">
          {errorCode}
        </p>

        <div
          className={cn(
            CARD.surface.default,
            'mt-6 flex w-full flex-col gap-4 rounded-xl p-4 text-left'
          )}
        >
          <StatusRow
            label="Estado"
            value={
              <span className="inline-flex items-center gap-2">
                <span
                  className={cn(
                    BADGE.special.dot,
                    BADGE.special.dotSize.sm,
                    isOnline ? 'bg-warning-base' : 'bg-error-base'
                  )}
                  aria-hidden
                />
                {connectionLabel}
              </span>
            }
          />
          <div className={LAYOUT.divider.horizontal} aria-hidden />
          <StatusRow
            label="Último intento"
            value={formatLastAttempt(lastAttemptAt)}
          />
          <div className={LAYOUT.divider.horizontal} aria-hidden />
          <StatusRow
            label="Reintentos"
            value={retryCount === 0 ? 'Ninguno' : String(retryCount)}
          />
        </div>

        <div className={cn(BUTTON.group.vertical, 'mt-8 w-full')}>
          <button
            type="button"
            className={cn(BUTTON.variant.solid.error, BUTTON.size.md, 'w-full')}
            onClick={onRetry}
          >
            <RefreshIcon aria-hidden className="size-4" />
            Reintentar conexión
          </button>
          <a
            href={ERROR_BOUNDARY_SOLUTIONS_HREF}
            className={cn(
              BUTTON.variant.outline.neutral,
              BUTTON.size.md,
              'w-full'
            )}
          >
            <HelpCircleIcon aria-hidden className="size-4" />
            Ver soluciones comunes
          </a>
        </div>
      </div>
    </section>
  )
}
