import { existsSync, mkdirSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { spawnSync } from 'node:child_process'
import process from 'node:process'

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
/** Evita EPERM al limpiar bajo %TEMP% en Windows (bloqueo de Edge/antivirus). */
const lighthouseTmp = join(projectRoot, '.lighthouse-tmp')
const userDataDir = join(lighthouseTmp, 'chromium-profile')
mkdirSync(userDataDir, { recursive: true })

const LIGHTHOUSE = 'lighthouse@12.8.2'
const URL = 'https://frank345-sys.github.io/portfolio-v2/'

/**
 * Ruta a Chrome/Edge u otro Chromium para Lighthouse. chrome-launcher no siempre
 * detecta Edge en Windows; CHROME_PATH lo fuerza.
 */
function resolveChromiumPath() {
  const fromEnv = [
    process.env.CHROME_PATH,
    process.env.LIGHTHOUSE_CHROMIUM_PATH,
  ]
    .map((p) => (p ?? '').trim())
    .find((p) => p && existsSync(p))
  if (fromEnv) return fromEnv

  const { platform } = process

  if (platform === 'win32') {
    const roots = [
      process.env.LOCALAPPDATA,
      process.env.ProgramW6432,
      process.env.ProgramFiles,
      process.env['ProgramFiles(x86)'],
    ]
      .filter(Boolean)
      .map((p) => p.replace(/\\$/u, ''))

    const subpaths = [
      'Microsoft/Edge/Application/msedge.exe',
      'Google/Chrome/Application/chrome.exe',
    ]

    for (const root of roots) {
      for (const s of subpaths) {
        const full = join(root, s)
        if (existsSync(full)) return full
      }
    }
    return null
  }

  if (platform === 'darwin') {
    const candidates = [
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
    ]
    return candidates.find((p) => existsSync(p)) ?? null
  }

  const linux = [
    '/usr/bin/google-chrome-stable',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
  ]
  return linux.find((p) => existsSync(p)) ?? null
}

const chromePath = resolveChromiumPath()
if (!chromePath) {
  console.error(
    [
      'Lighthouse: no se encontró un navegador Chromium.',
      'Instala Google Chrome o Microsoft Edge, o define la variable de entorno CHROME_PATH',
      'con la ruta al ejecutable (p. ej. "C:\\\\Program Files\\\\Microsoft\\\\Edge\\\\Application\\\\msedge.exe").',
    ].join('\n')
  )
  process.exit(1)
}

const userDataForChrome = userDataDir.replace(/\\/g, '/')
const chromeFlags = `--user-data-dir=${userDataForChrome} --headless=new`

const args = [
  '--yes',
  LIGHTHOUSE,
  URL,
  '--preset=desktop',
  '--only-categories=performance,seo,best-practices,accessibility',
  '--quiet',
  '--output=html',
  '--output-path=lighthouse-report.html',
  `--chrome-flags=${chromeFlags}`,
]

const reportPath = join(projectRoot, 'lighthouse-report.html')
const runStartedAt = Date.now()

const r = spawnSync('npx', args, {
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    CHROME_PATH: chromePath,
    // chrome-launcher usa os.tmpdir(); redirigir evita EPERM al borrar en %TEMP%.
    ...(process.platform === 'win32'
      ? { TEMP: lighthouseTmp, TMP: lighthouseTmp }
      : { TMPDIR: lighthouseTmp }),
  },
})

const code = r.status ?? 1
if (code === 0) {
  process.exit(0)
}

// En Windows, chrome-launcher a veces lanza EPERM al hacer rmSync de la carpeta
// temporal aunque el HTML ya se escribió. Si el informe es reciente, no falla CI.
if (existsSync(reportPath)) {
  const { mtimeMs, size } = statSync(reportPath)
  const fresh = mtimeMs >= runStartedAt - 5_000 && size > 500
  if (fresh) {
    console.warn(
      '\nAviso: error al limpiar archivos temporales (habitual en Windows / Edge). ' +
        'El informe se generó correctamente:\n' +
        reportPath +
        '\n'
    )
    process.exit(0)
  }
}

process.exit(code)
