// توابع مشترک SEO؛ هم در مرورگر و هم هنگام build در Node اجرا می‌شوند.
import { SITE } from '../config/site.js'
import { PAGES } from '../data/routes.js'
import { SERVICES } from '../data/content.js'

export const abs = p => SITE.url + (p === '/' ? '/' : p.replace(/\/$/, '') + '/')
export const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
export const ldJson = o => JSON.stringify(o).replace(/</g, '\\u003c')

const BIZ = SITE.url + '/#business'

export const schemas = {
  business: () => ({
    '@context': 'https://schema.org', '@type': 'LocalBusiness', '@id': BIZ,
    name: SITE.name, alternateName: [SITE.nameEn, 'تک سازان شهریار', 'Tak Sazan Shahriar'],
    url: SITE.url + '/', logo: SITE.url + '/logo.png', image: SITE.url + SITE.heroImage,
    description: 'تزریق پلاستیک، قالب‌سازی، تعمیر قالب و تولید قطعات پلاستیکی در شهریار، شاهد شهر.',
    telephone: SITE.phoneIntl,
    address: { '@type': 'PostalAddress', streetAddress: SITE.street, addressLocality: SITE.city, addressRegion: SITE.region, addressCountry: 'IR' },
    areaServed: { '@type': 'City', name: SITE.city },
    openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'], opens: '07:00', closes: '19:00' }],
    hasMap: SITE.mapLink, sameAs: [SITE.instagram],
    contactPoint: [{ '@type': 'ContactPoint', contactType: 'customer service', telephone: SITE.phoneIntl, availableLanguage: 'fa', areaServed: 'IR' }],
    knowsAbout: ['تزریق پلاستیک', 'قالب‌سازی تزریق', 'تعمیر قالب', 'تولید قطعات پلاستیکی'],
    hasOfferCatalog: { '@type': 'OfferCatalog', name: 'خدمات تک سازان', itemListElement: SERVICES.map(s => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.name, url: abs('/services/' + s.slug) } })) },
  }),
  website: () => ({ '@context': 'https://schema.org', '@type': 'WebSite', '@id': SITE.url + '/#website', url: SITE.url + '/', name: SITE.name, alternateName: SITE.nameEn, inLanguage: 'fa-IR', publisher: { '@id': BIZ } }),
  breadcrumb: crumbs => ({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: abs(c.path) })) }),
  service: s => ({ '@context': 'https://schema.org', '@type': 'Service', name: s.name, serviceType: s.name, description: s.desc, url: abs('/services/' + s.slug), areaServed: { '@type': 'City', name: SITE.city }, provider: { '@id': BIZ } }),
  faq: items => ({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) }),
  article: p => ({ '@context': 'https://schema.org', '@type': 'BlogPosting', headline: p.title, description: p.excerpt, datePublished: p.date, dateModified: p.date, inLanguage: 'fa-IR', image: SITE.url + SITE.heroImage, mainEntityOfPage: abs('/blog/' + p.slug), author: { '@type': 'Organization', name: SITE.name, '@id': BIZ }, publisher: { '@type': 'Organization', name: SITE.name, '@id': BIZ, logo: { '@type': 'ImageObject', url: SITE.url + '/logo.png' } } }),
}

export function pageData(path, jsonLd = []) {
  const pg = PAGES.find(p => p.path === path) || PAGES.find(p => p.path === '/404')
  return {
    path, title: pg.title, description: pg.description, noindex: !!pg.noindex,
    canonical: pg.noindex ? '' : abs(pg.path), type: pg.og || 'website',
    image: SITE.url + SITE.heroImage, jsonLd,
  }
}

export function buildHead(d) {
  const t = []
  t.push(`<title>${esc(d.title)}</title>`)
  t.push(`<meta name="description" content="${esc(d.description)}" />`)
  t.push(`<meta name="robots" content="${d.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}" />`)
  if (d.canonical) t.push(`<link rel="canonical" href="${esc(d.canonical)}" />`)
  const og = { 'og:type': d.type, 'og:locale': 'fa_IR', 'og:site_name': SITE.name, 'og:title': d.title, 'og:description': d.description, 'og:image': d.image, 'og:image:width': '736', 'og:image:height': '552', 'og:image:alt': 'دستگاه تزریق پلاستیک در سالن تولید تک سازان' }
  if (d.canonical) og['og:url'] = d.canonical
  for (const [k, v] of Object.entries(og)) t.push(`<meta property="${k}" content="${esc(v)}" />`)
  const tw = { 'twitter:card': 'summary_large_image', 'twitter:title': d.title, 'twitter:description': d.description, 'twitter:image': d.image, 'twitter:image:alt': 'دستگاه تزریق پلاستیک در سالن تولید تک سازان' }
  for (const [k, v] of Object.entries(tw)) t.push(`<meta name="${k}" content="${esc(v)}" />`)
  for (const j of d.jsonLd || []) t.push(`<script type="application/ld+json" data-ld>${ldJson(j)}</script>`)
  return t.join('\n')
}
