import { lazy, Suspense } from 'react'
import { LazyMotion, domAnimation, MotionConfig } from 'motion/react'
import { HeroSection } from '@/components/HeroSection'
import { Header } from '@/components/Header'
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
            <Suspense fallback={null}>
              <AboutSection />
            </Suspense>
            <Suspense fallback={null}>
              <ProjectsSection />
            </Suspense>
            <Suspense fallback={null}>
              <ContactSection />
            </Suspense>
          </main>
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
        </SmoothScrollRoot>
      </MotionConfig>
    </LazyMotion>
  )
}
