import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import SEO from '../seo/SEO.jsx'
import { PageHero, Btn } from '../components/ui.jsx'
import Icon from '../components/Icon.jsx'
import { SERVICES } from '../data/content.js'
import { SITE, wa } from '../config/site.js'

const crumbs = [{ name: 'خانه', path: '/' }, { name: 'ثبت سفارش', path: '/order' }]
const toEn = s => s.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d)).replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d))
const OPTS = [...SERVICES.map(s => s.name), 'مطمئن نیستم / نیاز به مشاوره']

function validate(f) {
  const e = {}
  if (f.name.trim().length < 3) e.name = 'نام و نام خانوادگی را وارد کنید.'
  if (!/^09\d{9}$/.test(toEn(f.phone).replace(/[\s-]/g, ''))) e.phone = 'شماره موبایل معتبر وارد کنید (مثل 09123456789).'
  if (!f.service) e.service = 'نوع خدمت را انتخاب کنید.'
  if (f.note.trim().length < 10) e.note = 'توضیحات سفارش را کمی کامل‌تر بنویسید (حداقل ۱۰ حرف).'
  return e
}

export default function Order() {
  const [f, setF] = useState({ name: '', phone: '', service: '', qty: '', part: '', note: '' })
  const [sp] = useSearchParams()
  useEffect(() => { const s = SERVICES.find(x => x.slug === sp.get('service')); if (s) setF(v => v.service ? v : { ...v, service: s.name }) }, [sp])
  const [file, setFile] = useState(''), [err, setErr] = useState({}), [sent, setSent] = useState('')
  const set = k => e => { setF({ ...f, [k]: e.target.value }); if (err[k]) setErr({ ...err, [k]: '' }) }
  const send = e => {
    e.preventDefault()
    const v = validate(f)
    setErr(v)
    if (Object.keys(v).length) { document.getElementById('o-' + Object.keys(v)[0])?.focus(); return }
    const lines = [`سلام، سفارش جدید از سایت ${SITE.name}`, '', `نام و نام خانوادگی: ${f.name.trim()}`, `شماره تماس: ${toEn(f.phone).trim()}`, `نوع خدمت: ${f.service}`, `تعداد تقریبی: ${f.qty.trim() || 'مشخص نشده'}`, `نوع قطعه: ${f.part.trim() || 'مشخص نشده'}`, `توضیحات: ${f.note.trim()}`]
    if (file) lines.push('', 'عکس یا فایل دارم و بعد از باز شدن گفتگو ارسال می‌کنم.')
    const url = wa(lines.join('\n'))
    setSent(url)
    const w = window.open(url, '_blank', 'noopener')
    if (!w) window.location.href = url
  }
  const fld = (k, label, el, hint) => (<div className={'fld' + (err[k] ? ' bad' : '')}>
    <label htmlFor={'o-' + k}>{label}</label>{el}
    {hint && <small id={'h-' + k}>{hint}</small>}
    {err[k] && <p className="err" id={'e-' + k} role="alert">{err[k]}</p>}
  </div>)
  const aria = k => ({ id: 'o-' + k, 'aria-invalid': !!err[k], 'aria-describedby': err[k] ? 'e-' + k : undefined })
  return (<>
    <SEO path="/order" crumbs={crumbs} />
    <PageHero crumbs={crumbs} title="ثبت سفارش تزریق پلاستیک و قالب‌سازی" lead="مشخصات سفارش را بنویسید؛ متن سفارش آماده می‌شود و در واتساپ برای تک سازان ارسال می‌شود." />
    <section className="sec" aria-labelledby="ord"><div className="wrap order-grid">
      <div className="rv">
        {sent ? (<div className="ok" role="status"><span className="ic"><Icon n="check" s={30} /></span>
          <h2 id="ord">سفارش شما آماده ارسال است</h2>
          <p>واتساپ با متن سفارش شما باز شد. اگر باز نشد، دکمه زیر را بزنید و پیام را در همان‌جا ارسال کنید.</p>
          {file && <p className="warn">فایل «{file}» به‌صورت خودکار ارسال نمی‌شود؛ آن را در گفتگوی واتساپ پیوست کنید.</p>}
          <div className="cta"><Btn href={sent} v="wa" icon="wa">باز کردن واتساپ</Btn><button type="button" className="btn line" onClick={() => setSent('')}>ثبت سفارش جدید</button></div></div>)
          : (<form className="form glass" onSubmit={send} noValidate aria-labelledby="ord">
            <h2 id="ord">فرم سفارش</h2>
            <div className="frow">
              {fld('name', 'نام و نام خانوادگی', <input {...aria('name')} value={f.name} onChange={set('name')} autoComplete="name" required />)}
              {fld('phone', 'شماره تماس', <input {...aria('phone')} value={f.phone} onChange={set('phone')} inputMode="tel" dir="ltr" autoComplete="tel" placeholder="09123456789" required />)}
            </div>
            {fld('service', 'نوع خدمت', <select {...aria('service')} value={f.service} onChange={set('service')} required><option value="">انتخاب کنید…</option>{OPTS.map(o => <option key={o}>{o}</option>)}</select>)}
            <div className="frow">
              {fld('qty', 'تعداد تقریبی', <input {...aria('qty')} value={f.qty} onChange={set('qty')} inputMode="numeric" placeholder="مثلاً ۵۰۰۰ عدد" />)}
              {fld('part', 'نوع قطعه', <input {...aria('part')} value={f.part} onChange={set('part')} placeholder="مثلاً درپوش، بدنه، اتصال" />)}
            </div>
            {fld('note', 'توضیحات سفارش', <textarea {...aria('note')} rows="5" value={f.note} onChange={set('note')} required />, 'ابعاد، جنس ماده، رنگ و هر نکته مهم را بنویسید.')}
            <div className="fld"><label htmlFor="o-file">عکس یا فایل (اختیاری)</label>
              <input id="o-file" type="file" accept="image/*,.pdf" onChange={e => setFile(e.target.files?.[0]?.name || '')} aria-describedby="h-file" />
              <div className="filenote" id="h-file"><Icon n="doc" s={18} /><p><b>توجه:</b> لینک واتساپ نمی‌تواند فایل را خودکار ضمیمه کند و فایل شما روی سایت ذخیره نمی‌شود. اگر عکس یا نقشه دارید، بعد از باز شدن گفتگوی واتساپ آن را همان‌جا پیوست کنید.</p></div>
            </div>
            <button className="btn pri big" type="submit"><Icon n="wa" s={20} />ارسال سفارش در واتساپ</button>
          </form>)}
      </div>
      <aside className="side rv" aria-label="راه‌های دیگر سفارش" style={{ '--d': '.1s' }}>
        <h2>راه‌های دیگر</h2>
        <a className="ccard" href={'tel:' + SITE.phoneIntl}><span className="ic"><Icon n="phone" s={22} /></span><div><small>تماس مستقیم</small><b dir="ltr">{SITE.phone}</b></div></a>
        <a className="ccard" href={wa()} target="_blank" rel="noopener noreferrer"><span className="ic"><Icon n="wa" s={22} /></span><div><small>واتساپ</small><b>شروع گفتگو</b></div></a>
        <div className="need"><h3>قبل از ارسال آماده کنید</h3><ul><li><Icon n="check" s={16} />نمونه یا نقشه قطعه</li><li><Icon n="check" s={16} />تعداد تقریبی</li><li><Icon n="check" s={16} />جنس ماده (اگر می‌دانید)</li></ul></div>
        <p className="small">{SITE.hoursOpen}<br />{SITE.hoursClosed}</p>
      </aside>
    </div></section>
  </>)
}
