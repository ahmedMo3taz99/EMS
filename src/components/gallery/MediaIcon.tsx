type IconName = 'play' | 'expand' | 'close' | 'next' | 'previous' | 'plus' | 'arrow' | 'home' | 'clock' | 'shield';

export default function MediaIcon({ name }: { name: IconName }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {name === 'play' && <path d="m9 5 11 7-11 7V5Z" fill="currentColor" stroke="none" />}
    {name === 'expand' && <path d="M8 3H3v5m13-5h5v5M3 16v5h5m8 0h5v-5" />}
    {name === 'close' && <path d="m6 6 12 12M6 18 18 6" />}
    {name === 'next' && <path d="m15 5-7 7 7 7" />}
    {name === 'previous' && <path d="m9 5 7 7-7 7" />}
    {name === 'plus' && <path d="M12 5v14M5 12h14" />}
    {name === 'arrow' && <path d="M19 12H5m6-6-6 6 6 6" />}
    {name === 'home' && <path d="m3 10 9-7 9 7v10H3V10Zm6 10v-7h6v7" />}
    {name === 'clock' && <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>}
    {name === 'shield' && <><path d="m12 3 8 3v6c0 4-4 7-8 9-4-2-8-5-8-9V6l8-3Z" /><path d="m8 12 3 3 5-6" /></>}
  </svg>;
}
