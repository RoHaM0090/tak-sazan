import { useState } from 'react'
import SEO from '../seo/SEO.jsx'
import { schemas } from '../seo/head.js'
import { PageHero, ContactCards, Btn } from '../components/ui.jsx'
import Icon from '../components/Icon.jsx'
import { SITE, wa } from '../config/site.js'

const crumbs = [{ name: 'خانه', path: '/' }, { name: 'تماس با ما', path: '/contact' }]
export default function Contact() {
  const [f, setF] = useState({ name: '', msg: '' }), [e, setE] = useState('')
  const go = ev => {
    ev.preventDefault()
    if (f.name.trim().length < 3 || f.msg.trim().length < 5) { setE('لطفاً نام و پیام خود را وارد کنید.'); return }
    setE('')
    const url = wa(`سلام، من ${f.name.trim()} هستم.\n${f.msg.trim()}`)
    const w = window.open(url, '_blank', 'noopener'); if (!w) window.location.href = url
  }
  return (<>
    <SEO path="/contact" crumbs={crumbs} extra={[schemas.business()]} />
    <PageHero crumbs={crumbs} title="تماس با تک سازان" lead="برای مشاوره، برآورد سفارش یا تعمیر قالب، از یکی از راه‌های زیر با ما در ارتباط باشید." />
    <section className="sec" aria-labelledby="ct1"><div className="wrap">
      <h2 id="ct1" className="sr">راه‌های تماس</h2>
      <ContactCards />
    </div></section>
    <section className="sec alt" aria-labelledby="ct2"><div className="grid-bg light" aria-hidden="true" /><div className="wrap two top">
      <div className="rv">
        <span className="kick">مسیریابی</span><h2 id="ct2">آدرس تک سازان در شهریار</h2>
        <p>{SITE.address}. برای مسیریابی دقیق از نقشه نشان استفاده کنید.</p>
        <div className="map"><div className="mapgrid" aria-hidden="true" /><div className="pin"><Icon n="pin" s={44} /></div><p>{SITE.city}، شاهد شهر</p></div>
        <div className="cta"><Btn href={SITE.mapLink} icon="arrow">مسیریابی روی نشان</Btn></div>
      </div>
      <form className="form glass rv" onSubmit={go} noValidate aria-labelledby="ct3" style={{ '--d': '.1s' }}>
        <h2 id="ct3">پیام سریع</h2>
        <div className={'fld' + (e && f.name.trim().length < 3 ? ' bad' : '')}><label htmlFor="c-name">نام شما</label><input id="c-name" value={f.name} onChange={v => setF({ ...f, name: v.target.value })} autoComplete="name" required /></div>
        <div className={'fld' + (e && f.msg.trim().length < 5 ? ' bad' : '')}><label htmlFor="c-msg">پیام</label><textarea id="c-msg" rows="5" value={f.msg} onChange={v => setF({ ...f, msg: v.target.value })} required /></div>
        {e && <p className="err" role="alert">{e}</p>}
        <p className="small">پیام شما در واتساپ آماده ارسال می‌شود.</p>
        <button className="btn pri big" type="submit"><Icon n="wa" s={20} />ارسال در واتساپ</button>
      </form>
    </div></section>
  </>)
}
