# Sistema de Design Tokens

Sistema completo de tokens de diseño basado para landing pages.

## 📦 Instalación

```bash
# Coloca estos archivos en tu proyecto
src/
  styles/
    tokens/
      typography.ts
      layout.ts
      button.ts
      badge.ts
      input.ts
      animation.ts
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
            <button
              className={`${BUTTON.base.default} ${BUTTON.variant.primary} ${BUTTON.size.lg}`}
            >
              Comenzar gratis
            </button>
            <button
              className={`${BUTTON.base.default} ${BUTTON.variant.secondary} ${BUTTON.size.lg}`}
            >
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
          <button
            className={`${BUTTON.base.default} ${BUTTON.variant.tertiary} ${BUTTON.size.lg}`}
          >
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
            className={`${LAYOUT.card.interactive} ${ANIMATION.hover.lift}`}
          >
            <div className={LAYOUT.flex.stackCompact}>
              <div className={`${BADGE.special.pill} ${BADGE.variant.primary}`}>
                {feature.icon}
              </div>
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
            className={`${LAYOUT.card.elevated} ${LAYOUT.flex.stack}`}
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
              className={`${BUTTON.base.default} ${BUTTON.variant.primary} ${BUTTON.size.md} w-full`}
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
          className={`${BUTTON.base.default} ${BUTTON.variant.primary} ${BUTTON.size.lg} w-full`}
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

```tsx
// Fade in al cargar
<div className={ANIMATION.fade.inFromBottom}>
  Contenido que aparece desde abajo
</div>

// Hover effects
<div className={ANIMATION.hover.lift}>
  Card que se eleva al hover
</div>

// Scroll reveal (con Intersection Observer)
<div className={`${ANIMATION.scroll.reveal} data-[visible=true]:${ANIMATION.scroll.visible}`}>
  Aparece al hacer scroll
</div>
```

## 🎨 Badges y Pills

```tsx
// Nuevo feature
<span className={`${BADGE.base.default} ${BADGE.size.sm} ${BADGE.variant.feature}`}>
  ✨ Nuevo
</span>

// Categorías
<div className={BADGE.group.horizontal}>
  {categories.map(cat => (
    <span key={cat} className={BADGE.special.pill}>
      {cat}
    </span>
  ))}
</div>

// Estado online
<div className="flex items-center gap-2">
  <span className={`${BADGE.special.dot} ${BADGE.status.online}`} />
  <span>En línea</span>
</div>
```

## 🔧 Composición con CVA (Class Variance Authority)

```tsx
import { cva } from 'class-variance-authority'
import { BUTTON } from '@/styles/tokens'

const buttonVariants = cva(BUTTON.base.default, {
  variants: {
    variant: {
      primary: BUTTON.variant.primary,
      secondary: BUTTON.variant.secondary,
    },
    size: {
      sm: BUTTON.size.sm,
      lg: BUTTON.size.lg,
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'lg',
  },
})

// Uso
;<button className={buttonVariants({ variant: 'primary', size: 'lg' })}>
  Click me
</button>
```

## 📱 Responsive Design

Todos los tokens incluyen breakpoints responsive:

- `sm:` - 640px+
- `md:` - 768px+
- `lg:` - 1024px+

Los tamaños de texto, spacing, y layouts se ajustan automáticamente.

## 🎯 Tokens Semánticos

Usa los tokens semánticos de Blife en lugar de colores genéricos:

```tsx
// ❌ No hagas esto
<p className="text-gray-600">Texto</p>

// ✅ Haz esto
<p className="text-subtle">Texto</p>
```

Tokens disponibles:

- **Texto**: `text-strong`, `text-subtle`, `text-soft`, `text-disabled`
- **Fondos**: `bg-weak`, `bg-soft`, `bg-subtle`, `bg-surface`, `bg-strong`
- **Bordes**: `border-stroke-soft`, `border-stroke-subtle`, `border-stroke-strong`
- **Estados**: `bg-error-lighter`, `text-success-dark`, etc.
