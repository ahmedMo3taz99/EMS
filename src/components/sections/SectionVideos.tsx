import { useEffect, useRef, useState } from 'react';
import { GALLERY_VIDEOS, type GalleryVideo } from '../../content/gallery';
import MediaIcon from '../gallery/MediaIcon';
import useMediaReveal from '../gallery/useMediaReveal';
import './SectionGallery.css';

function VideoCard({ video, onPlay, featured = false }: { video: GalleryVideo; onPlay: (video: HTMLVideoElement) => void; featured?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(false);
  const [playError, setPlayError] = useState(false);

  const start = () => {
    if (!ref.current) return;
    setStarted(true);
    setPlayError(false);
    ref.current.play().catch(() => { setStarted(false); setPlayError(true); });
  };

  return <article className={`motion-card${featured ? ' motion-card-featured' : ''}`} data-media-reveal>
    <div className={`motion-video-frame motion-video-${video.orientation}`}>
      <video ref={ref} src={video.src} poster={video.poster} preload="none" playsInline controls={started}
        aria-label={video.title} onPlay={event => { setStarted(true); setPlaying(true); onPlay(event.currentTarget); }}
        onPause={() => setPlaying(false)} onEnded={() => { setPlaying(false); setStarted(false); }}
        onError={() => { setError(true); setPlaying(false); }} />
      {!started && !error && <button type="button" className="motion-video-launch" onClick={start} aria-label={`تشغيل الفيديو: ${video.title}`} data-cursor="hover">
        <span className="motion-video-topline"><span>{featured ? 'اكتشف التجربة' : 'REEL'}</span><span dir="ltr">{video.duration}</span></span>
        <span className="motion-play-circle"><MediaIcon name="play" /></span>
        <span className="motion-video-prompt">اضغط وشوف <MediaIcon name="arrow" /></span>
      </button>}
      {error && <div className="motion-video-error"><p>تعذّر تشغيل الفيديو.</p><a href={video.src} target="_blank" rel="noreferrer">افتح الفيديو مباشرة <MediaIcon name="arrow" /></a></div>}
    </div>
    <div className="motion-card-meta"><span className={`motion-card-status${playing ? ' is-playing' : ''}`}><i />{playing ? 'تشاهد الآن' : video.label}</span><span dir="ltr">{featured ? '01' : video.id === 'reel-one' ? '02' : '03'} / 03</span></div>
    <h3>{video.title}</h3>
    {featured && <p className="motion-card-description">{video.description}</p>}
    {playError && <p className="motion-play-error" role="status">اضغط تشغيل مرة أخرى، أو <a href={video.src} target="_blank" rel="noreferrer">افتح الفيديو مباشرة</a>.</p>}
  </article>;
}

export default function SectionVideos() {
  const sectionRef = useMediaReveal();
  const activeVideo = useRef<HTMLVideoElement | null>(null);
  const play = (video: HTMLVideoElement) => {
    if (activeVideo.current && activeVideo.current !== video) activeVideo.current.pause();
    activeVideo.current = video;
  };

  useEffect(() => {
    const stopWhenHidden = () => { if (document.hidden) activeVideo.current?.pause(); };
    document.addEventListener('visibilitychange', stopWhenHidden);
    const section = sectionRef.current;
    const observer = new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) activeVideo.current?.pause(); });
    if (section) observer.observe(section);
    return () => {
      document.removeEventListener('visibilitychange', stopWhenHidden);
      observer.disconnect();
      activeVideo.current?.pause();
    };
  }, [sectionRef]);

  return <section id="gallery" className="media-section motion-section" ref={sectionRef} dir="rtl" aria-labelledby="motion-heading">
    <div className="media-shell">
      <header className="media-heading motion-heading" data-media-reveal>
        <div><div className="media-eyebrow"><span />من عالم PRO-FIT</div><h2 id="motion-heading">شوف التجربة.<br /><span>قبل ما تبدأها.</span></h2></div>
        <div className="media-heading-aside"><p>مدرب يوصلك، تدريب يناسب يومك، وخصوصية تريحك. شوف كيف تبدأ رحلتك مع PRO-FIT.</p><a href="#posts" className="media-text-link" data-cursor="hover">وتصفّح صورنا <MediaIcon name="arrow" /></a></div>
      </header>
      <ul id="ems" className="motion-benefits" aria-label="مميزات PRO-FIT" data-media-reveal>
        <li><span className="motion-benefit-icon"><MediaIcon name="home" /></span><div><h3>مدرب يوصلك</h3><p>تدريب شخصي في بيتك، بالوقت اللي يناسبك.</p></div></li>
        <li><span className="motion-benefit-icon"><MediaIcon name="clock" /></span><div><h3>وقتك له قيمة</h3><p>جلسات EMS مركّزة وخطة على قد هدفك.</p></div></li>
        <li><span className="motion-benefit-icon"><MediaIcon name="shield" /></span><div><h3>راحتك وخصوصيتك</h3><p>تدرّب براحتك، مع متابعة خطوة بخطوة.</p></div></li>
      </ul>
      <div className="motion-layout"><VideoCard video={GALLERY_VIDEOS[0]} onPlay={play} featured /><div className="motion-reels">{GALLERY_VIDEOS.slice(1).map(video => <VideoCard key={video.id} video={video} onPlay={play} />)}</div></div>
      <footer className="motion-footer"><span dir="ltr">LESS SCROLLING. MORE MOVING.</span><p>أول خطوة؟ <a href="#book" data-cursor="hover">خلّنا نبدأ معك <MediaIcon name="arrow" /></a></p><span className="motion-footer-count">فيديو واحد، وخطوة أقرب.</span></footer>
    </div>
  </section>;
}
