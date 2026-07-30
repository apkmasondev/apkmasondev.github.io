import { useEffect, useState } from 'react';
import { AboutSection } from './components/AboutSection';
import { FeaturedWork } from './components/FeaturedWork';
import { HeroForge } from './components/HeroForge';
import { Manifesto } from './components/Manifesto';
import { ProcessSection } from './components/ProcessSection';
import { ProjectArchive } from './components/ProjectArchive';
import { SiteFooter } from './components/SiteFooter';
import { SiteHeader } from './components/SiteHeader';
import { copy } from './content';
import type { Language } from './data/projects';

function App() {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = window.localStorage.getItem('apkmason-language');

    if (savedLanguage === 'pl' || savedLanguage === 'en') {
      return savedLanguage;
    }

    return window.navigator.language.toLowerCase().startsWith('en') ? 'en' : 'pl';
  });
  const text = copy[language];

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = 'ApkMason.dev — AI Creator';

    const description = language === 'pl'
      ? 'Portfolio Krzysztofa — AI Creatora projektującego interaktywne doświadczenia cyfrowe, aplikacje, strony 3D i multimedia.'
      : 'Krzysztof’s portfolio — an AI Creator designing interactive digital experiences, apps, 3D websites and multimedia.';
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
  }, [language]);

  const changeLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
    window.localStorage.setItem('apkmason-language', nextLanguage);
  };

  return (
    <>
      <a className="skip-link" href="#main">{text.a11y.skip}</a>
      <SiteHeader language={language} onLanguageChange={changeLanguage} />
      <main id="main">
        <HeroForge language={language} />
        <Manifesto language={language} />
        <FeaturedWork language={language} />
        <ProjectArchive language={language} />
        <ProcessSection language={language} />
        <AboutSection language={language} />
      </main>
      <SiteFooter language={language} />
    </>
  );
}

export default App;
