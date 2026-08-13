export type Language = 'pl' | 'en';
export type ProjectCategory = 'story' | 'spatial' | 'product' | 'app' | 'experiment';

export interface LocalizedText {
  pl: string;
  en: string;
}

export interface Project {
  id: string;
  title: string;
  description: LocalizedText;
  image: string;
  link: string;
  tags: string[];
  category: ProjectCategory;
  featured?: boolean;
  accent: string;
}

export const projects: Project[] = [
  {
    id: 'apk-genesis',
    title: 'APK://GENESIS',
    description: {
      pl: 'Cyfrowy manifest APKMason.dev: sterowana scrollem opowieść o AI, obrazie i ruchu, zbudowana z wideo, typografii i dźwięku.',
      en: 'A digital manifesto for APKMason.dev: a scroll-driven story about AI, imagery and motion, built from video, typography and sound.',
    },
    image: '/genesis_mockup.webp',
    link: 'https://apkmason.dev/apk_genesis/',
    tags: ['Scroll-driven', 'Cinematic', 'Manifesto'],
    category: 'story',
    featured: true,
    accent: '#38bdf8',
  },
  {
    id: 'brixcore',
    title: 'BRIXCORE',
    description: {
      pl: 'Jednoekranowe doświadczenie wyboru o kinowej oprawie — wybierz rdzeń FORGE lub EVOLVE i poznaj swoją ścieżkę.',
      en: 'A one-screen, choice-driven cinematic experience — pick the FORGE or EVOLVE core to reveal your path.',
    },
    image: '/brixcore_mockup.webp',
    link: 'https://apkmason.dev/brixcore/',
    tags: ['Choice-driven', 'Interactive', 'Cinematic'],
    category: 'experiment',
    featured: true,
    accent: '#ff845d',
  },
  {
    id: 'beyond-the-door',
    title: 'Beyond the Door',
    description: {
      pl: 'Interaktywna podróż przez trzy tajemnicze ścieżki, łącząca film, dźwięk i wybory użytkownika w jedno doświadczenie.',
      en: 'An interactive journey through three mysterious paths, uniting film, sound and user choice in one experience.',
    },
    image: '/btd_mockup.webp',
    link: 'https://apkmason.dev/btd/',
    tags: ['Immersive', 'Scroll-driven', 'Sound'],
    category: 'story',
    featured: true,
    accent: '#be6cff',
  },
  {
    id: 'origin',
    title: 'ORIGIN — The Cycle of Becoming',
    description: {
      pl: 'Pełnoekranowa opowieść filmowa sterowana scrollem — od pierwotnej eksplozji materii po świetlistą formę i kosmiczny wir.',
      en: 'A cinematic fullscreen story driven by scroll — from a primal explosion of matter to a luminous form and cosmic vortex.',
    },
    image: '/origin_mockup.webp',
    link: 'https://apkmason.dev/origin/',
    tags: ['Scroll-driven', 'Cinematic', 'Canvas'],
    category: 'story',
    featured: true,
    accent: '#ff6b35',
  },
  {
    id: 'edm',
    title: 'EDM Music Festival',
    description: {
      pl: 'Kinowa prezentacja fikcyjnego festiwalu EDM sterowana scrollem, łącząca dynamiczne wideo, oprawę muzyczną i interaktywny line-up.',
      en: 'A cinematic, scroll-driven presentation for a fictional EDM festival, combining dynamic video, soundtrack and an interactive lineup.',
    },
    image: '/edm_mockup.webp',
    link: 'https://apkmason.dev/edm/',
    tags: ['Scroll-driven', 'Music Festival', 'Interactive'],
    category: 'experiment',
    featured: true,
    accent: '#ff0055',
  },
  {
    id: 'skincare',
    title: 'Skin Elixir',
    description: {
      pl: 'Koncept luksusowej prezentacji kosmetyków z narracją sterowaną scrollem i inercyjnym ruchem.',
      en: 'A concept for a luxury skincare presentation, driven by scroll and an inertial motion system.',
    },
    image: '/skincare_mockup.webp',
    link: 'https://apkmason.dev/skincare_demo/',
    tags: ['Scroll-driven', 'Luxury UI', 'Motion'],
    category: 'product',
    featured: true,
    accent: '#e8bfb3',
  },
  {
    id: 'the-vault',
    title: 'THE VAULT',
    description: {
      pl: 'Kinowe doświadczenie otwierania tajemniczej komory, łączące wideo sterowane scrollem, reaktywny dźwięk i finał renderowany w WebGL.',
      en: 'A cinematic containment experience combining scroll-scrubbed video, reactive sound and a WebGL-rendered finale.',
    },
    image: '/the_vault_mockup.webp',
    link: 'https://apkmason.dev/the_vault/',
    tags: ['WebGL', 'Scroll-driven', 'Reactive audio'],
    category: 'spatial',
    featured: true,
    accent: '#7cff45',
  },
  {
    id: 'arc',
    title: 'APKMASON ARC',
    description: {
      pl: 'Konceptualna prezentacja głośnika z dźwiękiem przestrzennym, sterowaniem scrollem, falowym polem akustycznym i interaktywnymi hotspotami.',
      en: 'A conceptual spatial audio speaker experience driven by scroll, real-time acoustic wave fields, and interactive hotspots.',
    },
    image: '/arc_mockup.webp',
    link: 'https://apkmason.dev/arc/',
    tags: ['Spatial Audio', 'Scroll-driven', 'Interactive'],
    category: 'product',
    accent: '#00e5ff',
  },
  {
    id: 'fruit-energy',
    title: 'FRUIT ENERGY',
    description: {
      pl: 'Kinowa prezentacja fikcyjnego napoju energetycznego, łącząca narrację produktową, reżyserię ruchu i sterowanie scrollem.',
      en: 'A cinematic presentation for a fictional energy drink, combining product storytelling, motion direction and scroll control.',
    },
    image: '/fruit_mockup.webp',
    link: 'https://apkmason.dev/fruit/',
    tags: ['Scroll-driven', 'Product story', 'AI video'],
    category: 'product',
    accent: '#ff6a2f',
  },
  {
    id: 'spark',
    title: 'SPARK',
    description: {
      pl: 'Historia ludzkiego postępu — od pierwszego ognia po eksplorację kosmosu — złożona z czterech filmowych sekwencji.',
      en: 'The story of human progress — from the first fire to space exploration — composed from four cinematic sequences.',
    },
    image: '/spark_mockup.webp',
    link: 'https://apkmason.dev/spark/',
    tags: ['Cinematic', 'Scroll-driven', 'AI video'],
    category: 'story',
    accent: '#ffb13b',
  },
  {
    id: 'the-iris',
    title: 'THE IRIS',
    description: {
      pl: 'Jednokadrowe doświadczenie filmowe, w którym trzy sekwencje tworzą sterowany scrollem mechanizm optyczny.',
      en: 'A single-shot cinematic experience where three sequences form an optical mechanism controlled by scroll.',
    },
    image: '/iris_mockup.webp',
    link: 'https://apkmason.dev/iris/',
    tags: ['Cinematic', 'Video scrubbing', 'Scroll-driven'],
    category: 'story',
    accent: '#a77bff',
  },
  {
    id: 'evolution-phone',
    title: 'Evolution of the Phone',
    description: {
      pl: 'Ewolucja mobilnych technologii od lat 90. po spekulatywną przyszłość.',
      en: 'The evolution of mobile technology from the 1990s to a speculative future.',
    },
    image: '/evo_phone_mockup.webp',
    link: 'https://apkmason.dev/evo_phone/',
    tags: ['Timeline', 'Video scrubbing', 'Technology history'],
    category: 'story',
    accent: '#8d7cff',
  },
  {
    id: 'sfera',
    title: 'Sfera',
    description: {
      pl: 'Interaktywna sfera wiedzy, w której obrazy i ciekawostki rozmieszczono za pomocą algorytmu sfery Fibonacciego.',
      en: 'An interactive knowledge sphere arranging images and facts with a Fibonacci-sphere algorithm.',
    },
    image: '/sfera_mockup.webp',
    link: 'https://apkmason.dev/sfera/',
    tags: ['Three.js', 'WebGL', 'Fibonacci'],
    category: 'spatial',
    accent: '#34c7ff',
  },
  {
    id: 'pcverse',
    title: 'PCVerse',
    description: {
      pl: 'Interaktywny przewodnik 3D po podzespołach komputera, pokazujący ich rozmieszczenie i wzajemne połączenia.',
      en: 'An interactive 3D guide to PC components, showing how they are arranged and connected.',
    },
    image: '/pcverse_mockup.webp',
    link: 'https://apkmason.dev/pcverse/',
    tags: ['Interactive 3D', 'Three.js', 'Hardware'],
    category: 'spatial',
    accent: '#00e2b8',
  },
  {
    id: 'inside-the-internet',
    title: 'Inside the Internet',
    description: {
      pl: 'Wizualizacja podróży pakietu danych przez cyfrową infrastrukturę — abstrakcyjna sieć staje się namacalną przestrzenią.',
      en: 'A visualization of a data packet travelling through digital infrastructure — turning an abstract network into a tangible space.',
    },
    image: '/inside_the_internet_mockup.webp',
    link: 'https://apkmason.dev/inside-the-internet/',
    tags: ['GSAP', 'Interactive', 'Data story'],
    category: 'story',
    accent: '#41e1b8',
  },
  {
    id: 'sand-to-silicon',
    title: 'From Sand to Silicon',
    description: {
      pl: 'Proces przemiany ziaren piasku w mikroprocesor przedstawiony jako sterowana scrollem podróż.',
      en: 'The transformation of sand into a microprocessor, presented as a scroll-controlled journey.',
    },
    image: '/sand_to_silicon_mockup.webp',
    link: 'https://apkmason.dev/sand_to_silicon/',
    tags: ['GSAP', 'Educational', 'Scroll-driven'],
    category: 'story',
    accent: '#f0b86e',
  },
  {
    id: 'pure-form',
    title: 'Pure Form',
    description: {
      pl: 'Luksusowa, sterowana scrollem prezentacja fikcyjnego zapachu APKMASON — PURE FORM.',
      en: 'A luxury scroll-driven showcase of the fictional fragrance APKMASON — PURE FORM.',
    },
    image: '/pure_form_mockup.webp',
    link: 'https://apkmason.dev/Pure_form/',
    tags: ['Scroll-driven', 'Luxury UI', 'Motion'],
    category: 'product',
    accent: '#d4af37',
  },
  {
    id: 'ascent',
    title: 'ASCENT — The Human Journey',
    description: {
      pl: 'Symboliczna ewolucja człowieka opowiedziana obrazem, tempem i przewijaniem.',
      en: 'A symbolic evolution of humanity told through imagery, pacing and scroll.',
    },
    image: '/ascent_human_journey_mockup.webp',
    link: 'https://apkmason.dev/ascent-human-journey/',
    tags: ['Scroll-driven', 'Cinematic', 'AI video'],
    category: 'story',
    accent: '#d1a56d',
  },
  {
    id: 'poznaj-ai',
    title: 'Poznaj AI',
    description: {
      pl: 'Interaktywny przewodnik dla osób rozpoczynających świadomą przygodę ze sztuczną inteligencją.',
      en: 'An interactive guide for people beginning a thoughtful journey with artificial intelligence.',
    },
    image: '/poznaj_ai_mockup.webp',
    link: 'https://apkmason.dev/poznaj_ai/',
    tags: ['AI literacy', 'Educational', 'Interactive'],
    category: 'experiment',
    accent: '#7c83ff',
  },
  {
    id: 'vibe-shift',
    title: 'VIBE//SHIFT',
    description: {
      pl: 'Interaktywny manifest vibe codingu zbudowany na kinetycznej typografii i płynnym ruchu.',
      en: 'An interactive vibe-coding manifesto built around kinetic typography and fluid motion.',
    },
    image: '/vibeshift_mockup.webp',
    link: 'https://apkmason.dev/vibe_shift/',
    tags: ['Kinetic type', 'Motion', 'Vibe coding'],
    category: 'experiment',
    accent: '#ff3f84',
  },
  {
    id: 'mechanika-czasu',
    title: 'Mechanika Czasu',
    description: {
      pl: 'Kinowa prezentacja mechanicznego zegarka — od surowej formy po pulsujący, precyzyjny mechanizm sterowany scrollem.',
      en: 'A cinematic presentation of a mechanical watch — from raw form to a precise, living mechanism controlled by scroll.',
    },
    image: '/mechanika_czasu_mockup.webp',
    link: 'https://apkmason.dev/time/',
    tags: ['Scroll-driven', 'AI video', 'Cinematic'],
    category: 'product',
    accent: '#ff5a36',
  },
  {
    id: 'space-scale',
    title: 'Space Scale',
    description: {
      pl: 'Interaktywna podróż przez 42 rzędy wielkości — od protonu po obserwowalny Wszechświat, z 28 modelami 3D.',
      en: 'An interactive journey across 42 orders of magnitude — from a proton to the observable Universe, with 28 3D models.',
    },
    image: '/spacescale_mockup.webp',
    link: 'https://space-scale-explorer.krzychu1988.chatgpt.site/',
    tags: ['Three.js', 'WebGL', 'PWA'],
    category: 'spatial',
    accent: '#4fa7ff',
  },
  {
    id: 'allergen-guard',
    title: 'Allergen & Diet Guard',
    description: {
      pl: 'Prywatna aplikacja Android analizująca skład produktów względem profilu alergenów. Dane i historia pozostają offline.',
      en: 'A privacy-first Android app checking product ingredients against a personal allergen profile. Data and history stay offline.',
    },
    image: '/allergen_mockup.webp',
    link: 'https://apkmason.dev/AllergenGuard/',
    tags: ['Android', 'Kotlin Compose', 'Offline'],
    category: 'app',
    accent: '#8ed86b',
  },
  {
    id: 'budget',
    title: 'Budżet Domowy',
    description: {
      pl: 'Błyskawiczna aplikacja desktopowa offline-first do budżetowania metodą zero-based.',
      en: 'A fast, offline-first desktop app for zero-based budgeting.',
    },
    image: '/budzet_mockup.webp',
    link: 'https://apkmason.dev/budzet_domowy/',
    tags: ['Tauri', 'Rust', 'SQLite'],
    category: 'app',
    accent: '#55d18d',
  },
  {
    id: 'top-seven',
    title: 'Top Seven',
    description: {
      pl: 'Aplikacja edukacyjna z 147 faktami, fiszkami i interaktywnym słowniczkiem.',
      en: 'An educational app with 147 facts, flashcards and an interactive glossary.',
    },
    image: '/top_seven_mockup.webp',
    link: 'https://apkmason.dev/topseven/',
    tags: ['Android', 'Material 3'],
    category: 'app',
    accent: '#f1ca4b',
  },
  {
    id: 'recai',
    title: 'RecAI',
    description: {
      pl: 'Prywatny dyktafon z transkrypcją Whisper i automatycznymi podsumowaniami.',
      en: 'A private voice recorder with Whisper transcription and automatic summaries.',
    },
    image: '/recai_mockup.webp',
    link: 'https://apkmason.dev/recai_landing_page/',
    tags: ['Android', 'Whisper', 'GPT'],
    category: 'app',
    accent: '#e76cff',
  },
  {
    id: 'scrolldebt',
    title: 'ScrollDebt',
    description: {
      pl: 'Prywatna aplikacja Android pomagająca ograniczyć doomscrolling przez analizę czasu, bezpośredni feedback i działanie w pełni offline.',
      en: 'A privacy-first Android app that helps curb doomscrolling through time tracking, direct feedback and fully offline operation.',
    },
    image: '/scrolldebt_mockup.webp',
    link: 'https://apkmason.dev/scrolldebt-site/',
    tags: ['Android', 'Kotlin', 'Offline'],
    category: 'app',
    accent: '#ff476f',
  },
  {
    id: 'piatunio-w-korpo',
    title: 'Piątunio w Korpo',
    description: {
      pl: 'Hyper-casualowa gra na Androida, w której przemierzasz labirynt biurek i próbujesz dotrwać do piątkowego popołudnia.',
      en: 'A hyper-casual Android game where you navigate a maze of desks and try to survive until Friday afternoon.',
    },
    image: '/piatunio_mockup.webp',
    link: 'https://apkmason.dev/piatuniowkorpo/',
    tags: ['Android', 'Kotlin Compose', 'Pixel Art'],
    category: 'app',
    accent: '#4de7ff',
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
export const archiveProjects = projects.filter((project) => !project.featured);
