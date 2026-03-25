# Sistema de Design Tokens

Tokens de diseño para el portfolio: tipografía, layout, botones, badges, animaciones, inputs, cards y z-index. Los colores semánticos y la escala de sombras `shadow-elevation-*` se definen en `src/index.css` (Tailwind v4 `@theme`); los archivos en esta carpeta exponen clases y composiciones para usar en componentes.

## Estructura

```
src/
  shared/
    constants/
      tokens/
        animation.ts   # Transiciones, hover, fade, scroll, loading, stagger
        badge.ts       # Badges, pills, chips, estado
        button.ts      # Contained / outlined / text + special (CTA, icon, link)
        card.ts        # Superficies de card (surface, interactive, overlay, layout)
        input.ts       # Inputs, labels, helper (default / error / success), grupos
        layout.ts      # Secciones, contenedores, grids, flex, header, footer, divider
        typography.ts  # Títulos, párrafos, labels, links, special
        z.ts           # Z.base | raised | dropdown | drawer | modal | header | toast
        index.ts       # Re-export de todo
```

La **fuente de verdad de colores** está en `src/index.css`: `:root` (primitivos), `@theme` (semánticos light) y `.dark` (override dark mode). No usar tokens base (`--color-gray-*`) en componentes; usar siempre las clases semánticas (`text-text-*`, `bg-bg-*`, `border-stroke-*`).

---

## Instalación / Uso

Importar desde `@/shared/constants/tokens`. Combinar tokens con `cn()` (tailwind-merge + clsx):

```tsx
import { TYPOGRAPHY, LAYOUT, BUTTON, CARD } from '@/shared/constants/tokens'
import { cn } from '@/shared/utils/cn'

export function Hero() {
  return (
    <section className={LAYOUT.section.hero}>
      <div className={cn(LAYOUT.container.narrow, LAYOUT.px)}>
        <h1 className={TYPOGRAPHY.title.hero}>Tu nombre</h1>
        <p className={TYPOGRAPHY.paragraph.lead}>Descripción</p>
        <div className={LAYOUT.flex.rowResponsive}>
          <a href="/cv.pdf" className={BUTTON.special.cta}>
            Descargar CV
          </a>
          <button
            className={cn(BUTTON.variant.outlined.primary, BUTTON.size.lg)}
          >
            Ver más
          </button>
        </div>
      </div>
    </section>
  )
}
```

---

## CARD

Las cards se gestionan exclusivamente en `card.ts`. **No existen tokens de card en `LAYOUT`.**

### Categorías

| Token                | Cuándo usar                                                  |
| -------------------- | ------------------------------------------------------------ |
| `CARD.surface.*`     | Contenedores estáticos: info, stats, grupos, paneles         |
| `CARD.interactive.*` | Solo en `<a>` o `<button>` — tienen `cursor-pointer` y hover |
| `CARD.overlay.*`     | Drawers, tooltips con cuerpo, modales pequeños, sidebars     |
| `CARD.layout.*`      | Partes internas reutilizables: header, title, body, footer   |

### Variantes de superficie (`CARD.surface`)

| Token                   | Fondo    | Padding | Sombra | Uso típico                                          |
| ----------------------- | -------- | ------- | ------ | --------------------------------------------------- |
| `CARD.surface.default`  | bg-white | md      | —      | Contenido principal — padding generoso (p-6 sm:p-8) |
| `CARD.surface.elevated` | bg-white | md      | md     | Paneles flotantes, contenido prioritario            |
| `CARD.surface.compact`  | bg-white | sm      | —      | Listas densas, sidebars, widgets compactos          |
| `CARD.surface.subtle`   | bg-soft  | sm      | —      | Áreas de apoyo, contexto adicional                  |
| `CARD.surface.weak`     | bg-weak  | sm      | xs     | SkillGroup, ValueCard, info estática                |
| `CARD.surface.white`    | bg-white | sm      | xs     | Formularios, listados sobre fondos tenues           |

### Variantes interactivas (`CARD.interactive`)

