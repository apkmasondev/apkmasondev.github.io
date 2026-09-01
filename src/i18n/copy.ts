import type { Language, ProjectCategory } from '../data/projects';

/**
 * Sekcje strony. Numer i angielska etykieta systemowa (`code`) są wspólne dla obu
 * języków — działają jak oznaczenia rolki filmowej; tłumaczona jest tylko nazwa w menu.
 */
export const SECTIONS = [
  { id: 'selected', code: '01 / SELECTED' },
  { id: 'index', code: '02 / INDEX' },
  { id: 'method', code: '03 / METHOD' },
  { id: 'human', code: '04 / HUMAN' },
  { id: 'contact', code: '05 / CONTACT' },
] as const;

export type SectionId = (typeof SECTIONS)[number]['id'];

export const HERO_CODE = '00 / SIGNAL';

interface Copy {
  nav: Record<SectionId, string> & { menu: string; close: string; language: string };
  hero: {
    eyebrow: string;
    titleLead: string;
    titleAccent: string;
    lede: string;
    primary: string;
    secondary: string;
    scroll: string;
    tickerLabel: string;
    stats: [string, string, string];
  };
  selected: {
    title: string;
    lede: string;
    open: string;
    counter: string;
  };
  index: {
    titleLead: string;
    titleAccent: string;
    lede: string;
    searchLabel: string;
    searchPlaceholder: string;
    clear: string;
    hint: string;
    empty: string;
    emptyAction: string;
    filtersLabel: string;
    filters: Record<'all' | ProjectCategory, string>;
    listLabel: string;
    results: (visible: number, total: number) => string;
    selectedMark: string;
    open: string;
    openLabel: (title: string) => string;
    expand: (title: string) => string;
  };
  method: {
    titleLines: [string, string];
    lede: string;
    ratioAi: string;
    ratioHuman: string;
    steps: { title: string; body: string; meta: string }[];
  };
  human: {
    titleLead: string;
    titleAccent: string;
    p1: string;
    p2: string;
    capabilitiesLabel: string;
    capabilities: string[];
    portrait: string;
    portraitMeta: [string, string];
  };
  contact: {
    titleLead: string;
    titleAccent: string;
    lede: string;
    email: string;
    emailValue: string;
    github: string;
    githubUrl: string;
    top: string;
    legal: string;
    signature: [string, string, string];
  };
  a11y: { skip: string };
}

