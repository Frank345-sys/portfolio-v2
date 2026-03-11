# Sistema de Design Tokens

Sistema completo de tokens de diseño basado para landing pages.

## 📦 Instalación

```bash
# Coloca estos archivos en tu proyecto
src/
  constans/
    tokens/
      animation.ts
      badge.ts
      button.ts
      input.ts
      layout.ts
      shadow.ts
      typography.ts
      index.ts
```

## 🎨 Uso Básico

```tsx
import { TYPOGRAPHY, LAYOUT, BUTTON } from '@/styles/tokens'

export default function Hero() {
  return (
    <section className={LAYOUT.section.hero}>
      <div className={LAYOUT.container.full}>
        <div className={LAYOUT.hero.stack}>
          <h1 className={TYPOGRAPHY.title.hero}>
            Construye productos increíbles
          </h1>
          <p className={TYPOGRAPHY.paragraph.lead}>
            La mejor plataforma para llevar tu negocio al siguiente nivel
          </p>
          <div className={LAYOUT.hero.ctas}>
            <button className={BUTTON.special.cta}>Comenzar gratis</button>
            <button className={cn(BUTTON.variant.text.primary, BUTTON.size.lg)}>
              Ver demo
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
```

## 📚 Ejemplos por Sección

### Hero Section

```tsx
<section className={LAYOUT.section.hero}>
  <div className={LAYOUT.container.full}>
    <div className={LAYOUT.grid.split}>
      {/* Contenido */}
      <div className={LAYOUT.hero.stack}>
        <span className={TYPOGRAPHY.label.overline}>Nuevo lanzamiento</span>
        <h1 className={TYPOGRAPHY.title.hero}>Tu título impactante aquí</h1>
        <p className={TYPOGRAPHY.paragraph.lead}>
          Descripción que engancha y explica el valor principal
        </p>
        <div className={LAYOUT.hero.ctas}>
          <button className={BUTTON.special.cta}>Acción principal</button>
          <button className={cn(BUTTON.variant.text.primary, BUTTON.size.lg)}>
            Acción secundaria →
          </button>
        </div>
      </div>

      {/* Imagen/Gráfico */}
      <div className={ANIMATION.fade.inFromRight}>
        <img src="/hero.png" alt="Hero" />
      </div>
    </div>
  </div>
</section>
```

### Features Section

```tsx
<section className={LAYOUT.section.default}>
  <div className={LAYOUT.container.full}>
    <div className={LAYOUT.spacing.default}>
      {/* Header */}
      <div className="mx-auto max-w-3xl text-center">
        <h2 className={TYPOGRAPHY.title.section}>
          Características principales
        </h2>
        <p className={TYPOGRAPHY.paragraph.primary}>
          Todo lo que necesitas para tener éxito
        </p>
      </div>

      {/* Features Grid */}
      <div className={LAYOUT.grid.cols3}>
        {features.map((feature, i) => (
          <div
            key={i}
            className={cn(LAYOUT.card.interactive, ANIMATION.hover.lift)}
          >
            <div className={LAYOUT.flex.stackCompact}>
              <span
                className={cn(
                  BADGE.base.default,
                  BADGE.size.md,
                  BADGE.variant.primary
                )}
              >
                {feature.icon}
              </span>
              <h3 className={TYPOGRAPHY.title.card}>{feature.title}</h3>
              <p className={TYPOGRAPHY.paragraph.secondary}>
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>
```

### Pricing Section

```tsx
<section className={LAYOUT.section.default}>
  <div className={LAYOUT.container.full}>
    <div className={LAYOUT.spacing.large}>
      {/* Header */}
      <div className="mx-auto max-w-2xl text-center">
        <span className={TYPOGRAPHY.label.overline}>Precios</span>
        <h2 className={TYPOGRAPHY.title.section}>Elige tu plan perfecto</h2>
      </div>

      {/* Pricing Cards */}
      <div className={LAYOUT.grid.cols3}>
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={cn(LAYOUT.card.elevated, LAYOUT.flex.stack)}
          >
            <div>
              <h3 className={TYPOGRAPHY.title.card}>{plan.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className={TYPOGRAPHY.special.price}>${plan.price}</span>
                <span className={TYPOGRAPHY.paragraph.muted}>/mes</span>
              </div>
            </div>

            <ul className={LAYOUT.spacing.compact}>
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <span>✓</span>
                  <span className={TYPOGRAPHY.paragraph.secondary}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <button
              className={cn(
                BUTTON.variant.contained.primary,
                BUTTON.size.md,
                'w-full'
              )}
            >
              Comenzar
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>
```

