# Sistema de Design Tokens

Tokens de diseño para el portfolio: tipografía, layout, botones, badges, animaciones, cards y z-index. Los colores semánticos y la escala de sombras `shadow-elevation-*` se definen en `src/index.css` (Tailwind v4 `@theme`); los archivos en esta carpeta exponen clases y composiciones para usar en componentes.

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
        layout.ts      # px, container, section, spacing, grid, prose, divider
        typography.ts  # Títulos, párrafos, labels, links, special
        z.ts           # Z.base … toast (backdrop, modal, header, drawerElevated, etc.)
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
        <div className={BUTTON.group.horizontal}>
          <a
            href="/Francisco_Gonzalez_Frontend_Developer_2026.pdf"
            className={BUTTON.special.cta}
          >
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
| `CARD.layout.*`      | Partes internas reutilizables: header, body, footer          |

### Variantes de superficie (`CARD.surface`)

Regla en código (`card.ts`): **PAD.md** (`p-6 sm:p-8`) en `default` y `elevated`; **PAD.sm** (`p-4`) en `compact`, `subtle`, `weak`, `white`. **Sombra:** solo `elevated` (`shadow-elevation-md`), `weak` y `white` (`shadow-elevation-xs`). `compact` y `subtle` no llevan sombra (superficies de apoyo, no de elevación).

| Token                   | Fondo    | Padding | Sombra | Uso típico                                          |
| ----------------------- | -------- | ------- | ------ | --------------------------------------------------- |
| `CARD.surface.default`  | bg-white | md      | —      | Contenido principal — padding generoso (p-6 sm:p-8) |
| `CARD.surface.elevated` | bg-white | md      | md     | Paneles flotantes, contenido prioritario            |
| `CARD.surface.compact`  | bg-white | sm      | —      | Listas densas, sidebars, widgets compactos          |
| `CARD.surface.subtle`   | bg-soft  | sm      | —      | Áreas de apoyo, contexto adicional                  |
| `CARD.surface.weak`     | bg-weak  | sm      | xs     | SkillGroup, ValueCard, info estática                |
| `CARD.surface.white`    | bg-white | sm      | xs     | Formularios, listados sobre fondos tenues           |

### Variantes interactivas (`CARD.interactive`)

⚠️ Usar **solo** en `<a>`, `<button>` o `[role="button"]`. Los `hover:shadow-*` van literales en el string del token (sin componer con otro token de sombra) para variantes de hover explícitas.

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

El backdrop semitransparente bajo un modal usa **`Z.backdrop`** (`z-40`), no una clase suelta. Ver sección **Z**.

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

| Token                     | Uso                                    |
| ------------------------- | -------------------------------------- |
| `LAYOUT.container.wide`   | Hero, features (max-w-[1400px])        |
| `LAYOUT.container.full`   | Contenedor principal (max-w-7xl)       |
| `LAYOUT.container.narrow` | Timelines, textos largos (max-w-5xl)   |
| `LAYOUT.container.tight`  | Formularios, CTAs aislados (max-w-2xl) |

### Prose (ancho máximo de texto inline, sin `mx-auto`)

| Token             | Uso                                        |
| ----------------- | ------------------------------------------ |
| `LAYOUT.prose.sm` | Párrafos cortos, subtítulos (max-w-xl)     |
| `LAYOUT.prose.md` | Bios, descripciones (max-w-2xl)            |
| `LAYOUT.prose.lg` | Taglines, cabeceras de sección (max-w-3xl) |
| `LAYOUT.prose.xl` | Bloques anchos (max-w-4xl)                 |

### Secciones

| Token                    | Uso (resumen)                                  |
| ------------------------ | ---------------------------------------------- |
| `LAYOUT.section.hero`    | Respiro vertical amplio — `py-24` → `lg:py-48` |
| `LAYOUT.section.default` | Sección estándar — `py-20 md:py-22 lg:py-24`   |

### Spacing

Tokens de **separación vertical** (`space-y-*`) en flujo de columna (`flex-col` o bloque).

| Token                    | Cuándo usar                               |
| ------------------------ | ----------------------------------------- |
| `LAYOUT.spacing.large`   | Entre sub-bloques de una misma sección    |
| `LAYOUT.spacing.default` | Entre elementos relacionados              |
| `LAYOUT.spacing.compact` | Entre elementos muy relacionados          |
| `LAYOUT.spacing.small`   | Listas densas, chips, items de formulario |

### Divider

| Token                       | Uso                                 |
| --------------------------- | ----------------------------------- |
| `LAYOUT.divider.horizontal` | Línea horizontal (`bg-stroke-soft`) |
| `LAYOUT.divider.vertical`   | Línea vertical                      |

> No hay tokens `LAYOUT.header.*`, `LAYOUT.footer.*` ni `LAYOUT.flex.*` en esta carpeta: header/footer y filas responsive se componen en el componente con utilidades semánticas y, para el z-index del header, **`Z.header`** vía `cn()`.

### Grids

