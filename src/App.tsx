/**
 * Raíz de la aplicación React del portfolio (montaje de secciones y providers).
 *
 * @fileoverview Orquesta skip link, `<Header>`, `<main>` con secciones lazy y `<Footer>` fuera del contenido principal.
 * @remarks `HeroSection` se importa de forma estática (LCP); About, Projects y Contact usan `React.lazy` + `Suspense`.
 * Un `ErrorBoundary` agrupa las secciones bajo `<main>`; Footer tiene su propio `Suspense` fuera del límite —
 * si falla antes de montarse, lo captura el boundary de `main.tsx`.
 */
import { LazyMotion, domAnimation, MotionConfig } from 'motion/react'
import { lazy, Suspense } from 'react'

import { Header } from '@/components/Header'
import { HeroSection } from '@/components/HeroSection'
import { SectionLazyFallback } from '@/shared/components/composites/SectionLazyFallback'
import { ErrorBoundary } from '@/shared/components/primitives/ErrorBoundary'
import { SmoothScrollRoot } from '@/shared/components/primitives/SmoothScrollRoot'
import { ThemeProvider } from '@/shared/components/primitives/ThemeToggle'
const AboutSection = lazy(async () => {
  const m = await import('@/components/AboutSection')
  return { default: m.AboutSection }
})
const ProjectsSection = lazy(async () => {
  const m = await import('@/components/ProjectsSection')
  return { default: m.ProjectsSection }
})
const ContactSection = lazy(async () => {
  const m = await import('@/components/ContactSection')
  return { default: m.ContactSection }
})
const Footer = lazy(async () => {
  const m = await import('@/components/Footer')
  return { default: m.Footer }
})

/**
 * Raíz de la SPA: skip link, cabecera y contenido principal.
 * La textura de grano se acota a `main` para no afectar header ni footer.
 * Motion en modo lazy (`domAnimation`: el subconjunto DOM habitual; sin layout/drag extra).
 * `MotionConfig` respeta `prefers-reduced-motion`.
 * Las secciones lazy bajo `Suspense` usan `SectionLazyFallback` para reducir CLS
 * y anuncian carga a lectores de pantalla (portada vs. bloques con `min-h` en secciones internas).
 *
 * Un solo **`ErrorBoundary`** agrupa todas las secciones bajo **`main`**; si todos los chunks lazy
 * fallan (red), se muestra un único estado de error. El pie es `lazy`; si lanzara antes de montarse,
 * el límite de **`main.tsx`** muestra el mismo fallback acotado al área del boundary.
 */
export function App() {
  return (
    <ThemeProvider>
      <LazyMotion features={domAnimation}>
        <MotionConfig reducedMotion="user">
          <SmoothScrollRoot>
            <a href="#contenido-principal" className="u-skip-link">
              Saltar al contenido principal
            </a>
            <Header />
            <main
              id="contenido-principal"
              className="relative isolate"
              tabIndex={-1}
            >
              <div className="u-app-grain-overlay" aria-hidden="true" />
              <ErrorBoundary>
                <HeroSection />
                <Suspense
                  fallback={
                    <SectionLazyFallback
                      ariaLabel="Cargando sección Sobre mí"
                      variant="about"
                    />
                  }
                >
                  <AboutSection />
                </Suspense>
                <Suspense
                  fallback={
                    <SectionLazyFallback
                      ariaLabel="Cargando sección Proyectos"
                      variant="projects"
                    />
                  }
                >
                  <ProjectsSection />
                </Suspense>
                <Suspense
                  fallback={
                    <SectionLazyFallback
                      ariaLabel="Cargando sección Contacto"
                      variant="contact"
                    />
                  }
                >
                  <ContactSection />
                </Suspense>
              </ErrorBoundary>
            </main>
            <Suspense
              fallback={
                <SectionLazyFallback
                  ariaLabel="Cargando pie de página"
                  variant="footer"
                />
              }
            >
              <Footer />
            </Suspense>
          </SmoothScrollRoot>
        </MotionConfig>
      </LazyMotion>
    </ThemeProvider>
  )
}
