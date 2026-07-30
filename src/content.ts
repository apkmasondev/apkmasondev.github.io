import type { Language, ProjectCategory } from './data/projects';

type Copy = {
  nav: { work: string; archive: string; process: string; about: string; contact: string };
  hero: {
    eyebrow: string;
    titleLead: string;
    titleAccent: string;
    subtitle: string;
    scroll: string;
    stages: { label: string; title: string; body: string }[];
  };
  intro: { overline: string; line1: string; line2: string; body: string };
  featured: { overline: string; title: string; body: string; open: string };
  archive: {
    overline: string;
    title: string;
    body: string;
    open: string;
    filters: Record<'all' | ProjectCategory, string>;
  };
  process: {
    overline: string;
    titleLines: [string, string, string];
    body: string;
    steps: { title: string; body: string; meta: string }[];
  };
  about: {
    overline: string;
    titleLines: [string, string];
    p1: string;
    p2: string;
    capabilities: string[];
  };
  contact: { overline: string; title: string; body: string; email: string; github: string };
  footer: { statement: string; top: string; legal: string };
  a11y: { skip: string; menuOpen: string; menuClose: string; language: string };
};

export const copy: Record<Language, Copy> = {
  pl: {
    nav: {
      work: 'Wybrane',
      archive: 'Archiwum',
      process: 'Proces',
      about: 'O mnie',
      contact: 'Kontakt',
    },
    hero: {
      eyebrow: 'ApkMason.dev — Independent digital creator',
      titleLead: 'Pomysły przekuwam',
      titleAccent: 'w cyfrowe doświadczenia.',
      subtitle: 'Interaktywne doświadczenia, aplikacje 3D i multimedia tworzone na styku kodu, motion designu i AI.',
      scroll: 'Przewiń, aby uruchomić',
      stages: [
        { label: '01 / IDEA', title: 'Zaczyna się od impulsu.', body: 'Nie od frameworka. Nie od szablonu. Od pomysłu, który domaga się własnej formy.' },
        { label: '02 / SYSTEM', title: 'Nadaję mu strukturę.', body: 'Architektura, obraz, interakcja i technologia zaczynają pracować jak jeden mechanizm.' },
        { label: '03 / MOTION', title: 'Ruch staje się językiem.', body: 'Scroll nie przesuwa strony. Prowadzi historię, zmienia perspektywę i buduje napięcie.' },
        { label: '04 / EXPERIENCE', title: 'Portal jest otwarty.', body: 'Wejdź do kolekcji eksperymentów, aplikacji i cyfrowych opowieści.' },
      ],
    },
    intro: {
      overline: 'Manifest',
      line1: 'CODE × MOTION',
      line2: '× INTELLIGENCE',
      body: 'Technologia jest dla mnie materiałem. AI przyspiesza proces, ale to decyzje, selekcja i ostatnie 20% rzemiosła tworzą doświadczenie warte zapamiętania.',
    },
    featured: {
      overline: 'Selected work',
      title: 'Projekty, które najlepiej pokazują kierunek.',
      body: 'Sześć realizacji. Jeden wspólny mianownik: cyfrowy produkt musi mieć własny głos.',
      open: 'Otwórz projekt',
    },
    archive: {
      overline: 'Project universe',
      title: 'Reszta nie jest tłem.',
      body: 'Żywe archiwum prób, narzędzi i kierunków, które ukształtowały mój obecny warsztat.',
      open: 'Zobacz',
      filters: {
        all: 'Wszystkie',
        story: 'Scroll / Story',
        spatial: '3D / Spatial',
        app: 'Aplikacje',
        experiment: 'Eksperymenty',
      },
    },
    process: {
      overline: 'The making of',
      titleLines: ['AI przyspiesza.', 'Człowiek nadaje', 'kierunek.'],
      body: 'Nie kolekcjonuję promptów. Buduję powtarzalny proces, w którym generatywne narzędzia są częścią warsztatu — nie substytutem myślenia.',
      steps: [
        { title: 'Kierunek', body: 'Definiuję historię, emocję, odbiorcę i jedną rzecz, którą projekt ma robić wyjątkowo dobrze.', meta: 'Concept / Story / UX' },
        { title: 'System', body: 'Dobieram architekturę, modele i media. Projektuję stan docelowy oraz bezpieczne warianty dla mobile i reduced motion.', meta: 'Architecture / AI stack' },
        { title: 'Budowa', body: 'Łączę kod, obraz, wideo, dźwięk i interakcję. Każdy element musi pracować na wspólny rytm.', meta: 'Code / Motion / Integration' },
        { title: 'Ostatnie 20%', body: 'Testuję, upraszczam i optymalizuję. To tutaj efektowny prototyp staje się wiarygodnym produktem.', meta: 'QA / Performance / Delivery' },
      ],
    },
    about: {
      overline: 'Human behind the system',
      titleLines: ['W dzień buduję zespoły.', 'Po godzinach — nowe światy.'],
      p1: 'Prowadzę duży zespół techniczny w e-commerce. Po pracy eksploruję moment, w którym kod, obraz i sztuczna inteligencja przestają być osobnymi dziedzinami.',
      p2: 'Buduję hobbystycznie, ale traktuję każdy projekt serio: jako produkt, eksperyment i kolejny dowód, że ciekawość połączona z dobrym warsztatem potrafi bardzo szybko materializować odważne pomysły.',
      capabilities: ['Creative direction', 'React / TypeScript', 'Android / Kotlin', 'Three.js / WebGL', 'AI media', 'Product thinking', 'System design', 'Motion design'],
    },
    contact: {
      overline: 'Next chapter',
      title: 'Masz pomysł, który zasługuje na własny świat?',
      body: 'Porozmawiajmy o interaktywnej stronie, aplikacji albo eksperymencie, którego jeszcze nie ma.',
      email: 'Napisz wiadomość',
      github: 'Zobacz GitHub',
    },
    footer: {
      statement: 'Forged with curiosity, code and AI.',
      top: 'Do góry',
      legal: 'Wszelkie prawa zastrzeżone.',
    },
    a11y: {
      skip: 'Przejdź do głównej treści',
      menuOpen: 'Otwórz menu',
      menuClose: 'Zamknij menu',
      language: 'Zmień język na angielski',
    },
  },
  en: {
    nav: {
      work: 'Selected',
      archive: 'Archive',
      process: 'Process',
      about: 'About',
      contact: 'Contact',
    },
    hero: {
      eyebrow: 'ApkMason.dev — Independent digital creator',
      titleLead: 'I forge ideas',
      titleAccent: 'into digital experiences.',
      subtitle: 'Interactive experiences, 3D applications and multimedia created where code, motion design and AI meet.',
      scroll: 'Scroll to activate',
      stages: [
        { label: '01 / IDEA', title: 'It begins with an impulse.', body: 'Not with a framework. Not with a template. With an idea that demands a form of its own.' },
        { label: '02 / SYSTEM', title: 'I give it structure.', body: 'Architecture, image, interaction and technology begin working as a single mechanism.' },
        { label: '03 / MOTION', title: 'Movement becomes language.', body: 'Scroll does not move a page. It guides a story, changes perspective and builds tension.' },
        { label: '04 / EXPERIENCE', title: 'The portal is open.', body: 'Enter a collection of experiments, applications and digital stories.' },
      ],
    },
    intro: {
      overline: 'Manifesto',
      line1: 'CODE × MOTION',
      line2: '× INTELLIGENCE',
      body: 'Technology is my material. AI accelerates the process, but decisions, curation and the final 20% of craft create an experience worth remembering.',
    },
    featured: {
      overline: 'Selected work',
      title: 'Projects that best define the direction.',
      body: 'Six projects. One shared principle: a digital product must have a voice of its own.',
      open: 'Open project',
    },
    archive: {
      overline: 'Project universe',
      title: 'Everything else still matters.',
      body: 'A living archive of experiments, tools and directions that shaped the craft I use today.',
      open: 'View',
      filters: {
        all: 'All',
        story: 'Scroll / Story',
        spatial: '3D / Spatial',
        app: 'Apps',
        experiment: 'Experiments',
      },
    },
    process: {
      overline: 'The making of',
      titleLines: ['AI accelerates.', 'A human sets', 'the direction.'],
      body: 'I do not collect prompts. I build a repeatable process in which generative tools are part of the craft — not a substitute for thinking.',
      steps: [
        { title: 'Direction', body: 'I define the story, emotion, audience and the one thing the project must do exceptionally well.', meta: 'Concept / Story / UX' },
        { title: 'System', body: 'I select architecture, models and media, including deliberate mobile and reduced-motion variants.', meta: 'Architecture / AI stack' },
        { title: 'Build', body: 'I combine code, imagery, video, sound and interaction. Every element must share a common rhythm.', meta: 'Code / Motion / Integration' },
        { title: 'The final 20%', body: 'I test, simplify and optimize. This is where an impressive prototype becomes a credible product.', meta: 'QA / Performance / Delivery' },
      ],
    },
    about: {
      overline: 'Human behind the system',
      titleLines: ['By day, I build teams.', 'After hours — new worlds.'],
      p1: 'I lead a large technical team in e-commerce. After work, I explore the moment when code, imagery and artificial intelligence stop being separate disciplines.',
      p2: 'I build as a passion, but treat every project seriously: as a product, an experiment and another proof that curiosity paired with a solid craft can materialize bold ideas very quickly.',
      capabilities: ['Creative direction', 'React / TypeScript', 'Android / Kotlin', 'Three.js / WebGL', 'AI media', 'Product thinking', 'System design', 'Motion design'],
    },
    contact: {
      overline: 'Next chapter',
      title: 'Have an idea that deserves a world of its own?',
      body: 'Let’s talk about an interactive website, an application or an experiment that does not exist yet.',
      email: 'Send a message',
      github: 'View GitHub',
    },
    footer: {
      statement: 'Forged with curiosity, code and AI.',
      top: 'Back to top',
      legal: 'All rights reserved.',
    },
    a11y: {
      skip: 'Skip to main content',
      menuOpen: 'Open menu',
      menuClose: 'Close menu',
      language: 'Switch language to Polish',
    },
  },
};
