import { useEffect, useRef } from 'react';

interface Props { onDone: () => void }

export default function Loader({ onDone }: Props) {
  const barRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLDivElement>(null);
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let pct = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];
    let iv: ReturnType<typeof setInterval> | undefined;
    timers.push(setTimeout(() => {
      if (barRef.current) barRef.current.style.width = '100%';
      iv = setInterval(() => {
        pct = Math.min(pct + 2, 100);
        if (pctRef.current) pctRef.current.textContent = pct + '%';
        if (pct >= 100) {
          clearInterval(iv);
          timers.push(setTimeout(() => {
            elRef.current?.classList.add('hidden');
            timers.push(setTimeout(onDone, 500));
          }, 320));
        }
      }, 28);
    }, 200));
    return () => { timers.forEach(clearTimeout); if (iv) clearInterval(iv); };
  }, [onDone]);

  return (
    <div id="loader" ref={elRef}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ fontSize: 'clamp(2rem, calc(36*var(--u)), 2.8rem)', fontWeight: 900, letterSpacing: 'calc(4*var(--u))', direction: 'ltr' }}>
          <span style={{ color: 'var(--white)' }}>PRO</span>
          <span style={{ color: 'var(--muted)' }}>-</span>
          <span style={{ color: 'var(--blue)' }}>FIT</span>
        </div>
        <div style={{ fontSize: 'clamp(0.6rem, calc(10*var(--u)), 0.75rem)', color: 'var(--muted)', letterSpacing: 'calc(5*var(--u))', textTransform: 'uppercase', marginTop: 'calc(6*var(--u))' }}>
          EMS Training Solutions
        </div>
        <div className="loader-bar-wrap"><div className="loader-bar" ref={barRef} /></div>
        <div ref={pctRef} style={{ fontSize: 'clamp(0.6rem, calc(10*var(--u)), 0.7rem)', color: 'var(--blue)', fontWeight: 600, marginTop: 'calc(10*var(--u))', letterSpacing: 'calc(2*var(--u))' }}>0%</div>
      </div>
    </div>
  );
}