⚠️ Usar **solo** en `<a>`, `<button>` o `[role="button"]`.

| Token                      | Hover                            | Uso típico                   |
| -------------------------- | -------------------------------- | ---------------------------- |
| `CARD.interactive.default` | `border-subtle` + sombra xs      | Cards navegables, padding md |
| `CARD.interactive.weak`    | `border-information` + `bg-soft` | Selección, skill cards       |
| `CARD.interactive.white`   | `border-subtle` + sombra sm      | Cards de producto, listas    |

### Variantes overlay (`CARD.overlay`)

| Token                | Z-index recomendado | Uso                                    |
| -------------------- | ------------------- | -------------------------------------- |
| `CARD.overlay.panel` | `Z.drawer`          | Drawers, tooltips con cuerpo, sidebars |
| `CARD.overlay.modal` | `Z.modal`           | Modales pequeños, popovers, previews   |

### Estructura interna (`CARD.layout`)

```tsx
<div className={CARD.surface.weak}>
  <div className={CARD.layout.header}>
    <p className={TYPOGRAPHY.title.small}>Título</p>
    <button>Acción</button>
  </div>
  <div className={CARD.layout.body}>...</div>
  <div className={CARD.layout.footer}>...</div>
</div>
```

### Dark mode

Automático. Los tokens semánticos (`bg-bg-*`, `stroke-*`) se reasignan solos con la clase `.dark` en el ancestro.

---

## LAYOUT

### Padding horizontal

Los containers **no incluyen `px` por defecto**. Añadir `LAYOUT.px` con `cn()` cuando el contenedor necesita margen lateral. Usar el mismo valor en todos los containers de una misma sección para mantener la alineación.

```tsx
<div className={cn(LAYOUT.container.full, LAYOUT.px)}>...</div>
```

### Contenedores

| Token                           | Uso                                              |
| ------------------------------- | ------------------------------------------------ |
| `LAYOUT.container.wide`         | Hero, features (max-w-[1400px])                  |
| `LAYOUT.container.full`         | Contenedor principal (max-w-7xl)                 |
| `LAYOUT.container.narrow`       | Timelines, textos largos (max-w-4xl)             |
| `LAYOUT.container.tight`        | Formularios, CTAs aislados (max-w-2xl)           |
| `LAYOUT.container.headerNarrow` | Cabeceras de sección — sin `mx-auto` (max-w-3xl) |
| `LAYOUT.container.reading`      | Artículos, posts (max-w-[65ch])                  |

### Secciones

| Token                    | py            |
| ------------------------ | ------------- |
| `LAYOUT.section.hero`    | py-24 → py-48 |
| `LAYOUT.section.default` | py-20 → py-40 |
| `LAYOUT.section.compact` | py-16 → py-24 |
| `LAYOUT.section.small`   | py-12 → py-20 |
| `LAYOUT.section.footer`  | py-16 → py-24 |

### Spacing

| Token                    | Cuándo usar                                                       |
| ------------------------ | ----------------------------------------------------------------- |
| `LAYOUT.spacing.section` | Separación entre secciones de página. ⚠️ Solo en flujo de columna |
| `LAYOUT.spacing.large`   | Separación entre sub-bloques dentro de una misma sección          |
| `LAYOUT.spacing.default` | Gap estándar entre elementos                                      |
| `LAYOUT.spacing.compact` | Gap compacto entre elementos muy relacionados                     |
| `LAYOUT.spacing.small`   | Gap mínimo — listas, grupos de chips                              |

### Header, Footer, Divider

| Token                       | Uso                                        |
| --------------------------- | ------------------------------------------ |
| `LAYOUT.header.bar`         | Header fixed — usar con `Z.header`         |
| `LAYOUT.header.sticky`      | Header sticky — usar con `Z.header`        |
| `LAYOUT.header.wrapper`     | Wrapper con padding interno                |
| `LAYOUT.header.nav`         | Nav links — solo desktop, oculto en mobile |
| `LAYOUT.footer.wrapper`     | Footer (bg-weak, border-top)               |
| `LAYOUT.footer.grid`        | Grid de columnas (2 → 4 cols)              |
| `LAYOUT.footer.bottom`      | Barra inferior copyright + links           |
| `LAYOUT.divider.horizontal` | Línea horizontal (bg-stroke-soft)          |
| `LAYOUT.divider.vertical`   | Línea vertical                             |
| `LAYOUT.divider.section`    | Divider con margen vertical (my-8 → my-12) |

