import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

const ICONS = {
  bolt: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  target: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
    </svg>
  ),
  cycle: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>
    </svg>
  ),
};

const BENEFITS = [
  {
    icon: ICONS.bolt,
    title: 'التدريب يوصل لبابك',
    desc: 'مدربينا المعتمدين يزورونك بالوقت اللي يناسبك، ويجهزون كل شي لجلسة EMS فعّالة ومصممة لك خصيصًا.',
    num: '01',
  },
  {
    icon: ICONS.target,
    title: 'نتائج سريعة، بدون تعقيد',
    desc: 'جلسة وحدة = تمرين 90 دقيقة! قل وداعًا للروتين الممل والنتائج البطيئة.',
    num: '02',
    featured: true,
  },
  {
    icon: ICONS.cycle,
    title: 'خصوصيتك أولويتنا',
    desc: 'تدريبك براحتك في بيتك — بدون أي ضغط أو أحراج.',
    num: '03',
  },
];

export default function SectionEms() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;

    const mm = gsap.matchMedia();
    const cards = gsap.utils.toArray<HTMLElement>('.ems-card-wrap', wrap);
    const rises = gsap.utils.toArray<HTMLElement>('.hrise', headRef.current!);

    // Mobile: plain reveal, no pin
    mm.add('(max-width: 768px)', () => {
      gsap.to(rises, {
        y: '0%', stagger: 0.12, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: headRef.current, start: 'top 85%' },
      });
      gsap.fromTo(lineRef.current, { scaleX: 0 }, {
        scaleX: 1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: headRef.current, start: 'top 85%' },
      });
      cards.forEach((card, i) => {
        gsap.from(card, {
          opacity: 0, y: 50, duration: 0.8, ease: 'power3.out', delay: i * 0.1,
          immediateRender: false,
          scrollTrigger: { trigger: wrapRef.current, start: 'top 75%', once: true },
        });
      });
    });

    // Desktop: pinned, scrubbed — cards fly in one by one from the right
    mm.add('(min-width: 769px) and (prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap, start: 'top top', end: 'bottom bottom',
          scrub: 1.2, pin: inner, pinSpacing: false, anticipatePin: 1,
        },
      });
      tl.fromTo(lineRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.5 }, 0);
      tl.fromTo(rises, { y: '108%' }, { y: '0%', stagger: 0.15, duration: 0.6, ease: 'power3.out' }, 0.1);
      cards.forEach((card, i) => {
        tl.fromTo(card, { x: 120, opacity: 0, scale: 0.92 }, { x: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'power3.out' }, 0.3 + i * 0.25);
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={wrapRef} id="ems" className="ems-wrap">
      <div ref={innerRef} className="ems-inner">
        <div className="ems-left">
          <img
            src="/assets/img/ems-product.webp"
            alt="EMS Equipment"
            onError={e => { (e.target as HTMLImageElement).src = '/assets/img/suit.png'; }}
          />
          <div ref={headRef}>
            <div className="eyebrow" style={{ marginBottom: 12 }}>ليش تختارونا</div>
            <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.8rem)', fontWeight: 900, lineHeight: 1.05, margin: 0, color: 'var(--white)' }}>
              <span className="hrise-wrap"><span className="hrise">مميزات</span></span>
              <span className="hrise-wrap"><span className="hrise" style={{ color: 'var(--blue)' }}>PRO-FIT</span></span>
            </h2>
            <div ref={lineRef} style={{ height: 2, background: 'var(--blue)', marginTop: 16, width: '100%', transformOrigin: 'right center' }} />
          </div>
        </div>

        <div className="ems-cards">
          {BENEFITS.map(b => (
            <div key={b.num} className="ems-card-wrap">
              <div className={`glass-card ems-card${b.featured ? ' featured' : ''}`} data-cursor="hover">
                <div style={{ fontSize: 'clamp(0.65rem, 1.2vw, 0.8rem)', color: 'var(--blue)', fontWeight: 700, opacity: 0.5, minWidth: 28 }}>{b.num}</div>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(27,114,232,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--blue)' }}>{b.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, color: 'var(--white)', fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)', marginBottom: 4 }}>{b.title}</div>
                  <div style={{ fontSize: 'clamp(0.75rem, 1vw, 0.88rem)', color: 'var(--muted)', lineHeight: 1.6 }}>{b.desc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="ems-watermark">EMS</div>
      </div>
    </div>
  );
}
