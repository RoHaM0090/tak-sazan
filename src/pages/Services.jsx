import SEO from '../seo/SEO.jsx'
import { PageHero, SectionTitle, ServiceCard, CTA, Timeline } from '../components/ui.jsx'
import { SERVICES, PROCESS } from '../data/content.js'

const crumbs = [{ name: 'خانه', path: '/' }, { name: 'خدمات', path: '/services' }]
export default function Services() {
  return (<>
    <SEO path="/services" crumbs={crumbs} />
    <PageHero crumbs={crumbs} title="خدمات تزریق پلاستیک و قالب‌سازی در شهریار" lead="چهار خدمت اصلی تک سازان؛ از ساخت قالب تا تولید قطعه. هر خدمت را جداگانه ببینید یا مستقیم سفارش دهید." />
    <section className="sec" aria-labelledby="sv1"><div className="wrap">
      <SectionTitle id="sv1" kicker="خدمات" title="یک مسیر کامل از قالب تا قطعه" lead="بسته به نیاز، می‌توانید فقط یک خدمت یا کل مسیر را سفارش دهید." />
      <div className="grid4">{SERVICES.map((s, i) => <ServiceCard key={s.slug} s={s} i={i} />)}</div>
    </div></section>
    <section className="sec dark" aria-labelledby="sv2"><div className="grid-bg" aria-hidden="true" /><div className="wrap">
      <SectionTitle id="sv2" kicker="فرآیند" title="همه خدمات چطور پیش می‌روند؟" />
      <Timeline items={PROCESS} />
    </div></section>
    <CTA />
  </>)
}
