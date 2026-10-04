import type { Language, Platform, ProjectCategory } from '../data/projects';
import type { PluralForms } from '../lib/text';

/**
 * Kolejność sekcji. Numer jest wspólny dla obu języków — działa jak oznaczenie
 * rozdziału; tłumaczona jest tylko nazwa.
 *
 * W liniach tytułów fragment `*w gwiazdkach*` jest renderowany kursywą szeryfu.
 */
export const SECTIONS = [
  { id: 'work', no: '01' },
  { id: 'archive', no: '02' },
  { id: 'process', no: '03' },
  { id: 'about', no: '04' },
  { id: 'contact', no: '05' },
] as const;

export type SectionId = (typeof SECTIONS)[number]['id'];

interface Copy {
  nav: Record<SectionId, string> & {
    menu: string;
    close: string;
    label: string;
    cta: string;
    language: string;
    home: string;
  };
  hero: {
    eyebrow: string;
    role: string;
    title: string[];
    lede: string;
    primary: string;
    secondary: string;
    /** Licznik pod hero: „44 prace w archiwum — …”. */
    count: { forms: PluralForms; rest: string };
    scroll: string;
  };
  work: {
    kicker: string;
    title: string[];
    lede: string;
    details: string;
    live: string;
    cursor: string;
  };
  archive: {
    kicker: string;
    title: string[];
    lede: string;
    searchLabel: string;
    searchPlaceholder: string;
    clear: string;
    filtersLabel: string;
    all: string;
    viewLabel: string;
    viewList: string;
    viewGrid: string;
    results: (visible: number, total: number) => string;
    resultsLabel: (visible: number, total: number) => string;
    empty: (query: string) => string;
    reset: string;
    featured: string;
    listLabel: string;
    open: (title: string) => string;
    cursor: string;
    columns: [string, string, string, string];
  };
  sheet: {
    close: string;
    prev: string;
    next: string;
    launch: string;
    platform: string;
    stack: string;
    address: string;
    featured: string;
    keys: string;
  };
  process: {
    kicker: string;
    title: string[];
    lede: string;
    steps: { title: string; body: string; meta: string }[];
    balance: [string, string];
  };
  about: {
    kicker: string;
    title: string[];
    p1: string;
    p2: string;
    craft: string;
    capabilities: string[];
    stats: [PluralForms, PluralForms, PluralForms, PluralForms];
    caption: [string, string];
    portraitAlt: string;
  };
  contact: {
    kicker: string;
    title: string[];
    lede: string;
    email: string;
    copy: string;
    copied: string;
    github: string;
    githubUrl: string;
    top: string;
    legal: string;
    /** Rozwinięcie skrótu APK: pierwsza litera każdego słowa jest wyróżniona. */
    signature: [string, string, string];
    signatureLabel: string;
  };
  categories: Record<ProjectCategory, string>;
  platforms: Record<Platform, string>;
  a11y: { skip: string };
}

export const EMAIL = 'apkmason.dev@gmail.com';

