import { useState, type FormEvent } from 'react';

// Posts to the PRO-FIT dashboard (Laravel) → POST /api/website-leads.
// The lead lands in the dashboard under "طلبات الموقع" with source=website.
const API_URL = `${(import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '')}/api/website-leads`;

const GOALS = ['خسارة وزن', 'بناء عضلات', 'لياقة عامة', 'تأهيل / إصابة', 'أخرى'];
const PACKAGES = ['جلسة تجريبية', '8 جلسات', '12 جلسة', '14 جلسة', '24 جلسة', '32 جلسة', 'لم أحدد بعد'];
const TIMES = ['صباحاً', 'ظهراً', 'عصراً', 'مساءً'];

type Status = 'idle' | 'sending' | 'done' | 'error';

function utm(key: string) {
  return new URLSearchParams(window.location.search).get(key) ?? undefined;
}

export default function LeadForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    setStatus('sending');
    setError('');
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...data, utm_source: utm('utm_source'), utm_campaign: utm('utm_campaign') }),
      });
      if (res.ok) {
        setStatus('done');
        form.reset();
        return;
      }
      const body = await res.json().catch(() => null);
      const first = body?.errors && Object.values(body.errors as Record<string, string[]>)[0]?.[0];
      setError(res.status === 429 ? 'محاولات كثيرة، حاول بعد دقيقة.' : first || 'تعذّر الإرسال، حاول مرة أخرى.');
      setStatus('error');
    } catch {
      setError('تعذّر الاتصال، تأكد من الإنترنت وحاول مرة أخرى.');
      setStatus('error');
    }
  }

  if (status === 'done') {
    return (
      <div className="lead-form lead-form-done" role="status">
        <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--blue)' }}>تم استلام طلبك ✓</div>
        <p style={{ color: 'var(--muted)', margin: 0, lineHeight: 1.8 }}>فريقنا هيتواصل معك على واتساب في أقرب وقت.</p>
        <button type="button" className="btn btn-ghost" data-cursor="hover" onClick={() => setStatus('idle')}>إرسال طلب آخر</button>
      </div>
    );
  }

  return (
    <form className="lead-form" onSubmit={onSubmit} noValidate={false}>
      <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--white)' }}>سجّل بياناتك ونتواصل معك</div>

      <label>
        <span>الاسم *</span>
        <input name="full_name" required maxLength={255} autoComplete="name" />
      </label>

      <label>
        <span>رقم الجوال (واتساب) *</span>
        <input name="phone_number" required type="tel" inputMode="tel" dir="ltr" placeholder="05XXXXXXXX" maxLength={30} autoComplete="tel" />
      </label>

      <div className="lead-form-row">
        <label>
          <span>هدفك</span>
          <select name="goal" defaultValue="">
            <option value="">اختر</option>
            {GOALS.map(g => <option key={g}>{g}</option>)}
          </select>
        </label>
        <label>
          <span>الباقة</span>
          <select name="package" defaultValue="">
            <option value="">اختر</option>
            {PACKAGES.map(p => <option key={p}>{p}</option>)}
          </select>
        </label>
      </div>

      <div className="lead-form-row">
        <label>
          <span>الوقت المناسب</span>
          <select name="preferred_time" defaultValue="">
            <option value="">اختر</option>
            {TIMES.map(t => <option key={t}>{t}</option>)}
          </select>
        </label>
        <label>
          <span>الحي</span>
          <input name="area" maxLength={255} />
        </label>
      </div>

      {/* Honeypot — hidden from people, filled by bots */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="lead-form-hp" />

      {status === 'error' && <div className="lead-form-error" role="alert">{error}</div>}

      <button type="submit" className="btn btn-primary" data-cursor="hover" disabled={status === 'sending'}>
        {status === 'sending' ? 'جاري الإرسال…' : 'أرسل طلبك'}
      </button>
    </form>
  );
}
