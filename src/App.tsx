import { lazy, Suspense } from 'react'
import { LazyMotion, domAnimation, MotionConfig } from 'motion/react'
import { HeroSection } from '@/components/HeroSection'
import { Header } from '@/components/Header'
import { SectionLazyFallback } from '@/shared/components/SectionLazyFallback'
import { SmoothScrollRoot } from '@/shared/components/SmoothScrollRoot'
import { Z } from '@/shared/constants/tokens'

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
 * Raíz de la SPA: skip link, textura, cabecera y contenido principal.
 * Motion en modo lazy (`domAnimation`: el subconjunto DOM habitual; sin layout/drag extra).
 * `MotionConfig` respeta `prefers-reduced-motion`.
 * Los `Suspense` usan un fallback con altura mínima para reducir CLS y anuncian carga a lectores de pantalla.
 */
export function App() {
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <SmoothScrollRoot>
          <a href="#contenido-principal" className="u-skip-link">
            Saltar al contenido principal
          </a>
          <div className="u-app-grain-overlay" aria-hidden="true" />
          <Header />
          <main id="contenido-principal" className={Z.base} tabIndex={-1}>
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
  )
}
