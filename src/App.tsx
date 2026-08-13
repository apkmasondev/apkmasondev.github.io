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

const LANGUAGE_KEY = 'apkmason-language';

// Dostęp do localStorage rzuca wyjątkiem, gdy przeglądarka blokuje magazyn danych
// (tryb prywatny, restrykcyjne ustawienia ciasteczek), więc nie może wywrócić startu aplikacji.
function readStoredLanguage(): Language | null {
  try {
    const savedLanguage = window.localStorage.getItem(LANGUAGE_KEY);
    return savedLanguage === 'pl' || savedLanguage === 'en' ? savedLanguage : null;
  } catch {
    return null;
  }
}

function App() {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = readStoredLanguage();

    if (savedLanguage) {
      return savedLanguage;
    }

    return window.navigator.language.toLowerCase().startsWith('en') ? 'en' : 'pl';
  });
  const text = copy[language];

  useEffect(() => {
    document.documentElement.lang = language;

    const description = language === 'pl'
      ? 'Portfolio Krzysztofa / APKMason.dev — interaktywne strony, aplikacje i cyfrowe doświadczenia tworzone z kodu, motion designu i AI.'
      : 'Krzysztof’s portfolio / APKMason.dev — interactive websites, applications and digital experiences crafted with code, motion design and AI.';
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:locale"]')?.setAttribute('content', language === 'pl' ? 'pl_PL' : 'en_US');
  }, [language]);

  const changeLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
    try {
      window.localStorage.setItem(LANGUAGE_KEY, nextLanguage);
    } catch {
      // Wybór języka działa w tej sesji nawet bez zapisu w magazynie danych.
    }
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
