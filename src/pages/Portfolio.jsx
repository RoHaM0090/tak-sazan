import SEO from '../seo/SEO.jsx'
import { PageHero, SectionTitle, Gallery, CTA } from '../components/ui.jsx'
import Icon from '../components/Icon.jsx'

const crumbs = [{ name: 'خانه', path: '/' }, { name: 'نمونه‌کارها', path: '/portfolio' }]
// برای افزودن پروژه واقعی: آیتمی با { title, desc, img } به این آرایه اضافه کنید؛ خانه‌های خالی خودکار کمتر می‌شوند.
const PROJECTS = []
export default function Portfolio() {
  const empty = Math.max(0, 3 - PROJECTS.length)
  return (<>
    <SEO path="/portfolio" crumbs={crumbs} />
    <PageHero crumbs={crumbs} title="نمونه‌کارها" lead="بخش پروژه‌های تحویل‌شده در حال آماده‌سازی است. تا آن زمان، تصاویر واقعی محیط تولید را ببینید." />
    <section className="sec" aria-labelledby="pf1"><div className="wrap">
      <SectionTitle id="pf1" kicker="محیط تولید" title="تصاویر از دستگاه و قالب" />
      <Gallery />
    </div></section>
    <section className="sec alt" aria-labelledby="pf2"><div className="grid-bg light" aria-hidden="true" /><div className="wrap">
      <SectionTitle id="pf2" kicker="پروژه‌ها" title="پروژه‌های تحویل‌شده" lead="تصاویر و توضیح پروژه‌های واقعی پس از تأیید مجموعه در اینجا قرار می‌گیرد." />
      <div className="grid3">
        {PROJECTS.map(p => <figure className="pj rv" key={p.title}><img src={p.img} alt={p.title} loading="lazy" /><figcaption><b>{p.title}</b><span>{p.desc}</span></figcaption></figure>)}
        {Array.from({ length: empty }, (_, i) => <div className="pj empty rv" style={{ '--d': i * 0.08 + 's' }} key={i}><Icon n="plus" s={30} /><span>محل تصویر پروژه</span></div>)}
      </div>
    </div></section>
    <CTA title="پروژه‌ی خود را با ما شروع کنید" />
  </>)
}
