import { useState, useEffect } from 'react';

const LINKS = [
  { label: 'الرئيسية', id: 'hero' },
  { label: 'التقنية', id: 'ems' },
  { label: 'الباقات', id: 'packages' },
  { label: 'آراء العملاء', id: 'feedback' },
  { label: 'احجز', id: 'book' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    h();
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const scrollTo = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
        <img
          src="/assets/img/logo.png"
          alt="PRO-FIT"
          onError={e => {
            const t = e.target as HTMLImageElement;
            t.style.display = 'none';
            if (t.nextElementSibling) (t.nextElementSibling as HTMLElement).style.display = 'block';
          }}
          style={{ height: 40, objectFit: 'contain' }}
        />
        <div style={{ display: 'none', fontSize: 20, fontWeight: 900, direction: 'ltr' }}>
          <span style={{ color: 'var(--white)' }}>PRO</span>
          <span style={{ color: 'var(--muted)' }}>-</span>
          <span style={{ color: 'var(--blue)' }}>FIT</span>
        </div>

        <ul className="nav-links" style={{ display: 'flex', gap: 36, listStyle: 'none', padding: 0, margin: 0 }}>
          {LINKS.map(l => (
            <li key={l.id}>
              <button
                data-cursor="hover"
                onClick={() => scrollTo(l.id)}
                style={{ background: 'none', border: 'none', color: 'var(--muted)', fontFamily: 'Cairo', fontWeight: 600, fontSize: 13, letterSpacing: 1, transition: 'color .2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--white)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
              >{l.label}</button>
            </li>
          ))}
        </ul>

        <button className="btn btn-primary nav-cta" data-cursor="hover" onClick={() => scrollTo('book')} style={{ fontSize: 13 }}>
          احجز الآن
        </button>

        <button
          className="hamburger"
          aria-label="القائمة"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          style={{ flexDirection: 'column', gap: 5, background: 'none', border: 'none', padding: 8, position: 'relative', zIndex: 101 }}
        >
          {[1, 2, 3].map(n => (
            <span key={n} style={{
              display: 'block', height: 2, width: 28, background: 'var(--white)', borderRadius: 999,
              transition: 'transform 0.3s, opacity 0.3s',
              transform: open ? (n === 1 ? 'translateY(7px) rotate(45deg)' : n === 3 ? 'translateY(-7px) rotate(-45deg)' : '') : '',
              opacity: open && n === 2 ? 0 : 1,
            }} />
          ))}
        </button>
      </nav>

      <div style={{
        position: 'fixed', inset: 0, zIndex: 90,
        background: 'var(--ink)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 32,
        opacity: open ? 1 : 0,
        visibility: open ? 'visible' : 'hidden',
        pointerEvents: open ? 'auto' : 'none',
        transition: 'opacity 0.4s var(--e-expo), visibility 0.4s',
        direction: 'rtl',
      }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, textAlign: 'center' }}>
          {LINKS.map((l, i) => (
            <li key={l.id} style={{ marginBottom: 24 }}>
              <button className="menu-item" onClick={() => scrollTo(l.id)} style={{
                fontSize: 'clamp(1.4rem, 6vw, 2.2rem)', fontWeight: 700, color: 'var(--white)',
                background: 'none', border: 'none', fontFamily: 'Cairo',
                opacity: 0, animation: open ? `fadeUp 0.5s var(--e-expo) ${i * 0.07}s forwards` : 'none',
              }}>{l.label}</button>
            </li>
          ))}
        </ul>
        <a href="https://wa.me/966534759227" target="_blank" rel="noreferrer" className="btn btn-wa">ابدأ على واتساب</a>
      </div>
    </>
  );
}
