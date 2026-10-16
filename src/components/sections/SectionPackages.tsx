import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

const PACKAGES = [
  {
    badge: 'تجريبية', badgeColor: { bg: 'rgba(27,114,232,0.1)', color: 'var(--blue)' },
    num: '1', unit: 'جلسة', freeExtra: 0,
    desc: 'جرّب الفرق بنفسك — جلسة كاملة داخل بيتك بدون التزام',
    features: ['كوتش متخصص', 'داخل بيتك', 'بدون التزام'],
    price: '100', currency: 'ريال',
    cta: 'احجز الجلسة', ctaClass: 'btn-ghost', featured: false,
  },
  {
    badge: 'انطلق', badgeColor: { bg: 'rgba(27,114,232,0.1)', color: 'var(--blue)' },
    num: '8', unit: 'جلسة', freeExtra: 2,
    desc: 'ابدأ رحلتك وكوّن عادة التمرين الأسبوعية',
    features: ['كوتش متخصص', 'داخل بيتك', 'جدولة مرنة'],
    price: 'XXX', currency: 'SAR',
    cta: 'احجز الباقة', ctaClass: 'btn-ghost', featured: false,
  },
  {
    badge: 'الأكثر طلباً', badgeColor: { bg: 'var(--blue)', color: '#fff' },
    num: '12', unit: 'جلسة', freeExtra: 2,
    desc: 'الباقة المثالية للنتائج الحقيقية والمستمرة',
    features: ['كوتش متخصص', 'جدولة مرنة', 'متابعة مستمرة', 'تقرير تقدم'],
    price: 'XXX', currency: 'SAR',
    cta: 'احجز الباقة', ctaClass: 'btn-primary', featured: true,
  },
  {
    badge: 'شائع', badgeColor: { bg: 'rgba(74,159,255,0.12)', color: 'var(--blue-lt)' },
    num: '14', unit: 'جلسة', freeExtra: 2,
    desc: 'التزام أعمق لنتائج ملموسة وأسرع',
    features: ['كوتش متخصص', 'مرونة كاملة', 'أولوية الحجز'],
    price: 'XXX', currency: 'SAR',
    cta: 'احجز الباقة', ctaClass: 'btn-ghost', featured: false,
  },
  {
    badge: 'متقدم', badgeColor: { bg: 'rgba(27,114,232,0.1)', color: 'var(--blue)' },
    num: '24', unit: 'جلسة', freeExtra: 2,
    desc: 'للجدّيين في تحقيق أهدافهم الكبيرة',
    features: ['كوتش متخصص', 'مرونة كاملة', 'أولوية الحجز', 'إمكانية التجميد'],
    price: 'XXX', currency: 'SAR',
    cta: 'احجز الباقة', ctaClass: 'btn-ghost', featured: false,
  },
  {
    badge: 'الأوفر', badgeColor: { bg: 'rgba(74,159,255,0.15)', color: 'var(--blue-lt)' },
    num: '32', unit: 'جلسة', freeExtra: 2,
    desc: 'أقصى قيمة وأقصى تحوّل — الريال الأوفر',
    features: ['كوتش متخصص', 'مرونة كاملة', 'أولوية الحجز', 'إمكانية التجميد'],
    price: 'XXX', currency: 'SAR',
    cta: 'احجز الباقة', ctaClass: 'btn-ghost', featured: false,
  },
];

