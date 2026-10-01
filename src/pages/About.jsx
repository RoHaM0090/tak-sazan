import { Link } from 'react-router-dom'
import SEO from '../seo/SEO.jsx'
import { schemas } from '../seo/head.js'
import { PageHero, SectionTitle, Timeline, ContactCards, CTA, Btn } from '../components/ui.jsx'
import { WhyCard } from '../components/sections.jsx'
import Icon from '../components/Icon.jsx'
import { SERVICES, PROCESS, WHY } from '../data/content.js'
import { SITE } from '../config/site.js'

const crumbs = [{ name: 'خانه', path: '/' }, { name: 'درباره ما', path: '/about' }]
export default function About() {
  return (<>
    <SEO path="/about" crumbs={crumbs} extra={[schemas.business()]} />
    <PageHero crumbs={crumbs} title="درباره تک سازان" lead="مجموعه‌ای در شاهد شهر شهریار برای ساخت و تعمیر قالب، تزریق پلاستیک و تولید قطعات پلاستیکی." />
    <section className="sec" aria-labelledby="ab1"><div className="wrap two">
      <div className="rv">
        <span className="kick">معرفی</span><h2 id="ab1">تک سازان (Tak Sazan) چه می‌کند؟</h2>
        <p>تک سازان یکی از مجموعه‌های فعال در حوزه قالب‌سازی و تزریق پلاستیک در شهریار است. هدف ما این است که مشتری برای ساخت قطعه، ساخت یا تعمیر قالب و تولید قطعات پلاستیکی، یک مسیر روشن و قابل اتکا داشته باشد.</p>
        <p>ساخت قالب و تزریق را کنار هم می‌بینیم؛ چون کیفیت نهایی قطعه از دقت قالب شروع می‌شود و در تنظیم درست فرایند تزریق کامل می‌شود.</p>
      </div>
      <figure className="imgr intro-img"><img src={SITE.heroImage} alt="دستگاه تزریق پلاستیک در سالن تولید" width="736" height="552" loading="lazy" decoding="async" /></figure>
    </div></section>
    <section className="sec alt" aria-labelledby="ab2"><div className="grid-bg light" aria-hidden="true" /><div className="wrap">
      <SectionTitle kicker="حوزه فعالیت" id="ab2" title="حوزه فعالیت ما" lead="چهار خدمت اصلی که هر کدام صفحه‌ای جداگانه دارند." />
      <div className="grid4">{SERVICES.map((s, i) => <Link key={s.slug} to={'/services/' + s.slug} className="scard rv" style={{ '--d': i * 0.07 + 's' }}><span className="ic"><Icon n={s.icon} s={34} /></span><h3>{s.name}</h3><p>{s.short}</p><span className="more">مشاهده <Icon n="arrow" s={16} /></span></Link>)}</div>
    </div></section>
    <section className="sec" aria-labelledby="ab3"><div className="wrap">
      <SectionTitle kicker="رویکرد کاری" id="ab3" title="رویکرد ما در کار" />
      <div className="grid3">
        {[['اول فهمیدن', 'قبل از ساخت یا تولید، نمونه، نقشه و کاربرد قطعه بررسی می‌شود.'], ['صراحت در ارتباط', 'زمان، هزینه و محدودیت‌ها بعد از بررسی و به‌صورت روشن اعلام می‌شود.'], ['تأیید قبل از تولید سری', 'نمونه اولیه قبل از تولید تیراژ مورد نیاز بررسی می‌شود.']].map(([t, d], i) => <div className="trust rv" style={{ '--d': i * 0.08 + 's' }} key={t}><Icon n="shield" s={28} /><h3>{t}</h3><p>{d}</p></div>)}
      </div>
    </div></section>
    <section className="sec dark" aria-labelledby="ab4"><div className="grid-bg" aria-hidden="true" /><div className="wrap">
      <SectionTitle kicker="فرآیند همکاری" id="ab4" title="فرآیند همکاری با تک سازان" />
      <Timeline items={PROCESS} />
    </div></section>
    <section className="sec" aria-labelledby="ab5"><div className="wrap">
      <SectionTitle kicker="مزیت‌های مجموعه" id="ab5" title="چرا تک سازان؟" />
      <div className="grid4">{WHY.map(([t, d, ic], i) => <WhyCard key={t} t={t} d={d} ic={ic} i={i} />)}</div>
    </div></section>
    <section className="sec alt" aria-labelledby="ab6"><div className="grid-bg light" aria-hidden="true" /><div className="wrap">
      <SectionTitle kicker="تماس" id="ab6" title="اطلاعات تماس" />
      <ContactCards />
      <p className="c rv" style={{ marginTop: 24 }}><Btn to="/contact" v="line" icon="arrow">صفحه تماس با ما</Btn></p>
    </div></section>
    <CTA />
  </>)
}
