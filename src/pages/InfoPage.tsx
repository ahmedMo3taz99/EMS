import privacyText from '../content/privacy.txt?raw';

type Page = 'about' | 'terms' | 'privacy';
type Section = { title: string; lines: string[] };

const termsIntro = 'يرجى قراءة الشروط والأحكام التالية بعناية قبل البدء في برنامج التدريب. التسجيل في الخدمة يُعد موافقة صريحة على جميع البنود التالية:';

const termsSections: Section[] = [
  { title: 'شروط الاشتراك', lines: [
    'يجب أن يكون المشترك في عمر 18 سنة أو أكثر.',
    'يُشترط الإفصاح الكامل عن أي حالات صحية أو أمراض مزمنة قبل بدء البرنامج.',
    'يحق للإدارة رفض أو تعليق اشتراك أي عميل إذا وُجدت موانع صحية تمنع استخدام بدلة EMS.',
  ] },
  { title: 'التزامات العميل', lines: [
    'الالتزام بالحضور في المواعيد المحددة للجلسات.',
    'ارتداء ملابس التدريب الخاصة بـ EMS (يتم توفيرها أو شراؤها من المركز).',
    'اتباع تعليمات المدرب بدقة لتفادي أي إصابات.',
    'عدم استخدام البدلة دون إشراف مدرب مختص.',
  ] },
  { title: 'سياسة الدفع', lines: [
    'يجب تسديد قيمة الاشتراك كاملاً قبل بدء أول جلسة.',
    'جميع المبالغ المدفوعة غير قابلة للاسترجاع بعد بدء الجلسات.',
    'لا يمكن تحويل الاشتراك إلى شخص آخر.',
  ] },
  { title: 'سياسة الإلغاء والتأجيل', lines: [
    'حرصًا على تنظيم المواعيد وتقديم أفضل تجربة تدريبية لجميع العملاء، نرجو منكم الالتزام بسياسة الإلغاء التالية:',
    'إلغاء الجلسة: يمكن إلغاء أو تعديل موعد الجلسة قبل 36 ساعة على الأقل من وقت الجلسة المحدد، دون أي رسوم و في حال الإلغاء بعد أقل من ٣٦ ساعه ، تعتبر الجلسة مستهلكة وغير قابلة للتعويض، إلا في حالات طارئة (حسب تقدير الإدارة).',
    'عند الحضور للموقع: في حال وصول المدرب للموقع و عدم التجاوب معه خلال مدة ١٥ دقيقه ، تُحتسب الجلسة كأنها مستخدمة بالكامل. نقدّر التزامكم واحترامكم للوقت، ونهدف دومًا لتوفير أفضل تجربة تدريبية لكم.',
  ] },
  { title: 'إلغاء الاشتراك الشهري', lines: [
    'الاشتراك الشهري غير قابل للاسترجاع بعد بدء أول جلسة.',
    'يمكن تجميد الاشتراك لمدة معينة (بحد أقصى أسبوعين لمره واحد خلال مدة الاشتراك ) لحالات السفر أو المرض، بشرط إبلاغ المدرب بذلك..',
  ] },
  { title: 'حالات الطوارئ الطبية', lines: [
    'في حال وجود مانع صحي طارئ يمنع استكمال البرنامج، يُرجى تقديم تقرير طبي، وسنعمل على تجميد أو تعديل الاشتراك وفقًا للحالة.',
    'نقدّر التزامكم واحترامكم للوقت، ونهدف دومًا لتوفير أفضل تجربة تدريبية لكم.',
  ] },
  { title: 'المسؤولية الطبية', lines: [
    'التدريب باستخدام EMS آمن ومعتمد، لكن قد لا يكون مناسبًا لبعض الحالات (مثل أمراض القلب، الحمل، مشاكل الأعصاب…).',
    'يقر العميل بتحمّل كامل المسؤولية عن قراره في استخدام البدلة، ويعفي ادارة pro fit ems Solutions من أي مسؤولية طبية ناتجة عن عدم الإفصاح عن الحالة الصحية.',
  ] },
  { title: 'الملكية الفكرية والخصوصية', lines: [
    'جميع المحتويات والبرامج التدريبية التي يقدمها المركز هي ملكية حصرية له.',
    'يُمنع نسخ أو مشاركة أي جزء من البرنامج أو تصوير الجلسات دون إذن خطي.',
    'يحافظ المركز على سرية بيانات العملاء، ولن يتم مشاركتها مع أي طرف ثالث.',
  ] },
  { title: 'التعديلات', lines: [
    'يحق للإدارة تعديل هذه الشروط في أي وقت، وسيتم إشعار المشتركين عند حدوث أي تغيير.',
  ] },
];

const privacyLines = privacyText.replace(/\r/g, '').split('\n').map(line => line.trim()).filter(Boolean).slice(3);
const privacyIntro: string[] = [];
const privacySections: Section[] = [];
for (const line of privacyLines) {
  if (line.startsWith('المادة ')) privacySections.push({ title: line, lines: [] });
  else if (privacySections.length) privacySections[privacySections.length - 1].lines.push(line);
  else privacyIntro.push(line);
}