export const copy: Record<Language, Copy> = {
  pl: {
    nav: {
      selected: 'Wybrane',
      index: 'Indeks',
      method: 'Metoda',
      human: 'O mnie',
      contact: 'Kontakt',
      menu: 'Otwórz menu',
      close: 'Zamknij menu',
      language: 'Switch language to English',
    },
    hero: {
      eyebrow: 'APKMASON.DEV — INDEPENDENT DIGITAL CREATOR',
      titleLead: 'Pomysły przekuwam',
      titleAccent: 'w cyfrowe doświadczenia.',
      lede: 'Interaktywne strony, aplikacje i multimedia na styku kodu, motion designu i AI.',
      primary: 'Zobacz wybrane prace',
      secondary: 'Napisz do mnie',
      scroll: 'Przewiń',
      tickerLabel: 'Pełny indeks',
      stats: ['Projekty', 'Scroll stories', 'Aplikacje'],
    },
    selected: {
      title: 'Prace, które ustawiają kierunek.',
      lede:
        'Każda z nich sprawdza inny pomysł na to, czym może być strona: wystawą, filmem, instrumentem albo produktem.',
      open: 'Otwórz projekt',
      counter: 'Wybrane',
    },
    index: {
      titleLead: 'Reszta nie jest ',
      titleAccent: 'tłem.',
      lede:
        'Żywe archiwum prób, narzędzi i kierunków, które ukształtowały mój warsztat. Filtruj, szukaj i wchodź w dowolną pozycję.',
      searchLabel: 'Szukaj w indeksie',
      searchPlaceholder: 'Nazwa, technologia…',
      clear: 'Wyczyść wyszukiwanie',
      hint: 'Klawisz / — szukaj · ↑ ↓ — nawigacja · Enter — otwórz',
      empty: 'Nic nie pasuje do tego zapytania.',
      emptyAction: 'Pokaż wszystkie',
      filtersLabel: 'Filtry kategorii',
      filters: {
        all: 'Wszystkie',
        story: 'Scroll / Story',
        spatial: '3D / Spatial',
        product: 'Product / Commercial',
        app: 'Aplikacje',
      },
      listLabel: 'Indeks projektów',
      results: (visible, total) => `${visible} z ${total}`,
      selectedMark: 'Wybrane',
      open: 'Otwórz',
      openLabel: (title) => `Otwórz projekt ${title} w nowej karcie`,
      expand: (title) => `Pokaż szczegóły projektu ${title}`,
    },
    method: {
      titleLines: ['AI przyspiesza.', 'Człowiek nadaje kierunek.'],
      lede:
        'Prompt jest początkiem, nie produktem. Buduję powtarzalny proces, w którym narzędzia generatywne wspierają warsztat — nie zastępują myślenia.',
      ratioAi: 'AI — prędkość',
      ratioHuman: 'Człowiek — ostatnie 20%',
      steps: [
        {
          title: 'Kierunek',
          body: 'Definiuję historię, emocję, odbiorcę i jedną rzecz, którą projekt ma robić wyjątkowo dobrze.',
          meta: 'Concept / Story / UX',
        },
        {
          title: 'System',
          body: 'Dobieram architekturę, modele i media. Projektuję stan docelowy oraz bezpieczne warianty dla mobile i reduced motion.',
          meta: 'Architecture / AI stack',
        },
        {
          title: 'Budowa',
          body: 'Łączę kod, obraz, wideo, dźwięk i interakcję. Każdy element musi pracować na wspólny rytm.',
          meta: 'Code / Motion / Integration',
        },
        {
          title: 'Ostatnie 20%',
          body: 'Testuję, upraszczam i optymalizuję. To tutaj efektowny prototyp staje się wiarygodnym produktem.',
          meta: 'QA / Performance / Delivery',
        },
      ],
    },
    human: {
      titleLead: 'W dzień buduję zespoły.',
      titleAccent: 'Po godzinach — nowe światy.',
      p1: 'Prowadzę duży zespół techniczny w e-commerce. Po pracy eksploruję moment, w którym kod, obraz i sztuczna inteligencja przestają być osobnymi dziedzinami.',
      p2: 'To projekty niezależne, ale każdy traktuję serio — jako produkt, eksperyment i dowód, że ciekawość połączona z dobrym warsztatem potrafi zmieniać odważne pomysły w działające doświadczenia.',
      capabilitiesLabel: 'Warsztat',
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
      portrait: 'Odtwórz portret wideo',
      portraitMeta: ['SUBJECT / KRZYSZTOF', 'SEQUENCE / 06S'],
    },
    contact: {
      titleLead: 'Masz pomysł, który zasługuje ',
      titleAccent: 'na własny świat?',
      lede: 'Porozmawiajmy o interaktywnej stronie, aplikacji albo eksperymencie, którego jeszcze nie ma.',
      email: 'Napisz wiadomość',
      emailValue: 'apkmason.dev@gmail.com',
      github: 'Zobacz GitHub',
      githubUrl: 'https://github.com/apkmasondev',
      top: 'Do góry',
      legal: 'Wszelkie prawa zastrzeżone.',
      signature: ['AI', 'Pixels', 'Kinetics'],
    },
    a11y: { skip: 'Przejdź do głównej treści' },
  },

  en: {
    nav: {
      selected: 'Selected',
      index: 'Index',
      method: 'Method',
      human: 'About',
      contact: 'Contact',
      menu: 'Open menu',
      close: 'Close menu',
      language: 'Zmień język na polski',
    },
    hero: {
      eyebrow: 'APKMASON.DEV — INDEPENDENT DIGITAL CREATOR',
      titleLead: 'I forge ideas',
      titleAccent: 'into digital experiences.',
      lede: 'Interactive websites, applications and multimedia at the intersection of code, motion design and AI.',
      primary: 'See selected work',
      secondary: 'Get in touch',
      scroll: 'Scroll',
      tickerLabel: 'Full index',
      stats: ['Projects', 'Scroll stories', 'Apps'],
    },
    selected: {
      title: 'The work that sets the direction.',
      lede:
        'Each one tests a different idea of what a website can be: an exhibit, a film, an instrument or a product.',
      open: 'Open project',
      counter: 'Selected',
    },
    index: {
      titleLead: 'The rest is not ',
      titleAccent: 'background.',
      lede:
        'A living archive of experiments, tools and directions that shaped how I work today. Filter it, search it, open anything.',
      searchLabel: 'Search the index',
      searchPlaceholder: 'Name, technology…',
      clear: 'Clear search',
      hint: 'Press / to search · ↑ ↓ to move · Enter to open',
      empty: 'Nothing matches that query.',
      emptyAction: 'Show everything',
      filtersLabel: 'Category filters',
      filters: {
        all: 'All',
        story: 'Scroll / Story',
        spatial: '3D / Spatial',
        product: 'Product / Commercial',
        app: 'Apps',
      },
      listLabel: 'Project index',
      results: (visible, total) => `${visible} of ${total}`,
      selectedMark: 'Selected',
      open: 'Open',
      openLabel: (title) => `Open project ${title} in a new tab`,
      expand: (title) => `Show details for ${title}`,
    },
    method: {
      titleLines: ['AI accelerates.', 'A human sets the direction.'],
      lede:
        'A prompt is a starting point, not the product. I build a repeatable process in which generative tools support the craft rather than replace judgment.',
      ratioAi: 'AI — velocity',
      ratioHuman: 'Human — the last 20%',
      steps: [
        {
          title: 'Direction',
          body: 'I define the story, emotion, audience and the one thing the project must do exceptionally well.',
          meta: 'Concept / Story / UX',
        },
        {
          title: 'System',
          body: 'I select architecture, models and media, including deliberate mobile and reduced-motion variants.',
          meta: 'Architecture / AI stack',
        },
        {
          title: 'Build',
          body: 'I combine code, imagery, video, sound and interaction. Every element must share a common rhythm.',
          meta: 'Code / Motion / Integration',
        },
        {
          title: 'The final 20%',
          body: 'I test, simplify and optimize. This is where an impressive prototype becomes a credible product.',
          meta: 'QA / Performance / Delivery',
        },
      ],
    },
    human: {
      titleLead: 'By day, I build teams.',
      titleAccent: 'After hours — new worlds.',
      p1: 'I lead a large technical team in e-commerce. After work, I explore the moment when code, imagery and artificial intelligence stop being separate disciplines.',
      p2: 'These are independent projects, but I treat each one seriously — as a product, an experiment and proof that curiosity paired with solid craft can turn bold ideas into working experiences.',
      capabilitiesLabel: 'Craft',
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
      portrait: 'Play video portrait',
      portraitMeta: ['SUBJECT / KRZYSZTOF', 'SEQUENCE / 06S'],
    },
    contact: {
      titleLead: 'Have an idea that deserves ',
      titleAccent: 'a world of its own?',
      lede: 'Let’s talk about an interactive website, an application or an experiment that does not exist yet.',
      email: 'Send a message',
      emailValue: 'apkmason.dev@gmail.com',
      github: 'View GitHub',
      githubUrl: 'https://github.com/apkmasondev',
      top: 'Back to top',
      legal: 'All rights reserved.',
      signature: ['AI', 'Pixels', 'Kinetics'],
    },
    a11y: { skip: 'Skip to main content' },
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