### CTA Section

```tsx
<section className={LAYOUT.section.default}>
  <div className={LAYOUT.container.full}>
    <div className={LAYOUT.cta.banner}>
      <div className={LAYOUT.cta.stack}>
        <h2 className={TYPOGRAPHY.title.section}>¿Listo para comenzar?</h2>
        <p className={TYPOGRAPHY.paragraph.primary}>
          Únete a miles de usuarios satisfechos
        </p>
        <div className={BUTTON.group.horizontal}>
          <button className={BUTTON.special.cta}>Crear cuenta gratis</button>
          <a href="#" className={BUTTON.special.link}>
            Conoce más →
          </a>
        </div>
      </div>
    </div>
  </div>
</section>
```

### Testimonials Section

```tsx
<section className={LAYOUT.section.default}>
  <div className={LAYOUT.container.full}>
    <div className={LAYOUT.grid.cols2}>
      {testimonials.map((testimonial) => (
        <div key={testimonial.id} className={LAYOUT.card.subtle}>
          <div className={LAYOUT.flex.stackCompact}>
            <p className={TYPOGRAPHY.special.quote}>"{testimonial.quote}"</p>
            <div className="flex items-center gap-3">
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="h-12 w-12 rounded-full"
              />
              <div>
                <p className={TYPOGRAPHY.label.default}>{testimonial.name}</p>
                <p className={TYPOGRAPHY.label.small}>{testimonial.role}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

### Form Section

```tsx
<section className={LAYOUT.section.default}>
  <div className={LAYOUT.container.narrow}>
    <div className={LAYOUT.spacing.default}>
      <h2 className={TYPOGRAPHY.title.section}>Contáctanos</h2>

      <form className={INPUT.group.vertical}>
        <div>
          <label className={INPUT.label.required}>Nombre</label>
          <input
            type="text"
            className={INPUT.base.default}
            placeholder="Tu nombre completo"
          />
        </div>

        <div>
          <label className={INPUT.label.default}>Email</label>
          <input
            type="email"
            className={INPUT.base.default}
            placeholder="tu@email.com"
          />
          <p className={INPUT.helper.default}>Nunca compartiremos tu email</p>
        </div>

        <div>
          <label className={INPUT.label.default}>Mensaje</label>
          <textarea
            className={INPUT.base.textarea}
            placeholder="Cuéntanos más..."
          />
        </div>

        <button
          className={cn(
            BUTTON.variant.contained.primary,
            BUTTON.size.lg,
            'w-full'
          )}
        >
          Enviar mensaje
        </button>
      </form>
    </div>
  </div>
</section>
```

### Footer

```tsx
<footer className={LAYOUT.footer.wrapper}>
  <div className={LAYOUT.container.full}>
    <div className={LAYOUT.section.footer}>
      <div className={LAYOUT.footer.grid}>
        <div>
          <h3 className={TYPOGRAPHY.title.small}>Producto</h3>
          <ul className={LAYOUT.spacing.compact}>
            <li>
              <a href="#" className={TYPOGRAPHY.link.footer}>
                Features
              </a>
            </li>
            <li>
              <a href="#" className={TYPOGRAPHY.link.footer}>
                Precios
              </a>
            </li>
            <li>
              <a href="#" className={TYPOGRAPHY.link.footer}>
                Casos de uso
              </a>
            </li>
          </ul>
        </div>

        {/* Más columnas... */}
      </div>

      <div className={LAYOUT.footer.bottom}>
        <p className={TYPOGRAPHY.paragraph.small}>
          © 2024 Tu Empresa. Todos los derechos reservados.
        </p>
      </div>
    </div>
  </div>
</footer>
```

## 🎭 Animaciones

Los tokens de animación están centralizados en `animation.ts`. El resto de archivos (`button.ts`, `badge.ts`, `input.ts`, `layout.ts`, `typography.ts`) los importan internamente — no necesitas combinarlos manualmente en esos casos.

```tsx
// Fade in al cargar
<div className={ANIMATION.fade.inFromBottom}>
  Contenido que aparece desde abajo
