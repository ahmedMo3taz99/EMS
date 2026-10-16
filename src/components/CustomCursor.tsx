import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rx = 0, ry = 0, mx = 0, my = 0, raf = 0;

    function loop() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (ringRef.current) {
        const s = ringRef.current.classList.contains('hover') ? ' scale(1.9)' : '';
        ringRef.current.style.transform = `translate(${rx - 18}px, ${ry - 18}px)${s}`;
      }
      raf = requestAnimationFrame(loop);
    }
    function onMove(e: MouseEvent) {
      mx = e.clientX; my = e.clientY;
      if (dotRef.current) dotRef.current.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
    }
    function onEnter(e: Event) {
      const t = e.target as HTMLElement;
      if (t.closest('[data-cursor="hover"], button, a')) ringRef.current?.classList.add('hover');
    }
    function onLeave() { ringRef.current?.classList.remove('hover'); }

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onEnter);
    document.addEventListener('mouseout', onLeave);
    raf = requestAnimationFrame(loop);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
