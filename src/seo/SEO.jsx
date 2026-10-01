import { useEffect } from 'react'
import { pageData, schemas } from './head.js'

function setTag(sel, make, attrs) {
  let el = document.head.querySelector(sel)
  if (!el) { el = document.createElement(make); document.head.appendChild(el) }
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v)
}

function apply(d) {
  document.title = d.title
  setTag('meta[name="description"]', 'meta', { name: 'description', content: d.description })
  setTag('meta[name="robots"]', 'meta', { name: 'robots', content: d.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large' })
  const old = document.head.querySelector('link[rel="canonical"]')
  if (d.canonical) setTag('link[rel="canonical"]', 'link', { rel: 'canonical', href: d.canonical })
  else if (old) old.remove()
  const og = { 'og:type': d.type, 'og:title': d.title, 'og:description': d.description, 'og:image': d.image, 'og:url': d.canonical }
  for (const [k, v] of Object.entries(og)) if (v) setTag(`meta[property="${k}"]`, 'meta', { property: k, content: v })
  setTag('meta[name="twitter:title"]', 'meta', { name: 'twitter:title', content: d.title })
  setTag('meta[name="twitter:description"]', 'meta', { name: 'twitter:description', content: d.description })
  document.head.querySelectorAll('script[data-ld]').forEach(n => n.remove())
  for (const j of d.jsonLd) {
    const s = document.createElement('script')
    s.type = 'application/ld+json'; s.setAttribute('data-ld', '')
    s.textContent = JSON.stringify(j)
    document.head.appendChild(s)
  }
}

// هر صفحه یک بار <SEO path=".." crumbs={[..]} extra={[..]} /> را رندر می‌کند.
export default function SEO({ path, crumbs, extra = [] }) {
  const ld = [...(crumbs ? [schemas.breadcrumb(crumbs)] : []), ...extra]
  const data = pageData(path, ld)
  if (typeof document === 'undefined') globalThis.__SEO__ = data // هنگام prerender
  useEffect(() => { apply(data) }, [path]) // eslint-disable-line react-hooks/exhaustive-deps
  return null
}
