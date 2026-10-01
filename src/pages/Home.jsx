import { Link } from 'react-router-dom'
import SEO from '../seo/SEO.jsx'
import { schemas } from '../seo/head.js'
import { Hero, Stats, SmartCTA, WhyCard } from '../components/sections.jsx'
import { SectionTitle, ServiceCard, Timeline, FAQ, ContactCards, Gallery, Btn } from '../components/ui.jsx'
import Icon from '../components/Icon.jsx'
import { SERVICES, PROCESS, WHY, TRUST, FAQS } from '../data/content.js'
import { SITE } from '../config/site.js'

export default function Home() {
  const faqs = FAQS.slice(0, 5)
  return (<>
    <SEO path="/" extra={[schemas.business(), schemas.website(), schemas.faq(faqs)]} />
    <Hero />
    <section className="sec" aria-labelledby="intro-t"><div className="wrap two">
      <figure className="imgr intro-img"><img src={SITE.machineImage} alt="قالب تزریق نصب‌شده روی دستگاه تزریق پلاستیک" width="736" height="981" loading="lazy" decoding="async" /></figure>
      <div className="rv">
        <span className="kick">درباره تک سازان</span>
        <h2 id="intro-t">از قالب تا قطعه، در یک مجموعه</h2>
        <p>تک سازان مجموعه‌ای در حوزه قالب‌سازی و تزریق پلاستیک در شاهد شهر شهریار است. اگر قطعه‌ای دارید که باید ساخته یا تولید شود، یا قالبی که به تعمیر نیاز دارد، می‌توانید مسیر کار را از همین‌جا شروع کنید.</p>
        <p>کیفیت قطعه پلاستیکی از دقت قالب شروع می‌شود و با تنظیم درست دستگاه تزریق کامل می‌شود. به همین دلیل ساخت قالب و تزریق را کنار هم می‌بینیم.</p>
        <ul className="ticks">{SERVICES.map(s => <li key={s.slug}><Icon n="check" s={16} />{s.name}</li>)}</ul>
        <Btn to="/about" v="line" icon="arrow">بیشتر درباره ما</Btn>
      </div>
    </div></section>

    <section className="sec alt" aria-labelledby="svc-t"><div className="grid-bg light" aria-hidden="true" /><div className="wrap">
      <SectionTitle kicker="خدمات" id="svc-t" title="خدمات تک سازان" lead="هر خدمت صفحه اختصاصی دارد؛ روی کارت‌ها بزنید تا جزئیات، مراحل و سؤالات متداول را ببینید." />
      <div className="grid4">{SERVICES.map((s, i) => <ServiceCard key={s.slug} s={s} i={i} />)}</div>
    </div></section>

    <section className="sec" aria-labelledby="why-t"><div className="wrap">
      <SectionTitle kicker="چرا تک سازان؟" id="why-t" title="چرا تک سازان؟" lead="بدون ادعاهای کلی؛ چیزهایی که در شیوه کار ما مشخص و قابل بررسی است." />
      <div className="grid4">{WHY.map(([t, d, ic], i) => <WhyCard key={t} t={t} d={d} ic={ic} i={i} />)}</div>
    </div></section>

    <section className="sec dark" aria-labelledby="proc-t"><div className="grid-bg" aria-hidden="true" /><div className="wrap">
      <SectionTitle kicker="فرآیند همکاری" id="proc-t" title="مسیر همکاری، قدم به قدم" lead="از اولین پیام تا تحویل قطعه، مراحل کار مشخص است." />
      <Timeline items={PROCESS} />
    </div></section>

    <section className="sec" aria-labelledby="stat-t"><div className="wrap">
      <SectionTitle kicker="در یک نگاه" id="stat-t" title="تک سازان در یک نگاه" lead="شاخص‌هایی بر اساس خدمات و ساعات کاری اعلام‌شده مجموعه." />
      <Stats />
    </div></section>

    <section className="sec alt" aria-labelledby="gal-t"><div className="grid-bg light" aria-hidden="true" /><div className="wrap">
      <SectionTitle kicker="تجهیزات و محیط کار" id="gal-t" title="دستگاه و قالب در محیط تولید" lead="تصاویر واقعی از دستگاه تزریق و قالب نصب‌شده. تصاویر پروژه‌های تحویل‌شده پس از تأیید مجموعه در بخش نمونه‌کارها قرار می‌گیرد." />
      <Gallery />
      <p className="c rv" style={{ marginTop: 24 }}><Link className="tl-link" to="/portfolio">مشاهده بخش نمونه‌کارها</Link></p>
    </div></section>

    <section className="sec" aria-labelledby="trust-t"><div className="wrap">
      <SectionTitle kicker="مزایای همکاری" id="trust-t" title="همکاری شفاف و قابل پیگیری" />
      <div className="grid3">{TRUST.map(([t, d], i) => <div className="trust rv" style={{ '--d': i * 0.08 + 's' }} key={t}><Icon n="shield" s={28} /><h3>{t}</h3><p>{d}</p></div>)}</div>
    </div></section>

    <section className="sec alt" aria-labelledby="faq-t"><div className="grid-bg light" aria-hidden="true" /><div className="wrap narrow">
      <SectionTitle kicker="سؤالات متداول" id="faq-t" title="پرسش‌های رایج" />
      <FAQ items={faqs} />
      <p className="c rv" style={{ marginTop: 24 }}><Link className="tl-link" to="/faq">همه سؤالات متداول</Link></p>
    </div></section>

    <section className="sec" aria-labelledby="ord-t"><div className="wrap">
      <SectionTitle kicker="ثبت سفارش" id="ord-t" title="سفارش خود را چطور شروع کنید؟" lead="یکی از سه راه زیر را انتخاب کنید؛ هر کدام به بررسی سفارش شما می‌رسد." />
      <SmartCTA />
    </div></section>

    <section className="sec alt" aria-labelledby="con-t"><div className="grid-bg light" aria-hidden="true" /><div className="wrap">
      <SectionTitle kicker="تماس" id="con-t" title="اطلاعات تماس" />
      <ContactCards />
    </div></section>
  </>)
}
