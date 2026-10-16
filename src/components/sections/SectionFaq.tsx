import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

const FAQS = [
  {
    q: 'ما هي تقنية EMS؟',
    a: 'EMS اختصار لـ Electrical Muscle Stimulation، وتعني "التحفيز الكهربائي للعضلات". تستخدم نبضات كهربائية منخفضة التردد لتحفيز انقباض العضلات بشكل يشبه الإشارات التي يرسلها الدماغ أثناء الحركة — بدل ما الدماغ يرسل الإشارة، الجهاز يرسل نبض كهربائي صغير يحفز العضلة على الانقباض.',
  },
  {
    q: 'كيف تعمل EMS؟',
    a: 'ترتدي بدلة مزوّدة بأقطاب كهربائية في مناطق العضلات الأساسية (الصدر، الظهر، الذراعين، الرجلين، البطن، الأرداف). الجهاز يُرسل نبضات عبر هذه الأقطاب فتنقبض العضلات بشكل مكثف. المدرب يوجهك لأداء تمارين بسيطة بالتزامن مع النبضات لتعزيز التأثير.',
  },
  {
    q: 'ما فوائد EMS؟',
    a: '20 دقيقة توازي ساعة ونصف في الجيم. تحفز العضلات العميقة التي يصعب الوصول إليها، ترفع معدل الأيض وتحرق الدهون، تزيد قوة العضلات والتحمل والتوازن، تقلل آلام الظهر والمفاصل، وتُستخدم طبيًا لإعادة التأهيل بعد الإصابات.',
  },
  {
    q: 'كم مرة يُنصح بالتدريب؟',
    a: 'جلسة واحدة إلى جلستين أسبوعيًا فقط — لأن التدريب عالي الكثافة جداً. كل جلسة تستغرق 20 دقيقة فقط.',
  },
  {
    q: 'هل EMS آمنة؟',
    a: 'نعم، آمنة تمامًا تحت إشراف مدرب مؤهل، ومعتمدة طبيًا في أغلب الدول. لا تُنصح بها فقط في حالة: الحمل، وجود جهاز منظم ضربات القلب، أو مرضى الصرع.',
  },
  {
    q: 'من يناسبه EMS؟',
    a: 'مثالية للمشغولين الذين ليس عندهم وقت للجيم، من يريد شد الجسم وحرق الدهون بسرعة، من يعاني من إصابات خفيفة أو مشاكل مفصلية، الرياضيين المحترفين لتقوية العضلات العميقة، والمبتدئين الذين يريدون بداية تدريجية بدون أوزان ثقيلة.',
  },
];

export default function SectionFaq() {
  const [open, setOpen] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!headRef.current) return;
    const ctx = gsap.matchMedia();
    ctx.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.to(gsap.utils.toArray('.hrise', headRef.current!), {
        y: '0%', stagger: 0.14, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: headRef.current, start: 'top 85%' },
      });
      gsap.utils.toArray<HTMLElement>('.faq-item', sectionRef.current!).forEach((el, i) => {
        gsap.fromTo(el, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: i * 0.07,
          scrollTrigger: { trigger: el, start: 'top 90%' },
        });
      });
    });
    return () => ctx.revert();
  }, []);

  const toggle = (i: number) => setOpen(prev => prev === i ? null : i);

  return (
    <section ref={sectionRef} id="faq" style={{
      padding: 'clamp(52px, 7vh, 88px) clamp(20px, 5vw, 80px)',
      background: 'var(--ink)',
      direction: 'rtl', position: 'relative', overflow: 'hidden',
    }}>
      {/* bg glow */}
      <div style={{
        position: 'absolute', right: '-10%', top: '20%',
        width: '50vw', height: '60vh',
        background: 'radial-gradient(ellipse, rgba(27,114,232,0.07) 0%, transparent 65%)',
        filter: 'blur(80px)', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 860, margin: '0 auto', position: 'relative' }}>
        {/* Heading */}
        <div ref={headRef} style={{ marginBottom: 'clamp(32px, 6vh, 56px)' }}>
          <div className="eyebrow" style={{ marginBottom: 14 }}>الأسئلة الشائعة</div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3.2rem)', fontWeight: 900, lineHeight: 1.1, margin: 0, color: 'var(--white)' }}>
            <span className="hrise-wrap" style={{ display: 'inline-block' }}><span className="hrise">تعرّف على</span></span>
            {' '}
            <span className="hrise-wrap" style={{ display: 'inline-block' }}><span className="hrise" style={{ color: 'var(--blue)' }}>تقنية EMS</span></span>
          </h2>
        </div>

        {/* FAQ items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="faq-item glass-card"
              style={{ overflow: 'visible', borderRadius: 14 }}
            >
              <button
                onClick={() => toggle(i)}
                data-cursor="hover"
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  gap: 16, padding: 'clamp(16px, 2.5vh, 22px) clamp(18px, 2.5vw, 28px)',
                  background: 'none', border: 'none', textAlign: 'right', fontFamily: 'Cairo',
                  cursor: 'none',
                }}
              >
                <span style={{ fontWeight: 700, fontSize: 'clamp(0.88rem, 1.3vw, 1rem)', color: 'var(--white)', flex: 1 }}>
                  {faq.q}
                </span>
                <span style={{
                  width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                  background: open === i ? 'var(--blue)' : 'rgba(27,114,232,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background 0.25s, transform 0.35s var(--e-expo)',
                  transform: open === i ? 'rotate(45deg)' : 'none',
                  color: open === i ? '#fff' : 'var(--blue)',
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                </span>
              </button>

              <div style={{
                maxHeight: open === i ? 500 : 0,
                overflow: 'hidden',
                transition: 'max-height 0.45s var(--e-expo)',
              }}>
                <p style={{
                  fontSize: 'clamp(0.82rem, 1.1vw, 0.92rem)',
                  color: 'var(--muted)', lineHeight: 1.8,
                  margin: 0,
                  padding: '0 clamp(18px, 2.5vw, 28px) clamp(16px, 2.5vh, 22px)',
                }}>
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
