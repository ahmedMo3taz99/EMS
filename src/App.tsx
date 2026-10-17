import { useCallback, useEffect, useState } from 'react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { usePixelUnit } from './hooks/usePixelUnit';
import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';
import NoiseFilter from './components/NoiseFilter';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SectionHero from './components/sections/SectionHero';
import SectionOffer from './components/sections/SectionOffer';
import SectionPackages from './components/sections/SectionPackages';
import SectionFeedback from './components/sections/SectionFeedback';
import SectionFaq  from './components/sections/SectionFaq';
import SectionBook from './components/sections/SectionBook';
import SectionVideos from './components/sections/SectionVideos';
import SectionPosts from './components/sections/SectionPosts';
import InfoPage from './pages/InfoPage';

export default function App() {
  usePixelUnit();
  const page = window.location.pathname.match(/\/(about|terms|privacy)\.html$/)?.[1] as 'about' | 'terms' | 'privacy' | undefined;
  if (page) return <InfoApp page={page} />;
  return <HomeApp />;
}

function InfoApp({ page }: { page: 'about' | 'terms' | 'privacy' }) {
  return (
    <>
      <NoiseFilter />
      <CustomCursor />
      <Navbar />
      <main><InfoPage page={page} /></main>
      <Footer />
    </>
  );
}

function HomeApp() {
  const [ready, setReady] = useState(false);
  const onDone = useCallback(() => setReady(true), []);
  const goBook = () => document.getElementById('book')?.scrollIntoView({
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
  });

  // Re-measure pins once fonts/images have settled
  useEffect(() => {
    if (!ready) return;
    const refresh = () => ScrollTrigger.refresh();
    const t = setTimeout(() => {
      refresh();
      if (window.location.hash) document.getElementById(window.location.hash.slice(1))?.scrollIntoView();
    }, 450);
    window.addEventListener('load', refresh);
    document.fonts?.ready.then(refresh);
    return () => { clearTimeout(t); window.removeEventListener('load', refresh); };
  }, [ready]);

  return (
    <>
      <NoiseFilter />
      <CustomCursor />
      <Loader onDone={onDone} />
      {ready && (
        <>
          <Navbar />
          <main>
            <SectionHero onBook={goBook} />
            <SectionOffer onBook={goBook} />
            <SectionVideos />
            <SectionPackages />
            <SectionFeedback />
            <SectionPosts />
            <SectionFaq />
            <SectionBook />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}
