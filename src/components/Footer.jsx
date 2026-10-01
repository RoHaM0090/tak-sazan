import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'
import logo from '../assets/logo-sm.png'
import { SITE, wa } from '../config/site.js'
import { SERVICES } from '../data/content.js'

const QUICK = [['/', 'خانه'], ['/about', 'درباره ما'], ['/portfolio', 'نمونه‌کارها'], ['/order', 'ثبت سفارش'], ['/faq', 'سؤالات متداول'], ['/blog', 'بلاگ'], ['/contact', 'تماس با ما']]

export default function Footer() {
  const year = new Intl.DateTimeFormat('fa-IR', { year: 'numeric' }).format(new Date())
  return (<footer className="ft">
    <div className="grid-bg" aria-hidden="true" />
    <div className="wrap">
      <div className="ft-cta">
        <div><h2>قطعه یا قالب خود را برای بررسی بفرستید</h2><p>نمونه، نقشه یا یک عکس ساده کافی است تا بررسی سفارش شروع شود.</p></div>
        <div className="cta"><Link className="btn pri" to="/order">ثبت سفارش<Icon n="arrow" s={18} /></Link><a className="btn wa" href={wa()} target="_blank" rel="noopener noreferrer">واتساپ<Icon n="wa" s={18} /></a></div>
      </div>
      <div className="ft-in">
        <div className="ft-about">
          <Link to="/" className="brand" aria-label="تک سازان؛ صفحه اصلی"><span className="brand-mark"><img src={logo} alt="" width="40" height="40" loading="lazy" /></span><span className="brand-tx"><b>{SITE.name}</b><small>Tak Sazan</small></span></Link>
          <p>تک سازان در شاهد شهر شهریار؛ ساخت و تعمیر قالب، تزریق پلاستیک و تولید قطعات پلاستیکی سفارشی، با شروع از نمونه یا نقشه شما.</p>
          <a className="ft-ig" href={SITE.instagram} target="_blank" rel="noopener noreferrer"><Icon n="insta" s={20} />اینستاگرام تک سازان</a>
        </div>
        <nav aria-label="لینک‌های سریع"><h3>دسترسی سریع</h3><ul>{QUICK.map(([to, t]) => <li key={to}><Link to={to}>{t}</Link></li>)}</ul></nav>
        <nav aria-label="خدمات"><h3>خدمات</h3><ul>{SERVICES.map(s => <li key={s.slug}><Link to={'/services/' + s.slug}>{s.name}</Link></li>)}</ul></nav>
        <address className="ft-contact"><h3>تماس</h3>
          <a href={'tel:' + SITE.phoneIntl} dir="ltr"><Icon n="phone" s={18} />{SITE.phone}</a>
          <a href={wa()} target="_blank" rel="noopener noreferrer"><Icon n="wa" s={18} />واتساپ</a>
          <a href={SITE.mapLink} target="_blank" rel="noopener noreferrer"><Icon n="pin" s={18} /><span>{SITE.address}</span></a>
          <span><Icon n="clock" s={18} /><span>{SITE.hoursOpen}<br />{SITE.hoursClosed}</span></span>
        </address>
      </div>
      <div className="ft-bot"><p suppressHydrationWarning>© {year} {SITE.name} (Tak Sazan) — تزریق پلاستیک و قالب‌سازی شهریار. همه حقوق محفوظ است.</p><Link to="/contact">تماس با ما</Link></div>
    </div>
  </footer>)
}
