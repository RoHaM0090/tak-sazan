import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'
import { Btn } from './ui.jsx'
import { Counter, useParallax } from './hooks.js'
import { SITE, wa } from '../config/site.js'
import logo from '../assets/logo-sm.png'

export function Hero() {
  const vis = useRef(null)
  useParallax(vis, 0.05)
  return (<section className="hero" aria-labelledby="hero-title">
    <div className="grid-bg" aria-hidden="true" /><div className="glow g1" aria-hidden="true" /><div className="glow g2" aria-hidden="true" />
    <div className="wrap hero-in">
      <div className="hero-tx">
        <span className="chip rv"><i />شاهد شهر، شهریار</span>
        <h1 id="hero-title" className="rv" style={{ '--d': '.06s' }}>تک سازان؛ <em>تزریق پلاستیک</em> و قالب‌سازی در شهریار</h1>
        <p className="lead rv" style={{ '--d': '.12s' }}>از ساخت و تعمیر قالب تا تزریق و تحویل قطعات پلاستیکی؛ ساخت قطعه را از نمونه یا نقشه شما تا محصول نهایی همراهی می‌کنیم.</p>
        <div className="cta rv" style={{ '--d': '.18s' }}><Btn to="/order" icon="arrow">ثبت سفارش</Btn><Btn to="/services" v="line">مشاهده خدمات</Btn></div>
        <ul className="hero-pts rv" style={{ '--d': '.24s' }}><li><Icon n="check" s={16} />شروع با نمونه یا نقشه</li><li><Icon n="check" s={16} />ساخت قالب و تزریق در یک مجموعه</li><li><Icon n="check" s={16} />ارتباط سریع با واتساپ</li></ul>
      </div>
      <div className="hero-vis" ref={vis}>
        <figure className="frame imgr">
          <img src={SITE.heroImage} alt="دستگاه تزریق پلاستیک در سالن تولید تک سازان" width="736" height="552" fetchPriority="high" decoding="async" />
          <i className="cm a" /><i className="cm b" /><i className="cm c" /><i className="cm d" />
        </figure>
        <div className="fcard f1"><span className="ic"><Icon n="pin" s={20} /></span><div><small>موقعیت</small><b>شهریار، شاهد شهر</b></div></div>
        <div className="fcard f2"><span className="ic"><Icon n="clock" s={20} /></span><div><small>ساعات کاری</small><b>شنبه تا پنج‌شنبه</b></div></div>
        <div className="badge" aria-hidden="true"><span /><img src={logo} alt="" width="64" height="64" /></div>
        <div className="ruler" aria-hidden="true"><i /><b>تزریق · قالب · تولید</b><i /></div>
      </div>
    </div>
  </section>)
}

export function Stats() {
  const s = [[4, '', 'خدمت تخصصی', 'تزریق، قالب‌سازی، تعمیر قالب و تولید قطعه'], [6, '', 'روز کاری در هفته', 'شنبه تا پنج‌شنبه'], [12, '', 'ساعت کاری در روز', 'از ۷ صبح تا ۷ عصر'], [6, '', 'مرحله شفاف همکاری', 'از مشاوره تا تحویل']]
  return (<div className="stats">{s.map(([n, suf, t, d], i) => (
    <div className="stat rv" style={{ '--d': i * 0.08 + 's' }} key={t}><b><Counter to={n} suffix={suf} /></b><h3>{t}</h3><p>{d}</p></div>))}</div>)
}

export function SmartCTA() {
  const o = [
    ['wa', 'گفتگو در واتساپ', 'سریع‌ترین راه برای ارسال عکس، نمونه یا نقشه.', 'شروع گفتگو', wa('سلام، برای سفارش در سایت تک سازان پیام می‌دهم.'), 'wa'],
    ['phone', 'تماس تلفنی', 'برای مشاوره اولیه و هماهنگی، مستقیم تماس بگیرید.', SITE.phone, 'tel:' + SITE.phoneIntl, 'line'],
    ['doc', 'فرم ثبت سفارش', 'مشخصات را بنویسید تا متن سفارش آماده ارسال شود.', 'تکمیل فرم', '/order', 'pri'],
  ]
  return (<div className="smart">{o.map(([ic, t, d, b, h, v], i) => (
    <div className="scta rv" style={{ '--d': i * 0.08 + 's' }} key={t}>
      <span className="ic"><Icon n={ic} s={28} /></span><h3>{t}</h3><p>{d}</p>
      {h.startsWith('/') ? <Btn to={h} v={v} icon="arrow">{b}</Btn> : <Btn href={h} v={v}>{b}</Btn>}
    </div>))}</div>)
}

// پیش و پس از تعمیر: تا زمانی که تصویر واقعی نباشد، فقط «نشانه‌ها» و «هدف تعمیر» به‌صورت متنی نمایش داده می‌شود.
// برای افزودن تصویر واقعی: props بعد و قبل را با آدرس تصویر بدهید: <BeforeAfter before="/img/before.jpg" after="/img/after.jpg" />
export function BeforeAfter({ before, after }) {
  const [after_, setAfter] = useState(false), [pos, setPos] = useState(50)
  const has = before && after
  return (<div className="ba rv">
    <div className="ba-tabs" role="group" aria-label="نمایش پیش و پس از تعمیر">
      <button type="button" aria-pressed={!after_} onClick={() => setAfter(false)}>پیش از تعمیر</button>
      <button type="button" aria-pressed={after_} onClick={() => setAfter(true)}>هدف تعمیر</button>
    </div>
    {has ? (<div className="ba-img" style={{ '--p': pos + '%' }}>
      <img src={after} alt="قالب پس از تعمیر" loading="lazy" /><img className="bf" src={before} alt="قالب پیش از تعمیر" loading="lazy" />
      <input type="range" min="0" max="100" value={pos} onChange={e => setPos(+e.target.value)} aria-label="مقایسه پیش و پس از تعمیر" />
    </div>) : (<div className={'ba-panel' + (after_ ? ' aft' : '')}>
      {after_
        ? <><h3>هدف از تعمیر</h3><ul><li>از بین رفتن علت اصلی پلیسه یا آسیب</li><li>بازگشت قالب به وضعیت قابل تولید</li><li>تأیید با تزریق آزمایشی</li><li>ادامه تولید با قطعات یکنواخت‌تر</li></ul></>
        : <><h3>نشانه‌های رایج مشکل قالب</h3><ul><li>پلیسه کنار خط جدایش قطعه</li><li>تغییر تدریجی ابعاد یا ظاهر قطعه</li><li>خراش یا آسیب سطح</li><li>نشتی آب خنک‌کاری یا گیر کردن قطعه</li></ul></>}
      <p className="note">تصاویر واقعی پیش و پس از تعمیر پس از تأیید مجموعه در این بخش قرار می‌گیرد.</p>
    </div>)}
  </div>)
}

export function WhyCard({ t, d, ic, i }) {
  return (<div className="why rv" style={{ '--d': i * 0.07 + 's' }}><span className="ic"><Icon n={ic} s={26} /></span><h3>{t}</h3><p>{d}</p></div>)
}

export function PostCard({ p, i = 0 }) {
  return (<article className="pcard rv" style={{ '--d': i * 0.07 + 's' }}>
    <span className="tag">{p.cat}</span>
    <h3><Link to={'/blog/' + p.slug}>{p.title}</Link></h3>
    <p>{p.excerpt}</p>
    <div className="meta"><time dateTime={p.date}>{p.dateFa}</time><span>مطالعه: {p.read}</span></div>
  </article>)
}
