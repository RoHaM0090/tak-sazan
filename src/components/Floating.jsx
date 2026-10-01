import { useEffect, useState } from 'react'
import Icon from './Icon.jsx'
import { SITE, wa } from '../config/site.js'

export default function Floating() {
  const [show, setShow] = useState(false), [p, setP] = useState(0)
  useEffect(() => {
    let raf = 0
    const f = () => {
      raf = 0
      const h = document.documentElement.scrollHeight - window.innerHeight
      setShow(window.scrollY > 500); setP(h > 0 ? Math.min(1, window.scrollY / h) : 0)
    }
    const on = () => { if (!raf) raf = requestAnimationFrame(f) }
    f(); window.addEventListener('scroll', on, { passive: true }); window.addEventListener('resize', on)
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); if (raf) cancelAnimationFrame(raf) }
  }, [])
  return (<>
    <div className="sprog" aria-hidden="true"><i style={{ transform: `scaleX(${p})` }} /></div>
    <div className="fab">
      <button type="button" className={'up' + (show ? ' on' : '')} aria-label="بازگشت به بالای صفحه" tabIndex={show ? 0 : -1} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><Icon n="up" s={20} /></button>
      <a className="call" href={'tel:' + SITE.phoneIntl} aria-label="تماس تلفنی با تک سازان"><Icon n="phone" s={22} /></a>
      <a className="wapp" href={wa()} target="_blank" rel="noopener noreferrer" aria-label="گفتگو در واتساپ"><Icon n="wa" s={26} /></a>
    </div>
  </>)
}
