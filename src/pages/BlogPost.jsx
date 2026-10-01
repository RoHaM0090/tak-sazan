import { Link, useParams } from 'react-router-dom'
import SEO from '../seo/SEO.jsx'
import { schemas } from '../seo/head.js'
import { Breadcrumb, CTA, SectionTitle } from '../components/ui.jsx'
import { PostCard } from '../components/sections.jsx'
import NotFound from './NotFound.jsx'
import { POSTS, SERVICES } from '../data/content.js'

const RELATED_SVC = { 'what-is-plastic-injection-molding': 'injection-molding', 'mold-order-checklist': 'mold-making', 'signs-mold-needs-repair': 'mold-repair' }
export default function BlogPost() {
  const { slug } = useParams()
  const p = POSTS.find(x => x.slug === slug)
  if (!p) return <NotFound />
  const path = '/blog/' + p.slug
  const crumbs = [{ name: 'خانه', path: '/' }, { name: 'بلاگ', path: '/blog' }, { name: p.title, path }]
  const rel = POSTS.filter(x => x.slug !== p.slug).sort((a, b) => (b.cat === p.cat) - (a.cat === p.cat))
  const svc = SERVICES.find(s => s.slug === RELATED_SVC[p.slug])
  return (<>
    <SEO path={path} crumbs={crumbs} extra={[schemas.article(p)]} />
    <section className="phero"><div className="grid-bg" aria-hidden="true" /><div className="wrap narrow">
      <Breadcrumb items={crumbs} />
      <span className="tag">{p.cat}</span>
      <h1 className="rv">{p.title}</h1>
      <p className="meta"><time dateTime={p.date}>{p.dateFa}</time> · مطالعه: {p.read} · تک سازان</p>
    </div></section>
    <article className="sec"><div className="wrap narrow prose">
      <p className="lead">{p.excerpt}</p>
      {p.body.map(([h, ps]) => <section key={h}><h2>{h}</h2>{ps.map(t => <p key={t.slice(0, 24)}>{t}</p>)}</section>)}
      {svc && <aside className="note-box"><b>خدمت مرتبط:</b> <Link to={'/services/' + svc.slug}>{svc.name} در شهریار</Link></aside>}
    </div></article>
    <section className="sec alt" aria-labelledby="rel"><div className="grid-bg light" aria-hidden="true" /><div className="wrap">
      <SectionTitle id="rel" kicker="مطالب مرتبط" title="مقالات مرتبط" />
      <div className="grid3">{rel.map((x, i) => <PostCard key={x.slug} p={x} i={i} />)}</div>
    </div></section>
    <CTA />
  </>)
}