</div>

// Hover effects
<div className={ANIMATION.hover.lift}>
  Card que se eleva al hover
</div>

// Transiciones reutilizables
<div className={ANIMATION.transition.default}>transition-all 300ms</div>
<div className={ANIMATION.transition.colors}>transition-colors 300ms</div>
<div className={ANIMATION.transition.fast}>transition-all 150ms</div>

// Scroll reveal (con Intersection Observer)
<div className={`${ANIMATION.scroll.reveal} data-[visible=true]:${ANIMATION.scroll.visible}`}>
  Aparece al hacer scroll
</div>

// Loading states
<div className={ANIMATION.loading.skeleton} />
<div className={ANIMATION.loading.spinner} />
```

## 🎨 Badges y Pills

```tsx
// Badge estándar
<span className={cn(BADGE.base.default, BADGE.size.sm, BADGE.variant.feature)}>
  ✨ Nuevo
</span>

// Categorías con pill
<div className={BADGE.group.horizontal}>
  {categories.map(cat => (
    <span key={cat} className={BADGE.special.pill}>
      {cat}
    </span>
  ))}
</div>

// Chip seleccionable / seleccionado
<span className={BADGE.special.chip}>React</span>
<span className={BADGE.special.chipActive}>TypeScript</span>

// Estado online
<div className="flex items-center gap-2">
  <span className={cn(BADGE.special.dot, BADGE.status.online)} />
  <span>En línea</span>
</div>
```

## 🔧 Composición con CVA (Class Variance Authority)

```tsx
import { cva } from 'class-variance-authority'
import { BUTTON } from '@/styles/tokens'

const buttonVariants = cva('', {
  variants: {
    variant: {
      primary: BUTTON.variant.contained.primary,
      outlined: BUTTON.variant.outlined.primary,
      text: BUTTON.variant.text.primary,
    },
    size: {
      sm: BUTTON.size.sm,
      md: BUTTON.size.md,
      lg: BUTTON.size.lg,
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
})

// Uso
<button className={buttonVariants({ variant: 'primary', size: 'lg' })}>
  Click me
</button>
```

## 🌑 Sombras

Las sombras se importan desde `shadow.ts` y ya están integradas internamente en `layout.ts`. Úsalas directamente si necesitas elevar un elemento puntual:

```tsx
import { SHADOW } from '@/styles/tokens'

<div className={SHADOW.md}>card con sombra media</div>
<div className={SHADOW.lg}>modal o popover</div>
```

Escala disponible: `xs` → `sm` → `md` → `lg` → `xlg` → `x2lg`

## 📱 Responsive Design

Todos los tokens incluyen breakpoints responsive:

- `sm:` — 640px+
- `md:` — 768px+
- `lg:` — 1024px+

Los tamaños de texto, spacing y layouts se ajustan automáticamente.

## 🎯 Tokens Semánticos

Usa los tokens semánticos en lugar de colores genéricos de Tailwind:

```tsx
// ❌ No hagas esto
<p className="text-gray-600">Texto</p>
<div className="shadow-lg">Card</div>
<div className="transition-all duration-300 ease-in-out">...</div>

// ✅ Haz esto
<p className="text-subtle">Texto</p>
<div className={SHADOW.lg}>Card</div>
<div className={ANIMATION.transition.default}>...</div>
```

**Texto:** `text-strong` · `text-subtle` · `text-soft` · `text-disabled` · `text-white`

**Fondos:** `bg-white` · `bg-weak` · `bg-soft` · `bg-subtle` · `bg-surface` · `bg-strong`

**Bordes:** `border-stroke-soft` · `border-stroke-subtle` · `border-stroke-strong`

**Estados:** `bg-information-lighter` · `text-information-dark` · `bg-error-lighter` · `text-success-dark` · etc.

**Sombras:** `SHADOW.xs` · `SHADOW.sm` · `SHADOW.md` · `SHADOW.lg` · `SHADOW.xlg` · `SHADOW.x2lg`

**Transiciones:** `ANIMATION.transition.fast` · `ANIMATION.transition.default` · `ANIMATION.transition.slow` · `ANIMATION.transition.colors`
