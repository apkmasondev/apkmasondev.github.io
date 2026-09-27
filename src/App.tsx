import { useEffect } from 'react';
import { About } from './components/About';
import { Archive } from './components/Archive';
import { Contact } from './components/Contact';
import { Cursor } from './components/Cursor';
import { Hero } from './components/Hero';
import { Nav } from './components/Nav';
import { Process } from './components/Process';
import { ProjectSheet } from './components/ProjectSheet';
import { Work } from './components/Work';
import { SECTIONS } from './i18n/copy';
import { useCopy } from './i18n/language';
import { useActiveSection } from './lib/hooks';
import { useProjectRoute } from './lib/route';

const SECTION_IDS = ['top', ...SECTIONS.map((section) => section.id)] as const;

export default function App() {
  const text = useCopy();
  const active = useActiveSection(SECTION_IDS);
  const { openId, open, close } = useProjectRoute();

  // Link prosto do sekcji (np. /#archive): przy wczytaniu sekcji jeszcze nie ma
  // w DOM, więc przeglądarka nie ma dokąd przewinąć — robimy to po pierwszym renderze.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!/^[a-z-]+$/.test(id)) return;
    const frame = requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">
        {text.a11y.skip}
      </a>
      <Nav active={active} />
      {/* tabIndex: link „przejdź do treści” przenosi też fokus, nie tylko przewija. */}
      <main id="main" tabIndex={-1}>
        <Hero />
        <Work onOpen={open} />
        <Archive onOpen={open} />
        <Process />
        <About />
      </main>
      <Contact />
      <ProjectSheet id={openId} onClose={close} onNavigate={open} />
      <Cursor />
    </>
  );
}
