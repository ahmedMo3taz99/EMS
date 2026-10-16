import { useEffect, useRef } from 'react';
import { decodeAll, reserveWidths } from '../../hooks/useDecodeLabel';

export default function SectionHero({ onBook }: { onBook: () => void }) {
  const suitRef = useRef<HTMLImageElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    // 1. maskUp text
    document.querySelectorAll<HTMLElement>('#hero .hrise').forEach((el, i) => {
      el.style.animation = `maskUp 1.1s var(--e-mask) ${0.65 + i * 0.16}s forwards`;
    });

    // 2. Suit fade-in — cap opacity on mobile so it stays subtle
    const suit = suitRef.current;
    if (suit) {
      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      const targetOpacity = isMobile ? '0.1' : '1';
      suit.style.transition = 'opacity 1.4s ease 0.5s, transform 1.6s var(--e-expo) 0.5s';
      suit.style.opacity = targetOpacity;
      suit.style.transform = 'translateY(0)';
      timers.push(setTimeout(() => {
        suit.style.transition = isMobile ? 'none' : 'none';
        if (isMobile) suit.style.opacity = '0.1';
      }, 2300));
    }

    // 3. Decode eyebrow
    timers.push(setTimeout(() => {
      const hero = document.getElementById('hero');
      reserveWidths(hero);
      decodeAll(hero, 60);
    }, 300));

    // 4. Mouse parallax on suit
    let cx = 0, cy = 0, tx = 0, ty = 0, raf = 0;
    const loop = () => {
      cx += (tx - cx) * 0.045;
      cy += (ty - cy) * 0.045;
      if (suit) suit.style.transform = `translateY(0) translate(${cx * -24}px, ${cy * -16}px)`;
      raf = Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001 ? requestAnimationFrame(loop) : 0;
    };
    const onMove = (e: MouseEvent) => {
      tx = e.clientX / innerWidth - 0.5;
      ty = e.clientY / innerHeight - 0.5;
      if (!raf) raf = requestAnimationFrame(loop);
    };
    window.addEventListener('mousemove', onMove);

    // 5. Magnetic hover on primary CTA
    const btn = btnRef.current;
    const onBtnMove = (e: MouseEvent) => {
      const r = btn!.getBoundingClientRect();
      btn!.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.22}px, ${(e.clientY - r.top - r.height / 2) * 0.22}px)`;
    };
    const onBtnLeave = () => { btn!.style.transform = ''; };
    btn?.addEventListener('mousemove', onBtnMove);
    btn?.addEventListener('mouseleave', onBtnLeave);

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener('mousemove', onMove);
      btn?.removeEventListener('mousemove', onBtnMove);
      btn?.removeEventListener('mouseleave', onBtnLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="hero" style={{
      position: 'relative', height: '100vh', minHeight: 600,
      overflow: 'hidden', isolation: 'isolate',
      background: 'var(--ink)', direction: 'rtl',
    }}>
      {/* Grid background */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)',
        backgroundSize: '60px 60px', opacity: 0.3,
      }} />

      {/* Blue glows */}
      <div style={{ position: 'absolute', top: '-20%', insetInlineEnd: '-5%', width: 900, height: 700, maxWidth: '100vw', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(27,114,232,0.22) 0%, transparent 65%)', filter: 'blur(80px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-15%', insetInlineStart: '-5%', width: 600, height: 500, maxWidth: '100vw', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(74,159,255,0.16) 0%, transparent 60%)', filter: 'blur(60px)', pointerEvents: 'none' }} />

      {/* Diagonal accent stripes */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            position: 'absolute',
            top: `${10 + i * 22}%`, insetInlineEnd: `${8 + i * 12}%`,
            width: '55%', height: '2px',
            background: `linear-gradient(90deg, transparent 0%, rgba(27,114,232,${0.18 - i * 0.04}) 50%, transparent 100%)`,
            transform: 'rotate(-28deg)',
          }} />
        ))}
      </div>

      <img
        ref={suitRef}
        className="hero-suit"
        src="/assets/img/suit.png"
        alt="EMS Suit"
        onError={e => { (e.target as HTMLImageElement).src = 'https://placehold.co/500x720/06070F/1B72E8?text=EMS'; }}
      />

      {/* Bottom fade */}
      <div style={{
        position: 'absolute', bottom: 0, insetInline: 0, height: '30vh',
        background: 'linear-gradient(to top, var(--ink) 0%, transparent 80%)',
        pointerEvents: 'none', zIndex: 2,
      }} />

      <div className="hero-content">
        <div className="t eyebrow" data-text="PRO-FIT · جلسات EMS داخل بيتك" style={{ marginBottom: 20, animation: 'fadeIn 0.7s var(--e-soft) 0.4s both', maxWidth: '100%' }} />

        <h1 style={{
          fontSize: 'clamp(2.4rem, 5vw + 0.5rem, 6rem)', fontWeight: 900, lineHeight: 1.05, margin: 0,
          color: 'var(--white)',
        }}>
          <span className="hrise-wrap"><span className="hrise">خلّ جسمك</span></span>
          <span className="hrise-wrap"><span className="hrise">يحس بالفرق</span></span>
        </h1>

        <p style={{
          fontSize: 'clamp(0.85rem, 1.2vw, 1.05rem)', color: 'var(--muted)', lineHeight: 1.7,
          marginTop: 20, marginBottom: 0, animation: 'fadeUp 0.8s var(--e-expo) 1.1s both',
        }}>
          جلسات تدريب شخصية داخل بيتك — بتقنية EMS المتطورة
        </p>

        <div className="hero-ctas" style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 32, animation: 'fadeUp 0.8s var(--e-expo) 1.3s both' }}>
          <button ref={btnRef} className="btn btn-primary" data-cursor="hover" onClick={onBook}>احجز جلستك الآن</button>
          <button className="btn btn-ghost" data-cursor="hover"
            onClick={() => document.getElementById('ems')?.scrollIntoView({ behavior: 'smooth' })}>
            تعرف على التقنية
          </button>
        </div>

        <div className="shine-line" style={{ width: 160, marginTop: 32, animation: 'shineX 2.8s linear infinite, fadeIn 0.6s ease 1.5s both' }} />
      </div>

      {/* Scroll hint */}
      <div style={{
        position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        zIndex: 3, animation: 'fadeIn 0.8s ease 2s both',
      }}>
        <div style={{ width: 1.5, height: 48, background: 'var(--blue)', borderRadius: 999, animation: 'float 1.8s ease-in-out infinite' }} />
        <span style={{ fontSize: 9, color: 'var(--muted)', letterSpacing: 3, fontWeight: 600, textTransform: 'uppercase' }}>مرّر للأسفل</span>
      </div>
    </section>
  );
}