### Grids

| Token                 | Cuándo usar                                                                   |
| --------------------- | ----------------------------------------------------------------------------- |
| `LAYOUT.grid.cols2`   | Testimonios, pricing                                                          |
| `LAYOUT.grid.cols3`   | Features, cards                                                               |
| `LAYOUT.grid.cols4`   | Logos, iconos                                                                 |
| `LAYOUT.grid.split`   | Hero split / about (2 cols centradas)                                         |
| `LAYOUT.grid.autoFit` | Grid responsive auto-fit                                                      |
| `LAYOUT.grid.masonry` | Columnas altura variable. ⚠️ Orden visual ≠ orden DOM — revisar accesibilidad |

### Flex

| Token                       | Uso                                                     |
| --------------------------- | ------------------------------------------------------- |
| `LAYOUT.flex.between`       | Navbar, headers — extremos opuestos                     |
| `LAYOUT.flex.center`        | Centrar contenido — spinners, estados vacíos            |
| `LAYOUT.flex.row`           | Fila de CTAs o botones con wrap en mobile               |
| `LAYOUT.flex.stack`         | Stack vertical de elementos relacionados                |
| `LAYOUT.flex.start`         | Elementos con ícono a la izquierda                      |
| `LAYOUT.flex.wrap`          | Grupos de chips, tags o badges                          |
| `LAYOUT.flex.inlineToggle`  | ThemeToggle, switches con label — incluye `select-none` |
| `LAYOUT.flex.rowResponsive` | Stack en mobile, fila en desktop                        |

---

## TYPOGRAPHY

Usar siempre tokens de tipografía — incluyen color semántico. No usar clases `text-*` sueltas en cuerpo de texto.

| Categoría | Tokens                                                                                   |
| --------- | ---------------------------------------------------------------------------------------- |
| Títulos   | `title.hero`, `section`, `subsection`, `small`, `xsmall`, `xxsmall`                      |
| Párrafos  | `paragraph.lead`, `large`, `primary`, `secondary`, `muted`, `small`                      |
| Labels    | `label.default`, `large`, `small`, `overline` — ⚠️ para formularios usar `INPUT.label.*` |
| Links     | `link.default`, `plain`, `nav`, `footer`                                                 |
| Special   | `special.stat`, `emphasis`, `caption`, `code`, `quote`                                   |

### TYPOGRAPHY.link vs BUTTON.special.link

| Token                 | Estructura    | Cuándo usar                                     |
| --------------------- | ------------- | ----------------------------------------------- |
| `TYPOGRAPHY.link.*`   | texto inline  | Enlace dentro de párrafos, nav, footer          |
| `BUTTON.special.link` | `inline-flex` | Link autónomo con ícono, fuera de texto corrido |

---

## BUTTON

El base está embebido en cada variante. Combinar **variante + tamaño** con `cn()`.

```tsx
<button className={cn(BUTTON.variant.contained.primary, BUTTON.size.md)}>
  Enviar
</button>
```

- **Contained:** `contained.primary`, `success`, `danger`, `warning`, `dark`
- **Outlined:** `outlined.primary`, `success`, `danger`, `warning`, `neutral`
- **Text:** `text.primary`, `success`, `danger`, `warning`, `neutral`
- **Tamaños:** `size.sm`, `md`, `lg`, `xl`, `responsive`
- **Special:** `special.cta` ⚠️ no combinar con `size.*` — tamaño propio; `special.icon`; `special.link`
- **Grupos:** `group.horizontal`, `vertical`, `attached`

---

## BADGE

### Composición con size

