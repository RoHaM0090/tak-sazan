import { Link, useParams } from 'react-router-dom'
import SEO from '../seo/SEO.jsx'
import { schemas } from '../seo/head.js'
import { PageHero, SectionTitle, Timeline, FAQ, CTA, Btn, ServiceCard } from '../components/ui.jsx'
import { BeforeAfter, WhyCard } from '../components/sections.jsx'
import Icon from '../components/Icon.jsx'
import NotFound from './NotFound.jsx'
import { SERVICES, FAQS, POSTS } from '../data/content.js'
import { SITE, wa } from '../config/site.js'

export default function ServicePage() {
  const { slug } = useParams()
  const s = SERVICES.find(x => x.slug === slug)
  if (!s) return <NotFound />
  const path = '/services/' + s.slug
  const crumbs = [{ name: 'خانه', path: '/' }, { name: 'خدمات', path: '/services' }, { name: s.name, path }]
  const POST_OF = { 'injection-molding': 'what-is-plastic-injection-molding', 'mold-making': 'mold-order-checklist', 'mold-repair': 'signs-mold-needs-repair' }
  const post = POSTS.find(x => x.slug === POST_OF[s.slug])
  const faqs = s.faqs.concat(FAQS.filter(f => !s.faqs.some(x => x[0] === f[0])).slice(0, 2))
  const img = s.slug === 'mold-making' || s.slug === 'mold-repair' ? SITE.machineImage : SITE.heroImage
  const dim = img === SITE.machineImage ? [736, 981] : [736, 552]
  return (<>
    <SEO path={path} crumbs={crumbs} extra={[schemas.business(), schemas.service(s), schemas.faq(faqs)]} />
    <PageHero crumbs={crumbs} title={s.h1} lead={s.lead}>
      <Btn to={`/order?service=${s.slug}`} icon="arrow">ثبت سفارش {s.name}</Btn>
      <Btn href={wa(`سلام، درباره ${s.name} سؤال دارم.`)} v="wa" icon="wa">پرسش در واتساپ</Btn>
    </PageHero>
    <section className="sec" aria-labelledby="s1"><div className="wrap two">
      <div className="rv"><span className="kick">معرفی خدمت</span><h2 id="s1">{s.name} در تک سازان</h2>{s.intro.map(p => <p key={p.slice(0, 20)}>{p}</p>)}</div>
      <figure className="imgr intro-img"><img src={img} alt={img === SITE.machineImage ? 'قالب تزریق نصب‌شده روی دستگاه تزریق پلاستیک' : 'دستگاه تزریق پلاستیک در سالن تولید'} width={dim[0]} height={dim[1]} loading="lazy" decoding="async" /></figure>
    </div></section>
    <section className="sec alt" aria-labelledby="s2"><div className="grid-bg light" aria-hidden="true" /><div className="wrap two top">
      <div className="rv"><span className="kick">کاربردها</span><h2 id="s2">{s.slug === 'mold-repair' ? 'چه مشکلاتی بررسی می‌شود؟' : 'کاربردها و موارد مناسب'}</h2>
        <ul className="ticks big">{s.uses.map(u => <li key={u}><Icon n="check" s={18} />{u}</li>)}</ul></div>
      <div className="rv need"><h3>برای شروع بررسی، این‌ها را آماده کنید</h3><ul>{s.need.map(u => <li key={u}><Icon n="doc" s={18} />{u}</li>)}</ul><p>اگر همه موارد را ندارید، با همان اطلاعاتی که دارید پیام بدهید.</p>{post && <p className="rel-post">بیشتر بخوانید: <Link to={'/blog/' + post.slug}>{post.title}</Link></p>}</div>
    </div></section>
    <section className="sec" aria-labelledby="s3"><div className="wrap">
      <SectionTitle id="s3" kicker="مزایا" title={`مزایای ${s.name} با تک سازان`} />
      <div className="grid4">{s.benefits.map(([t, d], i) => <WhyCard key={t} t={t} d={d} ic={['shield', 'ruler', 'mold', 'box'][i % 4]} i={i} />)}</div>
    </div></section>
    {s.slug === 'mold-repair' && <section className="sec alt" aria-labelledby="s3b"><div className="grid-bg light" aria-hidden="true" /><div className="wrap narrow">
      <SectionTitle id="s3b" kicker="پیش و پس از تعمیر" title="تعمیر قالب؛ از نشانه تا هدف" lead="نشانه‌های رایج مشکل قالب و هدفی که از تعمیر دنبال می‌شود." />
      <BeforeAfter />
    </div></section>}
    <section className="sec dark" aria-labelledby="s4"><div className="grid-bg" aria-hidden="true" /><div className="wrap">
      <SectionTitle id="s4" kicker="فرآیند" title={`مراحل ${s.name}`} />
      <Timeline items={s.steps} />
    </div></section>
    <section className="sec alt" aria-labelledby="s5"><div className="grid-bg light" aria-hidden="true" /><div className="wrap narrow">
      <SectionTitle id="s5" kicker="سؤالات متداول" title={`سؤالات متداول ${s.name}`} />
      <FAQ items={faqs} />
    </div></section>
    <section className="sec" aria-labelledby="s6"><div className="wrap">
      <SectionTitle id="s6" kicker="خدمات دیگر" title="سایر خدمات تک سازان" />
      <div className="grid3">{SERVICES.filter(x => x.slug !== s.slug).map((x, i) => <ServiceCard key={x.slug} s={x} i={i} />)}</div>
    </div></section>
    <CTA title={`${s.name} در شهریار؛ سفارش خود را بفرستید`} />
  </>)
}
