/**
 * Pieza de interfaz del portfolio (`ModalFooter`).
 *
 * @fileoverview Pie del panel modal (acciones secundarias).
 * @remarks Subcomponente de {@link Modal}; usa `CARD.layout.footer`.
 */

import { CARD } from '@/shared/constants/tokens'
import { cn } from '@/shared/utils/cn'

import type { ComponentPropsWithoutRef, ReactNode } from 'react'

interface ModalFooterProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode
}

export function ModalFooter({
  className,
  children,
  ...rest
}: ModalFooterProps) {
  return (
    <div className={cn(CARD.layout.footer, className)} {...rest}>
      {children}
    </div>
  )
}