const pageMeta = {
  about: { eyebrow: 'تعرف علينا', title: 'من نحن – PRO-FIT', subtitle: 'PRO-FIT، نادي تروح له و نادي يجيك !!' },
  terms: { eyebrow: 'الحقوق والالتزامات', title: 'الأحكام والشروط وسياسات الإلغاء', subtitle: 'أحكام وشروط وسياسات الإلغاء – جلسات تدريب EMS' },
  privacy: { eyebrow: 'الاتفاقيات والسياسات', title: 'سياسة الاستخدام والخصوصية', subtitle: 'اتفاقية الاستخدام الخاصة بالمتجر' },
};

export default function InfoPage({ page }: { page: Page }) {
  const meta = pageMeta[page];
  return (
    <div className="info-page" dir="rtl">
      <header className="info-hero">
        <div className="info-hero-inner">
          <nav className="info-breadcrumb" aria-label="مسار الصفحة"><a href="/">الرئيسية</a><span aria-hidden="true">/</span><span>{meta.title}</span></nav>
          <div className="info-eyebrow">{meta.eyebrow}</div>
          <h1>{meta.title}</h1>
          <p>{meta.subtitle}</p>
        </div>
        <div className="info-hero-orbit" aria-hidden="true" />
      </header>

      {page === 'about' ? <AboutContent /> : (
        <PolicyContent
          sections={page === 'terms' ? termsSections : privacySections}
          intro={page === 'terms' ? [termsIntro] : privacyIntro}
          terms={page === 'terms'}
        />
      )}
    </div>
  );
}

function AboutContent() {
  return (
    <div className="info-container about-content">
      <div className="about-intro info-card">
        <div className="info-eyebrow">PRO-FIT EMS</div>
        <h2>تدريب احترافي، في المكان اللي يناسبك</h2>
        <p>نحن فريق متخصص في تقديم جلسات تدريب منزلية باستخدام تقنية EMS الحديثة، لنمنحك تجربة رياضية مكثفة، فعالة، ومصممة خصيصًا لاحتياجاتك، بدون الحاجة للذهاب إلى النادي.</p>
        <p><strong>هدفنا</strong> هو تسهيل الوصول إلى نمط حياة صحي من خلال تدريب آمن، احترافي، وفعّال… في المكان الذي تشعر فيه براحتك: بيتك.</p>
      </div>

      <section className="about-features" aria-labelledby="about-features-title">
        <div className="info-section-heading"><span className="info-eyebrow">ما يميزنا</span><h2 id="about-features-title">ما يميزنا في PRO-FIT</h2></div>
        <div className="about-feature-grid">
          <article className="info-card about-feature"><span className="about-number">01</span><h3>مدرب يوصلك – وتدريب يبدأ فورًا</h3><p>مدربونا المعتمدون يزورونك في منزلك في الوقت الذي يناسبك، ويجهزون كل ما تحتاجه لجلسة EMS فعالة ومخصصة لك.</p></article>
          <article className="info-card about-feature"><span className="about-number">02</span><h3>نتائج قوية في وقت قصير</h3><p>بفضل تقنية EMS، ستحصل على نتائج تعادل تمرين 90 دقيقة خلال جلسة واحدة فقط مدتها 20 دقيقة – بدون أجهزة، بدون ازدحام، وبدون إهدار للوقت.</p></article>
          <article className="info-card about-feature"><span className="about-number">03</span><h3>راحة، خصوصية، ومرونة</h3><p>لا داعي لمغادرة المنزل أو تعديل جدولك. نحن نأتي إليك، ونوفر تجربة تدريب احترافية في خصوصيتك، بأقصى راحة ومرونة ممكنة.</p></article>
        </div>
      </section>

      <div className="about-closing">
        <p>استمتع بجلسات تدريب شخصية في منزلك، مع مدربين محترفين وأجهزة EMS متطورة تمنحك نتائج ملموسة بأقل وقت وجهد.</p>
        <span>شكراً لكم<br /><strong>فريق PRO-FIT</strong></span>
        <a className="btn btn-primary" href="/#book" data-cursor="hover">ابدأ رحلتك معنا <span aria-hidden="true">←</span></a>
      </div>
    </div>
  );
}

function PolicyContent({ sections, intro, terms }: { sections: Section[]; intro: string[]; terms: boolean }) {
  return (
    <div className="info-container policy-layout">
      <aside className="policy-toc info-card" aria-label="فهرس المحتوى">
        <div className="info-eyebrow">في هذه الصفحة</div>
        <ol>{sections.map((section, i) => <li key={i}><a href={`#article-${i + 1}`}>{terms ? `${i + 1}. ${section.title}` : section.title}</a></li>)}</ol>
      </aside>
      <div className="policy-body">
        <div className="policy-intro info-card">{intro.map((line, i) => line.endsWith(':') ? <h2 key={i}>{line}</h2> : <p key={i}>{line}</p>)}</div>
        {sections.map((section, i) => (
          <section className="policy-section info-card" id={`article-${i + 1}`} key={i}>
            <div className="policy-number">{String(i + 1).padStart(2, '0')}</div>
            <h2>{terms ? `${i + 1}. ${section.title}` : section.title}</h2>
            {terms ? (
              <ul>{section.lines.map((line, j) => <li key={j}>{line}</li>)}</ul>
            ) : (
              <div className="privacy-lines">{section.lines.map((line, j) => <p key={j}>{line}</p>)}</div>
            )}
          </section>
        ))}
        {terms && <div className="policy-ending info-card">باشتراكك في خدمات pro fit ems فإنك توافق على جميع الشروط والأحكام المذكورة أعلاه.</div>}
      </div>
    </div>
  );
}
