const D = {
  inject: <><rect x="4" y="18" width="24" height="12" rx="3" /><path d="M28 24h10l6-4v8l-6-4M10 18v-6h10v6M8 34h32" /></>,
  mold: <><rect x="6" y="6" width="36" height="14" rx="2" /><rect x="6" y="28" width="36" height="14" rx="2" /><path d="M16 20v8M32 20v8" /></>,
  repair: <path d="M30 8a9 9 0 0 0-8 12L8 34l6 6 14-14a9 9 0 0 0 12-8l-6 4-5-1-1-5z" />,
  parts: <path d="M24 6l16 9v18l-16 9-16-9V15zM8 15l16 9 16-9M24 24v18" />,
  phone: <path d="M12 6h8l3 10-5 3a24 24 0 0 0 11 11l3-5 10 3v8a4 4 0 0 1-4 4C22 40 8 26 8 10a4 4 0 0 1 4-4z" />,
  wa: <><path d="M8 40l3-9a16 16 0 1 1 6 6z" /><path d="M18 18c0 6 6 12 12 12l2-3-4-2-2 1c-2-1-4-3-5-5l1-2-2-4z" /></>,
  pin: <><path d="M24 44s14-12.5 14-24a14 14 0 0 0-28 0c0 11.5 14 24 14 24z" /><circle cx="24" cy="20" r="5" /></>,
  clock: <><circle cx="24" cy="24" r="17" /><path d="M24 14v10l7 5" /></>,
  check: <path d="M10 25l9 9 19-20" />,
  arrow: <path d="M40 24H9M19 13L8 24l11 11" />,
  insta: <><rect x="6" y="6" width="36" height="36" rx="10" /><circle cx="24" cy="24" r="8" /><circle cx="34" cy="14" r="1.5" /></>,
  up: <path d="M24 38V10M12 22l12-12 12 12" />,
  chev: <path d="M12 18l12 12 12-12" />,
  ruler: <path d="M6 30L24 12l12 12-18 18zM16 26l4 4M22 20l4 4M28 14l4 4" />,
  shield: <><path d="M24 6l14 5v11c0 9-6 16-14 20-8-4-14-11-14-20V11z" /><path d="M17 24l5 5 9-10" /></>,
  doc: <><path d="M12 6h16l8 8v28H12z" /><path d="M28 6v8h8M18 24h12M18 31h12" /></>,
  box: <path d="M6 14l18-8 18 8v20l-18 8-18-8zM6 14l18 8 18-8M24 22v20" />,
  search: <><circle cx="20" cy="20" r="12" /><path d="M29 29l12 12" /></>,
  chat: <><path d="M8 10h32v22H22l-9 8v-8H8z" /><path d="M16 19h16M16 25h10" /></>,
  plus: <path d="M24 10v28M10 24h28" />,
  sliders: <><path d="M8 14h32M8 24h32M8 34h32" /><circle cx="16" cy="14" r="3" fill="var(--sf)" /><circle cx="32" cy="24" r="3" fill="var(--sf)" /><circle cx="20" cy="34" r="3" fill="var(--sf)" /></>,
}

export default function Icon({ n, s = 24, ...r }) {
  return <svg viewBox="0 0 48 48" width={s} height={s} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...r}>{D[n]}</svg>
}
