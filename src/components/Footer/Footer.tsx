import { SITE_TAGLINE } from '@/shared/constants/siteProfile'
import {
  BRAND,
  BUTTON,
  LAYOUT,
  PRIMARY_NAV_LINK,
  TYPOGRAPHY,
} from '@/shared/constants/tokens'
import { CodeIcon, ArrowUpIcon } from '@/shared/icons'
import { cn } from '@/shared/utils/cn'

import {
  FOOTER_BRAND,
  FOOTER_BRAND_LANDMARK_LABEL,
  FOOTER_BUILT_WITH,
  FOOTER_FOCUS_VISIBLE,
  FOOTER_QUICK_CONTACT,
} from './constants'

/**
 * Pie de página: marca, tagline, atajo a contacto, volver al inicio y copyright.
 * Sin duplicar el menú completo del header.
 */
export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      aria-label="Pie de página"
      className={cn(
        'border-stroke-soft bg-bg-white border-t',
        'backdrop-blur-sm'
      )}
    >
      <div
        className={cn(
          LAYOUT.container.full,
          LAYOUT.px,
          'py-8 md:py-10 lg:py-12'
        )}
      >
        <div className="xs:flex-row flex flex-col justify-between gap-6">
          <section aria-labelledby="footer-brand-heading" className="space-y-2">
            <h2 id="footer-brand-heading" className="sr-only">
              {FOOTER_BRAND_LANDMARK_LABEL}
            </h2>
            <a
              href="#inicio"
              className={cn(
                'flex w-fit shrink-0 items-center gap-2 rounded-md no-underline',
                FOOTER_FOCUS_VISIBLE
              )}
              aria-label={`Ir al inicio: ${FOOTER_BRAND.name}`}
            >
              <CodeIcon aria-hidden className={BRAND.logoIcon} />
              <span className={TYPOGRAPHY.title.small}>
                {FOOTER_BRAND.name}
              </span>
            </a>
            <p
              className={cn(
                TYPOGRAPHY.paragraph.small,
                'text-text-subtle font-medium'
              )}
            >
              {FOOTER_BRAND.role}
            </p>
            <p
              className={cn(
                TYPOGRAPHY.paragraph.muted,
                'max-w-md leading-snug'
              )}
            >
              {SITE_TAGLINE}
            </p>
          </section>

          <div className="xs:items-end xs:mt-2 flex shrink-0 flex-col gap-4">
            <nav
              className="xs:items-end flex w-full flex-col gap-1"
              aria-labelledby="footer-quick-cta"
            >
              <h2
                id="footer-quick-cta"
                className={cn(TYPOGRAPHY.label.overline, 'm-0')}
              >
                Antes de irte
              </h2>
              <ul className="xs:items-end m-0 flex list-none flex-col gap-2 p-0">
                <li>
                  <a
                    href={FOOTER_QUICK_CONTACT.href}
                    className={cn(
                      PRIMARY_NAV_LINK,
                      FOOTER_FOCUS_VISIBLE,
                      'w-fit rounded-md'
                    )}
                  >
                    {FOOTER_QUICK_CONTACT.label}
                  </a>
                </li>
              </ul>
            </nav>

            <a
              href="#inicio"
              className={cn(
                BUTTON.variant.outlined.neutral,
                BUTTON.size.md,
                'gap-2 normal-case',
                FOOTER_FOCUS_VISIBLE
              )}
              aria-label="Volver al inicio de la página"
            >
              <ArrowUpIcon aria-hidden />
              Volver al inicio
            </a>
          </div>
        </div>

        <div
          className={cn(LAYOUT.divider.horizontal, 'mt-8 opacity-80 md:mt-10')}
          aria-hidden
        />
        <div className="mt-5 flex flex-col gap-2 text-center md:flex-row md:items-center md:justify-between md:text-start">
          <p className={TYPOGRAPHY.paragraph.muted}>
            © {year} {FOOTER_BRAND.name}
            {'. '}
            Todos los derechos reservados.
          </p>
          <p className={TYPOGRAPHY.special.caption}>
            Construido con {FOOTER_BUILT_WITH}.
          </p>
        </div>
      </div>
    </footer>
  )
}
