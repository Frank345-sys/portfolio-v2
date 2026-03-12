import { HeroSection } from '@/components/HeroSection'
import { Header } from '@/components/Header'

/**
 * Componente raíz de la aplicación. Renderiza el layout principal
 * con la sección hero y el header.
 *
 * @example
 * ```tsx
 * <App />
 * ```
 */
export function App() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
      </main>
    </>
  )
}
