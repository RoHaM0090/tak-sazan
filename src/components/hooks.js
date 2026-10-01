import { useEffect, useRef, useState } from 'react'

export const fa = n => String(n).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d])
export const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// آشکارسازی عناصر .rv هنگام اسکرول؛ با هر تغییر مسیر دوباره اجرا می‌شود.
export function useReveal(dep) {
  useEffect(() => {
    const els = [...document.querySelectorAll('.rv:not(.in),.imgr:not(.in)')]
    if (!els.length) return
    if (reduced() || !('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in')); return }
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }), { threshold: 0.12, rootMargin: '0px 0px -5% 0px' })
    els.forEach(e => io.observe(e))
    return () => io.disconnect()
  }, [dep])
}

// پارالکس بسیار ملایم
export function useParallax(ref, k = 0.06) {
  useEffect(() => {
    if (reduced() || !ref.current) return
    let raf = 0
    const f = () => { raf = 0; const y = Math.min(window.scrollY, 900); if (ref.current) ref.current.style.transform = `translate3d(0,${(y * k).toFixed(1)}px,0)` }
    const on = () => { if (!raf) raf = requestAnimationFrame(f) }
    window.addEventListener('scroll', on, { passive: true })
    return () => { window.removeEventListener('scroll', on); if (raf) cancelAnimationFrame(raf) }
  }, [ref, k])
}

export function Counter({ to, suffix = '' }) {
  const ref = useRef(null), [v, setV] = useState(to)
  useEffect(() => {
    const el = ref.current
    if (!el || reduced() || !('IntersectionObserver' in window)) return
    let raf = 0
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect(); setV(0)
      const t0 = performance.now(), d = 1200
      const tick = t => { const p = Math.min(1, (t - t0) / d); setV(Math.round(to * (1 - Math.pow(1 - p, 3)))); if (p < 1) raf = requestAnimationFrame(tick) }
      raf = requestAnimationFrame(tick)
    }, { threshold: 0.5 })
    io.observe(el)
    return () => { io.disconnect(); cancelAnimationFrame(raf) }
  }, [to])
  return <span ref={ref}>{fa(v)}{suffix}</span>
}
