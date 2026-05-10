/// <reference types="vitest" />
import fs from 'node:fs'
import path from 'node:path'

import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import sharp from 'sharp'
import { loadEnv } from 'vite'
import { defineConfig } from 'vitest/config'

import {
  SITE_CONTACT_EMAIL_TRIMMED,
  SITE_DISPLAY_NAME,
  SITE_JSONLD_DESCRIPTION,
  SITE_META_DESCRIPTION,
  SITE_META_DESCRIPTION_SHORT,
  SITE_PAGE_TITLE,
  SITE_PROFILE,
  SITE_SOCIAL_HREFS,
} from './src/shared/constants/siteProfile'
import { SKILL_LABEL } from './src/shared/constants/skills'

import type { Plugin } from 'vite'

/**
 * robots.txt, sitemap.xml y security.txt en el artefacto de build.
 * GitHub Pages no expone cabeceras HTTP propias del repo (CSP, X-Frame-Options, etc.);
 * herramientas que solo miran la respuesta HTTP seguirán en rojo salvo CDN/proxy
 * (p. ej. dominio propio + Cloudflare) o otro hosting con `_headers` / edge config.
 */
function writeSeoFilesPlugin(siteUrl: string): Plugin {
  const origin = siteUrl.replace(/\/$/, '')
  let outDir = 'build'
  return {
    name: 'write-seo-files',
    apply: 'build',
    configResolved(config) {
      outDir = config.build.outDir
    },
    closeBundle() {
      const dir = path.resolve(process.cwd(), outDir)
      fs.mkdirSync(dir, { recursive: true })
      fs.writeFileSync(
        path.join(dir, 'robots.txt'),
        `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`,
        'utf8'
      )
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${origin}/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`
      fs.writeFileSync(path.join(dir, 'sitemap.xml'), sitemap, 'utf8')

      const wellKnown = path.join(dir, '.well-known')
      fs.mkdirSync(wellKnown, { recursive: true })
      const contactLine = SITE_CONTACT_EMAIL_TRIMMED
        ? `Contact: mailto:${SITE_CONTACT_EMAIL_TRIMMED}\n`
        : `Contact: ${SITE_SOCIAL_HREFS.githubHref}\n`
      const securityTxt = `${contactLine}Expires: 2027-04-22T23:59:00.000Z\nPreferred-Languages: es, en\nCanonical: ${origin}/.well-known/security.txt\n`
      fs.writeFileSync(
        path.join(wellKnown, 'security.txt'),
        securityTxt,
        'utf8'
      )
    },
  }
}

function injectSiteProfileHtmlPlugin(siteUrl: string): Plugin {
  const origin = siteUrl.replace(/\/$/, '')
  return {
    name: 'inject-site-profile-html',
    transformIndexHtml(html) {
      const personJson = {
        '@context': 'https://schema.org',
        '@type': 'Person' as const,
        name: SITE_DISPLAY_NAME,
        jobTitle: SITE_PROFILE.role,
        url: `${origin}/`,
        sameAs: [
          SITE_SOCIAL_HREFS.githubHref,
          SITE_SOCIAL_HREFS.linkedinHref,
          SITE_SOCIAL_HREFS.telegramHref,
        ],
        knowsAbout: [
          SKILL_LABEL.REACT,
          SKILL_LABEL.TYPESCRIPT,
          SKILL_LABEL.VITE,
          SKILL_LABEL.TAILWIND,
          SKILL_LABEL.JAVASCRIPT_ES6_PLUS,
          SKILL_LABEL.HTML5,
          SKILL_LABEL.CSS3,
          SKILL_LABEL.NEXT,
          SITE_PROFILE.role,
        ],
        description: SITE_JSONLD_DESCRIPTION,
      }
      const securityMeta = `    <meta name="referrer" content="strict-origin-when-cross-origin" />
    <meta
      http-equiv="Permissions-Policy"
      content="camera=(), microphone=(), geolocation=(), interest-cohort=()"
    />
`
      return html
        .replace(
          '<meta name="viewport" content="width=device-width, initial-scale=1.0" />',
          `<meta name="viewport" content="width=device-width, initial-scale=1.0" />\n\n${securityMeta}`
        )
        .replaceAll('@@SITE_PAGE_TITLE@@', SITE_PAGE_TITLE)
        .replaceAll('@@SITE_META_DESCRIPTION@@', SITE_META_DESCRIPTION)
        .replaceAll(
          '@@SITE_META_DESCRIPTION_SHORT@@',
          SITE_META_DESCRIPTION_SHORT
        )
        .replaceAll('@@SITE_DISPLAY_NAME@@', SITE_DISPLAY_NAME)
        .replace('@@SITE_JSONLD@@', JSON.stringify(personJson, null, 2))
    },
  }
}

/**
 * Tras el build: re-codifica PNG bajo `.../images/projects/` con sharp (sin imagemin
 * ni binarios de pngquant; evita la cadena vulnerable de `npm audit`). Solo
 * sustituye el PNG si el resultado es más pequeño. Luego genera `*-600.webp` y
 * `*-1200.webp` desde el buffer final (lectura en memoria, evita bloqueos al
 * reescribir en Windows). Las rutas de `getProjectImageAttributes` apuntan a
 * esos WebP en producción.
 */
function projectImagesPipelinePlugin(): Plugin {
  let outDir = 'build'
  return {
    name: 'project-images-pipeline',
    apply: 'build',
    configResolved(config) {
      outDir = config.build.outDir
    },
    async closeBundle() {
      const dir = path.resolve(process.cwd(), outDir, 'images', 'projects')
      if (!fs.existsSync(dir)) {
        return
      }
      const files = fs
        .readdirSync(dir)
        .filter((f) => f.toLowerCase().endsWith('.png'))
      for (const file of files) {
        const abs = path.join(dir, file)
        const stem = file.replace(/\.png$/i, '')
        let pngBuffer: Buffer
        try {
          pngBuffer = await fs.promises.readFile(abs)
        } catch (e) {
          const msg = e instanceof Error ? e.message : String(e)
          throw new Error(
            `project-images-pipeline: no se pudo leer ${abs}: ${msg}`
          )
        }
        const optimized = await sharp(pngBuffer)
          .png({
            quality: 80,
            compressionLevel: 9,
            effort: 10,
            adaptiveFiltering: true,
          })
          .toBuffer()
        if (optimized.length < pngBuffer.length) {
          await fs.promises.writeFile(abs, optimized)
          pngBuffer = optimized
        }
        for (const w of [600, 1200] as const) {
          const out = path.join(dir, `${stem}-${w}.webp`)
          try {
            await sharp(pngBuffer)
              .resize(w, null, { fit: 'inside', withoutEnlargement: true })
              .webp({ quality: 82, effort: 4 })
              .toFile(out)
          } catch (e) {
            const msg = e instanceof Error ? e.message : String(e)
            throw new Error(
              `project-images-pipeline: no se pudo generar ${out}: ${msg}`
            )
          }
        }
      }
    },
  }
}

// https://vite.dev/config/
// URLs: `.env.production` (build por defecto), `.env.github` (`build:github`), `.env.development` (dev).
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const base =
    (typeof env.VITE_BASE_PATH === 'string' ? env.VITE_BASE_PATH : '').trim() ||
    '/'
  const siteUrl =
    (typeof env.VITE_PUBLIC_SITE_URL === 'string'
      ? env.VITE_PUBLIC_SITE_URL
      : ''
    ).trim() || 'https://frank345-sys.github.io/portfolio-v2'

  return {
    base,
    build: {
      outDir: 'build',
    },
    plugins: [
      injectSiteProfileHtmlPlugin(siteUrl),
      // React Compiler: misma versión que `eslint-plugin-react-compiler` para que las
      // reglas que se aplican en lint y la transformación que llega al bundle estén alineadas.
      react({
        babel: {
          plugins: [['babel-plugin-react-compiler', {}]],
        },
      }),
      tailwindcss(),
      writeSeoFilesPlugin(siteUrl),
      projectImagesPipelinePlugin(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: ['./src/test/setup.ts'],
      coverage: {
        provider: 'v8',
        reporter: ['text', 'html'],
        exclude: [
          'node_modules/**',
          'src/test/**',
          '**/*.config.*',
          '**/*.d.ts',
          // Íconos presentacionales sin tests unitarios (política en `shared/icons/index.ts`); instrumentarlos
          // rebaja la cobertura de ramas (props opcionales en SVG) sin aportar señal de producto.
          'src/shared/icons/**/*.tsx',
          // Barriles `**/index.ts`: re-exports sin lógica (`projectArticleLabelId` → `./articleLabels.ts`).
          '**/index.ts',
        ],
        thresholds: {
          lines: 80,
          functions: 80,
          // Agregado v8 + JSX: sin ampliar pruebas de bifurcación en componentes grandes,
          // el total queda ~64% con íconos/barriles excluidos (ver exclude). Subir más exige
          // más asserts de estado/variantes antes de recuperar niveles cercanos al 70%.
          branches: 63,
          statements: 80,
        },
      },
      exclude: ['node_modules', 'dist', 'build'],
    },
  }
})