| Token                      | Combina con `BADGE.size.*` |
| -------------------------- | -------------------------- |
| `BADGE.variant.*`          | ✅ Sí                      |
| `BADGE.status.*`           | ✅ Sí                      |
| `BADGE.special.pill`       | ❌ No — tamaño propio      |
| `BADGE.special.chip`       | ❌ No — tamaño propio      |
| `BADGE.special.chipActive` | ❌ No — tamaño propio      |
| `BADGE.special.dot`        | ❌ No — tamaño fijo        |
| `BADGE.special.new`        | ❌ No — posición absoluta  |
| `BADGE.special.counter`    | ❌ No — dimensión mínima   |

```tsx
// ✅ Correcto
<span className={cn(BADGE.variant.primary, BADGE.size.sm)}>Nuevo</span>
<button className={BADGE.special.chip}>React</button>

// ❌ Incorrecto — conflicto de padding
<span className={cn(BADGE.special.pill, BADGE.size.lg)}>Tag</span>
```

- **Variantes:** `primary`, `success`, `error`, `warning`, `feature`, `neutral`, `dark`, `outline`
- **Status:** `status.online`, `offline`, `busy`, `away`
- **Special:** `special.pill`, `chip`, `chipActive`, `dot`, `new`, `counter`
- **Grupos:** `group.horizontal`, `vertical`

⚠️ `BADGE.status.online` usar solo sobre `bg-bg-white`.

---

## ANIMATION

- **Transiciones:** `transition.default`, `fast`, `slow`, `colors`, `opacity`, `transform`, `shadow`
- **Hover:** `hover.lift`, `scale`, `glow`, `underline`
- **Fade:** `fade.in`, `inFromTop`, `inFromBottom`, `inFromLeft`, `inFromRight`, `out`
- **Slide:** `slide.fromTop`, `fromBottom`, `fromLeft`, `fromRight`
- **Stagger:** `stagger.child1`…`child5` — requiere clase `group` en el padre. Escala lineal de 75ms: `0 / 75 / 150 / 225 / 300ms`.
- **Scroll:** `scroll.reveal` + `scroll.visible` — requieren Intersection Observer
- **Loading:** `loading.skeleton` (combinar con dimensiones explícitas), `loading.spinner`

```tsx
// Stagger — clase `group` obligatoria en el padre
<ul className="group">
  <li className={ANIMATION.stagger.child1}>Item 1</li>
  <li className={ANIMATION.stagger.child2}>Item 2</li>
</ul>

// Scroll reveal — requiere Intersection Observer
<div ref={ref} className={ANIMATION.scroll.reveal}>...</div>
// En el observer: entry.target.classList.add(...ANIMATION.scroll.visible.split(' '))

// Skeleton con dimensiones
<div className={cn(ANIMATION.loading.skeleton, 'h-4 w-32')} />
```

---

## INPUT

```tsx
<div className={INPUT.group.vertical}>
  <label className={INPUT.label.required}>Email</label>
  <input className={INPUT.base.default} aria-invalid={hasError} />
  {hasError ? (
    <span className={INPUT.helper.error}>El email no es válido.</span>
  ) : (
    <span className={INPUT.helper.default}>
      Te notificaremos solo cuando sea necesario.
    </span>
  )}
</div>
```

| Token                  | Uso                                               |
| ---------------------- | ------------------------------------------------- |
| `INPUT.base.default`   | Input estándar de una línea                       |
| `INPUT.base.textarea`  | Textarea (min-h-[120px])                          |
| `INPUT.label.default`  | Label sin requerido                               |
| `INPUT.label.required` | Label con asterisco automático via CSS            |
| `INPUT.helper.default` | Texto de ayuda neutro                             |
| `INPUT.helper.error`   | Mensaje de error — usar con `aria-invalid="true"` |
| `INPUT.helper.success` | Confirmación de campo válido                      |
| `INPUT.group.vertical` | Stack label + input + helper                      |

⚠️ `helper.error` y `helper.success` son mutuamente excluyentes — no mostrar ambos a la vez.

---

## SHADOW ELEVATION

