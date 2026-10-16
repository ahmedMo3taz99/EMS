import { useCallback, useEffect, useState } from 'react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { usePixelUnit } from './hooks/usePixelUnit';
import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';
import NoiseFilter from './components/NoiseFilter';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SectionHero from './components/sections/SectionHero';
import SectionEms from './components/sections/SectionEms';
import SectionPackages from './components/sections/SectionPackages';
import SectionFeedback from './components/sections/SectionFeedback';
import SectionFaq  from './components/sections/SectionFaq';
import SectionBook from './components/sections/SectionBook';

export default function App() {
  usePixelUnit();
  const [ready, setReady] = useState(false);
  const onDone = useCallback(() => setReady(true), []);
  const goBook = () => document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' });

  // Re-measure pins once fonts/images have settled
  useEffect(() => {
    if (!ready) return;
    const refresh = () => ScrollTrigger.refresh();
    const t = setTimeout(refresh, 400);
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
            <SectionEms />
            <SectionPackages />
            <SectionFeedback />
            <SectionFaq />
            <SectionBook />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}
