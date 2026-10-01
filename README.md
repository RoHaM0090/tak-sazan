# تک سازان — وب‌سایت چندصفحه‌ای (React + Vite + React Router)

## اجرا
```
npm install
npm run dev        # توسعه
npm run build      # build + پیش‌رندر همه صفحات + sitemap.xml + robots.txt
```
`npm run build` سه مرحله دارد: ساخت کلاینت، ساخت باندل SSR، و تولید فایل HTML کامل برای هر مسیر (`scripts/prerender.mjs`).
نتیجه در پوشه `dist` است و روی Netlify با همین `netlify.toml` منتشر می‌شود.

## ویرایش اطلاعات
- تلفن، آدرس، ساعات کاری، دامنه، شبکه‌ها: `src/config/site.js` (تنها منبع اطلاعات؛ SEO و sitemap از همین‌جا ساخته می‌شود)
- متن خدمات، FAQ، فرآیند و مقالات: `src/data/content.js`
- عنوان و توضیحات متا هر صفحه: `src/data/routes.js`
- رنگ‌ها و فونت: ابتدای `src/index.css`

## افزودن نمونه‌کار واقعی
در `src/pages/Portfolio.jsx` آرایه `PROJECTS` را با `{ title, desc, img }` پر کنید و بعد از داشتن حداقل چند پروژه واقعی،
خط `noindex: true` را از `/portfolio` در `src/data/routes.js` بردارید تا صفحه وارد sitemap شود.

## تصاویر پیش/پس از تعمیر
کامپوننت `BeforeAfter` (در `src/components/sections.jsx`) با props به نام `before` و `after` اسلایدر مقایسه تصویر را فعال می‌کند.
تا آن زمان فقط متن غیرادعایی نمایش داده می‌شود.
