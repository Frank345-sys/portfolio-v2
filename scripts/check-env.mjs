import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const envExamplePath = path.join(root, '.env.example')
const envPath = path.join(root, '.env')

/**
 * @param {string[]} argv
 * @returns {string}
 */
function resolveMode(argv) {
  const modeEq = argv.find((a) => a.startsWith('--mode='))
  if (modeEq) return modeEq.split('=')[1]?.trim() || 'production'

  const modeIdx = argv.findIndex((a) => a === '--mode')
  if (modeIdx >= 0) {
    const next = argv[modeIdx + 1]
    if (typeof next === 'string' && next.trim()) return next.trim()
  }

  return 'production'
}

/**
 * @param {string} raw
 * @returns {Set<string>}
 */
function parseEnvKeys(raw) {
  const keys = new Set()
  for (const [key] of parseEnvEntries(raw)) keys.add(key)
  return keys
}

/**
 * @param {string} raw
 * @returns {Map<string, string>}
 */
function parseEnvEntries(raw) {
  /** @type {Map<string, string>} */
  const entries = new Map()
  const lines = raw.split(/\r?\n/u)

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue

    const normalized = trimmed.startsWith('export ')
      ? trimmed.slice('export '.length).trim()
      : trimmed
    // Primer `=` separa clave/valor; el resto (p. ej. URLs con `=`) forma parte del valor.
    const equalIndex = normalized.indexOf('=')
    if (equalIndex <= 0) continue

    const key = normalized.slice(0, equalIndex).trim()
    if (!/^[A-Za-z_][A-Za-z0-9_]*$/u.test(key)) continue

    let value = normalized.slice(equalIndex + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    entries.set(key, value)
  }

  return entries
}

/**
 * Orden de carga de Vite (los posteriores sobrescriben a los anteriores).
 *
 * @param {string} mode
 * @returns {string[]}
 */
function envFilesInViteLoadOrder(mode) {
  return [
    envPath,
    path.join(root, '.env.local'),
    path.join(root, `.env.${mode}`),
    path.join(root, `.env.${mode}.local`),
  ].filter((p) => fs.existsSync(p))
}

/**
 * @param {string[]} filesInLoadOrder
 * @returns {Map<string, string>}
 */
function mergeEnvFromFiles(filesInLoadOrder) {
  /** @type {Map<string, string>} */
  const merged = new Map()
  for (const file of filesInLoadOrder) {
    const raw = fs.readFileSync(file, 'utf8')
    for (const [key, value] of parseEnvEntries(raw)) merged.set(key, value)
  }
  return merged
}

function main() {
  const argv = process.argv.slice(2)
  const strictValues =
    argv.includes('--strict') || argv.includes('--strict-values')

  if (!fs.existsSync(envExamplePath)) {
    console.error('Env check: no existe .env.example en la raíz del proyecto.')
    process.exitCode = 1
    return
  }

  const mode = resolveMode(argv)
  const exampleRaw = fs.readFileSync(envExamplePath, 'utf8')
  const required = [...parseEnvKeys(exampleRaw)]
    .filter((k) => k.startsWith('VITE_'))
    .sort()

  const envFilesToCheck = envFilesInViteLoadOrder(mode)

  if (envFilesToCheck.length === 0) {
    console.error(
      `Env check: no se encontró ningún archivo .env.* para el modo "${mode}". ` +
        'Crea .env y/o .env.<modo> copiando .env.example y completando VITE_*.'
    )
    process.exitCode = 1
    return
  }

  const merged = mergeEnvFromFiles(envFilesToCheck)
  const missing = required.filter((k) => !merged.has(k))
  const emptyValues = required.filter((k) => {
    if (!merged.has(k)) return false
    return merged.get(k)?.trim() === ''
  })

  if (missing.length > 0) {
    console.error('Env check: faltan variables VITE_* en .env:')
    for (const key of missing) console.error(` - ${key}`)
    console.error(`\nModo: "${mode}". Archivos considerados (orden Vite):`)
    for (const file of envFilesToCheck)
      console.error(` - ${path.basename(file)}`)
    console.error(
      '\nCopia los valores desde .env.example y vuelve a ejecutar el check.'
    )
    process.exitCode = 1
    return
  }

  if (emptyValues.length > 0) {
    console.warn(
      `Env check: ${emptyValues.length} variable(s) VITE_* con valor vacío tras resolver precedencia:`
    )
    for (const key of emptyValues) console.warn(` - ${key}`)
    console.warn(
      `Modo: "${mode}". Fuentes: ${envFilesToCheck.map((p) => path.basename(p)).join(', ')}.`
    )
    if (strictValues) {
      console.error(
        '\nEnv check: fallo por --strict-values (completa los valores en .env).'
      )
      process.exitCode = 1
      return
    }
  }

  const emptyNote =
    emptyValues.length > 0
      ? `; ${emptyValues.length} con valor vacío (aviso, usa --strict-values para fallar)`
      : ''
  console.log(
    `Env check: OK (modo "${mode}", ${required.length} variable(s) VITE_* requeridas presentes${emptyNote}). ` +
      `Fuentes: ${envFilesToCheck.map((p) => path.basename(p)).join(', ')}.`
  )
}

main()
