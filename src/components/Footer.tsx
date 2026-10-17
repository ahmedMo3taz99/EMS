export default function Footer() {
  return (
    <footer style={{
      direction: 'rtl',
      background: 'var(--ink)',
      borderTop: '1px solid var(--line)',
      padding: 'clamp(28px, 4vh, 44px) clamp(20px, 5vw, 80px) clamp(16px, 2.5vh, 28px)',
    }}>
      <div style={{
        display: 'flex', gap: 'clamp(24px, 5vw, 60px)',
        flexWrap: 'wrap', marginBottom: 20,
      }}>
        {/* Brand */}
        <div style={{ flex: '1 1 260px', maxWidth: 360 }}>
          <img
            src="/assets/img/logo.png"
            alt="PRO-FIT"
            onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
            style={{ height: 36, objectFit: 'contain', marginBottom: 16 }}
          />
          <p style={{ fontSize: '0.95rem', color: 'var(--muted)', lineHeight: 1.8, margin: '0 0 16px' }}>
            في PRO-FIT نادي تروّح له… ونادي يجيك!
            نحن مو بس مدربين — إحنا شركاؤك في تحقيق أهدافك الصحية والرياضية،
            بأسلوب حديث، سريع، وفعّال.
            نقدم جلسات تدريب شخصية داخل بيتك باستخدام تقنية EMS المتطورة.
          </p>
          <div style={{ display: 'flex', gap: 8 }}>
            <a href="https://wa.me/966534759227" target="_blank" rel="noreferrer"
              className="btn btn-wa" style={{ fontSize: 12, padding: '10px 20px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.032L.789 23.211l4.306-1.376A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.003-1.371l-.359-.213-3.72 1.189 1.219-3.614-.234-.372A9.818 9.818 0 112 12c0-5.422 4.396-9.818 9.818-9.818z"/>
              </svg>
              تواصل معنا
            </a>
          </div>
        </div>

        {/* Contact */}
        <div style={{ flex: '0 0 auto' }}>
          <div style={{ fontSize: 11, color: 'var(--blue)', fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 16 }}>تواصل معنا</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { label: '+966 534 759 227', href: 'tel:+966534759227' },
              { label: 'a.alrasheed707@gmail.com', href: 'mailto:a.alrasheed707@gmail.com' },
            ].map(({ label, href }) => (
              <a key={href} href={href} style={{
                fontSize: '0.94rem', color: 'var(--muted)', textDecoration: 'none', transition: 'color 0.2s',
              }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--blue)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
              >{label}</a>
            ))}
          </div>
        </div>

        {/* Legal */}
        <div style={{ flex: '0 0 auto' }}>
          <div style={{ fontSize: 11, color: 'var(--blue)', fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 16 }}>روابط مهمة</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { label: 'من نحن', href: '/about.html' },
              { label: 'الأحكام والشروط وسياسات الإلغاء', href: '/terms.html' },
              { label: 'سياسة الاستخدام والخصوصية', href: '/privacy.html' },
            ].map(({ label, href }) => (
              <a key={href} href={href} className="footer-page-link">{label}</a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: '1px solid var(--line)',
        paddingTop: 20,
        display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8,
        fontSize: 11, color: 'var(--muted)',
      }}>
        <span>© 2026 PRO-FIT — جميع الحقوق محفوظة</span>
        <span style={{ direction: 'ltr' }}>السجل التجاري: 7042329040</span>
      </div>
    </footer>
  );
}
