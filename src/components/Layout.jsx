import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import Floating from './Floating.jsx'
import { useReveal } from './hooks.js'

// بعد از هر تغییر مسیر: اسکرول به بالا (یا به hash) و فعال‌سازی انیمیشن ورود عناصر
function RouteEffects() {
  const { pathname, hash } = useLocation()
  useReveal(pathname)
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (el) { el.scrollIntoView(); return }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function Layout({ children }) {
  const { pathname } = useLocation()
  return (<>
    <Header />
    <main id="main" tabIndex={-1} key={pathname} className="page">{children}</main>
    <Footer />
    <Floating />
    <RouteEffects />
  </>)
}
