import { Contact } from './components/Contact';
import { Hero } from './components/Hero';
import { Human } from './components/Human';
import { Method } from './components/Method';
import { ProjectIndex } from './components/ProjectIndex';
import { Selected } from './components/Selected';
import { SiteNav } from './components/SiteNav';
import { SECTIONS } from './i18n/copy';
import { useCopy } from './i18n/language-context';
import { useActiveSection } from './lib/hooks';

const SECTION_IDS = ['top', ...SECTIONS.map((section) => section.id)] as const;

export default function App() {
  const text = useCopy();
  const activeSection = useActiveSection(SECTION_IDS);

  return (
    <>
      <a className="skip-link" href="#main">
        {text.a11y.skip}
      </a>
      <SiteNav activeSection={activeSection} />
      <main id="main">
        <Hero />
        <Selected />
        <ProjectIndex />
        <Method />
        <Human />
      </main>
      <Contact />
    </>
  );
}
