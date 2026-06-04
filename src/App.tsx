
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Workflow from './components/Workflow';
import Footer from './components/Footer';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

function App() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', t('hero.description'));
    }
  }, [i18n.language, t]);

  return (
    <>
      <a href="#hero" className="sr-only focus:not-sr-only">
        {t('navbar.skip')}
      </a>
      
      <div className="bg-animation">
        <div className="glow-orb orb-1"></div>
        <div className="glow-orb orb-2"></div>
        <div className="particles"></div>
      </div>
      
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Projects />
        <Workflow />
      </main>

      <Footer />
    </>
  );
}

export default App;
