import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { JOURNEY_STAGES } from '../../content/journey';
import JourneyDevices from '../journey/JourneyDevices';
import JourneyIcon from '../journey/JourneyIcon';
import './SectionHero.css';

const SLIDE_DURATION = 6500;

export default function SectionHero({ onBook }: { onBook: () => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(() => !document.hidden);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [announcement, setAnnouncement] = useState('');
  const playing = !paused && !interacting && !reducedMotion && inView && pageVisible;
  const stage = JOURNEY_STAGES[active];

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMotionChange = () => setReducedMotion(preference.matches);
    const onVisibilityChange = () => setPageVisible(!document.hidden);
    preference.addEventListener('change', onMotionChange);
    document.addEventListener('visibilitychange', onVisibilityChange);
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.2 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      preference.removeEventListener('change', onMotionChange);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => setActive(index => (index + 1) % JOURNEY_STAGES.length), SLIDE_DURATION);
    return () => window.clearTimeout(timer);
  }, [active, playing]);

  const selectStage = (index: number) => {
    setActive(index);
    setPaused(true);
    setAnnouncement(JOURNEY_STAGES[index].description);
  };

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next: number;
    if (event.key === 'ArrowLeft') next = (index + 1) % JOURNEY_STAGES.length;
    else if (event.key === 'ArrowRight') next = (index + JOURNEY_STAGES.length - 1) % JOURNEY_STAGES.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = JOURNEY_STAGES.length - 1;
    else return;
    event.preventDefault();
    selectStage(next);
    tabsRef.current[next]?.focus();
  };

  const explore = () => {
    selectStage((active + 1) % JOURNEY_STAGES.length);
    experienceRef.current?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'center' });
  };

  return (
    <section ref={sectionRef} id="hero" className="journey-hero" dir="rtl" aria-labelledby="journey-heading">
      <div className="journey-shell">
        <div className="journey-layout">
          <div className="journey-copy">
            <div className="journey-eyebrow"><span aria-hidden="true" />معك في الجلسة… وبعدها</div>
            <h1 id="journey-heading">تغيّر تشوفه.<br /><span>ومتابعة تعيشها.</span></h1>
            <p className="journey-description">
              جلسات <bdi>EMS</bdi>، برنامج تدريب على هدفك، وتغذية تناسب يومك.
              تابع تقدّمك بالصور والقياسات من تطبيقك، وخطتك من لوحة المتابعة.
              <strong> وفريقنا معك، خطوة بخطوة.</strong>
            </p>
            <div className="journey-actions">
              <button type="button" className="journey-button journey-button-primary" data-cursor="hover" onClick={onBook}>
                ابدأ رحلتك معنا <JourneyIcon name="arrow" />
              </button>
              <button type="button" className="journey-button journey-button-secondary" data-cursor="hover" onClick={explore} aria-controls="journey-preview">
                <JourneyIcon name="play" /> شوف كيف نتابعك
              </button>
            </div>
            <p className="journey-location">في الاستوديو أو في بيتك. البداية على راحتك.</p>
            <ul className="journey-promises" aria-label="رحلتك مع PRO-FIT">
              {['خطة تناسبك', 'مدرب يتابعك', 'تقدّم تشوفه'].map(text => <li key={text}><JourneyIcon name="check" />{text}</li>)}
            </ul>
          </div>

          <div className="journey-experience" ref={experienceRef}
            onMouseEnter={() => setInteracting(true)} onMouseLeave={() => setInteracting(false)}
            onFocusCapture={() => setInteracting(true)}
            onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setInteracting(false); }}>
            <div className="journey-preview-heading"><span dir="ltr">YOUR JOURNEY. CONNECTED.</span><span><i aria-hidden="true" />رحلتك في مكان واحد</span></div>
            <div id="journey-preview" role="tabpanel" aria-labelledby={`journey-tab-${stage.id}`} className="journey-preview">
              <p className="sr-only">{stage.title}. {stage.description}</p>
              <JourneyDevices active={active} />
              <p className="journey-screen-note">{stage.mediaCaption ?? (stage.desktop && stage.mobile ? 'من تطبيق ولوحة متابعة PRO-FIT' : 'تصوّر لواجهة العميل · بيانات توضيحية')}</p>
            </div>
            <div className="journey-tabs" role="tablist" aria-label="مراحل رحلة المتابعة">
              {JOURNEY_STAGES.map((item, index) => (
                <button key={item.id} ref={element => { tabsRef.current[index] = element; }}
                  type="button" role="tab" id={`journey-tab-${item.id}`} aria-selected={index === active}
                  aria-controls="journey-preview" tabIndex={index === active ? 0 : -1}
                  className={`journey-tab${index === active ? ' is-active' : ''}`} data-cursor="hover"
                  onClick={() => selectStage(index)} onKeyDown={event => onTabKeyDown(event, index)}>
                  <span className="journey-tab-number">0{index + 1}</span><span>{item.label}</span>
                  {index === active && <span key={`${active}-${playing}`} className={`journey-tab-progress${playing ? ' is-playing' : ''}`} style={{ animationDuration: `${SLIDE_DURATION}ms` }} aria-hidden="true" />}
                </button>
              ))}
            </div>
            <div className="journey-caption">
              <p>{stage.description}</p>
              {!reducedMotion && <button type="button" className="journey-playback" data-cursor="hover"
                onClick={() => { setPaused(value => !value); setInteracting(false); }} aria-label={paused ? 'تشغيل العرض التلقائي' : 'إيقاف العرض التلقائي'} aria-pressed={!paused}>
                <JourneyIcon name={paused ? 'play' : 'pause'} /><span>{paused ? 'تشغيل' : 'إيقاف'}</span>
              </button>}
            </div>
            <span className="sr-only" aria-live="polite">{announcement}</span>
          </div>
        </div>

        <div className="journey-footer">
          <span className="journey-footer-brand" dir="ltr">PRO-FIT <span>/</span> BEYOND THE SESSION</span>
          <p>من أول جلسة… <strong>لعادات تصنع فرق في حياتك.</strong></p>
          <a href="#offer" className="journey-scroll" aria-label="اكتشف عرض الجلسة الأولى" data-cursor="hover"><JourneyIcon name="down" /></a>
        </div>
      </div>
    </section>
  );
}
