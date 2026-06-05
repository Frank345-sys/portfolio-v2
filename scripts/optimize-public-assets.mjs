/**
 * Optimiza activos pesados en `public/` (OG, PNG de proyectos, foto de perfil).
 * Uso: `node scripts/optimize-public-assets.mjs`
 */
import fs from 'node:fs/promises'
import path from 'node:path'

import sharp from 'sharp'

const root = process.cwd()

async function optimizeOg() {
  const abs = path.join(root, 'public', 'og-image.png')
  const before = (await fs.stat(abs)).size
  const buffer = await sharp(abs)
    .resize(1200, 630, { fit: 'cover', position: 'centre' })
    .png({ quality: 82, compressionLevel: 9, effort: 10 })
    .toBuffer()
  if (buffer.length < before) {
    await fs.writeFile(abs, buffer)
  }
  const after = (await fs.stat(abs)).size
  console.log(
    `og-image.png: ${Math.round(before / 1024)} KB → ${Math.round(after / 1024)} KB`
  )
}

async function optimizePng(relPath, { maxWidth } = {}) {
  const abs = path.join(root, 'public', relPath)
  const before = (await fs.stat(abs)).size
  let pipeline = sharp(await fs.readFile(abs))
  if (maxWidth) {
    pipeline = pipeline.resize(maxWidth, null, {
      fit: 'inside',
      withoutEnlargement: true,
    })
  }
  const buffer = await pipeline
    .png({
      quality: 80,
      compressionLevel: 9,
      effort: 10,
      adaptiveFiltering: true,
    })
    .toBuffer()
  if (buffer.length < before) {
    await fs.writeFile(abs, buffer)
  }
  const after = (await fs.stat(abs)).size
  console.log(
    `${relPath}: ${Math.round(before / 1024)} KB → ${Math.round(after / 1024)} KB`
  )
}

async function optimizeJpeg(relPath) {
  const abs = path.join(root, 'public', relPath)
  const before = (await fs.stat(abs)).size
  const buffer = await sharp(await fs.readFile(abs))
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer()
  if (buffer.length < before) {
    await fs.writeFile(abs, buffer)
  }
  const after = (await fs.stat(abs)).size
  console.log(
    `${relPath}: ${Math.round(before / 1024)} KB → ${Math.round(after / 1024)} KB`
  )
}

const projectPngs = [
  { rel: 'images/projects/blife-ecommerce.png', maxWidth: 1600 },
  { rel: 'images/projects/blife-b2b-mayoreo-products.png' },
]

await optimizeOg()
for (const entry of projectPngs) {
  await optimizePng(entry.rel, { maxWidth: entry.maxWidth })
}
await optimizeJpeg('images/profile/frank-gonzalez.jpg')

console.log(
  'PDF: optimizar manualmente si hace falta (p. ej. Acrobat, ilovepdf); sharp no procesa PDF.'
)
