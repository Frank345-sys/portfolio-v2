import { LazyMotion, domAnimation, MotionConfig } from 'motion/react'
import { HeroSection } from '@/components/HeroSection'
import { Header } from '@/components/Header'
import { AboutSection } from '@/components/AboutSection'
import { ProjectsSection } from '@/components/ProjectsSection'
import { SmoothScrollRoot } from '@/shared/components/SmoothScrollRoot'
import { Z } from '@/shared/constants/tokens'

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
            <AboutSection />
            <ProjectsSection />
          </main>
        </SmoothScrollRoot>
      </MotionConfig>
    </LazyMotion>
  )
}
