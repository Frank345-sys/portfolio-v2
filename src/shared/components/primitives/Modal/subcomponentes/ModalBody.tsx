/**
 * Pieza de interfaz del portfolio (`ModalBody`).
 *
 * @fileoverview Cuerpo scrollable del panel modal.
 * @remarks Subcomponente de {@link Modal}; usa `CARD.layout.body`.
 */

import { CARD } from '@/shared/constants/tokens'
import { cn } from '@/shared/utils/cn'

import type { ComponentPropsWithoutRef, ReactNode } from 'react'

interface ModalBodyProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode
}

export function ModalBody({ className, children, ...rest }: ModalBodyProps) {
  return (
    <div className={cn(CARD.layout.body, className)} {...rest}>
      {children}
    </div>
  )
}
