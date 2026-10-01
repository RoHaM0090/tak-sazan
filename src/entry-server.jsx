import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from './App.jsx'

export function render(url) {
  globalThis.__SEO__ = null
  const html = renderToString(<StaticRouter location={url}><App /></StaticRouter>)
  return { html, seo: globalThis.__SEO__ }
}
