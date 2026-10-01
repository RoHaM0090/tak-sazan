// اطلاعات رسمی تک سازان؛ برای ویرایش، فقط همین فایل را تغییر دهید.
// توجه: این فایل هم در مرورگر و هم هنگام build در Node اجرا می‌شود؛ از import.meta.env در آن استفاده نکنید.
export const SITE = {
  name: 'تک سازان',
  nameEn: 'Tak Sazan',
  slogan: 'دقت در قالب، اعتماد در تولید',
  // اگر دامنه اختصاصی گرفتید، فقط همین خط را عوض کنید؛ canonical، sitemap و schema خودکار اصلاح می‌شوند.
  url: 'https://tak-sazan.netlify.app',
  phone: '09122109894',
  phoneIntl: '+989122109894',
  whatsapp: '989122109894', // فرمت بین‌المللی، فقط رقم
  whatsappDisplay: '09122109894',
  address: 'شهریار، شاهد شهر، خیابان آزادی، پلاک چهارده',
  street: 'شاهد شهر، خیابان آزادی، پلاک ۱۴',
  city: 'شهریار',
  region: 'تهران',
  hoursOpen: 'شنبه تا پنج‌شنبه: ۷ صبح تا ۷ عصر',
  hoursClosed: 'جمعه: تعطیل',
  instagram: 'https://www.instagram.com/ho3infarnam1/',
  mapLink: 'https://neshan.org/maps/places/sbQa9rOxBeCP',
  mapEmbedUrl: '',
  heroImage: '/hero.jpg',
  machineImage: '/machine.jpg',
}

// لینک واتساپ با متن آماده
export const wa = (text = 'سلام، از طریق سایت تک سازان پیام می‌دهم.') =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`
