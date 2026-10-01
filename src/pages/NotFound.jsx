import SEO from '../seo/SEO.jsx'
import { Btn } from '../components/ui.jsx'
import { SERVICES } from '../data/content.js'

export default function NotFound() {
  return (<>
    <SEO path="/404" />
    <section className="nf"><div className="grid-bg" aria-hidden="true" /><div className="wrap">
      <p className="big404" aria-hidden="true">۴۰۴</p>
      <h1>صفحه مورد نظر پیدا نشد</h1>
      <p className="lead">آدرس را اشتباه وارد کرده‌اید یا صفحه جابه‌جا شده است. از لینک‌های زیر ادامه دهید.</p>
      <div className="cta"><Btn to="/" icon="arrow">صفحه اصلی</Btn><Btn to="/services" v="line">خدمات</Btn><Btn to="/contact" v="line">تماس با ما</Btn></div>
      <ul className="nf-links">{SERVICES.map(s => <li key={s.slug}><a href={'/services/' + s.slug}>{s.name}</a></li>)}</ul>
    </div></section>
  </>)
}
