/// <reference types="vitest" />
import fs from 'node:fs'
import path from 'node:path'
import { loadEnv } from 'vite'
import type { Plugin } from 'vite'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { CONTACT_PROFILE } from './src/components/ContactSection/constants'
import {
  SITE_DISPLAY_NAME,
  SITE_JSONLD_DESCRIPTION,
  SITE_META_DESCRIPTION,
  SITE_META_DESCRIPTION_SHORT,
  SITE_PAGE_TITLE,
  SITE_PROFILE,
} from './src/shared/constants/siteProfile'

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
        sameAs: [CONTACT_PROFILE.githubHref, CONTACT_PROFILE.linkedinHref],
        knowsAbout: [
          'React',
          'TypeScript',
          'Vite',
          'Tailwind CSS',
          'JavaScript',
          'HTML5',
          'CSS3',
          'Next.js',
          'Frontend Development',
        ],
        description: SITE_JSONLD_DESCRIPTION,
      }
      return html
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

// https://vite.dev/config/
// URLs: `.env.production` (build por defecto), `.env.github` (`build:github`), `.env.development` (dev).
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const base = env.VITE_BASE_PATH?.trim() || '/'
  const siteUrl =
    env.VITE_PUBLIC_SITE_URL?.trim() ||
    'https://frank345-sys.github.io/portfolio-v2'

  return {
    base,
    build: {
      outDir: 'build',
    },
    plugins: [
      injectSiteProfileHtmlPlugin(siteUrl),
      react(),
      tailwindcss(),
      writeSeoFilesPlugin(siteUrl),
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
          '**/index.ts',
        ],
        thresholds: {
          lines: 80,
          functions: 80,
          branches: 70,
          statements: 80,
        },
      },
      exclude: ['node_modules', 'dist', 'build'],
    },
  }
})
