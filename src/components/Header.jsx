import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Icon from './Icon.jsx'
import logo from '../assets/logo-sm.png'
import { SITE } from '../config/site.js'
import { SERVICES } from '../data/content.js'

const LINKS = [
  ['/', 'خانه', true],
  ['/services', 'خدمات', false, true],
  ['/about', 'درباره ما'],
  ['/portfolio', 'نمونه‌کارها'],
  ['/faq', 'سؤالات متداول'],
  ['/blog', 'بلاگ'],
  ['/contact', 'تماس با ما'],
]

export default function Header() {
  const [open, setOpen] = useState(false), [sc, setSc] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => { setOpen(false) }, [pathname])
  useEffect(() => {
    const f = () => setSc(window.scrollY > 16)
    f(); window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])
  useEffect(() => {
    document.body.classList.toggle('lock', open)
    const k = e => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', k)
    return () => { document.removeEventListener('keydown', k); document.body.classList.remove('lock') }
  }, [open])
  const cls = ({ isActive }) => (isActive ? 'active' : undefined)
  return (<header className={'hd' + (sc ? ' sc' : '') + (open ? ' menu-open' : '')}>
    <div className="wrap hd-in">
      <Link to="/" className="brand" aria-label="تک سازان؛ صفحه اصلی">
        <span className="brand-mark"><img src={logo} alt="" width="40" height="40" /></span>
        <span className="brand-tx"><b>{SITE.name}</b><small>تزریق پلاستیک و قالب‌سازی</small></span>
      </Link>
      <nav className={'nav' + (open ? ' open' : '')} aria-label="منوی اصلی" id="main-nav">
        <ul>
          {LINKS.map(([to, t, end, sub], i) => (
            <li key={to} className={sub ? 'has-sub' : undefined} style={{ '--i': i }}>
              <NavLink to={to} end={end || undefined} className={cls}>{t}{sub && <Icon n="chev" s={14} />}</NavLink>
              {sub && <ul className="sub">
                {SERVICES.map(s => <li key={s.slug}><NavLink to={'/services/' + s.slug} className={cls}><Icon n={s.icon} s={20} />{s.name}</NavLink></li>)}
              </ul>}
            </li>))}
        </ul>
        <div className="nav-foot">
          <a href={'tel:' + SITE.phoneIntl} dir="ltr"><Icon n="phone" s={18} />{SITE.phone}</a>
          <span>{SITE.hoursOpen}</span>
        </div>
      </nav>
      <Link to="/order" className="btn pri hd-cta">ثبت سفارش</Link>
      <button type="button" className={'burger' + (open ? ' x' : '')} aria-label={open ? 'بستن منو' : 'باز کردن منو'} aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}><i /><i /><i /></button>
    </div>
  </header>)
}
