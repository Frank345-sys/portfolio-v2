import { LazyMotion, domAnimation, MotionConfig } from 'motion/react'
import { HeroSection } from '@/components/HeroSection'
import { Header } from '@/components/Header'
import { AboutSection } from '@/components/AboutSection'

/**
 * Componente raíz de la aplicación. Renderiza el layout principal
 * con la sección hero y el header.
 *
 * @returns {JSX.Element} Árbol de la app con Motion en modo lazy (`m` + `domAnimation`).
 *
 * @example
 * ```tsx
 * <App />
 * ```
 */
export function App() {
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <>
          <Header />
          <main>
            <HeroSection />
            <AboutSection />
          </main>
        </>
      </MotionConfig>
    </LazyMotion>
  )
}
