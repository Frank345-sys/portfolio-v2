/**
 * Pieza de interfaz del portfolio (`ModalHeader`).
 *
 * @fileoverview Cabecera del panel modal; padding derecho para el botón cerrar absoluto.
 * @remarks Subcomponente de {@link Modal}; usa `CARD.layout.header`.
 */

import { CARD } from '@/shared/constants/tokens'
import { cn } from '@/shared/utils/cn'

import type { ComponentPropsWithoutRef, ReactNode } from 'react'

interface ModalHeaderProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode
}

export function ModalHeader({
  className,
  children,
  ...rest
}: ModalHeaderProps) {
  return (
    <div
      className={cn(CARD.layout.header, 'pr-12 sm:pr-14', className)}
      {...rest}
    >
      {children}
    </div>
  )
}
