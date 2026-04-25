# Sistema de design tokens

Tokens de diseño del portfolio: tipografía, layout, botones, badges, animaciones, cards, marca y z-index. Los **colores semánticos** y la escala **`shadow-elevation-*`** se definen en `src/index.css` (Tailwind v4: `@import 'tailwindcss'`, `@theme`, bloque **`.dark`**). Esta carpeta exporta **strings de clases** para componer en componentes.

**Re-export:** solo desde `@/shared/constants/tokens` (vía `index.ts`), no importar archivos sueltos salvo mantenimiento.

---

## Estructura de archivos

```
tokens/
  animation.ts    # Transiciones, hover, fade, scroll, loading, stagger
  badge.ts        # Badges, pills, chips, estado, dots
  brand.ts        # BRAND.logoIcon (cabecera / pie)
  button.ts       # Contained / outlined / text + special (CTA, icon, link)
  card.ts         # Superficies (surface, interactive, overlay, layout)
  layout.ts       # Container, section, spacing, grid, prose, divider
  typography.ts   # TYPOGRAPHY + PRIMARY_NAV_LINK (nav principal)
  z.ts            # Z.base … Z.toast (capas del UI)
  index.ts        # export * de los anteriores (no hay módulo INPUT)
```

No existe `input.ts`: el portfolio no usa formularios con tokens de campo; para etiquetas de UI genéricas usar **`TYPOGRAPHY.label.*`**.

La **fuente de verdad de color** sigue siendo **`src/index.css`**: primitivos en `:root`, semánticos en `@theme`, overrides en el bloque **`.dark`**. **En componentes** no usar primitivos (`gray-*`, `blue-*` sueltos); usar clases semánticas (`text-text-*`, `bg-bg-*`, …).

---

## Uso con `cn()`

```tsx
import { TYPOGRAPHY, LAYOUT, BUTTON } from '@/shared/constants/tokens'
import { cn } from '@/shared/utils/cn'

export function Bloque() {
  return (
    <section className={LAYOUT.section.default}>
      <div className={cn(LAYOUT.container.full, LAYOUT.px)}>
        <h2 className={TYPOGRAPHY.title.section}>Título</h2>
        <p className={cn(TYPOGRAPHY.paragraph.secondary, 'text-text-strong')}>
          Cuerpo con contraste reforzado (p. ej. auditoría a11y / fondos bajos).
        </p>
        <a href="#contacto" className={BUTTON.special.cta}>
          Contacto
        </a>
      </div>
    </section>
  )
}
```

## Los tokens de **párrafo** (`paragraph.secondary`, `paragraph.small`, …) aportan tamaño y `leading-relaxed`; el color del texto a menudo **se hereda** del contexto. Si el contraste no alcanza WCAG (p. ej. texto secundario sobre `bg-bg-weak`), añade **`text-text-strong`** o **`text-text-subtle`** con `cn()` según el diseño, o variantes

## BRAND

| Token            | Uso                                                                   |
| ---------------- | --------------------------------------------------------------------- |
| `BRAND.logoIcon` | Tamaño del icono junto al nombre (header y enlace de marca en footer) |

---

## CARD

Gestionado en `card.ts` únicamente. **No** hay tokens de card dentro de `LAYOUT`.

### Categorías

| Token                | Uso                                                       |
| -------------------- | --------------------------------------------------------- |
| `CARD.surface.*`     | Contenedores estáticos                                    |
| `CARD.interactive.*` | Solo en `<a>`, `<button>` o con rol botón (hover, cursor) |
| `CARD.overlay.*`     | Drawers, modales, paneles flotantes                       |
| `CARD.layout.*`      | header / body / footer internos                           |

### `CARD.surface` (resumen)

Regla: **padding amplio** (`p-6 sm:p-8`) en `default` y `elevated`; **padding pequeño** en `compact`, `subtle`, `weak`, `white`. **Sombra:** `elevated` (md), `weak` y `white` (xs); `compact` y `subtle` sin sombra de elevación.

| Token                  | Notas                                    |
| ---------------------- | ---------------------------------------- |
| `default` / `elevated` | Contenido principal / paneles con sombra |
| `compact` / `subtle`   | Densos / apoyo                           |
| `weak` / `white`       | P. ej. skills, valores, formularios      |

### `CARD.interactive`

Solo en elementos interactivos. Variantes: `default`, `weak`, `white` (ver `card.ts` para hovers).

### `CARD.overlay` + **Z**

Combinar con **`Z.drawer`**, **`Z.modal`**, etc. (ver sección Z). El backdrop de modal usa **`Z.backdrop`**.

### Dark mode

Automático vía clases semánticas y `.dark` en ancestros; no hace falta lógica por componente.

---

## LAYOUT

- **Containers:** `LAYOUT.px` se combina con `cn()`; los `container.*` no incluyen `px` por defecto.
- **Contenedores:** `container.wide` | `full` | `narrow` | `tight`.
- **Prose:** `prose.sm` … `prose.xl` — ancho de lectura.
- **Secciones:** `section.hero`, `section.default`, …
- **Spacing:** `spacing.large`, `default`, `compact`, `small` — eje vertical en columnas.
- **Divider:** `divider.horizontal` / `vertical`.
- **Grid:** `grid.cols2` | `cols3` | `cols4`.

