import { useEffect } from 'react';

export function usePixelUnit() {
  useEffect(() => {
    let raf = 0;
    const set = () => {
      const u = Math.max(0.55, Math.min(Math.min(innerWidth / 1440, innerHeight / 900), 1.6));
      document.documentElement.style.setProperty('--u', u + 'px');
    };
    const onResize = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(set); };
    window.addEventListener('resize', onResize);
    set();
    return () => { window.removeEventListener('resize', onResize); cancelAnimationFrame(raf); };
  }, []);
}
