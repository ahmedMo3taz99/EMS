import { useEffect, useRef, useState } from 'react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { GALLERY_POSTS } from '../../content/gallery';
import MediaIcon from '../gallery/MediaIcon';
import useMediaReveal from '../gallery/useMediaReveal';
import './SectionGallery.css';

function PostLightbox({ initialIndex, onClose }: { initialIndex: number; onClose: () => void }) {
  const [index, setIndex] = useState(initialIndex);
  const ref = useRef<HTMLDialogElement>(null);
  const post = GALLERY_POSTS[index];
  const move = (step: number) => setIndex(current => (current + step + GALLERY_POSTS.length) % GALLERY_POSTS.length);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
    return () => { dialog.close(); document.body.style.overflow = previousOverflow; };
  }, []);

  return <dialog ref={ref} className="posts-lightbox" aria-labelledby="post-lightbox-title" dir="rtl" onClose={onClose}
    onClick={event => { if (event.target === event.currentTarget) onClose(); }}
    onKeyDown={event => {
      if (event.key === 'ArrowLeft') { event.preventDefault(); move(1); }
      if (event.key === 'ArrowRight') { event.preventDefault(); move(-1); }
    }}>
    <div className="posts-lightbox-toolbar"><div><b id="post-lightbox-title">{post.title}</b><span aria-live="polite" dir="ltr">{String(index + 1).padStart(2, '0')} / {GALLERY_POSTS.length}</span></div><button type="button" onClick={onClose} aria-label="إغلاق الصورة" autoFocus data-cursor="hover"><MediaIcon name="close" /></button></div>
    <div className="posts-lightbox-stage"><button type="button" onClick={() => move(-1)} aria-label="الصورة السابقة" data-cursor="hover"><MediaIcon name="previous" /></button><img key={post.src} src={post.src} alt={post.title} /><button type="button" onClick={() => move(1)} aria-label="الصورة التالية" data-cursor="hover"><MediaIcon name="next" /></button></div>
    <p className="posts-lightbox-hint">صور من عالم PRO-FIT <span>·</span> استخدم الأسهم للتصفّح</p>
  </dialog>;
}

export default function SectionPosts() {
  const [showAll, setShowAll] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const sectionRef = useMediaReveal();
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const posts = showAll ? GALLERY_POSTS : GALLERY_POSTS.slice(0, 6);

  useEffect(() => {
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(frame);
  }, [showAll]);

  const close = () => { const previous = selected; setSelected(null); if (previous !== null) buttonRefs.current[previous]?.focus(); };

  return <section id="posts" className="media-section posts-section" ref={sectionRef} dir="rtl" aria-labelledby="posts-heading">
    <div className="media-shell">
      <header className="media-heading" data-media-reveal><div><div className="media-eyebrow"><span />على مزاج أهدافك</div><h2 id="posts-heading">جرعة حماس.<br /><span>تكمّل معك.</span></h2></div><div className="media-heading-aside"><p>أفكار، لحظات، وخطوات تلهم يومك.<br />تصفّح عالمنا، ولقّط حماسك للخطوة الجاية.</p><span className="posts-gallery-label"><MediaIcon name="expand" />اضغط على أي صورة وشوف التفاصيل</span></div></header>
      <div id="posts-grid" className="posts-grid">
        {posts.map((post, index) => <figure className="posts-card" key={post.src}>
          <button type="button" ref={element => { buttonRefs.current[index] = element; }} className="posts-image-button" onClick={() => setSelected(index)} aria-label={`تكبير الصورة: ${post.title}`} aria-haspopup="dialog" data-cursor="hover">
            <img src={post.thumbSrc} alt={post.title} width={1080} height={post.height} loading="lazy" decoding="async" />
            <span className="posts-image-overlay"><span>شوف التفاصيل</span><span className="posts-expand"><MediaIcon name="expand" /></span></span>
            <span className="posts-image-index" dir="ltr">{String(index + 1).padStart(2, '0')}</span>
          </button>
          <figcaption><div><small>{post.category}</small><h3>{post.title}</h3></div><span className="posts-caption-mark" aria-hidden="true">↗</span></figcaption>
        </figure>)}
      </div>
      <div className="posts-bottom"><span dir="ltr">A LITTLE INSPIRATION. A LOT OF YOU.</span><button type="button" className="posts-more" onClick={() => setShowAll(value => !value)} aria-expanded={showAll} aria-controls="posts-grid" data-cursor="hover">{showAll ? 'عرض صور أقل' : 'شوف باقي الصور'}<span className={showAll ? 'is-open' : ''}><MediaIcon name="plus" /></span></button><p aria-live="polite">{posts.length} من {GALLERY_POSTS.length} صور</p></div>
    </div>
    {selected !== null && <PostLightbox initialIndex={selected} onClose={close} />}
  </section>;
}
