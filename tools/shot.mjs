/**
 * Screenshot the dev server at arbitrary scroll positions.
 *
 * Chrome's `--screenshot` flag (and a hidden preview pane) only ever composite
 * the first painted frame, so anything below the fold came back black. This
 * drives a headless Chrome over the DevTools protocol instead, which repaints
 * properly after we scroll.
 *
 *   node tools/shot.mjs <url> <outDir> <y1> <y2> ...
 */
import { spawn } from 'node:child_process'
import { mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { join } from 'node:path'

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const [url, outDir, ...ys] = process.argv.slice(2)
const W = Number(process.env.W || 1440)
const H = Number(process.env.H || 900)
const profile = '/tmp/cc-shot-profile'

rmSync(profile, { recursive: true, force: true })
mkdirSync(outDir, { recursive: true })

const chrome = spawn(CHROME, [
  '--headless=new',
  '--remote-debugging-port=9333',
  `--user-data-dir=${profile}`,
  '--hide-scrollbars',
  '--disable-gpu',
  '--no-first-run',
  `--window-size=${W},${H}`,
])
chrome.stderr.on('data', () => {})

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function wsUrl() {
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch('http://127.0.0.1:9333/json/version')
      const j = await r.json()
      if (j.webSocketDebuggerUrl) return j.webSocketDebuggerUrl
    } catch {}
    await sleep(250)
  }
  throw new Error('chrome did not come up')
}

const ws = new WebSocket(await wsUrl())
await new Promise((r) => (ws.onopen = r))

let id = 0
const pending = new Map()
ws.onmessage = (e) => {
  const m = JSON.parse(e.data)
  if (m.id && pending.has(m.id)) {
    pending.get(m.id)(m.result)
    pending.delete(m.id)
  }
}
const send = (method, params = {}, sessionId) =>
  new Promise((res) => {
    const n = ++id
    pending.set(n, res)
    ws.send(JSON.stringify({ id: n, method, params, sessionId }))
  })

const { targetId } = await send('Target.createTarget', { url: 'about:blank' })
const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true })
const S = (m, p) => send(m, p, sessionId)

await S('Page.enable')
await S('Emulation.setDeviceMetricsOverride', {
  width: W,
  height: H,
  deviceScaleFactor: 1,
  mobile: false,
})
await S('Page.navigate', { url })
await sleep(3500)

for (const y of ys) {
  await S('Runtime.evaluate', {
    expression: `(() => {
      const l = window.__lenis
      if (l) l.scrollTo(${y}, { immediate: true })
      else window.scrollTo(0, ${y})
    })()`,
  })
  await sleep(1400)
  const { data } = await S('Page.captureScreenshot', { format: 'png' })
  const file = join(outDir, `y${y}.png`)
  writeFileSync(file, Buffer.from(data, 'base64'))
  console.log('wrote', file)
}

ws.close()
chrome.kill()
