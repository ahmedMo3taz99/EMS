import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

const STATS = [
  { num: 150, suffix: '+', label: 'عميل راضٍ' },
  { num: 1200, suffix: '+', label: 'جلسة مكتملة' },
  { num: 100, suffix: '%', label: 'رضا العملاء' },
];

const DESKTOP_IMGS = [
  '/assets/img/fb-1.jpg', '/assets/img/fb-2.jpg',
  '/assets/img/fb-3.jpg', '/assets/img/fb-4.jpg',
  '/assets/img/fb-1.jpg', '/assets/img/fb-2.jpg',
  '/assets/img/fb-3.jpg', '/assets/img/fb-4.jpg',
];

const MOBILE_IMGS = [
  '/assets/img/fb-1.jpg', '/assets/img/fb-2.jpg',
  '/assets/img/fb-3.jpg', '/assets/img/fb-4.jpg',
];

function countUp(el: HTMLElement, target: number, suffix: string) {
  let current = 0;
  const step = Math.ceil(target / 50);
  const id = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current + suffix;
    if (current >= target) clearInterval(id);
  }, 25);
}

export default function SectionFeedback() {
  const [showMore, setShowMore] = useState(false);
  const wrapRef  = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const wrap = wrapRef.current, inner = innerRef.current, track = trackRef.current;
    if (!wrap || !inner || !track) return;

    let counted = false;
    const mm = gsap.matchMedia();

    // CountUp — all sizes
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(statsRef.current!.querySelectorAll('.stat-item'), { opacity: 0, y: 24 }, {
        opacity: 1, y: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out',
        scrollTrigger: {
          trigger: statsRef.current, start: 'top 85%',
          onEnter: () => {
            if (counted) return;
            counted = true;
            statsRef.current!.querySelectorAll<HTMLElement>('[data-count]').forEach(span =>
              countUp(span, parseInt(span.dataset.count!, 10), span.dataset.suffix!));
          },
        },
      });
    });

    // Desktop: pinned horizontal scroll — LTR track, x goes 0 → -distance
    // This shows fb-1 first (left), scrolls RIGHT to reveal more cards, ends at CTA
    mm.add('(min-width: 769px) and (prefers-reduced-motion: no-preference)', () => {
      const distance = () => Math.max(0, track.scrollWidth - inner.clientWidth);
      gsap.fromTo(track, { x: 0 }, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: wrap, start: 'top top',
          end: () => `+=${distance() + window.innerHeight * 0.5}`,
          scrub: 1, pin: inner, anticipatePin: 1, invalidateOnRefresh: true,
        },
      });
    });

    return () => mm.revert();
  }, []);

  // Animate mobile cards on show more
  useLayoutEffect(() => {
    if (!showMore) return;
    const extras = document.querySelectorAll<HTMLElement>('.fb-mobile-extra');
    gsap.from(extras, { opacity: 0, y: 30, stagger: 0.12, duration: 0.6, ease: 'power3.out' });
  }, [showMore]);

  return (
    <div ref={wrapRef} id="feedback" style={{ position: 'relative', direction: 'rtl' }}>
      {/* ─── DESKTOP INNER (pinned) ─── */}
      <div ref={innerRef} style={{
        height: '100vh', overflow: 'hidden',
        background: 'var(--ink)',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        direction: 'ltr',
      }}>
        {/* bg glow */}
        <div style={{
          position: 'absolute', left: '50%', top: '30%', transform: 'translate(-50%,-50%)',
          width: '60vw', height: '60vh',
          background: 'radial-gradient(ellipse, rgba(27,114,232,0.07) 0%, transparent 65%)',
          filter: 'blur(80px)', pointerEvents: 'none',
        }} />

        {/* Stats + heading */}
        <div ref={statsRef} style={{ padding: '0 clamp(20px,5vw,80px)', marginBottom: 'clamp(16px,3vh,28px)', flexShrink: 0, position: 'relative', direction: 'rtl' }}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>آراء العملاء</div>
          <h2 style={{ fontSize: 'clamp(1.6rem,3.5vw,2.8rem)', fontWeight: 900, color: 'var(--white)', margin: '0 0 16px', lineHeight: 1.15 }}>
            ليش الناس <span style={{ color: 'var(--blue)' }}>تحب ProFit؟</span>
          </h2>
          <div style={{ display: 'flex', gap: 'clamp(20px,5vw,56px)', flexWrap: 'wrap' }}>
            {STATS.map((s, i) => (
              <div key={i} className="stat-item" style={{ opacity: 0 }}>
                <div style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 900, color: 'var(--blue)', lineHeight: 1, direction: 'ltr' }}>
                  <span data-count={s.num} data-suffix={s.suffix}>{s.num}{s.suffix}</span>
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--muted)', fontWeight: 600, marginTop: 3 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Horizontal track — LTR so GSAP x:-distance works: fb-1 on left → CTA on right */}
        <div ref={trackRef} style={{
          display: 'flex', direction: 'ltr',
          gap: 'clamp(12px,1.5vw,18px)',
          padding: '0 clamp(20px,5vw,80px) 8px',
          willChange: 'transform', flexShrink: 0, alignItems: 'flex-start',
        }}>
          {DESKTOP_IMGS.map((src, i) => (
            <div key={i} className="fb-card glass-card" data-cursor="hover" style={{
              flexShrink: 0, width: 'clamp(220px,24vw,340px)',
              overflow: 'hidden', borderRadius: 16,
            }}>
              <img src={src} alt={`تقييم عميل ${(i % 4) + 1}`}
                onError={e => { (e.target as HTMLImageElement).src = `https://placehold.co/320x480/E8F0FF/1B72E8?text=Review+${(i%4)+1}`; }}
                style={{ width: '100%', height: 'clamp(260px,42vh,500px)', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
              />
            </div>
          ))}

          {/* CTA — LAST in track, appears after scrolling through all cards */}
          <div style={{
            flexShrink: 0, width: 'clamp(240px,22vw,340px)', direction: 'rtl',
            display: 'flex', flexDirection: 'column',
            justifyContent: 'center', alignItems: 'flex-start', gap: 16,
            padding: '0 clamp(16px,3vw,40px)',
          }}>
            <div className="eyebrow">جاهز؟</div>
            <div style={{ fontSize: 'clamp(1.4rem,2.4vw,2rem)', fontWeight: 900, lineHeight: 1.2, color: 'var(--white)' }}>
              كن الشخص <span style={{ color: 'var(--blue)' }}>التالي</span>
            </div>
            <button className="btn btn-primary" data-cursor="hover"
              onClick={() => document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' })}>
              احجز جلستك
            </button>
          </div>
        </div>
      </div>

      {/* ─── MOBILE VIEW (hidden on desktop) ─── */}
      <div className="fb-mobile-section" style={{ display: 'none' }}>
        <div style={{ padding: 'clamp(72px,14vw,100px) clamp(16px,4vw,32px) 48px', background: 'var(--ink)' }}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>آراء العملاء</div>
          <h2 style={{ fontSize: 'clamp(1.4rem,5vw,2rem)', fontWeight: 900, color: 'var(--white)', margin: '0 0 20px' }}>
            ليش الناس <span style={{ color: 'var(--blue)' }}>تحب ProFit؟</span>
          </h2>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 24, marginBottom: 28, flexWrap: 'wrap' }}>
            {STATS.map((s, i) => (
              <div key={i}>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--blue)', direction: 'ltr' }}>{s.num}{s.suffix}</div>
                <div style={{ fontSize: '0.68rem', color: 'var(--muted)', fontWeight: 600 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Cards grid 2 columns */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {MOBILE_IMGS.slice(0, 2).map((src, i) => (
              <div key={i} className="fb-mobile-card glass-card" style={{ overflow: 'hidden', borderRadius: 14 }}>
                <img src={src} alt={`تقييم ${i + 1}`}
                  onError={e => { (e.target as HTMLImageElement).src = `https://placehold.co/300x400/E8F0FF/1B72E8?text=Review+${i+1}`; }}
                  style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
                />
              </div>
            ))}

            {showMore && MOBILE_IMGS.slice(2, 4).map((src, i) => (
              <div key={i} className="fb-mobile-extra glass-card" style={{ overflow: 'hidden', borderRadius: 14 }}>
                <img src={src} alt={`تقييم ${i + 3}`}
                  onError={e => { (e.target as HTMLImageElement).src = `https://placehold.co/300x400/E8F0FF/1B72E8?text=Review+${i+3}`; }}
                  style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
                />
              </div>
            ))}
          </div>

          {!showMore && (
            <button
              onClick={() => setShowMore(true)}
              className="btn btn-ghost"
              style={{ width: '100%', marginTop: 16, fontSize: 14 }}
            >
              اشوف المزيد
            </button>
          )}

          <div style={{ marginTop: 24, textAlign: 'center' }}>
            <button className="btn btn-primary" data-cursor="hover"
              onClick={() => document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' })}
              style={{ width: '100%' }}>
              احجز جلستك
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #feedback > div:first-child { display: none !important; }
          .fb-mobile-section { display: block !important; }
        }
      `}</style>
    </div>
  );
}
