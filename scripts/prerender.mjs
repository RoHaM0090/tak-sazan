// پس از build: برای هر مسیر یک فایل HTML کامل (با متن صفحه + متای اختصاصی + JSON-LD) می‌سازد.
// اگر رندر سمت سرور شکست بخورد، فقط متاها تزریق می‌شوند و سایت همچنان کار می‌کند.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist'), ssrDir = path.join(root, 'dist-server')
const { PAGES } = await import(pathToFileURL(path.join(root, 'src/data/routes.js')).href)
const { buildHead, pageData, abs } = await import(pathToFileURL(path.join(root, 'src/seo/head.js')).href)
const { SITE } = await import(pathToFileURL(path.join(root, 'src/config/site.js')).href)

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
if (!template.includes('<!--seo-head-->')) throw new Error('index.html template is missing <!--seo-head--> marker')

let render = null
try {
  const entry = fs.readdirSync(ssrDir).find(f => /^entry-server\.(m?js|cjs)$/.test(f))
  render = (await import(pathToFileURL(path.join(ssrDir, entry)).href)).render
} catch (e) { console.warn('[prerender] SSR bundle unavailable, falling back to head-only pages:', e.message) }

let ssrOk = 0, ssrFail = 0
function build(url, pagePath) {
  let html = '', seo = null
  if (render) {
    try { ({ html, seo } = render(url)); ssrOk++ } catch (e) { ssrFail++; console.warn(`[prerender] render failed for ${url}:`, e.message) }
  }
  const data = seo || pageData(pagePath)
  return template.replace('<!--seo-head-->', () => buildHead(data)).replace('<!--app-html-->', () => html)
}
const write = (file, content) => { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, content) }

for (const p of PAGES) {
  if (p.path === '/404') continue
  write(p.path === '/' ? path.join(dist, 'index.html') : path.join(dist, p.path, 'index.html'), build(p.path, p.path))
}
write(path.join(dist, '404.html'), build('/__not-found__', '/404'))

const urls = PAGES.filter(p => !p.noindex).map(p => `  <url><loc>${abs(p.path)}</loc>${p.lastmod ? `<lastmod>${p.lastmod}</lastmod>` : ''}<priority>${p.priority || '0.5'}</priority></url>`)
write(path.join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`)
write(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE.url}/sitemap.xml\n`)

fs.rmSync(ssrDir, { recursive: true, force: true })
console.log(`[prerender] ${PAGES.length} pages written (SSR ok: ${ssrOk}, failed: ${ssrFail}), sitemap.xml + robots.txt generated.`)