| Token               | Cuándo usar          |
| ------------------- | -------------------- |
| `LAYOUT.grid.cols2` | Testimonios, pricing |
| `LAYOUT.grid.cols3` | Features, cards      |
| `LAYOUT.grid.cols4` | Logos, iconos        |

---

## TYPOGRAPHY

Usar siempre tokens de tipografía — incluyen color semántico. No usar clases `text-*` sueltas en cuerpo de texto.

`paragraph.lead` usa la escala interna `SIZE['lg+']` (`text-lg sm:text-xl md:text-2xl`) más color y `leading-relaxed`, alineado con el resto de párrafos basados en `SIZE.*`.

| Categoría | Tokens                                                                                                                         |
| --------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Títulos   | `title.hero`, `section`, `subsection`, `small`, `xsmall`, `xxsmall`                                                            |
| Párrafos  | `paragraph.lead`, `large`, `primary`, `secondary`, `muted`, `small`                                                            |
| Labels    | `label.default`, `large`, `small`, `overline` — en formularios reales, añadir `htmlFor`/`id` y estados de error acordes a WCAG |
| Links     | `link.default`, `plain`, `nav`, `footer`                                                                                       |
| Special   | `special.stat`, `emphasis`, `caption`, `code`, `quote`                                                                         |

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
- **Stagger:** `stagger.child1`…`child5` — aplicar a hijos consecutivos en orden DOM. Escala lineal: `0 / 75 / 150 / 225 / 300ms`. ⚠️ **Máximo 5 hijos**; en listas más largas aplicar retraso por índice en JS (p. ej. `transitionDelay` en ms = índice × 75). El `delay-*` solo tiene efecto si el elemento tiene transición o animación activa.
- **Scroll:** `scroll.reveal` + `scroll.visible` — requieren Intersection Observer
- **Loading:** `loading.skeleton` (clase global `.u-skeleton-shimmer` + `rounded`; combinar con dimensiones explícitas), `loading.spinner`

```tsx
// Stagger — delays escalonados en hijos (cada uno ya incluye transition-all)
<ul>
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

En esta versión del repo **no** hay módulo `input.ts` ni export `INPUT` en `index.ts` (el portfolio actual no incluye formularios con ese sistema). Para etiquetas de UI que no son campos de formulario, usar **`TYPOGRAPHY.label.*`**. Si más adelante se añade un módulo de formularios, conviene recrear tokens tipo `INPUT.base.*`, `INPUT.label.*`, `INPUT.helper.*` y `INPUT.group.*` siguiendo el mismo patrón que `BUTTON`/`CARD`, y documentarlos aquí.

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

Usar siempre `Z.*`. No usar clases `z-*` sueltas en componentes. Los valores `z-40` … `z-80` de la escala semántica están declarados en `@theme` en `index.css` y se referencian solo vía `z.ts`.

Orden de la escala: **base → raised → dropdown → drawer → backdrop → modal → header → drawerElevated → toast**.

| Token              | Valor (Tailwind) | Uso                                                                                             |
| ------------------ | ---------------- | ----------------------------------------------------------------------------------------------- |
| `Z.base`           | `z-0`            | Sin apilamiento especial                                                                        |
| `Z.raised`         | `z-10`           | Cards en hover                                                                                  |
| `Z.dropdown`       | `z-20`           | Dropdowns, tooltips, menús contextuales                                                         |
| `Z.drawer`         | `z-30`           | Drawers genéricos, sidebars — con `CARD.overlay.panel`                                          |
| `Z.backdrop`       | `z-40`           | Backdrop de modales — justo debajo de `Z.modal`                                                 |
| `Z.modal`          | `z-50`           | Modales, diálogos — con `CARD.overlay.modal`                                                    |
| `Z.header`         | `z-60`           | Navbar/header fijo — combinar con las clases de posicionamiento del `<header>` en el componente |
| `Z.drawerElevated` | `z-70`           | Drawer de navegación mobile (`MobileDrawer`) — cubre el header                                  |
| `Z.toast`          | `z-80`           | Toasts y snackbars — nivel máximo del sistema                                                   |

```tsx
// Header fijo — `Z.header` suele ir con clases propias del componente (p. ej. fixed + fondo)
<header className={cn('fixed top-0 w-full bg-bg-white', Z.header)}>...</header>

// Modal + backdrop
<div className={cn(CARD.overlay.modal, Z.modal)}>...</div>
<div className={cn('fixed inset-0 bg-black/40', Z.backdrop)} aria-hidden />

// Drawer genérico
<aside className={cn(CARD.overlay.panel, Z.drawer)}>...</aside>

// Menú mobile (overlay y panel): ambos con Z.drawerElevated
<div className={cn('fixed inset-0 …', Z.drawerElevated)} />

// Toast
<div className={cn('fixed bottom-4 right-4', Z.toast)}>...</div>
```

⚠️ `Z.toast` es el nivel máximo del sistema. Por debajo del header, el menú mobile usa exclusivamente `Z.drawerElevated` (no reutilizar `Z.header` en ese overlay). El backdrop de modal usa siempre `Z.backdrop`, no un `z-40` suelto en el componente.

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
