import SEO from '../seo/SEO.jsx'
import { schemas } from '../seo/head.js'
import { PageHero, FAQ, CTA } from '../components/ui.jsx'
import { FAQS } from '../data/content.js'

const crumbs = [{ name: 'خانه', path: '/' }, { name: 'سؤالات متداول', path: '/faq' }]
export default function FaqPage() {
  return (<>
    <SEO path="/faq" crumbs={crumbs} extra={[schemas.faq(FAQS)]} />
    <PageHero crumbs={crumbs} title="سؤالات متداول تزریق پلاستیک و قالب‌سازی" lead="پاسخ کوتاه و صریح به پرسش‌های رایج درباره خدمات تک سازان. اگر پاسخ خود را پیدا نکردید، مستقیم بپرسید." />
    <section className="sec" aria-labelledby="fq"><div className="wrap narrow"><h2 id="fq" className="sr">فهرست سؤالات</h2><FAQ items={FAQS} /></div></section>
    <CTA title="پرسش شما در اینجا نبود؟" text="سؤال خود را در واتساپ بپرسید یا تماس بگیرید." />
  </>)
}
