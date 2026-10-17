import { useEffect, useState, type ReactNode } from 'react';
import { JOURNEY_STAGES, type JourneyId, type JourneyScreenshot } from '../../content/journey';
import JourneyIcon, { type JourneyIconName } from './JourneyIcon';
import './JourneyDevices.css';

const sections: { id: JourneyId; label: string; icon: JourneyIconName }[] = [
  { id: 'progress', label: 'تقدّمي', icon: 'chart' },
  { id: 'training', label: 'جلساتي وخطتي', icon: 'calendar' },
  { id: 'nutrition', label: 'تغذيتي', icon: 'food' },
];

function ScreenImage({ asset, children }: { asset: JourneyScreenshot | null; children: ReactNode }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [asset?.src]);
  if (!asset || failed) return <>{children}</>;
  return <img className="journey-screenshot" src={asset.src} alt={asset.alt} style={{ objectFit: asset.fit ?? 'contain' }} decoding="async" onError={() => setFailed(true)} />;
}

function ClientRow({ icon, title, detail, status }: { icon: JourneyIconName; title: string; detail: string; status?: string }) {
  return <div className="client-row"><span className="client-row-icon"><JourneyIcon name={icon} /></span><div><b>{title}</b><small>{detail}</small></div>{status && <em>{status}</em>}</div>;
}

function ClientContent({ stage, mobile = false }: { stage: JourneyId; mobile?: boolean }) {
  if (stage === 'progress') return <>
    <div className="client-welcome"><small>مساحتك الشخصية</small><h3>{mobile ? 'رحلتك تبدأ منك.' : 'أهلًا بك، هذه رحلتك.'}</h3><p>كل خطوة تسجّلها تساعدنا نتابعك أفضل.</p></div>
    <div className="client-metrics">
      <div><JourneyIcon name="calendar" /><span>جلسات الباقة</span><b>08</b></div>
      <div><JourneyIcon name="check" /><span>جلسات مكتملة</span><b>04</b></div>
      {!mobile && <div><JourneyIcon name="bolt" /><span>جلسات متبقية</span><b>04</b></div>}
    </div>
    <div className="client-card"><div className="client-card-title"><b>سجلّ التقدّم</b><span>خاص بك</span></div>
      <div className="client-progress-track"><span /><span /><span /><span /><i /><i /><i /><i /></div>
      <div className="client-track-label"><span>خطوة بخطوة</span><b>4 / 8 جلسات</b></div>
    </div>
    <ClientRow icon="camera" title="صوري وقياساتي" detail="سجلّ البداية وتحديثات المتابعة" />
    {!mobile && <div className="client-coach-note"><JourneyIcon name="message" /><span>فريقك معك لمراجعة التقدّم وتحديث الخطة.</span></div>}
  </>;
  if (stage === 'training') return <>
    <div className="client-welcome"><small>خطة تناسب هدفك</small><h3>جلساتك، بوضوح.</h3><p>موعدك القادم وإرشاداتك في مكان واحد.</p></div>
    <div className="client-session"><div className="client-card-title"><span>الجلسة القادمة</span><em>مؤكدة</em></div><b>تدريب EMS شخصي</b><div><JourneyIcon name="calendar" /><span>الأحد · 06:00 مساءً</span></div><small>داخل الاستوديو · مع مدربك</small></div>
    <div className="client-card-title client-section-title"><b>برنامجك التدريبي</b><span>خطتك الحالية</span></div>
    <ClientRow icon="bolt" title="جلسة مع المدرب" detail="تدريب بإشراف وإرشاد مباشر" status="01" />
    <ClientRow icon="check" title="بعد الجلسة" detail="سجّل شعورك وملاحظاتك" status="02" />
    {!mobile && <ClientRow icon="message" title="مراجعة المتابعة" detail="تحديث الخطة مع فريقك" status="03" />}
  </>;
  return <>
    <div className="client-welcome"><small>عادات تكمل مجهودك</small><h3>يومك، بتوازن.</h3><p>خطتك الغذائية ومتابعة فريقك معك.</p></div>
    <div className="client-nutrition-summary"><span className="client-row-icon"><JourneyIcon name="food" /></span><div><b>خطة التغذية الشخصية</b><small>وجبات وبدائل تناسب يومك</small></div><span className="client-status-dot" /></div>
    <div className="client-card-title client-section-title"><b>وجبات اليوم</b><span>سجلّك الغذائي</span></div>
    <ClientRow icon="food" title="الفطور" detail="اختياراتك من خطة التغذية" status="01" />
    <ClientRow icon="food" title="الغداء" detail="وجبتك والبدائل المتاحة" status="02" />
    {!mobile && <ClientRow icon="food" title="العشاء" detail="كمّل يومك على خطتك" status="03" />}
    <div className="client-coach-note"><JourneyIcon name="camera" /><span>شارك صورة وجبتك مع فريق المتابعة.</span></div>
  </>;
}

export default function JourneyDevices({ active }: { active: number }) {
  return <div className="journey-device-stage" aria-hidden="true">
    <div className="journey-laptop">
      <div className="journey-laptop-lid"><span className="journey-laptop-camera" />
        <div className="journey-laptop-screen">
          {JOURNEY_STAGES.map((stage, index) => <div key={stage.id} className={`journey-screen-layer${index === active ? ' is-active' : ''}`}><ScreenImage asset={stage.desktop}>
            <div className="client-desktop-shell">
              <aside className="client-sidebar"><img src="/assets/img/logo-only.png" alt="" /><div className="client-account"><span className="client-status-dot" />حسابي الشخصي</div><small>رحلتي مع PRO-FIT</small>
                {sections.map(item => <div key={item.id} className={`client-nav-item${item.id === stage.id ? ' is-current' : ''}`}><JourneyIcon name={item.icon} /><span>{item.label}</span></div>)}
                <div className="client-nav-item"><JourneyIcon name="message" /><span>تواصل مع مدربك</span></div><div className="client-sidebar-bottom"><JourneyIcon name="user" /><span>ملفي الشخصي</span></div>
              </aside>
              <div className="client-desktop-main"><header className="client-topbar"><span>مساحتي <i>/</i> {sections[index].label}</span><span className="client-profile"><JourneyIcon name="user" />حساب العميل</span></header><div className="client-content"><ClientContent stage={stage.id} /></div></div>
            </div>
          </ScreenImage></div>)}
        </div>
      </div><div className="journey-laptop-base"><span /></div>
      <span className="journey-device-label">لوحة متابعتك</span>
    </div>
    <div className="journey-phone-wrap"><div className="journey-phone">
      {JOURNEY_STAGES.map((stage, index) => <div key={stage.id} className={`journey-screen-layer${index === active ? ' is-active' : ''}`}><ScreenImage asset={stage.mobile}>
        <div className="client-phone-status"><span>9:41</span><i /><span>▰</span></div>
        <header className="client-phone-header"><img src="/assets/img/logo-only.png" alt="" /><JourneyIcon name="user" /></header>
        <div className="client-mobile-content"><ClientContent stage={stage.id} mobile /></div>
        <div className="client-mobile-nav">{sections.map(item => <span key={item.id} className={item.id === stage.id ? 'is-current' : ''}><JourneyIcon name={item.icon} /><small>{item.label}</small></span>)}</div>
      </ScreenImage></div>)}<span className="journey-phone-home" />
    </div><span className="journey-device-label">تطبيقك، معك دائمًا</span></div>
  </div>;
}