export const copy: Record<Language, Copy> = {
  pl: {
    nav: {
      work: 'Wybrane',
      archive: 'Archiwum',
      process: 'Proces',
      about: 'O mnie',
      contact: 'Kontakt',
      menu: 'Menu',
      close: 'Zamknij',
      label: 'Menu główne',
      cta: 'Napisz',
      language: 'Switch language to English',
      home: 'APKMason.dev — strona główna',
    },
    hero: {
      eyebrow: 'Krzysztof — APKMason.dev',
      role: 'Niezależny twórca cyfrowy',
      title: ['Pomysły przekuwam', 'w cyfrowe', '*doświadczenia.*'],
      lede: 'Interaktywne strony, aplikacje i multimedia na styku kodu, motion designu i AI.',
      primary: 'Zobacz prace',
      secondary: 'Napisz do mnie',
      count: { forms: ['praca', 'prace', 'prac'], rest: 'w archiwum — każda działa na żywo' },
      scroll: 'Przewiń',
    },
    work: {
      kicker: 'Wybrane prace',
      title: ['Prace, które', 'wyznaczają *kierunek.*'],
      lede: 'Każda z nich sprawdza inny pomysł na to, czym może być strona: wystawą, filmem, grą, instrumentem albo produktem.',
      details: 'Szczegóły',
      live: 'Uruchom projekt',
      cursor: 'Uruchom ↗',
    },
    archive: {
      kicker: 'Archiwum',
      title: ['Reszta nie jest *tłem.*'],
      lede: 'Żywe archiwum prób, narzędzi i kierunków, które ukształtowały mój warsztat. Filtruj, szukaj i wchodź w dowolną pozycję.',
      searchLabel: 'Szukaj w archiwum',
      searchPlaceholder: 'Nazwa, technologia…',
      clear: 'Wyczyść wyszukiwanie',
      filtersLabel: 'Kategorie',
      all: 'Wszystko',
      viewLabel: 'Widok',
      viewList: 'Lista',
      viewGrid: 'Siatka',
      results: (visible, total) => `${visible} / ${total}`,
      resultsLabel: (visible, total) => `Wyniki: ${visible} z ${total}`,
      empty: (query) => (query ? `Nic nie pasuje do „${query}”.` : 'Brak pozycji w tej kategorii.'),
      reset: 'Pokaż wszystko',
      featured: 'Wybrane',
      listLabel: 'Archiwum projektów',
      open: (title) => `Szczegóły projektu ${title}`,
      cursor: 'Podgląd',
      columns: ['Nr', 'Projekt', 'Kategoria', 'Platforma'],
    },
    sheet: {
      close: 'Zamknij',
      prev: 'Poprzedni',
      next: 'Następny',
      launch: 'Uruchom projekt',
      platform: 'Platforma',
      stack: 'Technologie',
      address: 'Adres',
      featured: 'Praca wybrana',
      keys: '← → przełączaj · Esc zamknij',
    },
    process: {
      kicker: 'Proces',
      title: ['AI przyspiesza.', 'Człowiek nadaje *kierunek.*'],
      lede: 'Prompt jest początkiem, nie produktem. Buduję powtarzalny proces, w którym narzędzia generatywne wspierają warsztat — nie zastępują myślenia.',
      steps: [
        {
          title: 'Kierunek',
          body: 'Definiuję historię, emocję, odbiorcę i jedną rzecz, którą projekt ma robić wyjątkowo dobrze.',
          meta: 'Concept · Story · UX',
        },
        {
          title: 'System',
          body: 'Dobieram architekturę, modele i media. Projektuję stan docelowy oraz bezpieczne warianty dla mobile i reduced motion.',
          meta: 'Architecture · AI stack',
        },
        {
          title: 'Budowa',
          body: 'Łączę kod, obraz, wideo, dźwięk i interakcję. Każdy element musi pracować na wspólny rytm.',
          meta: 'Code · Motion · Integration',
        },
        {
          title: 'Dopracowanie',
          body: 'Testuję, upraszczam i optymalizuję. To tutaj efektowny prototyp staje się wiarygodnym produktem.',
          meta: 'QA · Performance · Delivery',
        },
      ],
      balance: ['AI — przyspieszenie i iteracja.', 'Człowiek — kierunek, selekcja, odpowiedzialność.'],
    },
    about: {
      kicker: 'O mnie',
      title: ['W dzień buduję zespoły.', 'Po godzinach —', '*nowe światy.*'],
      p1: 'Prowadzę duży zespół techniczny w e-commerce. Po pracy eksploruję moment, w którym kod, obraz i sztuczna inteligencja przestają być osobnymi dziedzinami.',
      p2: 'To projekty niezależne, ale każdy traktuję serio — jako produkt, eksperyment i dowód, że ciekawość połączona z dobrym warsztatem potrafi zmieniać odważne pomysły w działające doświadczenia.',
      craft: 'Warsztat',
      capabilities: [
        'Creative direction',
        'React / TypeScript',
        'Android / Kotlin',
        'Three.js / WebGL',
        'AI media',
        'Product thinking',
        'System design',
        'Motion design',
      ],
      stats: [
        ['Praca w archiwum', 'Prace w archiwum', 'Prac w archiwum'],
        ['Scroll / Story', 'Scroll / Story', 'Scroll / Story'],
        ['Świat 3D', 'Światy 3D', 'Światów 3D'],
        ['Aplikacja', 'Aplikacje', 'Aplikacji'],
      ],
      caption: ['Krzysztof', 'APKMason.dev'],
      portraitAlt: 'Portret: Krzysztof — APKMason.dev',
    },
    contact: {
      kicker: 'Kontakt',
      title: ['Masz pomysł, który', 'zasługuje na *własny świat?*'],
      lede: 'Porozmawiajmy o interaktywnej stronie, aplikacji albo eksperymencie, którego jeszcze nie ma.',
      email: 'Napisz wiadomość',
      copy: 'Kopiuj adres',
      copied: 'Skopiowano',
      github: 'GitHub',
      githubUrl: 'https://github.com/apkmasondev',
      top: 'Do góry',
      legal: 'Wszelkie prawa zastrzeżone.',
      signature: ['AI', 'Pixels', 'Kinetics'],
      signatureLabel: 'APK — AI, Pixels, Kinetics',
    },
    categories: {
      story: 'Scroll / Story',
      spatial: '3D / Spatial',
      product: 'Produkt',
      app: 'Aplikacje',
      experiment: 'Laboratorium',
    },
    platforms: { web: 'Web', android: 'Android', desktop: 'Desktop' },
    a11y: { skip: 'Przejdź do treści' },
  },

  en: {
    nav: {
      work: 'Selected',
      archive: 'Archive',
      process: 'Process',
      about: 'About',
      contact: 'Contact',
      menu: 'Menu',
      close: 'Close',
      label: 'Main menu',
      cta: 'Get in touch',
      language: 'Zmień język na polski',
      home: 'APKMason.dev — home',
    },
    hero: {
      eyebrow: 'Krzysztof — APKMason.dev',
      role: 'Independent digital creator',
      title: ['I forge ideas', 'into digital', '*experiences.*'],
      lede: 'Interactive websites, applications and multimedia at the intersection of code, motion design and AI.',
      primary: 'See the work',
      secondary: 'Get in touch',
      count: { forms: ['work', 'works', 'works'], rest: 'in the archive — every one is live' },
      scroll: 'Scroll',
    },
    work: {
      kicker: 'Selected work',
      title: ['The work that', 'sets the *direction.*'],
      lede: 'Each one tests a different idea of what a website can be: an exhibit, a film, a game, an instrument or a product.',
      details: 'Details',
      live: 'Launch project',
      cursor: 'Launch ↗',
    },
    archive: {
      kicker: 'Archive',
      title: ['The rest is not *background.*'],
      lede: 'A living archive of experiments, tools and directions that shaped how I work today. Filter it, search it, open anything.',
      searchLabel: 'Search the archive',
      searchPlaceholder: 'Name, technology…',
      clear: 'Clear search',
      filtersLabel: 'Categories',
      all: 'Everything',
      viewLabel: 'View',
      viewList: 'List',
      viewGrid: 'Grid',
      results: (visible, total) => `${visible} / ${total}`,
      resultsLabel: (visible, total) => `Showing ${visible} of ${total}`,
      empty: (query) => (query ? `Nothing matches “${query}”.` : 'No entries in this category.'),
      reset: 'Show everything',
      featured: 'Selected',
      listLabel: 'Project archive',
      open: (title) => `Details for ${title}`,
      cursor: 'Preview',
      columns: ['No.', 'Project', 'Category', 'Platform'],
    },
    sheet: {
      close: 'Close',
      prev: 'Previous',
      next: 'Next',
      launch: 'Launch project',
      platform: 'Platform',
      stack: 'Technology',
      address: 'Address',
      featured: 'Selected work',
      keys: '← → browse · Esc close',
    },
    process: {
      kicker: 'Process',
      title: ['AI accelerates.', 'A human sets the *direction.*'],
      lede: 'A prompt is a starting point, not the product. I build a repeatable process in which generative tools support the craft rather than replace judgment.',
      steps: [
        {
          title: 'Direction',
          body: 'I define the story, emotion, audience and the one thing the project must do exceptionally well.',
          meta: 'Concept · Story · UX',
        },
        {
          title: 'System',
          body: 'I select architecture, models and media, including deliberate mobile and reduced-motion variants.',
          meta: 'Architecture · AI stack',
        },
        {
          title: 'Build',
          body: 'I combine code, imagery, video, sound and interaction. Every element must share a common rhythm.',
          meta: 'Code · Motion · Integration',
        },
        {
          title: 'Refinement',
          body: 'I test, simplify and optimize. This is where an impressive prototype becomes a credible product.',
          meta: 'QA · Performance · Delivery',
        },
      ],
      balance: ['AI — acceleration and iteration.', 'Human — direction, curation, accountability.'],
    },
    about: {
      kicker: 'About',
      title: ['By day, I build teams.', 'After hours —', '*new worlds.*'],
      p1: 'I lead a large technical team in e-commerce. After work, I explore the moment when code, imagery and artificial intelligence stop being separate disciplines.',
      p2: 'These are independent projects, but I treat each one seriously — as a product, an experiment and proof that curiosity paired with solid craft can turn bold ideas into working experiences.',
      craft: 'Craft',
      capabilities: [
        'Creative direction',
        'React / TypeScript',
        'Android / Kotlin',
        'Three.js / WebGL',
        'AI media',
        'Product thinking',
        'System design',
        'Motion design',
      ],
      stats: [
        ['Work in the archive', 'Works in the archive', 'Works in the archive'],
        ['Scroll / Story', 'Scroll / Story', 'Scroll / Story'],
        ['3D world', '3D worlds', '3D worlds'],
        ['App', 'Apps', 'Apps'],
      ],
      caption: ['Krzysztof', 'APKMason.dev'],
      portraitAlt: 'Portrait: Krzysztof — APKMason.dev',
    },
    contact: {
      kicker: 'Contact',
      title: ['Have an idea that', 'deserves *a world of its own?*'],
      lede: 'Let’s talk about an interactive website, an application or an experiment that does not exist yet.',
      email: 'Send a message',
      copy: 'Copy address',
      copied: 'Copied',
      github: 'GitHub',
      githubUrl: 'https://github.com/apkmasondev',
      top: 'Back to top',
      legal: 'All rights reserved.',
      signature: ['AI', 'Pixels', 'Kinetics'],
      signatureLabel: 'APK — AI, Pixels, Kinetics',
    },
    categories: {
      story: 'Scroll / Story',
      spatial: '3D / Spatial',
      product: 'Product',
      app: 'Apps',
      experiment: 'Lab',
    },
    platforms: { web: 'Web', android: 'Android', desktop: 'Desktop' },
    a11y: { skip: 'Skip to content' },
  },
};

export const META: Record<Language, { title: string; description: string; locale: string }> = {
  pl: {
    title: 'APKMason.dev — interaktywne doświadczenia, aplikacje, AI',
    description:
      'Portfolio Krzysztofa / APKMason.dev — interaktywne strony, aplikacje i cyfrowe doświadczenia tworzone z kodu, motion designu i AI.',
    locale: 'pl_PL',
  },
  en: {
    title: 'APKMason.dev — interactive experiences, apps, AI',
    description:
      'Krzysztof’s portfolio / APKMason.dev — interactive websites, applications and digital experiences crafted with code, motion design and AI.',
    locale: 'en_US',
  },
};