export default function SectionPackages() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef   = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.to(gsap.utils.toArray('.hrise', headRef.current!), {
        y: '0%', stagger: 0.14, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: headRef.current, start: 'top 85%' },
      });
      gsap.utils.toArray<HTMLElement>('.pkg-card-wrap', sectionRef.current!).forEach((card, i) => {
        gsap.fromTo(card, { opacity: 0, y: 44 }, {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: i * 0.07,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
        });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="packages" style={{
      padding: 'clamp(60px, 8vh, 96px) clamp(20px, 5vw, 80px)',
      background: 'var(--ink)', direction: 'rtl', position: 'relative', overflow: 'hidden',
    }}>
      {/* bg glow */}
      <div style={{
        position: 'absolute', left: '50%', top: '40%', transform: 'translate(-50%,-50%)',
        width: '70vw', height: '70vh',
        background: 'radial-gradient(ellipse, rgba(27,114,232,0.07) 0%, transparent 65%)',
        filter: 'blur(80px)', pointerEvents: 'none',
      }} />

      {/* Heading */}
      <div ref={headRef} style={{ marginBottom: 'clamp(28px, 5vh, 48px)', position: 'relative' }}>
        <div className="eyebrow" style={{ marginBottom: 10 }}>الباقات</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, flexWrap: 'wrap' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', fontWeight: 900, lineHeight: 1.1, margin: 0, color: 'var(--white)' }}>
            <span className="hrise-wrap" style={{ display: 'inline-block' }}><span className="hrise">اختر</span></span>
            {' '}
            <span className="hrise-wrap" style={{ display: 'inline-block' }}><span className="hrise" style={{ color: 'var(--blue)' }}>الباقة المناسبة</span></span>
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: 'clamp(0.78rem, 1vw, 0.9rem)', margin: 0 }}>
            كل باقة تشمل +2 جلسات مجانية
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="pkg-grid-wrap" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 'clamp(14px, 2vw, 22px)',
        maxWidth: 1100, margin: '0 auto', position: 'relative',
      }}>
        {PACKAGES.map((p, i) => (
          <div key={i} className="pkg-card-wrap" style={{ opacity: 0 }}>
            <div className="glass-card" data-cursor="hover" style={{
              height: '100%',
              padding: 'clamp(20px, 3vh, 32px) clamp(18px, 2vw, 26px)',
              display: 'flex', flexDirection: 'column', gap: 'clamp(10px, 1.4vh, 14px)',
              transition: 'transform 0.3s var(--e-soft)',
              ...(p.featured ? {
                background: 'linear-gradient(145deg, rgba(27,114,232,0.1) 0%, rgba(74,159,255,0.05) 100%)',
                boxShadow: '0 8px 48px rgba(27,114,232,0.22), 0 0 0 2px rgba(27,114,232,0.35)',
              } : {}),
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; }}
            >
              <span style={{
                alignSelf: 'flex-start', fontSize: 9, fontWeight: 700, letterSpacing: 2,
                padding: '3px 10px', borderRadius: 4,
                background: p.badgeColor.bg, color: p.badgeColor.color, textTransform: 'uppercase',
              }}>{p.badge}</span>

              <div>
                <span style={{ fontSize: 'clamp(2.6rem, 4.5vw, 3.8rem)', fontWeight: 900, color: 'var(--blue)', lineHeight: 1 }}>{p.num}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--muted)', fontWeight: 700, marginRight: 4 }}>{p.unit}</span>
              </div>

              {p.freeExtra > 0 && (
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                  background: 'rgba(27,114,232,0.08)', borderRadius: 5,
                  padding: '3px 8px', fontSize: '0.72rem', fontWeight: 700, color: 'var(--blue)',
                  alignSelf: 'flex-start',
                }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  +{p.freeExtra} مجانية
                </div>
              )}

              <p style={{ fontSize: '0.78rem', color: 'var(--muted)', lineHeight: 1.6, margin: 0, flex: 1 }}>{p.desc}</p>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 5 }}>
                {p.features.map((f, j) => (
                  <li key={j} style={{ fontSize: '0.77rem', color: 'var(--white)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                    {f}
                  </li>
                ))}
              </ul>

              <div style={{ marginTop: 'auto', paddingTop: 8 }}>
                <div style={{ fontSize: 'clamp(1.3rem, 2.2vw, 1.8rem)', fontWeight: 900, color: 'var(--white)', marginBottom: 10 }}>
                  {p.price} <span style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--muted)' }}>{p.currency}</span>
                </div>
                <button className={`btn ${p.ctaClass}`} data-cursor="hover"
                  style={{ width: '100%', fontSize: 13, padding: '12px 16px' }}
                  onClick={() => document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' })}>
                  {p.cta}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .pkg-grid-wrap { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 540px) {
          .pkg-grid-wrap { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
