import { useState } from 'react'
import SEO from '../seo/SEO.jsx'
import { PageHero, CTA } from '../components/ui.jsx'
import { PostCard } from '../components/sections.jsx'
import { POSTS, POST_CATS } from '../data/content.js'

const crumbs = [{ name: 'خانه', path: '/' }, { name: 'بلاگ', path: '/blog' }]
export default function Blog() {
  const [cat, setCat] = useState('')
  const list = cat ? POSTS.filter(p => p.cat === cat) : POSTS
  return (<>
    <SEO path="/blog" crumbs={crumbs} />
    <PageHero crumbs={crumbs} title="وبلاگ تزریق پلاستیک و قالب‌سازی" lead="مقالات کاربردی برای کسانی که قطعه پلاستیکی می‌سازند یا قالب دارند." />
    <section className="sec" aria-labelledby="bl"><div className="wrap">
      <h2 id="bl" className="sr">مقالات</h2>
      <div className="chips" role="group" aria-label="دسته‌بندی مقالات">
        <button type="button" aria-pressed={!cat} onClick={() => setCat('')}>همه</button>
        {POST_CATS.map(c => <button type="button" key={c} aria-pressed={cat === c} onClick={() => setCat(c)}>{c}</button>)}
      </div>
      <div className="grid3">{list.map((p, i) => <PostCard key={p.slug} p={p} i={i} />)}</div>
    </div></section>
    <CTA />
  </>)
}
