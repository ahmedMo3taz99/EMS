import { useEffect, useState } from 'react';

interface Props { onDone: () => void }

export default function Loader({ onDone }: Props) {
  const [phase, setPhase] = useState<'loading' | 'fading' | 'done'>('loading');

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhase('done');
      onDone();
      return;
    }
    const reveal = window.setTimeout(() => {
      setPhase('fading');
      onDone();
    }, 500);
    const finish = window.setTimeout(() => setPhase('done'), 700);
    return () => { window.clearTimeout(reveal); window.clearTimeout(finish); };
  }, [onDone]);

  if (phase === 'done') return null;

  return (
    <div id="loader" className={phase === 'fading' ? 'is-complete' : undefined} role="status" aria-label="جاري تحميل PRO-FIT">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img src="/assets/img/logo-only.png" alt="PRO-FIT" style={{ width: 'min(280px, 68vw)', height: 'auto' }} fetchPriority="high" />
        <div className="loader-bar-wrap" aria-hidden="true"><div className="loader-bar" /></div>
      </div>
    </div>
  );
}
