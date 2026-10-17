import { useEffect, useRef } from 'react';

export default function useMediaReveal() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const section = ref.current;
    if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08 });
    section.classList.add('media-reveal-ready');
    section.querySelectorAll('[data-media-reveal]').forEach(element => observer.observe(element));
    return () => { observer.disconnect(); section.classList.remove('media-reveal-ready'); };
  }, []);
  return ref;
}