Usar siempre clases semánticas `shadow-elevation-*`. No inventar sombras con `shadow-[...]`.

| Clase                  | Uso                                 |
| ---------------------- | ----------------------------------- |
| `shadow-elevation-xs`  | Inputs en focus, cards compactas    |
| `shadow-elevation-sm`  | Headers, barras de navegación       |
| `shadow-elevation-md`  | Cards elevated, dropdowns           |
| `shadow-elevation-lg`  | Modales pequeños, paneles flotantes |
| `shadow-elevation-xl`  | Popovers, drawers, overlays         |
| `shadow-elevation-2xl` | Dialogs, modales grandes            |

⚠️ Reservar `shadow-elevation-2xl` para el nivel más alto de la jerarquía visual — dos elementos con `2xl` en la misma pantalla eliminan la noción de profundidad.

---

## Z

Usar siempre `Z.*`. No usar clases `z-*` sueltas en componentes.

| Token        | z-index | Uso                                                               |
| ------------ | ------- | ----------------------------------------------------------------- |
| `Z.base`     | 0       | Elementos sin apilamiento especial                                |
| `Z.raised`   | 10      | Cards en hover, elementos que se elevan al interactuar            |
| `Z.dropdown` | 20      | Dropdowns, tooltips, menús contextuales                           |
| `Z.drawer`   | 30      | Drawers, sidebars deslizables — combinar con `CARD.overlay.panel` |
| `Z.modal`    | 40      | Modales, diálogos — combinar con `CARD.overlay.modal`             |
| `Z.header`   | 50      | Navbar fija — combinar con `LAYOUT.header.bar`                    |
| `Z.toast`    | 60      | Notificaciones toast — nivel máximo, siempre visible              |

```tsx
// Modal con backdrop
<div className={cn(CARD.overlay.modal, Z.modal)}>...</div>
<div className="fixed inset-0 bg-black/40 z-[39]" /> {/* backdrop justo debajo */}

// Drawer
<aside className={cn(CARD.overlay.panel, Z.drawer)}>...</aside>

// Toast
<div className={cn('fixed bottom-4 right-4', Z.toast)}>...</div>
```

⚠️ `Z.toast` es el nivel máximo del sistema — no añadir elementos por encima. El backdrop de un modal siempre va en `z-[39]` (un nivel por debajo de `Z.modal`).

---

## Tokens semánticos de color

En componentes usar **siempre** las clases semánticas. Nunca los primitivos (`gray-*`, `blue-*`, etc.).

```tsx
// ❌ Evitar
<p className="text-gray-600">Texto</p>

// ✅ Correcto
<p className="text-text-subtle">Texto</p>
<div className="bg-bg-white shadow-elevation-lg">Card</div>
```

**Texto:** `text-text-strong` · `text-text-subtle` · `text-text-soft` · `text-text-disabled` · `text-text-white`

**Fondos:** `bg-bg-white` · `bg-bg-weak` · `bg-bg-soft` · `bg-bg-subtle` · `bg-bg-medium` · `bg-bg-surface` · `bg-bg-strong`

**Bordes:** `border-stroke-soft` · `border-stroke-subtle` · `border-stroke-medium` · `border-stroke-strong`

**Estados:** `bg-information-light`, `text-information-dark`, `bg-success-light`, `text-feature-dark`, etc. En dark mode los tokens `*-light` resuelven a capas semi-transparentes (`*-alpha-24`).

---

## Dark mode

Los colores semánticos se redefinen en `.dark` en `src/index.css`. Al usar solo clases semánticas la interfaz se adapta sin lógica extra en los componentes.

---

## Composición con `cn()`

```tsx
// Combinación simple
<button className={cn(BUTTON.variant.contained.primary, BUTTON.size.md)} />

// Condicional
<div className={cn(CARD.surface.weak, isActive && 'ring-2 ring-information-base')} />

// Variantes en componentes
function Card({ interactive = false }) {
  return (
    <div className={interactive ? CARD.interactive.weak : CARD.surface.weak}>
      ...
    </div>
  )
}
```
