import { cpSync, rmSync, mkdirSync } from 'node:fs'
import { execFileSync, spawn } from 'node:child_process'
import { resolve, relative, dirname, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const DOCS_DIR = resolve(ROOT, 'docs')
const V2_OVERRIDES = resolve(ROOT, 'docs-v2')
const STAGE_DIR = resolve(ROOT, '.tmp-v2')
const V1_DIST = resolve(DOCS_DIR, '.vitepress', 'dist')
const V2_DIST_DEST = resolve(V1_DIST, 'v2')
const VITEPRESS_BIN = resolve(ROOT, 'node_modules', 'vitepress', 'bin', 'vitepress.js')

const SKIP_REL_PREFIXES = [
  `.vitepress${sep}`,
  `.vitepress`,
  `public${sep}images${sep}welcome_banner.png`,
  `public${sep}images${sep}socials_banner.png`,
  `public${sep}images${sep}nav_banner.png`,
  `public${sep}images${sep}rules_banner.png`
]

/** Stage combined docs + docs-v2 overlay into .tmp-v2 without duplicating shared markdown in git. */
function stageVariant2() {
  rmSync(STAGE_DIR, { recursive: true, force: true })
  cpSync(DOCS_DIR, STAGE_DIR, {
    recursive: true,
    filter: (src) => {
      const rel = relative(DOCS_DIR, src)
      if (!rel) return true
      return !SKIP_REL_PREFIXES.some((prefix) => rel === prefix || rel.startsWith(prefix))
    }
  })
  cpSync(V2_OVERRIDES, STAGE_DIR, { recursive: true, force: true })
}

function cleanupStage() {
  rmSync(STAGE_DIR, { recursive: true, force: true })
}

const isDev = process.argv.includes('--dev')

if (isDev) {
  stageVariant2()
  const child = spawn(process.execPath, [VITEPRESS_BIN, 'dev', '.tmp-v2', '--port', '5174'], {
    cwd: ROOT,
    stdio: 'inherit'
  })
  const stop = () => {
    child.kill()
    cleanupStage()
  }
  process.on('SIGINT', stop)
  process.on('SIGTERM', stop)
  child.on('exit', (code) => {
    cleanupStage()
    process.exit(code ?? 0)
  })
} else {
  try {
    console.log('[build-all] Building Variant 1 (docs)...')
    execFileSync(process.execPath, [VITEPRESS_BIN, 'build', 'docs'], {
      cwd: ROOT,
      stdio: 'inherit'
    })

    console.log('[build-all] Staging & Building Variant 2 (docs-v2)...')
    stageVariant2()
    execFileSync(process.execPath, [VITEPRESS_BIN, 'build', '.tmp-v2'], {
      cwd: ROOT,
      stdio: 'inherit'
    })

    rmSync(V2_DIST_DEST, { recursive: true, force: true })
    mkdirSync(V2_DIST_DEST, { recursive: true })
    cpSync(resolve(STAGE_DIR, '.vitepress', 'dist'), V2_DIST_DEST, { recursive: true })
    console.log('[build-all] Done: Variant 1 at / and Variant 2 at /v2/')
  } finally {
    cleanupStage()
  }
}
