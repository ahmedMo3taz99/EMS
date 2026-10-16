import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

export default function SectionBook() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Opposite sides on wide screens; on narrow ones (stacked) a horizontal offset would overflow, so keep it small
      const dx = window.innerWidth <= 768 ? 24 : 80;
      const trigger = { trigger: section, start: 'top 70%' };
      gsap.fromTo(leftRef.current, { x: -dx, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: trigger });
      gsap.fromTo(rightRef.current, { x: dx, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.15, scrollTrigger: trigger });
    });

    // Magnetic hover on WhatsApp button
    const waBtn = section.querySelector<HTMLElement>('.btn-wa');
    const onMove = (e: MouseEvent) => {
      const r = waBtn!.getBoundingClientRect();
      waBtn!.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px, ${(e.clientY - r.top - r.height / 2) * 0.25}px)`;
    };
    const onLeave = () => { waBtn!.style.transform = ''; };
    waBtn?.addEventListener('mousemove', onMove);
    waBtn?.addEventListener('mouseleave', onLeave);

    return () => {
      mm.revert();
      waBtn?.removeEventListener('mousemove', onMove);
      waBtn?.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <section ref={sectionRef} id="book" style={{
      padding: 'clamp(60px, 8vh, 96px) clamp(20px, 5vw, 80px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--ink)', direction: 'rtl',
      position: 'relative', overflow: 'hidden',
      gap: 'clamp(40px, 6vw, 100px)', flexWrap: 'wrap',
    }}>
      <div style={{
        position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)',
        width: '70vw', height: '70vh',
        background: 'radial-gradient(ellipse, rgba(27,114,232,0.1) 0%, transparent 65%)',
        filter: 'blur(80px)', pointerEvents: 'none',
      }} />

      <div ref={leftRef} style={{ flex: '1 1 300px', maxWidth: 480, position: 'relative' }}>
        <div className="eyebrow" style={{ marginBottom: 20 }}>ابدأ رحلتك</div>
        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 900, lineHeight: 1.1, margin: '0 0 20px', color: 'var(--white)' }}>
          جاهز تبدأ<br /><span style={{ color: 'var(--blue)' }}>رحلتك؟</span>
        </h2>
        <p style={{ fontSize: 'clamp(0.9rem, 1.2vw, 1rem)', color: 'var(--muted)', lineHeight: 1.8, marginBottom: 32 }}>
          احجز جلستك الأولى اليوم — داخل بيتك، مع كوتش متخصص، بدون التزام.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {['جلسة تجريبية بدون التزام', 'كوتش معتمد ومتخصص', 'داخل بيتك — نجي إليك', 'مرونة كاملة في الجدولة'].map((t, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--blue)', flexShrink: 0, animation: 'pulse 2s ease-in-out infinite', animationDelay: `${i * 0.3}s` }} />
              <span style={{ fontSize: '0.88rem', color: 'var(--muted)', fontWeight: 600 }}>{t}</span>
            </div>
          ))}
        </div>
      </div>

      <div ref={rightRef} style={{ flex: '0 1 auto', maxWidth: '100%', position: 'relative' }}>
        <div className="glass-card book-box" style={{
          padding: 'clamp(28px, 5vh, 52px) clamp(22px, 4vw, 48px)',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: 'clamp(16px, 2.5vh, 24px)', textAlign: 'center',
        }}>
          <div style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)', fontWeight: 800, color: 'var(--white)', direction: 'ltr', letterSpacing: 1 }}>
            {import.meta.env.VITE_PHONE_DISPLAY}
          </div>

          <div style={{ display: 'flex', gap: 12, width: '100%', flexWrap: 'wrap' }}>
            <a href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="btn btn-wa" data-cursor="hover"
              style={{ flex: 1, minWidth: 120 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.032L.789 23.211l4.306-1.376A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.003-1.371l-.359-.213-3.72 1.189 1.219-3.614-.234-.372A9.818 9.818 0 112 12c0-5.422 4.396-9.818 9.818-9.818z"/>
              </svg>
              واتساب
            </a>
            <a href={`tel:+${import.meta.env.VITE_WHATSAPP_NUMBER}`} className="btn btn-ghost" data-cursor="hover" style={{ flex: 1, minWidth: 100 }}>اتصل</a>
          </div>

          <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, color: 'var(--muted)', fontSize: 11 }}>
            <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />أو<div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
          </div>

          <a href={`mailto:${import.meta.env.VITE_EMAIL}`}
            style={{ fontSize: 12, color: 'var(--muted)', textDecoration: 'none', transition: 'color 0.2s', overflowWrap: 'anywhere' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--blue-lt)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}>
            {import.meta.env.VITE_EMAIL}
          </a>

          <div className="shine-line" style={{ width: '100%' }} />

          <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 600, lineHeight: 1.8 }}>
            السجل التجاري: {import.meta.env.VITE_COMMERCIAL_REG}
          </div>
        </div>
      </div>
    </section>
  );
}
