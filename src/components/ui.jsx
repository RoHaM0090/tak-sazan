import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'
import { SITE, wa } from '../config/site.js'

export function Btn({ to, href, v = 'pri', icon, children, ...r }) {
  const c = 'btn ' + v
  const inner = <>{children}{icon && <Icon n={icon} s={18} />}</>
  if (to) return <Link className={c} to={to} {...r}>{inner}</Link>
  const ext = /^https?:/.test(href)
  return <a className={c} href={href} {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...r}>{inner}</a>
}

export function Breadcrumb({ items }) {
  return (<nav className="bc" aria-label="مسیر صفحه"><ol>
    {items.map((c, i) => i === items.length - 1
      ? <li key={c.path} aria-current="page">{c.name}</li>
      : <li key={c.path}><Link to={c.path}>{c.name}</Link></li>)}
  </ol></nav>)
}

export function PageHero({ crumbs, title, lead, children }) {
  return (<section className="phero"><div className="grid-bg" aria-hidden="true" /><div className="wrap">
    <Breadcrumb items={crumbs} />
    <h1 className="rv">{title}</h1>
    {lead && <p className="lead rv" style={{ '--d': '.08s' }}>{lead}</p>}
    {children && <div className="cta rv" style={{ '--d': '.16s' }}>{children}</div>}
  </div></section>)
}

export function SectionTitle({ kicker, title, lead, center = true, id }) {
  return (<header className={'st rv' + (center ? ' c' : '')}>
    {kicker && <span className="kick">{kicker}</span>}
    <h2 id={id}>{title}</h2>
    {lead && <p>{lead}</p>}
  </header>)
}

export function FAQ({ items }) {
  return (<div className="faq">{items.map(([q, a], i) => (
    <details className="rv" style={{ '--d': (i % 4) * 0.05 + 's' }} key={q}>
      <summary><h3>{q}</h3><Icon n="chev" s={20} /></summary>
      <p>{a}</p>
    </details>))}</div>)
}

export function ServiceCard({ s, i = 0 }) {
  return (<Link to={'/services/' + s.slug} className="scard rv" style={{ '--d': i * 0.07 + 's' }}>
    <span className="ic"><Icon n={s.icon} s={34} /></span>
    <h3>{s.name}</h3>
    <p>{s.short}</p>
    <span className="more">مشاهده جزئیات <Icon n="arrow" s={16} /></span>
  </Link>)
}

export function Timeline({ items }) {
  return (<ol className="tl">{items.map(([t, d, ic], i) => (
    <li className="rv" style={{ '--d': i * 0.08 + 's' }} key={t}>
      <span className="dot">{ic ? <Icon n={ic} s={22} /> : i + 1}</span>
      <div><small>مرحله {['اول', 'دوم', 'سوم', 'چهارم', 'پنجم', 'ششم'][i]}</small><h3>{t}</h3><p>{d}</p></div>
    </li>))}</ol>)
}

export function CTA({ title = 'آماده ثبت سفارش هستید؟', text = 'نمونه، نقشه یا توضیح کار خود را بفرستید تا بررسی شود.' }) {
  return (<section className="cta-band"><div className="grid-bg" aria-hidden="true" /><div className="wrap rv">
    <div><h2>{title}</h2><p>{text}</p></div>
    <div className="cta"><Btn to="/order" icon="arrow">ثبت سفارش</Btn><Btn href={wa('سلام، برای ثبت سفارش در سایت تک سازان پیام می‌دهم.')} v="wa" icon="wa">واتساپ</Btn><Btn href={'tel:' + SITE.phoneIntl} v="line" icon="phone">تماس</Btn></div>
  </div></section>)
}

export function ContactCards() {
  const c = [
    ['phone', 'تلفن', SITE.phone, 'tel:' + SITE.phoneIntl, true],
    ['wa', 'واتساپ', SITE.whatsappDisplay, wa(), true],
    ['pin', 'آدرس', SITE.address, SITE.mapLink],
    ['clock', 'ساعات کاری', SITE.hoursOpen + ' — ' + SITE.hoursClosed],
    ['insta', 'اینستاگرام', 'مشاهده صفحه', SITE.instagram],
  ]
  return (<div className="ccards">{c.map(([ic, t, v, h, ltr], i) => {
    const body = <><span className="ic"><Icon n={ic} s={24} /></span><div><small>{t}</small><b dir={ltr ? 'ltr' : undefined}>{v}</b></div></>
    const st = { '--d': i * 0.06 + 's' }
    if (!h) return <div className="ccard rv" style={st} key={t}>{body}</div>
    return <a className="ccard rv" style={st} key={t} href={h} {...(/^https?:/.test(h) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{body}</a>
  })}</div>)
}

export function Gallery() {
  return (<div className="gal">
    <figure className="imgr"><img src={SITE.heroImage} alt="دستگاه تزریق پلاستیک در سالن تولید" width="736" height="552" loading="lazy" decoding="async" /><figcaption>دستگاه تزریق در سالن تولید</figcaption></figure>
    <figure className="imgr"><img src={SITE.machineImage} alt="قالب تزریق نصب‌شده روی دستگاه تزریق پلاستیک" width="736" height="981" loading="lazy" decoding="async" /><figcaption>قالب نصب‌شده روی دستگاه</figcaption></figure>
  </div>)
}
