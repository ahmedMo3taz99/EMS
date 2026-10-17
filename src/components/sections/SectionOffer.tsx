import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

const SERVICES = [
  'جلسات EMS احترافية داخل الاستوديو أو بالمنزل',
  'أجهزة أصلية معتمدة (CE Certified)',
  'مدربين ومدربات حاصلين على تدريب دولي',
  'دعم فني وخدمة عملاء داخل المملكة',
  'برامج تدريب وتأهيل مع شهادات معتمدة',
];

const REASONS = [
  'جودة تصنيع',
  'نتائج ملموسة خلال أسابيع',
  'راحة وأمان في الجلسات',
  'تواجد محلي داخل السعودية لخدمتك بسرعة',
];

export default function SectionOffer({ onBook }: { onBook: () => void }) {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(section.querySelectorAll('.offer-reveal'),
        { opacity: 0, y: 42 },
        {
          opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 72%', once: true },
        });
      gsap.fromTo(section.querySelectorAll('.offer-detail'),
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power2.out',
          scrollTrigger: { trigger: '.offer-details', start: 'top 86%', once: true },
        });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="offer" className="offer-section" dir="rtl" aria-labelledby="offer-title">
      <div className="offer-shell">
        <div className="offer-main">
          <div className="offer-copy">
            <div className="offer-reveal offer-eyebrow"><span className="offer-spark" /> عرض خاص من PRO-FIT السعودية</div>
            <h2 id="offer-title" className="offer-reveal offer-title">
              جرّب فرق <span>EMS</span><br />من أول جلسة
            </h2>
            <p className="offer-reveal offer-lead">تجربة جلسة فردية داخل الاستوديو، مع مدرب متخصص وتجهيزات احترافية.</p>

            <div className="offer-reveal offer-price-panel">
              <span className="offer-best">أفضل عرض</span>
              <div className="offer-price"><strong>100</strong><span>ريال</span></div>
              <p>جلسة فردية بالاستوديو</p>
            </div>

            <div className="offer-reveal offer-actions">
              <button type="button" className="btn btn-primary offer-cta" data-cursor="hover" onClick={onBook}>
                احجز جلستك الآن <span aria-hidden="true">←</span>
              </button>
              <span>ابدأ تجربتك مع PRO-FIT</span>
            </div>
          </div>

          <div className="offer-reveal offer-visual">
            <div className="offer-photo-frame">
              <img src="/assets/img/free-session.jpeg" alt="مدرب PRO-FIT يجهّز عميلًا لجلسة EMS تجريبية داخل الاستوديو" loading="lazy" />
            </div>
            <div className="offer-photo-glow" aria-hidden="true" />
          </div>
        </div>

        <div className="offer-details">
          <div className="offer-detail offer-services">
            <div className="offer-detail-heading"><span>01 / PRO-FIT</span><h3>وش تقدم Pro Fit السعودية؟</h3></div>
            <ul>
              {SERVICES.map((service) => <li key={service}><span className="offer-check" aria-hidden="true">✓</span>{service}</li>)}
            </ul>
          </div>
          <div className="offer-detail offer-reasons">
            <div className="offer-detail-heading"><span>02 / لماذا نحن</span><h3>ليه تختارنا؟</h3></div>
            <ul>
              {REASONS.map((reason) => <li key={reason}><span className="offer-check" aria-hidden="true">✓</span>{reason}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