Header, footer y filas responsive se componen en el componente; el **z-index** del header usa **`Z.header`**.

---

## TYPOGRAPHY

Preferir **siempre** tokens de tipografía en lugar de clases de tamaño sueltas. Los **títulos** incorporan `text-text-strong` vía el `BASE` interno; los **párrafos** base no fijan color: componer con tokens de texto del tema si hace falta.

| Categoría | Tokens                                                              |
| --------- | ------------------------------------------------------------------- |
| Títulos   | `title.hero` … `xxsmall`                                            |
| Párrafos  | `paragraph.lead`, `large`, `primary`, `secondary`, `muted`, `small` |
| Labels    | `label.default`, `large`, `small`, `overline`                       |
| Links     | `link.default`, `plain`, `nav`, `footer`                            |
| Special   | `special.stat`, `emphasis`, `caption`, `code`, `quote`              |

**`PRIMARY_NAV_LINK`:** encadena `link.nav` + `paragraph.small` — misma base para enlaces de navegación en **desktop**, **drawer móvil** y pie (más utilidades de foco en el componente).

### Links: `TYPOGRAPHY.link` vs `BUTTON.special.link`

| Token                 | Estructura          | Uso                                   |
| --------------------- | ------------------- | ------------------------------------- |
| `link.*`              | texto inline        | Párrafos, pie, `PRIMARY_NAV_LINK`     |
| `BUTTON.special.link` | `inline-flex` + gap | CTA con ícono, fuera de texto corrido |

---

## BUTTON

Variantes `contained` / `outlined` / `text`, tamaños `sm`…`xl` / `responsive`, especiales `cta` (no mezclar con `size`), `icon`, `link`, y grupos `group.horizontal` / `vertical` / `attached`. Ver `button.ts` para el mapa completo.

---

## BADGE

`variant` y `status` combinan con `BADGE.size.*`; `special.pill`, `chip`, `dot`, etc. tienen reglas propias (no mezclar con tamaño salvo `variant`/`status`). `BADGE.status.online` sobre `bg-bg-white`. Ver comentarios en `badge.ts`.

---

## ANIMATION

Transiciones, hover, fade, slide, **stagger** (`child1`…`child5` — máximo cinco en serie; en listas largas, retraso por índice en JS), scroll reveal, loading/skeleton. Clase global de skeleton: `.u-skeleton-shimmer`.

---

## Sombreado (`shadow-elevation-*`)

Definido en `index.css` bajo `@theme`. Usar solo clases semánticas `shadow-elevation-xs` … `2xl`; no `shadow-[arbitrary]`.

| Clase      | Uso típico                                                        |
| ---------- | ----------------------------------------------------------------- |
| `xs`       | Inputs en foco, cards compactas                                   |
| `sm`       | Cabeceras, barras                                                 |
| `md`       | Cards elevadas                                                    |
| `lg`–`2xl` | De modales a overlays — `2xl` solo para el nivel más alto visible |

---

## Z

Usar **`Z.*`** vía `z.ts` (mapea a clases en `@theme`); evitar `z-30` sueltos en componentes. Orden lógico: `base` → `raised` → `dropdown` → `drawer` → `backdrop` → `modal` → `header` → `drawerElevated` → `toast`. El **drawer móvil** y su overlay usan **`Z.drawerElevated`**. Detalle en comentarios de `z.ts` y usos reales en `Header` / `MobileDrawer`.

---

## Colores semánticos (resumen)

```tsx
// Evitar
<p className="text-gray-600">Texto</p>

// Preferir
<p className="text-text-subtle">Texto secundario</p>
<p className="text-text-strong">Máxima jerarquía de texto</p>
<div className="bg-bg-weak border border-stroke-soft">Contenedor</div>
```

**Texto:** `text-text-strong` · `text-text-subtle` · `text-text-soft` · `text-text-disabled` · `text-text-white`

**Fondos:** `bg-bg-white` · `bg-bg-weak` · `bg-bg-soft` · … (ver `index.css`).

**Bordes:** `border-stroke-soft` · `subtle` · `medium` · `strong`

**Estado / marca:** `information`, `success`, `warning`, `error`, `feature` — variantes `*-base`, `*-dark`, `*-light`, `*-lighter` según el token. En **`.dark`**, muchos `*-light` se expresan como mezclas alfa;

---

## Composición con `cn()`

```tsx
<button
  className={cn(
    BUTTON.variant.contained.primary,
    BUTTON.size.md,
    isDisabled && 'pointer-events-none opacity-50'
  )}
/>

<div
  className={cn(
    CARD.surface.weak,
    highlight && 'ring-2 ring-information-base'
  )}
/>
```

---

## Dark mode

Redefinición en `src/index.css` bajo el selector **`.dark`**. Con solo utilidades semánticas, la UI responde sin `if` de tema en cada componente (el `ThemeToggle` aplica la clase al `document`).
